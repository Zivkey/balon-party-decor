#!/usr/bin/env python3
"""
Generiše OG sliku (src/app/opengraph-image.jpg, 1200x630) — ono što se vidi
kad se link sajta deli na Vajberu, WhatsAppu, Fejsbuku ili Instagramu.

Slika ponavlja izgled hero sekcije: roze pruge, tekstura papira, lebdeći
baloni, pocepan papir i die-cut stikeri, plus naziv radnje.

ZAŠTO SKRIPTA A NE next/og: Next generiše OG slike preko Satori-ja, koji ne
podržava `filter: drop-shadow` — a to je upravo ono što stikerima daje belu
die-cut ivicu (vidi src/components/dieCut.ts). Zato se slika pravi ovde.

POKRETANJE:
    python3 -m venv .venv && .venv/bin/pip install pillow fonttools brotli
    .venv/bin/python scripts/generate-og.py

Font se skida sa Google Fonts repozitorijuma (Alan Sans, OFL licenca) jer su
lokalni woff2 fajlovi u public/fonts/ subsetovani na latin i latin-ext posebno.
"""

import io
import os
import urllib.request
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HERO = os.path.join(ROOT, "public", "hero")
OUT = os.path.join(ROOT, "src", "app", "opengraph-image.jpg")

W, H = 1200, 630
PINK = (242, 196, 207)          # #f2c4cf — roze iz hero gradijenta
WINE = (128, 16, 38)            # #801026 — brend boja naslova
PINK_STOP, WHITE_STOP = 0.52, 0.78   # gde roze počinje i završava prelaz u belo

FONT_URL = "https://github.com/google/fonts/raw/main/ofl/alansans/AlanSans%5Bwght%5D.ttf"
FONT_CACHE = os.path.join(ROOT, ".cache", "AlanSans.ttf")


# ── pomoćne funkcije ─────────────────────────────────────────────────────────

def load_font(size, weight):
    """Alan Sans na traženoj debljini. Varijabilni font, osa wght 300–900."""
    if not os.path.exists(FONT_CACHE):
        os.makedirs(os.path.dirname(FONT_CACHE), exist_ok=True)
        with urllib.request.urlopen(FONT_URL) as r:
            open(FONT_CACHE, "wb").write(r.read())
    f = ImageFont.truetype(FONT_CACHE, size)
    f.set_variation_by_axes([weight])
    return f


def die_cut(img, outline=3, dx=0, dy=12, blur=9, shadow_alpha=0.25):
    """
    Bela nalepnica-ivica + meka senka — PIL prevod DIE_CUT filtera iz
    src/components/dieCut.ts. Vraća sliku sa prostorom za ivicu i senku.
    """
    pad = outline + blur * 3 + abs(dy)
    base = Image.new("RGBA", (img.width + 2 * pad, img.height + 2 * pad), (0, 0, 0, 0))
    base.paste(img, (pad, pad))
    alpha = base.split()[3]

    # Bela ivica = alfa proširena za `outline` px (MaxFilter traži neparan prečnik).
    grown = alpha.filter(ImageFilter.MaxFilter(outline * 2 + 1))
    sticker = Image.new("RGBA", base.size, (255, 255, 255, 0))
    sticker.putalpha(grown)
    sticker.paste(base, (0, 0), base)

    # Senka se baca sa već proširene siluete, kao u CSS lancu.
    shadow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    shadow.putalpha(grown.point(lambda v: int(v * shadow_alpha)))
    shadow.paste(Image.new("RGBA", base.size, (70, 20, 35, 0)), (0, 0), None)
    tint = Image.new("RGBA", base.size, (70, 20, 35, 255))
    tint.putalpha(grown.point(lambda v: int(v * shadow_alpha)))
    tint = tint.filter(ImageFilter.GaussianBlur(blur))

    out = Image.new("RGBA", base.size, (0, 0, 0, 0))
    out.paste(tint, (dx, dy), tint)
    out.alpha_composite(sticker)
    return out, pad


def paste_sticker(canvas, path, x, y, width, rotate=0, cut=True):
    """Učita PNG, skalira na `width`, opciono die-cut i rotira, pa nalepi na (x, y)."""
    im = Image.open(path).convert("RGBA")
    h = round(im.height * width / im.width)
    im = im.resize((width, h), Image.LANCZOS)
    if cut:
        im, pad = die_cut(im)
    else:
        im, pad = die_cut(im, outline=0, blur=12, shadow_alpha=0.28)
    if rotate:
        before = im.size
        im = im.rotate(-rotate, resample=Image.BICUBIC, expand=True)
        x -= (im.width - before[0]) // 2
        y -= (im.height - before[1]) // 2
    canvas.alpha_composite(im, (x - pad, y - pad))


def draw_tracked(draw, xy, text, font, fill, tracking=0.0, anchor_center=True):
    """Ispis teksta sa letter-spacing-om (PIL ga nema ugrađenog)."""
    widths = [draw.textlength(c, font=font) for c in text]
    total = sum(widths) + tracking * (len(text) - 1)
    x, y = xy
    if anchor_center:
        x -= total / 2
    for c, w in zip(text, widths):
        draw.text((x, y), c, font=font, fill=fill)
        x += w + tracking
    return total


# ── kompozicija ──────────────────────────────────────────────────────────────

canvas = Image.new("RGBA", (W, H), (255, 255, 255, 255))
d = ImageDraw.Draw(canvas)

# 1. Roze → belo gradijent (isti stopovi kao hero sekcija).
for y in range(H):
    p = y / H
    if p <= PINK_STOP:
        c = PINK
    elif p >= WHITE_STOP:
        c = (255, 255, 255)
    else:
        t = (p - PINK_STOP) / (WHITE_STOP - PINK_STOP)
        c = tuple(round(PINK[i] + (255 - PINK[i]) * t) for i in range(3))
    d.line([(0, y), (W, y)], fill=c + (255,))

# 2. Tekstura papira, 8% u multiply režimu.
tex = Image.open(os.path.join(HERO, "papir-tekstura.png")).convert("RGB")
s_ = max(W / tex.width, H / tex.height)
tex = tex.resize((round(tex.width * s_), round(tex.height * s_)), Image.LANCZOS).crop((0, 0, W, H))
base_rgb = canvas.convert("RGB")
canvas = Image.blend(base_rgb, ImageChops.multiply(base_rgb, tex), 0.08).convert("RGBA")
d = ImageDraw.Draw(canvas)

# 3. Vertikalne bele pruge (22px na, 22px off), blede tamo gde roze prelazi u belo.
stripes = Image.new("RGBA", (W, H), (255, 255, 255, 0))
sd = ImageDraw.Draw(stripes)
for x in range(0, W, 44):
    sd.rectangle([x, 0, x + 21, H], fill=(255, 255, 255, 104))
mask = Image.new("L", (W, H), 0)
md = ImageDraw.Draw(mask)
for y in range(H):
    p = y / H
    a = 255 if p <= PINK_STOP else (0 if p >= WHITE_STOP else round(255 * (1 - (p - PINK_STOP) / (WHITE_STOP - PINK_STOP))))
    md.line([(0, y), (W, y)], fill=a)
stripes.putalpha(Image.composite(stripes.split()[3], Image.new("L", (W, H), 0), mask))
canvas.alpha_composite(stripes)

# 4. Lebdeći baloni iz zajedničke slike (5 komada u nizu, kao SkyBalloon).
sprite = Image.open(os.path.join(HERO, "baloni.png")).convert("RGBA")
COLS = {"srebrna": 0, "zlatna": 1, "crvena": 2, "plava": 3, "tirkiz": 4}

def balloon(color, x, y, w, rotate=0):
    sw = w * 5
    sh = round(sprite.height * sw / sprite.width)
    sc = sprite.resize((sw, sh), Image.LANCZOS)
    i = COLS[color]
    piece = sc.crop((i * w, 0, (i + 1) * w, min(sh, round(w * 2.14))))
    cut, pad = die_cut(piece)
    if rotate:
        before = cut.size
        cut = cut.rotate(-rotate, resample=Image.BICUBIC, expand=True)
        x -= (cut.width - before[0]) // 2
        y -= (cut.height - before[1]) // 2
    canvas.alpha_composite(cut, (x - pad, y - pad))

balloon("zlatna", -18, 24, 74, -12)
balloon("crvena", 196, -30, 52, 9)
balloon("srebrna", 946, -18, 54, -8)
balloon("plava", 1104, 6, 78, 12)

# 5. Naslov + podnaslov.
title_f = load_font(70, 800)
sub_f = load_font(22, 500)
draw_tracked(d, (W / 2, 44), "Balon Party Decor", title_f, WINE + (255,), tracking=-1.4)
sub = "Buketi od balona, poklon kutije i dekoracije — Niš"
d.text((W / 2, 134), sub, font=sub_f, fill=WINE + (205,), anchor="ma")

# 6. Pocepan papir — razvučen po širini da nagib bude blaži nego na hero-u,
#    i preslikan (pocepana ivica niža levo, viša desno).
paper = Image.open(os.path.join(HERO, "pocepan-papir.png")).convert("RGBA")
PW, PH, PTOP = 2200, 820, 119
paper = paper.resize((PW, PH), Image.LANCZOS).transpose(Image.FLIP_LEFT_RIGHT)
canvas.alpha_composite(paper, ((W - PW) // 2, PTOP))

# Beli prelaz preko papira — sivkastu teksturu pretvara u čistu belu nadole.
bleed = Image.new("RGBA", (W, H), (255, 255, 255, 0))
bd = ImageDraw.Draw(bleed)
BLEED_TOP = 360
for y in range(BLEED_TOP, H):
    a = round(200 * (y - BLEED_TOP) / (H - BLEED_TOP))
    bd.line([(0, y), (W, y)], fill=(255, 255, 255, a))
canvas.alpha_composite(bleed)

# 7. Stikeri — devojka levo (naslonjena na donju ivicu), proizvodi na papiru.
paste_sticker(canvas, os.path.join(HERO, "devojka-buket.png"), -34, 168, 380, cut=False)
paste_sticker(canvas, os.path.join(HERO, "products", "grad-red.png"), 934, 296, 232, rotate=5)
paste_sticker(canvas, os.path.join(HERO, "products", "baby-girl.png"), 438, 372, 252, rotate=-4)
paste_sticker(canvas, os.path.join(HERO, "products", "pink-basket.png"), 722, 358, 178, rotate=8)

canvas.convert("RGB").save(OUT, "JPEG", quality=90, optimize=True, progressive=True)
print(f"sačuvano: {OUT} ({W}x{H}, {os.path.getsize(OUT) // 1024} KB)")
