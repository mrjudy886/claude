# -*- coding: utf-8 -*-
"""
生成桌宠的应用图标：assets/claude_pet.png / .ico / .icns

纯标准库实现（zlib + struct 手写 PNG），不依赖 Pillow。
图案与桌宠本体一致：珊瑚橘圆身 + 8 根星芒 + 奶油白肚皮 + 眼睛和笑脸。

用法：python tools/make_icon.py
"""

import math
import os
import struct
import zlib

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets")

CORAL = (0xD9, 0x77, 0x57)
CORAL_DARK = (0xA8, 0x46, 0x2C)
CREAM = (0xF0, 0xEE, 0xE6)
INK = (0x2B, 0x27, 0x23)
BLUSH = (0xF2, 0xA0, 0x8C)

SS = 3          # 每个像素的超采样倍数（抗锯齿）
RAYS = 8
RAY_W = 0.115   # 星芒半角（弧度）


def sample(u, v):
    """在 [-1,1] 归一化坐标系里取色，返回 (r,g,b,a)，a=0 表示透明。"""
    r = math.hypot(u, v)
    theta = math.atan2(v, u)

    r_body = 0.56
    r_in, r_out = 0.40, 0.95
    edge = 0.035          # 描边宽度

    # 星芒：把角度折到最近一根芒上，半角随半径线性收窄
    step = 2 * math.pi / RAYS
    d_theta = abs(((theta + math.pi / 2) % step) - step / 2)
    ray_half = RAY_W * max(0.0, (r_out - r) / (r_out - r_in))
    in_ray = r <= r_out and d_theta <= ray_half
    ray_edge = r <= r_out and ray_half < d_theta <= ray_half + edge * 0.9

    in_body = r <= r_body
    body_edge = r_body < r <= r_body + edge

    if not (in_ray or ray_edge or in_body or body_edge):
        return (0, 0, 0, 0)

    if in_body:
        # 肚皮（椭圆）
        bu, bv = u / 0.34, (v - 0.20) / 0.28
        if bu * bu + bv * bv <= 1.0:
            color = CREAM
        else:
            color = CORAL
        # 腮红
        for cxx in (-0.34, 0.34):
            if math.hypot((u - cxx) / 0.13, (v + 0.02) / 0.07) <= 1.0:
                color = BLUSH
        # 眼睛
        for cxx in (-0.20, 0.20):
            if math.hypot((u - cxx) / 0.085, (v + 0.14) / 0.11) <= 1.0:
                color = INK
        # 嘴（一段下弧）
        md = math.hypot(u / 0.16, (v - 0.02) / 0.16)
        if 0.86 <= md <= 1.06 and v > 0.02:
            color = INK
        return color + (255,)

    if in_ray:
        return CORAL + (255,)
    return CORAL_DARK + (255,)


def render(size):
    """渲染成 RGBA 像素行列表。"""
    rows = []
    half = size / 2.0
    for y in range(size):
        row = bytearray()
        for x in range(size):
            acc = [0, 0, 0, 0]
            for sy in range(SS):
                for sx in range(SS):
                    u = ((x + (sx + 0.5) / SS) - half) / half
                    v = ((y + (sy + 0.5) / SS) - half) / half
                    c = sample(u, v)
                    a = c[3]
                    acc[0] += c[0] * a
                    acc[1] += c[1] * a
                    acc[2] += c[2] * a
                    acc[3] += a
            n = SS * SS
            a = acc[3] / n
            if a < 1:
                row += b"\x00\x00\x00\x00"
            else:
                row += bytes((int(acc[0] / acc[3]), int(acc[1] / acc[3]),
                              int(acc[2] / acc[3]), int(round(a))))
        rows.append(bytes(row))
    return rows


def png_bytes(rows, size):
    raw = b"".join(b"\x00" + r for r in rows)

    def chunk(tag, data):
        c = struct.pack(">I", len(data)) + tag + data
        return c + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    ihdr = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)
    return (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr)
            + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b""))


def ico_bytes(pngs):
    """pngs: [(size, png_data), ...] —— Vista 以后的 Windows 支持 ICO 内嵌 PNG。"""
    n = len(pngs)
    header = struct.pack("<HHH", 0, 1, n)
    offset = 6 + 16 * n
    entries, blobs = b"", b""
    for size, data in pngs:
        dim = 0 if size >= 256 else size
        entries += struct.pack("<BBBBHHII", dim, dim, 0, 0, 1, 32, len(data), offset)
        blobs += data
        offset += len(data)
    return header + entries + blobs


def icns_bytes(entries):
    """entries: [(b'ic08', png_data), ...]"""
    body = b""
    for tag, data in entries:
        body += tag + struct.pack(">I", len(data) + 8) + data
    return b"icns" + struct.pack(">I", len(body) + 8) + body


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    cache = {}
    for size in (16, 32, 48, 64, 128, 256):
        cache[size] = png_bytes(render(size), size)
        print("  渲染 %dx%d" % (size, size))

    with open(os.path.join(OUT_DIR, "claude_pet.png"), "wb") as f:
        f.write(cache[256])
    with open(os.path.join(OUT_DIR, "claude_pet.ico"), "wb") as f:
        f.write(ico_bytes([(s, cache[s]) for s in (16, 32, 48, 64, 128, 256)]))
    with open(os.path.join(OUT_DIR, "claude_pet.icns"), "wb") as f:
        f.write(icns_bytes([(b"ic07", cache[128]), (b"ic08", cache[256])]))
    for name in ("claude_pet.png", "claude_pet.ico", "claude_pet.icns"):
        path = os.path.join(OUT_DIR, name)
        print("已生成 %s (%d 字节)" % (path, os.path.getsize(path)))


if __name__ == "__main__":
    main()
