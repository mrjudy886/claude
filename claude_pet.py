# -*- coding: utf-8 -*-
"""
Claude 桌宠 (Claude Desktop Pet)
================================
一只住在桌面上的「Claude 小玩偶」：珊瑚橘的圆滚滚布偶身体 + 会缓慢旋转的星芒光环。
玩法完整参考 QQ 宠物模板：饱食 / 心情 / 清洁 / 体力 / 健康 五维数值、
喂食、玩耍、洗澡、睡觉、打工赚金币、学习涨智力、商店、背包、生病吃药、
每日签到、等级成长与成长阶段、成就系统、离线结算存档。

运行：python claude_pet.py     （只依赖 Python 自带的 tkinter，无任何第三方库）
存档：~/.claude_pet.json
"""

import json
import math
import os
import random
import subprocess
import sys
import time
import tkinter as tk
from tkinter import font as tkfont
from datetime import date

APP_NAME = "Claude 桌宠"
VERSION = "1.0.0"

# ---------------------------------------------------------------------------
# 常量：画布 / 配色 / 节奏
# ---------------------------------------------------------------------------
DESIGN_W, DESIGN_H = 260, 260         # 设计坐标系尺寸，实际显示 = 设计尺寸 * scale
FPS_MS = 70                           # 动画帧间隔（毫秒）
DECAY_MS = 30_000                     # 属性自然衰减间隔
SAVE_MS = 20_000                      # 自动存档间隔
SAVE_PATH = os.path.join(os.path.expanduser("~"), ".claude_pet.json")

# Claude 视觉配色
CORAL = "#D97757"                     # 主体珊瑚橘
CORAL_DARK = "#A8462C"                # 描边
CORAL_DEEP = "#C1603C"                # 阴影面
CREAM = "#F0EEE6"                     # 奶油白（肚皮 / 脚掌 / 背景兜底）
CREAM_LINE = "#D6D2C4"
INK = "#2B2723"                       # 眼睛、线条
BLUSH = "#F2A08C"
SICK_BODY = "#C4A093"                 # 生病时发灰的身体
SICK_DARK = "#8E6E62"
TRANS_COLOR = "#0F0F0E"               # Windows 下用作透明色的魔术色
TUB = "#BCD8E8"
TUB_DARK = "#7FA9BF"

LW = 3                                # 基础线宽

# ---------------------------------------------------------------------------
# 玩法配置（QQ 宠物式）
# ---------------------------------------------------------------------------
FREE_FOOD = ("🥣 基础饲料", {"hunger": 12}, "谢谢投喂~ 虽然有点素")

SHOP_ITEMS = [
    # id,        名称,        价格, 效果,                                   台词
    ("bread",    "🍞 面包",     8,  {"hunger": 20},                        "面包香香的!"),
    ("ramen",    "🍜 拉面",    18,  {"hunger": 40, "mood": 5},             "呼噜呼噜~ 汤也喝光!"),
    ("cake",     "🍰 蛋糕",    25,  {"hunger": 15, "mood": 20},            "甜的! 今天是好日子!"),
    ("coffee",   "☕ 咖啡",    15,  {"energy": 30, "mood": 5},             "精神一下, 继续干活!"),
    ("soap",     "🧴 沐浴露",  12,  {"clean": 45},                         "泡泡好多好多!"),
    ("medicine", "💊 感冒药",  30,  {"health": 60},                        "苦... 但是好像好多了"),
    ("ball",     "🧸 毛线球",  40,  {"mood": 35, "energy": -5},            "球球! 球球是我的!"),
    ("book",     "📚 参考书",  50,  {"iq": 5, "mood": -3},                 "又学到了新东西!"),
    ("token",    "🔋 Token包", 60,  {"energy": 60, "mood": 10},            "电量满格, 可以想很久了!"),
]
SHOP_BY_ID = {i[0]: i for i in SHOP_ITEMS}
FOOD_IDS = {"bread", "ramen", "cake", "coffee", "token"}   # 出现在「喂食」菜单里的

# 打工：名称, 秒数, 体力消耗, 饱食消耗, 基础金币, 经验
JOBS = [
    ("📮 送快递",   20, 12, 10,  18,  8),
    ("💻 写代码",   30, 20, 14,  42, 22),
    ("🎨 画插画",   25, 16, 12,  30, 16),
    ("📞 客服值班", 35, 22, 16,  50, 26),
]

IDLE_TALK = [
    "在的, 需要我帮忙吗?", "今天也在努力思考~", "摸摸头会变聪明哦",
    "要不要我帮你写段代码?", "唔... 有点饿了", "主人主人, 陪我玩嘛",
    "我在桌面角落待着就好~", "刚才想到一个好点子!", "上下文快满了, 我打个盹",
    "你今天写的代码, 我都看到啦", "要不要一起去打工赚金币?",
]
COMPLAIN = {
    "hunger": ["肚子咕咕叫了...", "喂我一口嘛 QAQ", "饿到思考不动了"],
    "clean":  ["身上黏黏的...", "想洗澡想洗澡!", "我需要一场泡泡浴"],
    "mood":   ["有点无聊...", "陪我玩一会儿好不好", "心情低落中"],
    "energy": ["困... 眼皮好重", "让我睡一小会儿", "电量不足啦"],
    "health": ["咳咳... 我好像生病了", "头晕晕的, 需要吃药", "身体好难受..."],
}

STAGES = [  # (最低等级, 阶段名, 体型缩放)
    (1,  "小玩偶",   0.86),
    (5,  "见习助手", 0.94),
    (10, "熟练助手", 1.00),
    (20, "智慧大师", 1.08),
]

ACHIEVEMENTS = [
    ("first_work",  "🏅 第一份工作", "完成一次打工"),
    ("rich",        "💰 小富翁",     "金币累计达到 500"),
    ("scholar",     "🎓 学霸",       "智力达到 100"),
    ("lv5",         "⭐ 初露锋芒",   "等级达到 Lv.5"),
    ("lv10",        "🌟 独当一面",   "等级达到 Lv.10"),
    ("sign7",       "📅 全勤宝宝",   "连续签到 7 天"),
    ("gourmet",     "🍽 美食家",     "累计喂食 30 次"),
]


# ---------------------------------------------------------------------------
# 数值与存档
# ---------------------------------------------------------------------------
class PetState:
    """QQ 宠物式数值系统 + 本地存档。"""

    FIELDS = ("hunger", "mood", "clean", "energy", "health", "exp", "coins",
              "iq", "born", "name", "inventory", "last_sign", "sign_streak",
              "achievements", "feed_count", "work_count", "ui_scale", "topmost")

    def __init__(self):
        self.hunger = 80
        self.mood = 80
        self.clean = 80
        self.energy = 80
        self.health = 100
        self.exp = 0
        self.coins = 80
        self.iq = 10
        self.born = time.time()
        self.name = "Claude"
        self.inventory = {}
        self.last_sign = ""
        self.sign_streak = 0
        self.achievements = []
        self.feed_count = 0
        self.work_count = 0
        self.ui_scale = 1.0
        self.topmost = True
        self.offline_report = ""
        self.load()

    # ---- 存档 ----
    def load(self):
        try:
            with open(SAVE_PATH, "r", encoding="utf-8") as f:
                d = json.load(f)
        except Exception:
            return
        for k in self.FIELDS:
            if k in d:
                setattr(self, k, d[k])
        # 离线结算：饿得慢、体力当作睡觉恢复、脏一点
        away_h = min(max((time.time() - d.get("saved", time.time())) / 3600.0, 0), 72)
        if away_h > 0.2:
            self.hunger -= int(away_h * 3)
            self.clean -= int(away_h * 2)
            self.energy += int(away_h * 8)
            self.mood -= int(away_h * 1.5)
            self.clamp()
            self.offline_report = "我等了你 %s~" % human_span(away_h)

    def save(self):
        data = {k: getattr(self, k) for k in self.FIELDS}
        data["saved"] = time.time()
        try:
            tmp = SAVE_PATH + ".tmp"
            with open(tmp, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False)
            os.replace(tmp, SAVE_PATH)
        except Exception:
            pass

    # ---- 数值 ----
    def clamp(self):
        for k in ("hunger", "mood", "clean", "energy", "health"):
            setattr(self, k, max(0, min(100, int(getattr(self, k)))))
        self.iq = max(0, min(999, int(self.iq)))
        self.coins = max(0, int(self.coins))

    def gain(self, **kw):
        for k, v in kw.items():
            setattr(self, k, getattr(self, k) + v)
        self.clamp()

    def decay(self, sleeping=False, working=False):
        """每 DECAY_MS 调用一次的自然衰减。"""
        self.hunger -= random.randint(1, 2)
        self.clean -= 1
        if sleeping:
            self.energy += 6
            self.health += 1
        else:
            self.energy -= 2 if working else 1
        if self.hunger < 30 or self.clean < 30:
            self.mood -= 1
        if self.hunger <= 5 or self.clean <= 5:
            self.health -= 3
        elif self.hunger > 60 and self.clean > 60 and self.mood > 60:
            self.health += 1
        self.clamp()

    # ---- 等级 / 阶段 ----
    @property
    def level(self):
        return int(math.sqrt(self.exp / 10.0)) + 1

    @property
    def level_progress(self):
        cur = self.level - 1
        lo, hi = 10 * cur * cur, 10 * (cur + 1) * (cur + 1)
        return max(0.0, min(1.0, (self.exp - lo) / float(max(1, hi - lo))))

    @property
    def stage(self):
        name, scale = STAGES[0][1], STAGES[0][2]
        for lv, n, s in STAGES:
            if self.level >= lv:
                name, scale = n, s
        return name, scale

    @property
    def sick(self):
        return self.health < 40

    @property
    def age_days(self):
        return int((time.time() - self.born) / 86400)

    # ---- 背包 ----
    def add_item(self, item_id, n=1):
        self.inventory[item_id] = self.inventory.get(item_id, 0) + n

    def take_item(self, item_id):
        n = self.inventory.get(item_id, 0)
        if n <= 0:
            return False
        if n == 1:
            self.inventory.pop(item_id, None)
        else:
            self.inventory[item_id] = n - 1
        return True

    # ---- 成就 ----
    def check_achievements(self):
        got = []

        def unlock(key):
            if key not in self.achievements:
                self.achievements.append(key)
                got.append(key)

        if self.work_count >= 1:
            unlock("first_work")
        if self.coins >= 500:
            unlock("rich")
        if self.iq >= 100:
            unlock("scholar")
        if self.level >= 5:
            unlock("lv5")
        if self.level >= 10:
            unlock("lv10")
        if self.sign_streak >= 7:
            unlock("sign7")
        if self.feed_count >= 30:
            unlock("gourmet")
        return got


def text_width(s):
    """按「中文算 2 格、西文算 1 格」估算显示宽度。"""
    return sum(2 if ord(ch) > 0x2E7F else 1 for ch in s)


def wrap_cjk(text, limit):
    """按显示宽度折行；尽量不把西文单词拦腰截断。"""
    lines, cur, width = [], "", 0
    for ch in text:
        w = 2 if ord(ch) > 0x2E7F else 1
        if width + w > limit and cur:
            # 西文单词中间断开时，回退到词首
            if w == 1 and ch != " " and cur[-1] not in " ,.!?;:~":
                cut = cur.rfind(" ")
                if 0 < cut < len(cur) - 1:
                    lines.append(cur[:cut])
                    cur, width = cur[cut + 1:], text_width(cur[cut + 1:])
                else:
                    lines.append(cur)
                    cur, width = "", 0
            else:
                lines.append(cur)
                cur, width = "", 0
        cur += ch
        width += w
    if cur:
        lines.append(cur)
    return lines or [""]


def human_span(hours):
    if hours < 1:
        return "%d 分钟" % int(hours * 60)
    if hours < 24:
        return "%d 小时" % int(hours)
    return "%d 天" % int(hours / 24)


# ---------------------------------------------------------------------------
# 主窗口：桌面上的小玩偶
# ---------------------------------------------------------------------------
class ClaudePet(tk.Tk):

    def __init__(self):
        super().__init__()
        self.pet = PetState()
        self.scale = float(self.pet.ui_scale)

        self.title(APP_NAME)
        self.overrideredirect(True)
        self.attributes("-topmost", bool(self.pet.topmost))
        self.bg_color = self._setup_transparency()

        self.cv = tk.Canvas(self, width=self.win_w(), height=self.win_h(),
                            bg=self.bg_color, highlightthickness=0, bd=0)
        self.cv.pack()

        self.font_name = pick_font()
        self._place_initial()

        # 运行时状态
        self.mode = "idle"          # idle / walk / happy / eat / bath / sleep / work / study
        self.mode_frames = 0        # 当前动作剩余帧数（0 = 不限时）
        self.t = 0                  # 全局帧计数
        self.phase = 0.0            # 星芒旋转相位
        self.facing = 1             # 1 右 / -1 左
        self.walk_target = None
        self.blink_until = 0
        self.bubble_text = ""
        self.bubble_frames = 0
        self.prop = ""              # 动作道具（食物 emoji 等）
        self.job = None             # 正在进行的打工 (名称, 剩余帧, 金币, 经验)
        self.sparkles = []
        self.panel = None
        self.shop = None
        self._drag = None
        self._menu = None

        self._bind_events()
        self._loop()
        self.after(DECAY_MS, self._decay_loop)
        self.after(SAVE_MS, self._save_loop)
        self.after(600, self._greet)

    # ---- 尺寸与坐标 ----
    def win_w(self):
        return int(DESIGN_W * self.scale)

    def win_h(self):
        return int(DESIGN_H * self.scale)

    def S(self, v):
        return v * self.scale

    # ---- 平台相关：透明背景 ----
    def _setup_transparency(self):
        try:
            if sys.platform.startswith("win"):
                self.attributes("-transparentcolor", TRANS_COLOR)
                self.config(bg=TRANS_COLOR)
                return TRANS_COLOR
            if sys.platform == "darwin":
                self.attributes("-transparent", True)
                self.config(bg="systemTransparent")
                return "systemTransparent"
        except Exception:
            pass
        # Linux / 兜底：奶油色底板
        try:
            self.attributes("-type", "splash")
        except Exception:
            pass
        self.config(bg=CREAM)
        return CREAM

    def _place_initial(self):
        sw, sh = self.winfo_screenwidth(), self.winfo_screenheight()
        x = sw - self.win_w() - 40
        y = sh - self.win_h() - 80
        self.geometry("+%d+%d" % (max(0, x), max(0, y)))

    # ---- 事件绑定 ----
    def _bind_events(self):
        self.cv.bind("<Button-1>", self._on_press)
        self.cv.bind("<B1-Motion>", self._on_drag)
        self.cv.bind("<ButtonRelease-1>", self._on_release)
        self.cv.bind("<Double-Button-1>", self._on_pat)
        self.cv.bind("<Button-3>", self._on_menu)
        self.cv.bind("<Button-2>", self._on_menu)          # macOS 右键
        self.cv.bind("<Control-Button-1>", self._on_menu)  # macOS Ctrl+左键
        self.bind("<Escape>", lambda e: self.quit_app())

    def _on_press(self, e):
        self._drag = (e.x_root - self.winfo_x(), e.y_root - self.winfo_y(), time.time())

    def _on_drag(self, e):
        if not self._drag:
            return
        dx, dy, _ = self._drag
        self.geometry("+%d+%d" % (e.x_root - dx, e.y_root - dy))
        self.walk_target = None

    def _on_release(self, e):
        if self._drag and time.time() - self._drag[2] > 0.35:
            self.say(random.choice(["放我下来啦~", "飞起来了!", "这里视野不错"]))
        self._drag = None

    def _on_pat(self, e):
        if self.mode in ("bath", "work", "study"):
            return
        self.pet.gain(mood=6, exp=1)
        self.set_mode("happy", frames=26)
        self.say(random.choice(["嘿嘿~ 好舒服", "再摸一下嘛", "被摸头了!", "喜欢你!"]))
        self.spark(6)

    # ---- 右键菜单 ----
    def _on_menu(self, e):
        m = tk.Menu(self, tearoff=0)
        p = self.pet

        feed = tk.Menu(m, tearoff=0)
        feed.add_command(label="%s（免费）" % FREE_FOOD[0], command=self.feed_free)
        feed.add_separator()
        has_food = False
        for item_id, cnt in sorted(p.inventory.items()):
            if item_id in FOOD_IDS and cnt > 0:
                name = SHOP_BY_ID[item_id][1]
                feed.add_command(label="%s ×%d" % (name, cnt),
                                 command=lambda i=item_id: self.use_item(i))
                has_food = True
        if not has_food:
            feed.add_command(label="（背包里没有食物，去商店逛逛）", state="disabled")
        m.add_cascade(label="🍽  喂食", menu=feed)

        m.add_command(label="🎾  玩耍", command=self.play)
        m.add_command(label="🛁  洗澡", command=self.bath)
        m.add_command(label="💤  起床" if self.mode == "sleep" else "💤  睡觉",
                      command=self.toggle_sleep)

        work = tk.Menu(m, tearoff=0)
        for j in JOBS:
            work.add_command(label="%s（%d秒 · 约%d金币）" % (j[0], j[1], j[4]),
                             command=lambda job=j: self.start_work(job))
        m.add_cascade(label="💼  打工", menu=work)
        m.add_command(label="📖  学习", command=self.study)

        bag = tk.Menu(m, tearoff=0)
        if p.inventory:
            for item_id, cnt in sorted(p.inventory.items()):
                if item_id in SHOP_BY_ID and cnt > 0:
                    bag.add_command(label="%s ×%d" % (SHOP_BY_ID[item_id][1], cnt),
                                    command=lambda i=item_id: self.use_item(i))
        else:
            bag.add_command(label="（空空如也）", state="disabled")
        m.add_cascade(label="🎒  背包", menu=bag)

        m.add_separator()
        m.add_command(label="🛒  商店", command=self.open_shop)
        m.add_command(label="📊  状态面板", command=self.open_panel)
        m.add_command(label="✍️  每日签到", command=self.sign_in)

        settings = tk.Menu(m, tearoff=0)
        size = tk.Menu(settings, tearoff=0)
        for label, s in (("小 (80%)", 0.8), ("标准 (100%)", 1.0),
                         ("大 (125%)", 1.25), ("超大 (150%)", 1.5)):
            size.add_command(label=("✓ " if abs(self.scale - s) < 1e-6 else "   ") + label,
                             command=lambda v=s: self.set_scale(v))
        settings.add_cascade(label="窗口大小", menu=size)
        settings.add_command(label=("✓ " if p.topmost else "   ") + "窗口置顶",
                             command=self.toggle_topmost)
        settings.add_command(label=("✓ " if is_autostart() else "   ") + "开机自启动",
                             command=self.toggle_autostart)
        settings.add_command(label="关于 %s" % APP_NAME, command=self.about)
        m.add_cascade(label="⚙️  设置", menu=settings)

        m.add_separator()
        m.add_command(label="❌  退出", command=self.quit_app)
        try:
            m.tk_popup(e.x_root, e.y_root)
        finally:
            m.grab_release()
        self._menu = m

    # ------------------------------------------------------------------
    # 动作
    # ------------------------------------------------------------------
    def busy(self):
        """正在做不可打断的事。"""
        return self.mode in ("work", "study", "bath", "eat")

    def set_mode(self, mode, frames=0, prop=""):
        self.mode = mode
        self.mode_frames = frames
        self.prop = prop

    def say(self, text, frames=42):
        self.bubble_text = text
        self.bubble_frames = frames

    def spark(self, n=5):
        for _ in range(n):
            self.sparkles.append([random.uniform(70, 190), random.uniform(70, 150),
                                  random.uniform(-1.2, 1.2), random.uniform(-2.4, -1.0), 22])

    def _greet(self):
        if self.pet.offline_report:
            self.say(self.pet.offline_report + " 欢迎回来!")
        else:
            self.say("你好呀! 我是%s, 以后住在你桌面啦~" % self.pet.name, frames=60)

    # ---- 喂食 ----
    def feed_free(self):
        self._do_feed(FREE_FOOD[0], FREE_FOOD[1], FREE_FOOD[2], "bowl")

    def _do_feed(self, name, effect, line, kind="bowl"):
        """真的吃下去了返回 True；被拒绝返回 False（调用方需把道具还回背包）。"""
        if self.busy():
            self.say("等我忙完这一会儿~")
            return False
        if self.pet.hunger >= 98:
            self.say("吃不下啦, 肚子圆圆的")
            return False
        self.pet.gain(**{k: v for k, v in effect.items() if k != "iq"})
        if "iq" in effect:
            self.pet.iq += effect["iq"]
        self.pet.exp += 3
        self.pet.feed_count += 1
        self.set_mode("eat", frames=34, prop=kind)
        self.say(line)
        self.after_action()
        return True

    def use_item(self, item_id):
        _id, name, _price, effect, line = SHOP_BY_ID[item_id]
        if item_id in FOOD_IDS:
            if not self.pet.take_item(item_id):
                return
            if not self._do_feed(name, effect, line, item_id):
                self.pet.add_item(item_id)      # 没吃成，还回背包
            return
        if self.busy():
            self.say("等我忙完这一会儿~")
            return
        if not self.pet.take_item(item_id):
            return
        eff = dict(effect)
        iq = eff.pop("iq", 0)
        self.pet.gain(**eff)
        self.pet.iq += iq
        self.pet.exp += 4
        if item_id == "soap":
            self.set_mode("bath", frames=52)
        elif item_id == "medicine":
            self.set_mode("happy", frames=26)
        elif item_id == "book":
            self.set_mode("study", frames=40)
        else:
            self.set_mode("happy", frames=30)
            self.spark(6)
        self.say(line)
        self.after_action()

    # ---- 基础互动 ----
    def play(self):
        if self.busy():
            self.say("等我忙完这一会儿~")
            return
        if self.pet.energy < 12:
            self.say("没力气了... 让我先睡会儿")
            return
        self.pet.gain(mood=15, energy=-12, hunger=-8, clean=-5, exp=4)
        self.set_mode("happy", frames=46)
        self.spark(10)
        self.say(random.choice(["接住球球!", "耶! 一起玩!", "跳起来跳起来~"]))
        self.after_action()

    def bath(self):
        if self.busy():
            self.say("等我忙完这一会儿~")
            return
        self.pet.gain(clean=40, mood=-3, exp=4)
        self.set_mode("bath", frames=56)
        self.say("泡泡浴时间~")
        self.after_action()

    def toggle_sleep(self):
        if self.mode == "sleep":
            self.set_mode("idle")
            self.say("睡饱啦! 精神百倍")
        else:
            self.set_mode("sleep")
            self.say("那我先睡一会儿... Zzz")
        self.after_action()

    def study(self):
        if self.busy():
            self.say("等我忙完这一会儿~")
            return
        if self.pet.energy < 15:
            self.say("太困了, 学不进去...")
            return
        gain = random.randint(2, 5)
        self.pet.iq += gain
        self.pet.gain(energy=-15, mood=-6, hunger=-6, exp=8)
        self.set_mode("study", frames=60)
        self.say("学习中... 智力 +%d" % gain)
        self.after_action()

    # ---- 打工 ----
    def start_work(self, job):
        if self.busy():
            self.say("我已经在忙了呀")
            return
        name, secs, en, hu, coin, exp = job
        if self.pet.energy < en:
            self.say("体力不够, 先让我睡一觉吧")
            return
        if self.pet.hunger < hu:
            self.say("太饿了, 先喂我点东西")
            return
        if self.pet.sick:
            self.say("我生病了, 先吃药好不好...")
            return
        frames = int(secs * 1000 / FPS_MS)
        earn = int(coin * (1 + self.pet.iq / 120.0) * (1 + (self.pet.level - 1) * 0.08))
        self.job = [name, frames, earn, exp, en, hu]
        self.set_mode("work", frames=frames)
        self.say("%s 开工! 大约 %d 秒" % (name, secs))

    def _finish_work(self):
        if not self.job:
            return
        name, _f, earn, exp, en, hu = self.job
        self.job = None
        self.pet.coins += earn
        self.pet.exp += exp
        self.pet.work_count += 1
        self.pet.gain(energy=-en, hunger=-hu, mood=-4, clean=-6)
        self.set_mode("happy", frames=34)
        self.spark(8)
        self.say("%s 完成! 赚到 %d 金币 💰" % (name, earn))
        self.after_action()

    # ---- 签到 / 商店 / 面板 ----
    def sign_in(self):
        today = date.today().isoformat()
        if self.pet.last_sign == today:
            self.say("今天已经签过啦, 明天再来~")
            return
        yesterday = (date.fromordinal(date.today().toordinal() - 1)).isoformat()
        self.pet.sign_streak = self.pet.sign_streak + 1 if self.pet.last_sign == yesterday else 1
        self.pet.last_sign = today
        bonus = 20 + min(self.pet.sign_streak, 7) * 5
        self.pet.coins += bonus
        self.pet.gain(mood=8, exp=5)
        self.set_mode("happy", frames=30)
        self.spark(8)
        self.say("签到成功! 连续 %d 天, +%d 金币" % (self.pet.sign_streak, bonus))
        self.after_action()

    def open_shop(self):
        if self.shop and self.shop.winfo_exists():
            self.shop.lift()
            return
        self.shop = ShopWindow(self)

    def open_panel(self):
        if self.panel and self.panel.winfo_exists():
            self.panel.lift()
            return
        self.panel = StatusPanel(self)

    def about(self):
        self.say("%s v%s · 陪伴你 %d 天啦" % (APP_NAME, VERSION, self.pet.age_days), frames=60)

    # ---- 设置 ----
    def set_scale(self, s):
        self.scale = s
        self.pet.ui_scale = s
        self.cv.config(width=self.win_w(), height=self.win_h())
        self.pet.save()

    def toggle_topmost(self):
        self.pet.topmost = not self.pet.topmost
        self.attributes("-topmost", bool(self.pet.topmost))
        self.say("窗口置顶: " + ("开" if self.pet.topmost else "关"))
        self.pet.save()

    def toggle_autostart(self):
        try:
            on = set_autostart(not is_autostart())
            self.say("开机自启动已" + ("开启" if on else "关闭"))
        except Exception as exc:
            self.say("设置失败: %s" % exc)

    def quit_app(self):
        self.pet.save()
        self.destroy()

    def after_action(self):
        for key in self.pet.check_achievements():
            name = next((a[1] for a in ACHIEVEMENTS if a[0] == key), key)
            self.after(1500, lambda n=name: self.say("解锁成就 %s !" % n, frames=50))
        self.pet.save()
        if self.panel and self.panel.winfo_exists():
            self.panel.refresh()
        if self.shop and self.shop.winfo_exists():
            self.shop.refresh()

    # ------------------------------------------------------------------
    # 主循环
    # ------------------------------------------------------------------
    def _loop(self):
        self.t += 1
        self.phase += 0.008
        self._update_ai()
        self._draw()
        self.after(FPS_MS, self._loop)

    def _decay_loop(self):
        self.pet.decay(sleeping=(self.mode == "sleep"), working=(self.mode == "work"))
        # 状态过低时主动抱怨
        for key, limit in (("health", 40), ("hunger", 25), ("clean", 25),
                           ("energy", 20), ("mood", 25)):
            if getattr(self.pet, key) < limit and self.mode not in ("work", "study", "bath"):
                if random.random() < 0.7:
                    self.say(random.choice(COMPLAIN[key]))
                break
        if self.pet.energy <= 3 and self.mode not in ("sleep", "work"):
            self.set_mode("sleep")
            self.say("撑不住了... 我先睡了 Zzz")
        self.pet.save()
        if self.panel and self.panel.winfo_exists():
            self.panel.refresh()
        self.after(DECAY_MS, self._decay_loop)

    def _save_loop(self):
        self.pet.save()
        self.after(SAVE_MS, self._save_loop)

    def _update_ai(self):
        # 动作倒计时
        if self.mode_frames > 0:
            self.mode_frames -= 1
            if self.mode == "work" and self.job:
                self.job[1] = self.mode_frames
            if self.mode_frames == 0:
                if self.mode == "work":
                    self._finish_work()
                else:
                    self.set_mode("idle")

        # 气泡倒计时
        if self.bubble_frames > 0:
            self.bubble_frames -= 1
            if self.bubble_frames == 0:
                self.bubble_text = ""

        # 眨眼
        if self.t > self.blink_until + 40 and random.random() < 0.02:
            self.blink_until = self.t + 4

        # 闲逛
        if self.mode == "idle" and not self._drag:
            if self.walk_target is None and random.random() < 0.006:
                sw = self.winfo_screenwidth()
                self.walk_target = random.randint(0, max(0, sw - self.win_w()))
                self.set_mode("walk")
            elif random.random() < 0.004 and not self.bubble_text:
                self.say(random.choice(IDLE_TALK))

        if self.mode == "walk":
            if self.walk_target is None:
                self.set_mode("idle")
            else:
                x = self.winfo_x()
                step = 3 if self.walk_target > x else -3
                self.facing = 1 if step > 0 else -1
                if abs(self.walk_target - x) <= 4:
                    self.walk_target = None
                    self.set_mode("idle")
                else:
                    self.geometry("+%d+%d" % (x + step, self.winfo_y()))

        # 星星粒子
        for s in self.sparkles:
            s[0] += s[2]
            s[1] += s[3]
            s[3] += 0.12
            s[4] -= 1
        self.sparkles = [s for s in self.sparkles if s[4] > 0]

    # ------------------------------------------------------------------
    # 绘制（全部为 Canvas 矢量图形，没有任何图片素材）
    # ------------------------------------------------------------------
    def _oval(self, x0, y0, x1, y1, **kw):
        return self.cv.create_oval(self.S(x0), self.S(y0), self.S(x1), self.S(y1), **kw)

    def _poly(self, pts, **kw):
        flat = []
        for x, y in pts:
            flat += [self.S(x), self.S(y)]
        return self.cv.create_polygon(*flat, **kw)

    def _line(self, pts, **kw):
        flat = []
        for x, y in pts:
            flat += [self.S(x), self.S(y)]
        return self.cv.create_line(*flat, **kw)

    def _arc(self, x0, y0, x1, y1, **kw):
        return self.cv.create_arc(self.S(x0), self.S(y0), self.S(x1), self.S(y1), **kw)

    def _rect(self, x0, y0, x1, y1, **kw):
        return self.cv.create_rectangle(self.S(x0), self.S(y0), self.S(x1), self.S(y1), **kw)

    def _text(self, x, y, text, size=11, color=INK, bold=False, anchor="center"):
        f = (self.font_name, max(7, int(size * self.scale)), "bold" if bold else "normal")
        return self.cv.create_text(self.S(x), self.S(y), text=text, font=f,
                                   fill=color, anchor=anchor)

    def _lw(self, k=1.0):
        return max(1, int(round(LW * k * self.scale)))

    def _draw(self):
        self.cv.delete("all")
        p = self.pet
        _stage_name, body_scale = p.stage

        # 呼吸 / 动作位移
        t = self.t
        breathe = math.sin(t * 0.12) * 2.0
        dy = 0.0
        tilt = 0.0
        if self.mode == "happy":
            dy = -abs(math.sin(t * 0.35)) * 16
        elif self.mode == "walk":
            dy = -abs(math.sin(t * 0.3)) * 4
            tilt = math.sin(t * 0.3) * 4
        elif self.mode == "sleep":
            dy = 8
            breathe = math.sin(t * 0.05) * 3
        elif self.mode == "bath":
            dy = 10
        elif self.mode in ("work", "study"):
            dy = 2

        cx, cy = 130.0, 150.0 + dy
        rx, ry = 58.0 * body_scale, (55.0 + breathe * 0.5) * body_scale

        body = SICK_BODY if p.sick else CORAL
        dark = SICK_DARK if p.sick else CORAL_DARK

        if self.mode == "bath":
            self._draw_tub_back(cx, cy, rx, ry)

        self._draw_shadow(cx, ry, body_scale)
        self._draw_sunburst(cx, cy, rx, ry, body, dark)
        self._draw_body(cx, cy, rx, ry, body, dark, tilt)
        self._draw_face(cx, cy, rx, ry, dark)
        self._draw_props(cx, cy, rx, ry)

        if self.mode == "bath":
            self._draw_tub_front(cx, cy, rx, ry)

        self._draw_alerts()
        self._draw_sparkles()
        self._draw_bubble()
        if self.mode == "work" and self.job:
            self._draw_progress()

    # ---- 各部件 ----
    def _draw_shadow(self, cx, ry, body_scale):
        w = 46 * body_scale
        self._oval(cx - w, 214, cx + w, 230, fill="#8E8A80", outline="", stipple="gray25")

    def _draw_sunburst(self, cx, cy, rx, ry, body, dark):
        """Claude 标志性的星芒光环：8 根长星芒，画在身体后面缓慢旋转。"""
        n = 8
        r_in = max(rx, ry) * 0.70
        r_out = max(rx, ry) * 1.52
        if self.mode == "happy":
            r_out *= 1.08 + 0.06 * math.sin(self.t * 0.4)
        elif self.mode == "sleep":
            r_out *= 0.82
        w = 0.115
        for i in range(n):
            a = self.phase + i * 2 * math.pi / n
            tip = (cx + math.cos(a) * r_out, cy + math.sin(a) * r_out)
            mid1 = (cx + math.cos(a - w * 0.45) * (r_out * 0.55 + r_in * 0.45),
                    cy + math.sin(a - w * 0.45) * (r_out * 0.55 + r_in * 0.45))
            mid2 = (cx + math.cos(a + w * 0.45) * (r_out * 0.55 + r_in * 0.45),
                    cy + math.sin(a + w * 0.45) * (r_out * 0.55 + r_in * 0.45))
            b1 = (cx + math.cos(a - w) * r_in, cy + math.sin(a - w) * r_in)
            b2 = (cx + math.cos(a + w) * r_in, cy + math.sin(a + w) * r_in)
            self._poly([b1, mid1, tip, mid2, b2], fill=body, outline=dark,
                       width=self._lw(0.7), joinstyle="round")

    def _draw_body(self, cx, cy, rx, ry, body, dark, tilt):
        # 手臂（画在身体后一层，露出两侧）
        swing = 0.0
        if self.mode == "walk":
            swing = math.sin(self.t * 0.3) * 8
        elif self.mode == "happy":
            swing = -14
        arm_y = cy + ry * 0.42
        for side in (-1, 1):
            ax = cx + side * rx * 0.88
            ay = arm_y + (swing * side if self.mode == "walk" else swing)
            if self.mode in ("work", "study"):
                ay = cy + ry * 0.52
                ax = cx + side * rx * 0.58
            self._oval(ax - 11, ay - 10, ax + 11, ay + 12, fill=body,
                       outline=dark, width=self._lw(0.7))

        # 脚
        foot_lift = 0.0
        if self.mode == "walk":
            foot_lift = math.sin(self.t * 0.3) * 5
        for side, lift in ((-1, foot_lift), (1, -foot_lift)):
            fx = cx + side * rx * 0.36
            fy = cy + ry * 1.02 - lift
            self._oval(fx - 15, fy - 8, fx + 15, fy + 9, fill=CREAM,
                       outline=dark, width=self._lw(0.7))

        # 身体（布偶主体）
        self._oval(cx - rx, cy - ry, cx + rx, cy + ry, fill=body,
                   outline=dark, width=self._lw())
        # 高光
        self._arc(cx - rx * 0.8, cy - ry * 0.85, cx + rx * 0.2, cy + ry * 0.1,
                  start=100, extent=70, style="arc", outline="#FFFFFF",
                  width=self._lw(0.9))
        # 肚皮
        self._oval(cx - rx * 0.52, cy + ry * 0.10, cx + rx * 0.52, cy + ry * 0.86,
                   fill=CREAM, outline="", width=0)
        # 玩偶缝线
        seam_y0 = cy + ry * 0.12
        for i in range(4):
            y = seam_y0 + i * (ry * 0.18)
            self._line([(cx - 4, y), (cx + 4, y)], fill=CREAM_LINE, width=self._lw(0.5))
        # 侧边小吊牌（玩偶感）
        tag_x, tag_y = cx + rx * 0.72, cy + ry * 0.62
        self._poly([(tag_x, tag_y), (tag_x + 14, tag_y + 4), (tag_x + 12, tag_y + 14),
                    (tag_x - 2, tag_y + 10)], fill=CREAM, outline=dark,
                   width=self._lw(0.5))

    def _draw_face(self, cx, cy, rx, ry, dark):
        p = self.pet
        eye_y = cy - ry * 0.18
        eye_dx = rx * 0.34
        closed = (self.mode == "sleep") or (self.t <= self.blink_until) or self.mode == "bath"

        for side in (-1, 1):
            ex = cx + side * eye_dx + self.facing * 1.5
            if closed:
                self._arc(ex - 9, eye_y - 8, ex + 9, eye_y + 8,
                          start=20, extent=140, style="arc",
                          outline=INK, width=self._lw(0.9))
            else:
                self._oval(ex - 7, eye_y - 9, ex + 7, eye_y + 9, fill=INK, outline="")
                self._oval(ex - 4, eye_y - 7, ex - 0.5, eye_y - 3, fill="#FFFFFF", outline="")

        # 腮红
        for side in (-1, 1):
            bx = cx + side * rx * 0.66
            self._oval(bx - 10, eye_y + 8, bx + 10, eye_y + 19, fill=BLUSH,
                       outline="", stipple="gray50")

        # 嘴巴
        my = cy + ry * 0.06
        if p.sick:
            self._line([(cx - 11, my), (cx - 5, my - 4), (cx + 1, my),
                        (cx + 7, my - 4), (cx + 12, my)], fill=INK,
                       width=self._lw(0.8), smooth=True)
        elif self.mode == "eat":
            open_amt = 4 + abs(math.sin(self.t * 0.5)) * 6
            self._oval(cx - 8, my - 2, cx + 8, my + open_amt, fill="#8C3A2A", outline="")
        elif self.mode == "sleep":
            self._oval(cx - 5, my - 1, cx + 5, my + 6, fill="#8C3A2A", outline="")
        elif p.mood < 30:
            self._arc(cx - 11, my, cx + 11, my + 14, start=20, extent=140,
                      style="arc", outline=INK, width=self._lw(0.8))
        else:
            self._arc(cx - 12, my - 8, cx + 12, my + 8, start=200, extent=140,
                      style="arc", outline=INK, width=self._lw(0.8))

        # 睡觉的 Zzz
        if self.mode == "sleep":
            for i in range(3):
                k = (self.t * 0.04 + i * 0.33) % 1.0
                self._text(cx + rx * 0.75 + k * 22, cy - ry * 0.6 - k * 34,
                           "z", size=int(9 + i * 3), color="#8E8A80", bold=True)

    # ---- 矢量小图标（不依赖 emoji 字体，任何系统渲染都一致）----
    def _icon_food(self, x, y, kind, s=1.0):
        """手里的食物。kind 对应商店道具 id。"""
        if kind == "bread":
            self._poly([(x - 12 * s, y + 6 * s), (x - 10 * s, y - 7 * s),
                        (x, y - 10 * s), (x + 10 * s, y - 7 * s),
                        (x + 12 * s, y + 6 * s)], fill="#E0A75C",
                       outline="#9C6B2F", width=self._lw(0.5), smooth=True)
        elif kind == "cake":
            self._rect(x - 11 * s, y - 3 * s, x + 11 * s, y + 8 * s,
                       fill="#F6E3C8", outline="#B98E5E", width=self._lw(0.5))
            self._rect(x - 11 * s, y - 8 * s, x + 11 * s, y - 3 * s,
                       fill="#F0A6B4", outline="#B98E5E", width=self._lw(0.5))
            self._oval(x - 3 * s, y - 15 * s, x + 3 * s, y - 9 * s,
                       fill="#D64A5A", outline="")
        elif kind == "coffee":
            self._poly([(x - 9 * s, y - 8 * s), (x + 9 * s, y - 8 * s),
                        (x + 6 * s, y + 9 * s), (x - 6 * s, y + 9 * s)],
                       fill="#FFFFFF", outline="#8C7A6A", width=self._lw(0.5))
            self._rect(x - 8 * s, y - 8 * s, x + 8 * s, y - 4 * s,
                       fill="#6B4A33", outline="")
            self._arc(x + 6 * s, y - 6 * s, x + 16 * s, y + 4 * s, start=270,
                      extent=180, style="arc", outline="#8C7A6A", width=self._lw(0.5))
        elif kind == "token":
            self._rect(x - 11 * s, y - 7 * s, x + 9 * s, y + 7 * s,
                       fill="#5FAE6E", outline=INK, width=self._lw(0.5))
            self._rect(x + 9 * s, y - 3 * s, x + 12 * s, y + 3 * s,
                       fill=INK, outline="")
            self._poly([(x - 2 * s, y - 5 * s), (x - 6 * s, y + 1 * s),
                        (x - 2 * s, y + 1 * s), (x - 4 * s, y + 6 * s),
                        (x + 4 * s, y - 1 * s), (x, y - 1 * s),
                        (x + 2 * s, y - 5 * s)], fill="#FFFFFF", outline="")
        else:  # ramen / 基础饲料：一碗
            self._arc(x - 13 * s, y - 9 * s, x + 13 * s, y + 11 * s, start=180,
                      extent=180, style="chord", fill="#FFFFFF",
                      outline="#8C7A6A", width=self._lw(0.5))
            self._line([(x - 14 * s, y), (x + 14 * s, y)], fill="#8C7A6A",
                       width=self._lw(0.5))
            for i, dx in enumerate((-6, 0, 6)):
                self._line([(x + dx * s, y - 2 * s), (x + dx * s, y - 9 * s - i * s)],
                           fill="#E6C98A", width=self._lw(0.5))

    def _icon_bulb(self, x, y, s=1.0):
        self._oval(x - 7 * s, y - 9 * s, x + 7 * s, y + 5 * s, fill="#FFE9A8",
                   outline="#C9A227", width=self._lw(0.5))
        self._rect(x - 3 * s, y + 4 * s, x + 3 * s, y + 8 * s, fill="#B9B3A6",
                   outline="#7F7A70", width=self._lw(0.4))
        for a in (-1.0, -0.5, 0.0, 0.5, 1.0):
            self._line([(x + math.cos(a - math.pi / 2) * 11 * s,
                         y + math.sin(a - math.pi / 2) * 11 * s),
                        (x + math.cos(a - math.pi / 2) * 15 * s,
                         y + math.sin(a - math.pi / 2) * 15 * s)],
                       fill="#C9A227", width=self._lw(0.4))

    def _icon_star(self, x, y, r, color="#F2C14E"):
        pts = []
        for i in range(8):
            a = i * math.pi / 4 - math.pi / 2
            rr = r if i % 2 == 0 else r * 0.34
            pts.append((x + math.cos(a) * rr, y + math.sin(a) * rr))
        self._poly(pts, fill=color, outline="")

    def _icon_alert(self, x, y, kind):
        """头顶的低状态提示图标。"""
        if kind == "food":
            self._icon_food(x, y, "bowl", 0.62)
        elif kind == "bath":
            self._oval(x - 8, y - 6, x + 8, y + 8, fill=TUB, outline=TUB_DARK,
                       width=self._lw(0.4))
            self._oval(x - 4, y - 12, x + 2, y - 6, outline="#FFFFFF",
                       width=self._lw(0.4))
        elif kind == "mood":
            self._poly([(x, y + 8), (x - 9, y - 1), (x - 5, y - 7), (x, y - 3),
                        (x + 5, y - 7), (x + 9, y - 1)], fill="#E2606B",
                       outline="", smooth=True)
            self._line([(x - 1, y - 5), (x + 2, y), (x - 2, y + 3)],
                       fill="#FFFFFF", width=self._lw(0.5))
        elif kind == "sleep":
            for i in range(2):
                self._text(x - 3 + i * 7, y - 2 + i * 5, "z",
                           size=8 + i * 3, color="#8E8A80", bold=True)
        elif kind == "sick":
            self._oval(x - 9, y - 9, x + 9, y + 9, fill="#FFFFFF",
                       outline="#D64A5A", width=self._lw(0.5))
            self._line([(x - 5, y), (x + 5, y)], fill="#D64A5A", width=self._lw(0.7))
            self._line([(x, y - 5), (x, y + 5)], fill="#D64A5A", width=self._lw(0.7))

    def _draw_props(self, cx, cy, rx, ry):
        """动作道具：食物、笔电、书本、体温计等。"""
        if self.mode == "eat":
            self._icon_food(cx + rx * 0.95, cy + ry * 0.35, self.prop or "bowl")
        elif self.mode == "work":
            # 笔记本电脑
            lx, ly = cx, cy + ry * 0.72
            self._poly([(lx - 30, ly + 12), (lx + 30, ly + 12),
                        (lx + 36, ly + 18), (lx - 36, ly + 18)],
                       fill="#4A4640", outline=INK, width=self._lw(0.5))
            self._rect(lx - 26, ly - 16, lx + 26, ly + 12, fill="#3A3733",
                       outline=INK, width=self._lw(0.5))
            self._rect(lx - 22, ly - 12, lx + 22, ly + 8, fill="#1F6F5C", outline="")
            for i in range(3):
                w = 8 + ((self.t // 3 + i * 5) % 12)
                self._line([(lx - 18, ly - 7 + i * 6), (lx - 18 + w, ly - 7 + i * 6)],
                           fill="#9FE7C8", width=self._lw(0.5))
            if (self.t // 6) % 4 == 0:
                self._text(cx + rx * 1.0, cy - ry * 0.55, "</>", size=12,
                           color=CORAL_DARK, bold=True)
        elif self.mode == "study":
            bx, by = cx, cy + ry * 0.62
            self._poly([(bx - 30, by), (bx, by - 8), (bx + 30, by),
                        (bx + 30, by + 16), (bx, by + 8), (bx - 30, by + 16)],
                       fill=CREAM, outline=INK, width=self._lw(0.6))
            self._line([(bx, by - 8), (bx, by + 8)], fill=INK, width=self._lw(0.5))
            if (self.t // 8) % 3 == 0:
                self._icon_bulb(cx + rx * 0.95, cy - ry * 0.7)
        elif self.pet.sick:
            # 体温计 + 汗滴
            tx, ty = cx + rx * 0.55, cy - ry * 0.25
            self._line([(tx, ty), (tx + 16, ty - 12)], fill="#FFFFFF",
                       width=self._lw(1.1))
            self._line([(tx, ty), (tx + 6, ty - 4)], fill="#D64A5A",
                       width=self._lw(0.8))
            self._poly([(cx - rx * 0.62, cy - ry * 0.5),
                        (cx - rx * 0.62 - 5, cy - ry * 0.5 + 9),
                        (cx - rx * 0.62 + 5, cy - ry * 0.5 + 9)],
                       fill="#8FC7E8", outline="", smooth=True)

    def _draw_tub_back(self, cx, cy, rx, ry):
        self._oval(cx - 82, cy + ry * 0.05, cx + 82, cy + ry * 1.15,
                   fill=TUB, outline=TUB_DARK, width=self._lw(0.8))

    def _draw_tub_front(self, cx, cy, rx, ry):
        # 前挡板 + 泡泡
        self._arc(cx - 82, cy + ry * 0.05, cx + 82, cy + ry * 1.15,
                  start=180, extent=180, style="chord", fill=TUB,
                  outline=TUB_DARK, width=self._lw(0.8))
        random.seed(self.t // 4)
        for _ in range(14):
            bx = cx + random.uniform(-70, 70)
            by = cy + ry * 0.1 - random.uniform(0, 60) - (self.t % 20)
            r = random.uniform(4, 11)
            self._oval(bx - r, by - r, bx + r, by + r, outline="#FFFFFF",
                       width=self._lw(0.5))
        random.seed()
        # 头顶泡沫
        for i, (ox, oy, r) in enumerate(((-18, -ry * 0.95, 14), (2, -ry * 1.12, 17),
                                         (22, -ry * 0.95, 13))):
            self._oval(cx + ox - r, cy + oy - r, cx + ox + r, cy + oy + r,
                       fill="#FFFFFF", outline="#DCE9F0", width=self._lw(0.4))

    def _draw_alerts(self):
        """头顶低状态提示图标。"""
        p = self.pet
        icons = []
        if p.sick:
            icons.append("sick")
        if p.hunger < 25:
            icons.append("food")
        if p.clean < 25:
            icons.append("bath")
        if p.mood < 25:
            icons.append("mood")
        if p.energy < 20:
            icons.append("sleep")
        if not icons or (self.t // 8) % 2 == 0:
            return
        icons = icons[:3]
        x0 = 130 - (len(icons) - 1) * 13
        for i, kind in enumerate(icons):
            self._icon_alert(x0 + i * 26, 62, kind)

    def _draw_sparkles(self):
        for x, y, _vx, _vy, life in self.sparkles:
            self._icon_star(x, y, 3.5 + life * 0.16)

    def _draw_bubble(self):
        if not self.bubble_text:
            return
        lines = wrap_cjk(self.bubble_text, 22)
        w = max(text_width(l) for l in lines) * 6.6 + 22
        h = len(lines) * 17 + 14
        x0, y0 = 130 - w / 2, 46 - h
        x0 = max(6, min(x0, DESIGN_W - w - 6))
        y0 = max(4, y0)
        self._round_rect(x0, y0, x0 + w, y0 + h, 10, fill="#FFFFFF",
                         outline=CORAL_DARK, width=self._lw(0.6))
        self._poly([(130 - 7, y0 + h - 1), (130 + 7, y0 + h - 1), (130, y0 + h + 10)],
                   fill="#FFFFFF", outline=CORAL_DARK, width=self._lw(0.6))
        self._text(x0 + w / 2, y0 + h / 2, "\n".join(lines), size=10, color=INK)

    def _draw_progress(self):
        name, frames, _earn, _exp, _en, _hu = self.job
        total = max(1, int(JOBS_BY_NAME.get(name, (None, 20))[1] * 1000 / FPS_MS))
        ratio = max(0.0, min(1.0, 1 - frames / float(total)))
        x0, y0, x1 = 60, 236, 200
        self._round_rect(x0, y0, x1, y0 + 10, 5, fill="#E6E1D6", outline="")
        self._round_rect(x0, y0, x0 + (x1 - x0) * ratio, y0 + 10, 5,
                         fill=CORAL, outline="")
        self._text(130, y0 + 5, "%s %d%%" % (name, int(ratio * 100)), size=8, color=INK)

    def _round_rect(self, x0, y0, x1, y1, r, **kw):
        pts = [(x0 + r, y0), (x1 - r, y0), (x1, y0), (x1, y0 + r),
               (x1, y1 - r), (x1, y1), (x1 - r, y1), (x0 + r, y1),
               (x0, y1), (x0, y1 - r), (x0, y0 + r), (x0, y0)]
        return self._poly(pts, smooth=True, **kw)


JOBS_BY_NAME = {j[0]: j for j in JOBS}


# ---------------------------------------------------------------------------
# 状态面板（QQ 宠物式属性条）
# ---------------------------------------------------------------------------
class StatusPanel(tk.Toplevel):
    BAR_W = 210
    BAR_H = 14

    def __init__(self, app):
        super().__init__(app)
        self.app = app
        self.pet = app.pet
        self.title("%s · 状态" % APP_NAME)
        self.configure(bg=CREAM)
        self.resizable(False, False)
        self.attributes("-topmost", True)
        self.protocol("WM_DELETE_WINDOW", self.destroy)

        f = app.font_name
        self.h_font = (f, 13, "bold")
        self.n_font = (f, 10)
        self.s_font = (f, 9)

        head = tk.Frame(self, bg=CREAM)
        head.pack(fill="x", padx=16, pady=(14, 6))
        self.avatar = tk.Canvas(head, width=54, height=54, bg=CREAM,
                                highlightthickness=0)
        self.avatar.pack(side="left")
        self._draw_avatar()
        info = tk.Frame(head, bg=CREAM)
        info.pack(side="left", padx=10)
        self.title_lb = tk.Label(info, text="", font=self.h_font, bg=CREAM, fg=INK)
        self.title_lb.pack(anchor="w")
        self.sub_lb = tk.Label(info, text="", font=self.s_font, bg=CREAM, fg="#7A736A")
        self.sub_lb.pack(anchor="w")

        self.bars = {}
        box = tk.Frame(self, bg=CREAM)
        box.pack(fill="x", padx=16)
        for key, label, color in (("hunger", "饱食", "#E0913F"),
                                  ("mood", "心情", "#E2606B"),
                                  ("clean", "清洁", "#4FA3C7"),
                                  ("energy", "体力", "#5FAE6E"),
                                  ("health", "健康", "#9B6BD6")):
            row = tk.Frame(box, bg=CREAM)
            row.pack(fill="x", pady=3)
            tk.Label(row, text=label, font=self.n_font, bg=CREAM, fg=INK,
                     width=4, anchor="w").pack(side="left")
            cv = tk.Canvas(row, width=self.BAR_W, height=self.BAR_H, bg=CREAM,
                           highlightthickness=0)
            cv.pack(side="left")
            val = tk.Label(row, text="", font=self.s_font, bg=CREAM, fg="#7A736A",
                           width=5, anchor="e")
            val.pack(side="left")
            self.bars[key] = (cv, val, color)

        exp_row = tk.Frame(self, bg=CREAM)
        exp_row.pack(fill="x", padx=16, pady=(8, 2))
        tk.Label(exp_row, text="成长", font=self.n_font, bg=CREAM, fg=INK,
                 width=4, anchor="w").pack(side="left")
        self.exp_cv = tk.Canvas(exp_row, width=self.BAR_W, height=self.BAR_H,
                                bg=CREAM, highlightthickness=0)
        self.exp_cv.pack(side="left")
        self.exp_lb = tk.Label(exp_row, text="", font=self.s_font, bg=CREAM,
                               fg="#7A736A", width=5, anchor="e")
        self.exp_lb.pack(side="left")

        self.stat_lb = tk.Label(self, text="", font=self.s_font, bg=CREAM,
                                fg="#7A736A", justify="left")
        self.stat_lb.pack(anchor="w", padx=16, pady=(6, 0))

        # 操作按钮
        grid = tk.Frame(self, bg=CREAM)
        grid.pack(padx=12, pady=10)
        actions = [
            ("🍽 喂食", app.feed_free), ("🎾 玩耍", app.play), ("🛁 洗澡", app.bath),
            ("💤 睡觉", app.toggle_sleep), ("📖 学习", app.study), ("💼 打工", self.pick_job),
            ("🛒 商店", app.open_shop), ("✍️ 签到", app.sign_in), ("🏅 成就", self.show_ach),
        ]
        for i, (label, cmd) in enumerate(actions):
            b = tk.Button(grid, text=label, font=self.n_font, width=8, relief="flat",
                          bg="#FFFFFF", fg=INK, activebackground=CORAL,
                          activeforeground="#FFFFFF", bd=0, highlightthickness=0,
                          command=lambda c=cmd: (c(), self.refresh()))
            b.grid(row=i // 3, column=i % 3, padx=4, pady=4, ipady=3, sticky="ew")

        self.refresh()
        self._place_beside()

    def _place_beside(self):
        self.update_idletasks()
        x = self.app.winfo_x() - self.winfo_width() - 12
        if x < 0:
            x = self.app.winfo_x() + self.app.winfo_width() + 12
        self.geometry("+%d+%d" % (max(0, x), max(0, self.app.winfo_y())))

    def _draw_avatar(self):
        cv, cx, cy, r = self.avatar, 27, 27, 15
        for i in range(10):
            a = i * 2 * math.pi / 10
            cv.create_polygon(cx + math.cos(a) * r * 1.5, cy + math.sin(a) * r * 1.5,
                              cx + math.cos(a - 0.09) * r, cy + math.sin(a - 0.09) * r,
                              cx + math.cos(a + 0.09) * r, cy + math.sin(a + 0.09) * r,
                              fill=CORAL, outline=CORAL_DARK)
        cv.create_oval(cx - r, cy - r, cx + r, cy + r, fill=CORAL, outline=CORAL_DARK,
                       width=2)
        cv.create_oval(cx - 8, cy - 4, cx - 3, cy + 3, fill=INK, outline="")
        cv.create_oval(cx + 3, cy - 4, cx + 8, cy + 3, fill=INK, outline="")

    def _bar(self, cv, ratio, color):
        cv.delete("all")
        w, h = self.BAR_W, self.BAR_H
        cv.create_rectangle(0, 2, w, h - 1, fill="#E6E1D6", outline="")
        cv.create_rectangle(0, 2, max(2, w * ratio), h - 1, fill=color, outline="")
        for i in range(1, 4):
            cv.create_line(w * i / 4, 2, w * i / 4, h - 1, fill=CREAM)

    def refresh(self):
        if not self.winfo_exists():
            return
        p = self.pet
        stage, _ = p.stage
        self.title_lb.config(text="%s · Lv.%d %s" % (p.name, p.level, stage))
        self.sub_lb.config(text="陪伴 %d 天 · 💰 %d 金币 · 🧠 智力 %d"
                                % (p.age_days, p.coins, p.iq))
        for key, (cv, val, color) in self.bars.items():
            v = getattr(p, key)
            self._bar(cv, v / 100.0, color)
            val.config(text="%d" % v)
        self._bar(self.exp_cv, p.level_progress, CORAL)
        self.exp_lb.config(text="%d%%" % int(p.level_progress * 100))
        state = "生病中 🤒" if p.sick else {"sleep": "睡觉中 💤", "work": "打工中 💼",
                                          "study": "学习中 📖", "bath": "洗澡中 🛁",
                                          "eat": "进食中 🍽"}.get(self.app.mode, "状态良好 ✅")
        self.stat_lb.config(text="当前：%s    累计打工 %d 次 · 喂食 %d 次 · 成就 %d/%d"
                                 % (state, p.work_count, p.feed_count,
                                    len(p.achievements), len(ACHIEVEMENTS)))

    def pick_job(self):
        win = tk.Toplevel(self)
        win.title("选择工作")
        win.configure(bg=CREAM)
        win.attributes("-topmost", True)
        win.resizable(False, False)
        tk.Label(win, text="打工能赚金币和经验，但会消耗体力和饱食度",
                 font=self.s_font, bg=CREAM, fg="#7A736A").pack(padx=14, pady=(12, 6))
        for j in JOBS:
            name, secs, en, hu, coin, exp = j
            row = tk.Frame(win, bg=CREAM)
            row.pack(fill="x", padx=14, pady=3)
            tk.Label(row, text="%s  %d秒" % (name, secs), font=self.n_font,
                     bg=CREAM, fg=INK, width=14, anchor="w").pack(side="left")
            tk.Label(row, text="体力-%d 饱食-%d  →  💰%d 经验+%d" % (en, hu, coin, exp),
                     font=self.s_font, bg=CREAM, fg="#7A736A").pack(side="left")
            tk.Button(row, text="去打工", font=self.s_font, relief="flat", bd=0,
                      bg=CORAL, fg="#FFFFFF", activebackground=CORAL_DARK,
                      command=lambda job=j, w=win: (self.app.start_work(job),
                                                    self.refresh(), w.destroy())
                      ).pack(side="right", padx=4)
        tk.Frame(win, bg=CREAM, height=8).pack()

    def show_ach(self):
        win = tk.Toplevel(self)
        win.title("成就")
        win.configure(bg=CREAM)
        win.attributes("-topmost", True)
        win.resizable(False, False)
        for key, name, desc in ACHIEVEMENTS:
            got = key in self.pet.achievements
            row = tk.Frame(win, bg=CREAM)
            row.pack(fill="x", padx=16, pady=4)
            tk.Label(row, text=name if got else "🔒 " + name.split(" ", 1)[-1],
                     font=self.n_font, bg=CREAM,
                     fg=INK if got else "#B3ADA3", width=12, anchor="w").pack(side="left")
            tk.Label(row, text=desc, font=self.s_font, bg=CREAM,
                     fg="#7A736A" if got else "#C3BDB3").pack(side="left")
        tk.Frame(win, bg=CREAM, height=10).pack()


# ---------------------------------------------------------------------------
# 商店 + 背包
# ---------------------------------------------------------------------------
class ShopWindow(tk.Toplevel):

    def __init__(self, app):
        super().__init__(app)
        self.app = app
        self.pet = app.pet
        self.title("%s · 商店" % APP_NAME)
        self.configure(bg=CREAM)
        self.resizable(False, False)
        self.attributes("-topmost", True)

        f = app.font_name
        self.n_font = (f, 10)
        self.s_font = (f, 9)

        self.coin_lb = tk.Label(self, text="", font=(f, 12, "bold"), bg=CREAM, fg=INK)
        self.coin_lb.pack(pady=(12, 6))

        body = tk.Frame(self, bg=CREAM)
        body.pack(padx=14, pady=(0, 12))

        left = tk.Frame(body, bg=CREAM)
        left.pack(side="left", anchor="n")
        tk.Label(left, text="🛒 商店", font=(f, 11, "bold"), bg=CREAM, fg=INK).pack(anchor="w")
        for item in SHOP_ITEMS:
            item_id, name, price, effect, _line = item
            row = tk.Frame(left, bg=CREAM)
            row.pack(fill="x", pady=2)
            tk.Label(row, text=name, font=self.n_font, bg=CREAM, fg=INK,
                     width=10, anchor="w").pack(side="left")
            tk.Label(row, text=fmt_effect(effect), font=self.s_font, bg=CREAM,
                     fg="#7A736A", width=16, anchor="w").pack(side="left")
            tk.Button(row, text="💰%d" % price, font=self.s_font, relief="flat", bd=0,
                      bg=CORAL, fg="#FFFFFF", activebackground=CORAL_DARK, width=6,
                      command=lambda i=item_id: self.buy(i)).pack(side="left", padx=4)

        tk.Frame(body, bg=CREAM_LINE, width=1).pack(side="left", fill="y", padx=12)

        right = tk.Frame(body, bg=CREAM)
        right.pack(side="left", anchor="n")
        tk.Label(right, text="🎒 背包", font=(f, 11, "bold"), bg=CREAM, fg=INK).pack(anchor="w")
        self.bag_frame = tk.Frame(right, bg=CREAM)
        self.bag_frame.pack(fill="both")

        self.tip = tk.Label(self, text="", font=self.s_font, bg=CREAM, fg=CORAL_DARK)
        self.tip.pack(pady=(0, 10))
        self.refresh()
        self.update_idletasks()
        self.geometry("+%d+%d" % (max(0, app.winfo_x() - self.winfo_width() - 12),
                                  max(0, app.winfo_y() - 40)))

    def buy(self, item_id):
        _id, name, price, _eff, _line = SHOP_BY_ID[item_id]
        if self.pet.coins < price:
            self.tip.config(text="金币不够啦，去打工赚一点吧 💼")
            return
        self.pet.coins -= price
        self.pet.add_item(item_id)
        self.tip.config(text="买到了 %s，已放进背包" % name)
        self.app.say("买到 %s 啦!" % name)
        self.app.after_action()
        self.refresh()

    def refresh(self):
        if not self.winfo_exists():
            return
        self.coin_lb.config(text="💰 %d 金币    🧠 智力 %d    Lv.%d"
                                 % (self.pet.coins, self.pet.iq, self.pet.level))
        for w in self.bag_frame.winfo_children():
            w.destroy()
        items = [(i, c) for i, c in sorted(self.pet.inventory.items()) if c > 0]
        if not items:
            tk.Label(self.bag_frame, text="空空如也…", font=self.s_font,
                     bg=CREAM, fg="#B3ADA3").pack(anchor="w", pady=4)
            return
        for item_id, cnt in items:
            if item_id not in SHOP_BY_ID:
                continue
            row = tk.Frame(self.bag_frame, bg=CREAM)
            row.pack(fill="x", pady=2)
            tk.Label(row, text="%s ×%d" % (SHOP_BY_ID[item_id][1], cnt),
                     font=self.n_font, bg=CREAM, fg=INK, width=12,
                     anchor="w").pack(side="left")
            tk.Button(row, text="使用", font=self.s_font, relief="flat", bd=0,
                      bg="#FFFFFF", fg=INK, activebackground=CORAL,
                      activeforeground="#FFFFFF",
                      command=lambda i=item_id: (self.app.use_item(i), self.refresh())
                      ).pack(side="left", padx=4)


def fmt_effect(effect):
    names = {"hunger": "饱食", "mood": "心情", "clean": "清洁",
             "energy": "体力", "health": "健康", "iq": "智力"}
    return " ".join("%s%+d" % (names.get(k, k), v) for k, v in effect.items())


# ---------------------------------------------------------------------------
# 字体 / 开机自启动
# ---------------------------------------------------------------------------
def pick_font():
    prefer = ["Microsoft YaHei UI", "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
              "Heiti SC", "Noto Sans CJK SC", "Source Han Sans SC", "WenQuanYi Micro Hei",
              "SimHei", "Arial Unicode MS", "TkDefaultFont"]
    try:
        available = set(tkfont.families())
    except Exception:
        return "TkDefaultFont"
    for name in prefer:
        if name in available:
            return name
    return "TkDefaultFont"


def _script_path():
    return os.path.abspath(__file__)


def _autostart_paths():
    home = os.path.expanduser("~")
    if sys.platform.startswith("win"):
        return os.path.join(home, "AppData", "Roaming", "Microsoft", "Windows",
                            "Start Menu", "Programs", "Startup", "ClaudePet.bat")
    if sys.platform == "darwin":
        return os.path.join(home, "Library", "LaunchAgents", "com.claudepet.plist")
    return os.path.join(home, ".config", "autostart", "claude-pet.desktop")


def is_autostart():
    return os.path.exists(_autostart_paths())


def set_autostart(enable):
    path = _autostart_paths()
    if not enable:
        try:
            os.remove(path)
        except OSError:
            pass
        if sys.platform == "darwin":
            subprocess.call(["launchctl", "unload", path],
                            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return False

    os.makedirs(os.path.dirname(path), exist_ok=True)
    script = _script_path()
    if sys.platform.startswith("win"):
        exe = sys.executable.replace("python.exe", "pythonw.exe")
        with open(path, "w", encoding="utf-8") as f:
            f.write('@echo off\r\nstart "" "%s" "%s"\r\n' % (exe, script))
    elif sys.platform == "darwin":
        plist = ('<?xml version="1.0" encoding="UTF-8"?>\n'
                 '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" '
                 '"http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n'
                 '<plist version="1.0"><dict>\n'
                 '  <key>Label</key><string>com.claudepet</string>\n'
                 '  <key>ProgramArguments</key><array>'
                 '<string>%s</string><string>%s</string></array>\n'
                 '  <key>RunAtLoad</key><true/>\n'
                 '</dict></plist>\n') % (sys.executable, script)
        with open(path, "w", encoding="utf-8") as f:
            f.write(plist)
        subprocess.call(["launchctl", "load", path],
                        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    else:
        with open(path, "w", encoding="utf-8") as f:
            f.write("[Desktop Entry]\nType=Application\nName=%s\n"
                    "Exec=%s \"%s\"\nX-GNOME-Autostart-enabled=true\n"
                    % (APP_NAME, sys.executable, script))
    return True


# ---------------------------------------------------------------------------
def main():
    if "--version" in sys.argv:
        print("%s %s" % (APP_NAME, VERSION))
        return
    if "--reset" in sys.argv:
        try:
            os.remove(SAVE_PATH)
            print("存档已清空：%s" % SAVE_PATH)
        except OSError:
            print("没有找到存档")
        return
    try:
        if sys.platform.startswith("win"):
            import ctypes
            ctypes.windll.shcore.SetProcessDpiAwareness(1)
    except Exception:
        pass
    app = ClaudePet()
    if "--no-topmost" in sys.argv:
        app.attributes("-topmost", False)
    app.mainloop()


if __name__ == "__main__":
    main()
