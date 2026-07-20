# -*- coding: utf-8 -*-
"""
线条小狗桌宠 (Line Puppy Desktop Pet)
====================================
样式参考「线条小狗」：白色身体、黑色简笔线条、大耳朵棕色垂耳。
模式参考「QQ宠物」：饥饿/心情/清洁/体力四维状态、喂食/玩耍/洗澡/睡觉、
等级成长、气泡说话、桌面随机溜达、可拖拽、右键菜单、状态面板。

运行: python pet.py   (仅需 Python 自带的 tkinter, 无第三方依赖)
数据: 状态自动存档到 ~/.linedog_pet.json
"""

import json
import math
import os
import random
import sys
import time
import tkinter as tk

# ----------------------------------------------------------------------------
# 常量
# ----------------------------------------------------------------------------
CANVAS_W, CANVAS_H = 240, 240        # 画布尺寸
GROUND_Y = 200                        # 小狗脚底基准线
TRANS_COLOR = "#0f0f0e"              # Windows 下作为透明色的魔术色
FPS_MS = 130                          # 动画帧间隔 (毫秒)
DECAY_MS = 30_000                     # 状态衰减间隔 (毫秒)
SAVE_PATH = os.path.join(os.path.expanduser("~"), ".linedog_pet.json")

OUTLINE = "#3a3a3a"                   # 线条颜色
BODY = "#ffffff"                      # 身体白色
EAR = "#c68a53"                       # 垂耳棕色
BLUSH = "#ffc9c9"                     # 腮红
LW = 3                                # 线宽

FOODS = [
    ("🦴 骨头",   {"hunger": 25, "mood": 5},  "咔嚓咔嚓~ 骨头最好吃!"),
    ("🍖 肉肉",   {"hunger": 35, "mood": 8},  "呜哇! 是肉肉!!"),
    ("🥛 牛奶",   {"hunger": 15, "mood": 3},  "咕嘟咕嘟... 呼~"),
    ("🍦 冰淇淋", {"hunger": 10, "mood": 15}, "冰冰凉凉, 开心!"),
]

IDLE_TALK = [
    "汪!", "今天也要加油鸭~", "陪我玩嘛陪我玩嘛",
    "主人在忙什么呀?", "想吃骨头了...", "打个滚给你看!",
    "唔... 有点无聊", "汪汪! 我在这里!", "摸摸我的头嘛~",
]

# ----------------------------------------------------------------------------
# 宠物状态 (QQ宠物式数值系统)
# ----------------------------------------------------------------------------
class PetState:
    def __init__(self):
        self.hunger = 80    # 饱食度 0-100, 低了会饿
        self.mood = 80      # 心情 0-100
        self.clean = 80     # 清洁 0-100
        self.energy = 80    # 体力 0-100
        self.exp = 0        # 成长值
        self.born = time.time()
        self.load()

    # ---- 存档 ----
    def load(self):
        try:
            with open(SAVE_PATH, "r", encoding="utf-8") as f:
                d = json.load(f)
            for k in ("hunger", "mood", "clean", "energy", "exp", "born"):
                if k in d:
                    setattr(self, k, d[k])
            # 离线期间按每小时轻微衰减
            away_h = min((time.time() - d.get("saved", time.time())) / 3600, 48)
            self.hunger = max(5, self.hunger - int(away_h * 2))
            self.energy = min(100, self.energy + int(away_h * 5))  # 离线算休息
        except Exception:
            pass

    def save(self):
        try:
            with open(SAVE_PATH, "w", encoding="utf-8") as f:
                json.dump({
                    "hunger": self.hunger, "mood": self.mood,
                    "clean": self.clean, "energy": self.energy,
                    "exp": self.exp, "born": self.born,
                    "saved": time.time(),
                }, f)
        except Exception:
            pass

    # ---- 数值 ----
    def clamp(self):
        for k in ("hunger", "mood", "clean", "energy"):
            setattr(self, k, max(0, min(100, getattr(self, k))))

    def decay(self):
        """随时间自然衰减 (QQ宠物式)。"""
        self.hunger -= random.randint(1, 2)
        self.clean -= 1
        self.mood -= 1 if self.hunger < 30 else 0
        self.energy -= 1
        self.clamp()

    def gain(self, **kw):
        for k, v in kw.items():
            setattr(self, k, getattr(self, k) + v)
        self.clamp()

    @property
    def level(self):
        return int(math.sqrt(self.exp / 10)) + 1

    @property
    def level_progress(self):
        cur = self.level - 1
        lo, hi = 10 * cur * cur, 10 * (cur + 1) * (cur + 1)
        return (self.exp - lo) / max(1, hi - lo)

    @property
    def age_days(self):
        return int((time.time() - self.born) / 86400)


# ----------------------------------------------------------------------------
# 线条小狗绘制 (纯 Canvas 矢量简笔画)
# ----------------------------------------------------------------------------
class LineDogArtist:
    """负责把线条小狗按不同姿势画到 canvas 上。

    所有坐标以 (cx, base) 为锚点: cx 是身体水平中心, base 是脚底线。
    direction: 1 朝右, -1 朝左 (水平镜像)。
    """

    def __init__(self, canvas):
        self.c = canvas

    # 水平镜像辅助
    def _x(self, cx, dx, d):
        return cx + dx * d

    def draw(self, pose, frame, cx, base, d=1):
        c = self.c
        c.delete("dog")
        f = frame
        if pose == "sleep":
            self._draw_sleep(cx, base, f)
        elif pose == "eat":
            self._draw_eat(cx, base, f, d)
        elif pose == "bath":
            self._draw_bath(cx, base, f, d)
        elif pose == "happy":
            self._draw_happy(cx, base, f, d)
        elif pose == "walk":
            self._draw_stand(cx, base, f, d, walking=True)
        else:  # idle / sit
            self._draw_stand(cx, base, f, d, walking=False)

    # ---- 基本站姿 / 行走 ----
    def _draw_stand(self, cx, base, f, d, walking):
        c, X = self.c, self._x
        bob = [0, 1, 0, -1][f % 4] if walking else [0, 1][f % 2]
        by = base - 38 + bob                     # 身体中心 y
        # 尾巴 (摇摆)
        wag = math.sin(f * 1.3) * 10
        c.create_line(X(cx, -34, d), by - 2,
                      X(cx, -46, d), by - 12 - wag,
                      fill=OUTLINE, width=LW, capstyle="round",
                      smooth=True, tags="dog")
        # 腿
        if walking:
            legs = [(-22, [4, -4, 0, 0][f % 4]), (-10, [-4, 4, 0, 0][f % 4]),
                    (14, [0, 0, 4, -4][f % 4]), (26, [0, 0, -4, 4][f % 4])]
        else:
            legs = [(-22, 0), (-10, 0), (14, 0), (26, 0)]
        for lx, sw in legs:
            c.create_line(X(cx, lx, d), by + 12,
                          X(cx, lx + sw, d), base,
                          fill=OUTLINE, width=LW, capstyle="round", tags="dog")
        # 身体 (白色圆角椭圆)
        c.create_oval(X(cx, -36, d), by - 18, X(cx, 34, d), by + 16,
                      fill=BODY, outline=OUTLINE, width=LW, tags="dog")
        # 头
        hx, hy = X(cx, 30, d), by - 26 + (bob // 2)
        c.create_oval(hx - 24, hy - 22, hx + 24, hy + 22,
                      fill=BODY, outline=OUTLINE, width=LW, tags="dog")
        # 垂耳 (棕色, 微微摆动)
        eb = math.sin(f * 0.9) * 2
        c.create_oval(hx - 34, hy - 10 + eb, hx - 16, hy + 24 + eb,
                      fill=EAR, outline=OUTLINE, width=LW, tags="dog")
        c.create_oval(hx + 16, hy - 10 + eb, hx + 34, hy + 24 + eb,
                      fill=EAR, outline=OUTLINE, width=LW, tags="dog")
        self._face(hx, hy, d, blink=(f % 14 == 0))

    # ---- 表情 ----
    def _face(self, hx, hy, d, blink=False, happy=False):
        c = self.c
        ex = 8 * d
        if blink:
            for sx in (-1, 1):
                c.create_line(hx + sx * ex - 3, hy - 3, hx + sx * ex + 3, hy - 3,
                              fill=OUTLINE, width=LW, capstyle="round", tags="dog")
        elif happy:
            for sx in (-1, 1):
                c.create_arc(hx + sx * ex - 4, hy - 7, hx + sx * ex + 4, hy + 1,
                             start=0, extent=180, style="arc",
                             outline=OUTLINE, width=LW, tags="dog")
        else:
            for sx in (-1, 1):
                c.create_oval(hx + sx * ex - 2, hy - 5, hx + sx * ex + 2, hy - 1,
                              fill=OUTLINE, outline=OUTLINE, tags="dog")
        # 鼻子 + 嘴
        c.create_oval(hx - 3, hy + 3, hx + 3, hy + 8,
                      fill=OUTLINE, outline=OUTLINE, tags="dog")
        c.create_arc(hx - 6, hy + 5, hx + 6, hy + 15,
                     start=200, extent=140, style="arc",
                     outline=OUTLINE, width=2, tags="dog")
        # 腮红
        for sx in (-1, 1):
            c.create_oval(hx + sx * 12 - 4, hy + 5, hx + sx * 12 + 4, hy + 10,
                          fill=BLUSH, outline=BLUSH, tags="dog")

    # ---- 睡觉 ----
    def _draw_sleep(self, cx, base, f):
        c = self.c
        by = base - 16
        breathe = math.sin(f * 0.5) * 2
        # 趴着的身体
        c.create_oval(cx - 40, by - 16 - breathe, cx + 30, by + 14,
                      fill=BODY, outline=OUTLINE, width=LW, tags="dog")
        # 头趴在前爪上
        hx, hy = cx + 26, by - 8
        c.create_oval(hx - 22, hy - 18, hx + 22, hy + 18,
                      fill=BODY, outline=OUTLINE, width=LW, tags="dog")
        c.create_oval(hx - 32, hy - 6, hx - 16, hy + 20,
                      fill=EAR, outline=OUTLINE, width=LW, tags="dog")
        c.create_oval(hx + 16, hy - 6, hx + 32, hy + 20,
                      fill=EAR, outline=OUTLINE, width=LW, tags="dog")
        # 闭眼
        for sx in (-1, 1):
            c.create_arc(hx + sx * 8 - 4, hy - 4, hx + sx * 8 + 4, hy + 2,
                         start=180, extent=180, style="arc",
                         outline=OUTLINE, width=2, tags="dog")
        c.create_oval(hx - 3, hy + 3, hx + 3, hy + 8,
                      fill=OUTLINE, outline=OUTLINE, tags="dog")
        # Zzz 气泡
        n = f % 6
        for i in range(3):
            if n >= i * 2:
                size = 9 + i * 3
                c.create_text(hx + 26 + i * 12, hy - 30 - i * 12,
                              text="z", font=("Arial", size, "bold"),
                              fill="#8ab0d8", tags="dog")

    # ---- 吃饭 ----
    def _draw_eat(self, cx, base, f, d):
        c, X = self.c, self._x
        self._draw_stand(cx, base, 0, d, walking=False)
        # 面前的碗
        bx = X(cx, 62, d)
        c.create_arc(bx - 16, base - 18, bx + 16, base + 6,
                     start=180, extent=180, style="chord",
                     fill="#e8734a", outline=OUTLINE, width=LW, tags="dog")
        if f % 2 == 0:  # 碗里的食物一闪一闪表示在吃
            c.create_oval(bx - 10, base - 16, bx + 10, base - 8,
                          fill="#ffd27f", outline=OUTLINE, width=2, tags="dog")
        # 爱心
        if f % 4 < 2:
            c.create_text(X(cx, 30, d), base - 92, text="♥",
                          font=("Arial", 14), fill="#ff7d9c", tags="dog")

    # ---- 洗澡 ----
    def _draw_bath(self, cx, base, f, d):
        c = self.c
        by = base - 30
        # 浴盆
        c.create_arc(cx - 46, base - 46, cx + 46, base + 14,
                     start=180, extent=180, style="chord",
                     fill="#9cc9ee", outline=OUTLINE, width=LW, tags="dog")
        # 露出的头
        hx, hy = cx, by - 22 + math.sin(f * 0.8) * 2
        c.create_oval(hx - 24, hy - 22, hx + 24, hy + 22,
                      fill=BODY, outline=OUTLINE, width=LW, tags="dog")
        c.create_oval(hx - 34, hy - 10, hx - 16, hy + 24,
                      fill=EAR, outline=OUTLINE, width=LW, tags="dog")
        c.create_oval(hx + 16, hy - 10, hx + 34, hy + 24,
                      fill=EAR, outline=OUTLINE, width=LW, tags="dog")
        self._face(hx, hy, 1, happy=True)
        # 泡泡
        random.seed(f // 2)
        for _ in range(5):
            px = cx + random.randint(-50, 50)
            py = base - 40 - random.randint(0, 50)
            r = random.randint(3, 7)
            c.create_oval(px - r, py - r, px + r, py + r,
                          outline="#7fb6e8", width=2, tags="dog")
        random.seed()

    # ---- 开心跳跃 ----
    def _draw_happy(self, cx, base, f, d):
        c, X = self.c, self._x
        jump = abs(math.sin(f * 0.9)) * 22
        by = base - 38 - jump
        # 尾巴狂摇
        wag = math.sin(f * 2.5) * 14
        c.create_line(X(cx, -34, d), by - 2, X(cx, -46, d), by - 10 - wag,
                      fill=OUTLINE, width=LW, capstyle="round", tags="dog")
        for lx in (-22, -10, 14, 26):
            c.create_line(X(cx, lx, d), by + 12,
                          X(cx, lx + (4 if lx < 0 else -4), d), by + 24,
                          fill=OUTLINE, width=LW, capstyle="round", tags="dog")
        c.create_oval(X(cx, -36, d), by - 18, X(cx, 34, d), by + 16,
                      fill=BODY, outline=OUTLINE, width=LW, tags="dog")
        hx, hy = X(cx, 30, d), by - 26
        c.create_oval(hx - 24, hy - 22, hx + 24, hy + 22,
                      fill=BODY, outline=OUTLINE, width=LW, tags="dog")
        flap = math.sin(f * 2.5) * 5
        c.create_oval(hx - 34, hy - 12 - flap, hx - 16, hy + 22 - flap,
                      fill=EAR, outline=OUTLINE, width=LW, tags="dog")
        c.create_oval(hx + 16, hy - 12 - flap, hx + 34, hy + 22 - flap,
                      fill=EAR, outline=OUTLINE, width=LW, tags="dog")
        self._face(hx, hy, d, happy=True)
        if f % 3 != 0:
            c.create_text(hx + 6, hy - 40, text="♥",
                          font=("Arial", 16), fill="#ff7d9c", tags="dog")


# ----------------------------------------------------------------------------
# 主程序: 桌宠窗口 + 行为 AI + 交互
# ----------------------------------------------------------------------------
class DesktopPet(tk.Tk):
    def __init__(self):
        super().__init__()
        self.state_data = PetState()
        self.overrideredirect(True)          # 无边框
        self.wm_attributes("-topmost", True)  # 置顶
        self.transparent_ok = self._setup_transparency()

        self.canvas = tk.Canvas(self, width=CANVAS_W, height=CANVAS_H,
                                highlightthickness=0,
                                bg=TRANS_COLOR if self.transparent_ok else "#f5efe6")
        self.canvas.pack()
        self.artist = LineDogArtist(self.canvas)

        # 位置: 屏幕右下角起步
        self.scr_w = self.winfo_screenwidth()
        self.scr_h = self.winfo_screenheight()
        self.px = self.scr_w - CANVAS_W - 120
        self.py = self.scr_h - CANVAS_H - 60
        self.geometry(f"{CANVAS_W}x{CANVAS_H}+{self.px}+{self.py}")

        # 行为状态机
        self.pose = "idle"          # idle / walk / sleep / eat / bath / happy
        self.pose_until = 0         # 当前姿势持续到的时间戳
        self.direction = -1         # -1 朝左, 1 朝右
        self.frame = 0
        self.bubble_until = 0
        self.bubble_text = ""
        self.panel = None

        # 交互绑定
        self.canvas.bind("<ButtonPress-1>", self._drag_start)
        self.canvas.bind("<B1-Motion>", self._drag_move)
        self.canvas.bind("<Double-Button-1>", self._pat)
        self.canvas.bind("<Button-3>", self._menu)
        self.canvas.bind("<Button-2>", self._menu)   # macOS 双指

        self._say(f"汪! 我是线条小狗 (Lv.{self.state_data.level}) 请多关照~", 4)
        self._tick()
        self._decay_tick()
        self.protocol("WM_DELETE_WINDOW", self._quit)

    # ---- 透明窗口 (跨平台尽力而为) ----
    def _setup_transparency(self):
        try:
            if sys.platform == "win32":
                self.wm_attributes("-transparentcolor", TRANS_COLOR)
                return True
            if sys.platform == "darwin":
                self.wm_attributes("-transparent", True)
                self.config(bg="systemTransparent")
                return False  # macOS 上 canvas 背景仍需实色, 用浅底色
        except tk.TclError:
            pass
        return False

    # ================= 主循环 =================
    def _tick(self):
        now = time.time()
        self.frame += 1
        s = self.state_data

        # 姿势到期 -> 决策下一个行为
        if self.pose != "drag" and now >= self.pose_until:
            self._decide(now)

        # 行走位移
        if self.pose == "walk":
            self.px += 3 * self.direction
            edge = 20
            if self.px < edge:
                self.px, self.direction = edge, 1
            elif self.px > self.scr_w - CANVAS_W - edge:
                self.px = self.scr_w - CANVAS_W - edge
                self.direction = -1
            self.geometry(f"+{int(self.px)}+{int(self.py)}")

        # 绘制
        self.artist.draw(self.pose if self.pose != "drag" else "happy",
                         self.frame, CANVAS_W // 2, GROUND_Y, self.direction)
        self._draw_bubble(now)
        self._draw_status_dots()
        if self.panel and self.panel.winfo_exists():
            self._refresh_panel()

        self.after(FPS_MS, self._tick)

    def _decide(self, now):
        """行为 AI: 根据数值 + 随机性选择下一个动作。"""
        s = self.state_data
        if self.pose == "sleep" and s.energy < 95 and random.random() < 0.8:
            self.pose_until = now + 4
            return  # 继续睡
        if s.energy < 15:
            self._set_pose("sleep", random.uniform(15, 25))
            self._say("好困... 先睡一会 zzZ", 3)
            return
        if s.hunger < 25 and random.random() < 0.5:
            self._say("肚子咕咕叫了... 主人喂我嘛 🥺", 4)
        elif s.clean < 25 and random.random() < 0.5:
            self._say("身上痒痒的, 想洗澡澡~", 4)
        elif random.random() < 0.18:
            self._say(random.choice(IDLE_TALK), 3)

        r = random.random()
        if r < 0.45:
            self._set_pose("idle", random.uniform(3, 7))
        elif r < 0.85:
            self.direction = random.choice([-1, 1])
            self._set_pose("walk", random.uniform(3, 8))
        else:
            self._set_pose("happy", random.uniform(2, 3))

    def _set_pose(self, pose, dur):
        self.pose = pose
        self.pose_until = time.time() + dur

    def _decay_tick(self):
        self.state_data.decay()
        if self.pose == "sleep":
            self.state_data.gain(energy=8)
        self.state_data.save()
        self.after(DECAY_MS, self._decay_tick)

    # ================= 绘制辅助 =================
    def _say(self, text, dur=3):
        self.bubble_text = text
        self.bubble_until = time.time() + dur

    def _draw_bubble(self, now):
        c = self.canvas
        c.delete("bubble")
        if now >= self.bubble_until or not self.bubble_text:
            return
        cx = CANVAS_W // 2
        tid = c.create_text(cx, 34, text=self.bubble_text,
                            font=("Microsoft YaHei", 10), fill="#3a3a3a",
                            width=CANVAS_W - 40, justify="center", tags="bubble")
        x1, y1, x2, y2 = c.bbox(tid)
        c.create_rectangle(x1 - 8, y1 - 6, x2 + 8, y2 + 6,
                           fill="#fffdf5", outline=OUTLINE, width=2,
                           tags="bubble")
        c.create_polygon(cx - 6, y2 + 6, cx + 6, y2 + 6, cx, y2 + 14,
                         fill="#fffdf5", outline=OUTLINE, width=2,
                         tags="bubble")
        c.tag_raise(tid)

    def _draw_status_dots(self):
        """低状态预警小图标 (悬浮在头顶)。"""
        c = self.canvas
        c.delete("warn")
        s = self.state_data
        warns = []
        if s.hunger < 25:
            warns.append("🍖")
        if s.clean < 25:
            warns.append("🛁")
        if s.mood < 25:
            warns.append("💔")
        if time.time() < self.bubble_until:
            return
        for i, w in enumerate(warns):
            blink = (self.frame + i * 2) % 8 < 5
            if blink:
                c.create_text(CANVAS_W // 2 - 20 + i * 24, 52, text=w,
                              font=("Arial", 13), tags="warn")

    # ================= 交互 =================
    def _drag_start(self, e):
        self._drag_ox, self._drag_oy = e.x, e.y
        self._pre_drag_pose = self.pose if self.pose != "drag" else "idle"
        self.pose = "drag"

    def _drag_move(self, e):
        self.px = self.winfo_x() + e.x - self._drag_ox
        self.py = self.winfo_y() + e.y - self._drag_oy
        self.geometry(f"+{int(self.px)}+{int(self.py)}")
        self.pose_until = time.time() + 0.5

    def _pat(self, _e=None):
        """双击摸头。"""
        s = self.state_data
        s.gain(mood=6)
        s.exp += 2
        self._set_pose("happy", 2.5)
        self._say(random.choice(["嘿嘿, 好舒服~", "最喜欢主人了!",
                                 "汪汪! 再摸摸!", "尾巴要摇断啦~"]), 3)

    def feed(self, food=None):
        s = self.state_data
        if s.hunger > 95:
            self._say("吃不下啦, 肚子圆滚滚的~", 3)
            return
        name, gains, line = food or random.choice(FOODS)
        s.gain(**gains)
        s.exp += 5
        self._set_pose("eat", 4)
        self._say(f"{name} — {line}", 4)

    def play(self):
        s = self.state_data
        if s.energy < 15:
            self._say("累趴了... 让我睡一觉再玩", 3)
            return
        s.gain(mood=18, energy=-10, hunger=-5)
        s.exp += 6
        self._set_pose("happy", 5)
        self._say(random.choice(["接住球球! 汪!", "追尾巴转圈圈~",
                                 "和主人玩最开心了!"]), 4)

    def bath(self):
        s = self.state_data
        if s.clean > 90:
            self._say("我已经香喷喷了~", 3)
            return
        s.gain(clean=45, mood=5)
        s.exp += 4
        self._set_pose("bath", 6)
        self._say("泡泡浴时间~ 咕噜咕噜", 4)

    def sleep_cmd(self):
        self._set_pose("sleep", 20)
        self._say("晚安主人... zzZ", 3)

    # ---- 右键菜单 ----
    def _menu(self, e):
        m = tk.Menu(self, tearoff=0)
        s = self.state_data
        m.add_command(label=f"🐶 线条小狗  Lv.{s.level}  ({s.age_days}天)",
                      state="disabled")
        m.add_separator()
        feed_m = tk.Menu(m, tearoff=0)
        for food in FOODS:
            feed_m.add_command(label=food[0],
                               command=lambda fd=food: self.feed(fd))
        m.add_cascade(label="🍖 喂食", menu=feed_m)
        m.add_command(label="🎾 玩耍", command=self.play)
        m.add_command(label="🛁 洗澡", command=self.bath)
        m.add_command(label="💤 睡觉", command=self.sleep_cmd)
        m.add_separator()
        m.add_command(label="📊 状态面板", command=self._open_panel)
        m.add_separator()
        m.add_command(label="❌ 退出", command=self._quit)
        m.tk_popup(e.x_root, e.y_root)

    # ---- 状态面板 (QQ宠物式) ----
    def _open_panel(self):
        if self.panel and self.panel.winfo_exists():
            self.panel.lift()
            return
        p = tk.Toplevel(self)
        p.title("线条小狗 · 状态")
        p.resizable(False, False)
        p.wm_attributes("-topmost", True)
        p.geometry(f"+{max(0, self.winfo_x() - 260)}+{self.winfo_y()}")
        p.configure(bg="#fffdf5")
        self.panel = p

        tk.Label(p, text="🐶 线条小狗", font=("Microsoft YaHei", 13, "bold"),
                 bg="#fffdf5", fg="#3a3a3a").pack(pady=(10, 0))
        self.panel_info = tk.Label(p, text="", font=("Microsoft YaHei", 9),
                                   bg="#fffdf5", fg="#8a8a8a")
        self.panel_info.pack()

        self.panel_bars = {}
        bars = [("hunger", "🍖 饱食", "#f2a65a"), ("mood", "😊 心情", "#f78fb3"),
                ("clean", "🛁 清洁", "#7fb6e8"), ("energy", "⚡ 体力", "#9fd67a"),
                ("exp", "⭐ 成长", "#c9a5e8")]
        for key, label, color in bars:
            row = tk.Frame(p, bg="#fffdf5")
            row.pack(fill="x", padx=14, pady=3)
            tk.Label(row, text=label, width=7, anchor="w",
                     font=("Microsoft YaHei", 9), bg="#fffdf5",
                     fg="#3a3a3a").pack(side="left")
            bar = tk.Canvas(row, width=150, height=14, bg="#eee",
                            highlightthickness=1,
                            highlightbackground="#ccc")
            bar.pack(side="left", padx=4)
            self.panel_bars[key] = (bar, color)

        btns = tk.Frame(p, bg="#fffdf5")
        btns.pack(pady=8)
        for txt, cmd in [("喂食", self.feed), ("玩耍", self.play),
                         ("洗澡", self.bath), ("睡觉", self.sleep_cmd)]:
            tk.Button(btns, text=txt, width=5, command=cmd,
                      font=("Microsoft YaHei", 9), relief="groove",
                      bg="#fff", activebackground="#f5efe6").pack(
                side="left", padx=3)
        self._refresh_panel()

    def _refresh_panel(self):
        s = self.state_data
        self.panel_info.config(
            text=f"Lv.{s.level} · 已陪伴 {s.age_days} 天 · 成长值 {s.exp}")
        for key, (bar, color) in self.panel_bars.items():
            bar.delete("all")
            val = s.level_progress if key == "exp" else getattr(s, key) / 100
            bar.create_rectangle(0, 0, 150 * val, 14, fill=color, outline="")
            if key != "exp":
                bar.create_text(75, 7, text=f"{getattr(s, key)}/100",
                                font=("Arial", 8), fill="#3a3a3a")

    def _quit(self):
        self.state_data.save()
        self.destroy()


if __name__ == "__main__":
    app = DesktopPet()
    app.mainloop()
