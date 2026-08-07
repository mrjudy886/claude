#!/usr/bin/env python3
"""去掉图片右下角水印 (Remove bottom-right watermark from images)."""

import sys
from PIL import Image, ImageFilter


def remove_watermark(input_path, output_path=None,
                     wm_width_ratio=0.22, wm_height_ratio=0.06,
                     blend_px=6):
    """Remove the bottom-right watermark by painting over it with nearby pixels.

    Args:
        input_path:      Source image path.
        output_path:     Destination path (default: <name>_clean.<ext>).
        wm_width_ratio:  Watermark width as fraction of image width.
        wm_height_ratio: Watermark height as fraction of image height.
        blend_px:        Gaussian-blur radius applied at the seam.
    """
    if output_path is None:
        dot = input_path.rfind(".")
        output_path = f"{input_path[:dot]}_clean{input_path[dot:]}"

    img = Image.open(input_path).convert("RGB")
    w, h = img.size

    wm_w = int(w * wm_width_ratio)
    wm_h = int(h * wm_height_ratio)

    wm_left = w - wm_w
    wm_top = h - wm_h

    source_top = max(0, wm_top - wm_h)
    source = img.crop((wm_left, source_top, w, wm_top))
    source = source.resize((wm_w, wm_h), Image.LANCZOS)

    img.paste(source, (wm_left, wm_top))

    if blend_px > 0:
        margin = blend_px * 3
        patch_left = max(0, wm_left - margin)
        patch_top = max(0, wm_top - margin)
        patch = img.crop((patch_left, patch_top, w, h))
        blurred = patch.filter(ImageFilter.GaussianBlur(blend_px))

        mask = Image.new("L", patch.size, 0)
        pw, ph = patch.size
        seam_y = margin
        for y in range(ph):
            for x in range(pw):
                if y < seam_y - blend_px:
                    mask.putpixel((x, y), 0)
                elif y < seam_y + blend_px:
                    alpha = int(255 * (y - seam_y + blend_px) / (2 * blend_px))
                    if x < margin:
                        x_alpha = int(255 * (margin - x) / margin)
                        alpha = max(alpha, x_alpha)
                    mask.putpixel((x, y), min(alpha, 255))
                else:
                    mask.putpixel((x, y), 255)

        composite = Image.composite(blurred, patch, mask)
        img.paste(composite, (patch_left, patch_top))

    img.save(output_path, quality=95)
    print(f"已保存: {output_path}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("用法: python remove_watermark.py <图片路径> [输出路径]")
        print("示例: python remove_watermark.py tom.jpg tom_clean.jpg")
        sys.exit(1)

    src = sys.argv[1]
    dst = sys.argv[2] if len(sys.argv) > 2 else None
    remove_watermark(src, dst)
