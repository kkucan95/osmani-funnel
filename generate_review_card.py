"""
Osmani GmbH – Google Bewertungskarte
A6 Format: 1748 x 1240px (300dpi)
"""

from PIL import Image, ImageDraw, ImageFont
import qrcode
import os

FONT_DIR = r"C:\Users\kevin\AppData\Roaming\Claude\local-agent-mode-sessions\skills-plugin\68f26699-5f8a-437e-a648-69dbd671819c\31bbfcbb-1512-4553-80de-a805b78abc21\skills\canvas-design\canvas-fonts"

W, H = 1748, 1240
SPLIT = int(W * 0.56)   # left panel ends here

# Colors
GREEN_DARK   = (18, 38, 22)      # #122616 – near-black green
GREEN_MID    = (42, 90, 52)      # accent green for decoratives
GREEN_ACCENT = (78, 158, 90)     # lighter green for divider / icons
WHITE        = (255, 255, 255)
GOLD         = (245, 166, 35)    # stars
GRAY_LIGHT   = (224, 224, 224)   # QR border
GRAY_MID     = (130, 130, 130)   # secondary text right panel
GRAY_DARK    = (50, 50, 50)      # primary text right panel
GREEN_TEXT   = (30, 100, 45)     # phone text on white

# Google brand colors
G_BLUE   = (66, 133, 244)
G_RED    = (234, 67, 53)
G_YELLOW = (251, 188, 5)
G_GREEN  = (52, 168, 83)

REVIEW_URL = "https://g.page/r/CcnpSWYX1zzrEBM/review"

def load_font(name, size):
    path = os.path.join(FONT_DIR, name)
    return ImageFont.truetype(path, size)

def draw_rounded_rect(draw, xy, radius, fill=None, outline=None, width=1):
    x1, y1, x2, y2 = xy
    draw.rounded_rectangle([x1, y1, x2, y2], radius=radius, fill=fill, outline=outline, width=width)

def make_qr(url, box_size=8, border=1):
    qr = qrcode.QRCode(
        version=2,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=box_size,
        border=border,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color=(18, 38, 22), back_color=(255, 255, 255))
    return img.convert("RGBA")

# ─── Canvas ──────────────────────────────────────────────────────────────────
canvas = Image.new("RGB", (W, H), WHITE)
draw   = ImageDraw.Draw(canvas)

# ─── LEFT PANEL ──────────────────────────────────────────────────────────────
draw.rectangle([0, 0, SPLIT, H], fill=GREEN_DARK)

# Subtle diagonal texture overlay (thin lines)
for y in range(-H, H, 28):
    draw.line([(0, y), (SPLIT, y + SPLIT)], fill=(255, 255, 255, 8), width=1)

# Top-left: thin accent bar
draw.rectangle([0, 0, 5, H], fill=GREEN_ACCENT)

# Company label (small caps feel)
f_small_label = load_font("InstrumentSans-Regular.ttf", 30)
f_company_bold = load_font("BricolageGrotesque-Bold.ttf", 52)
f_heading      = load_font("BricolageGrotesque-Bold.ttf", 88)
f_subtext      = load_font("InstrumentSans-Regular.ttf", 34)
f_stars        = load_font("BricolageGrotesque-Bold.ttf", 64)
f_tagline      = load_font("InstrumentSans-Regular.ttf", 28)

# Company name block – top area
label_y = 80
draw.text((54, label_y), "GARTEN & LANDSCHAFTSBAU", font=f_small_label, fill=(160, 200, 165))
draw.text((54, label_y + 42), "Osmani GmbH", font=f_company_bold, fill=WHITE)

# Thin horizontal divider line
div_y = label_y + 42 + 68
draw.rectangle([54, div_y, SPLIT - 54, div_y + 2], fill=GREEN_ACCENT)

# Large decorative quotation mark
f_quote = load_font("Lora-BoldItalic.ttf", 220)
draw.text((44, div_y + 10), "“", font=f_quote, fill=(42, 90, 52))

# Main heading
heading_y = div_y + 110
draw.text((54, heading_y), "Danke für", font=f_heading, fill=WHITE)
draw.text((54, heading_y + 96), "Ihr Vertrauen!", font=f_heading, fill=(140, 210, 150))

# Subtext
sub_y = heading_y + 96 + 104
draw.text((54, sub_y),
          "Eine kurze Bewertung auf Google",
          font=f_subtext, fill=(180, 215, 183))
draw.text((54, sub_y + 44),
          "hilft uns und anderen Kunden enorm.",
          font=f_subtext, fill=(180, 215, 183))

# Stars – drawn as proper 5-pointed polygons
import math as _math

def draw_star(draw, cx, cy, r_outer, r_inner, fill):
    points = []
    for i in range(10):
        angle = _math.radians(-90 + i * 36)
        r = r_outer if i % 2 == 0 else r_inner
        points.append((cx + r * _math.cos(angle), cy + r * _math.sin(angle)))
    draw.polygon(points, fill=fill)

stars_y = sub_y + 44 + 72
star_r_outer, star_r_inner, star_gap = 26, 11, 62
for si in range(5):
    star_cx = 54 + star_r_outer + si * star_gap
    draw_star(draw, star_cx, stars_y + star_r_outer, star_r_outer, star_r_inner, GOLD)

# (tagline removed)

# Decorative leaf shapes bottom-left
leaf_cx, leaf_cy = 580, H - 52
for i, (dx, dy, r, alpha) in enumerate([
    (0, 0, 28, 70), (38, -14, 20, 50), (68, 4, 16, 40),
    (-32, -8, 18, 45), (-58, 6, 14, 30)
]):
    col = (*GREEN_MID, alpha)
    # draw as small oval
    leaf = Image.new("RGBA", (r*2+4, r*2+4), (0,0,0,0))
    ld = ImageDraw.Draw(leaf)
    ld.ellipse([2, 2, r*2+2, r*2+2], fill=(*GREEN_MID, alpha))
    canvas.paste(leaf, (leaf_cx + dx - r, leaf_cy + dy - r), leaf)

# ─── RIGHT PANEL ─────────────────────────────────────────────────────────────
right_x  = SPLIT + 1
panel_w  = W - right_x
center_x = right_x + panel_w // 2

# Subtle off-white background tint
draw.rectangle([right_x, 0, W, H], fill=(252, 252, 252))

# Google "G" badge  ──────────────────────────────────────────────────────────
badge_cx = center_x
badge_cy = 175
badge_r  = 62

# White circle background with shadow effect (layered circles)
for i in range(4, 0, -1):
    shadow_col = (220 - i*8, 220 - i*8, 220 - i*8)
    draw.ellipse([badge_cx - badge_r - i, badge_cy - badge_r - i,
                  badge_cx + badge_r + i, badge_cy + badge_r + i],
                 fill=shadow_col)
draw.ellipse([badge_cx - badge_r, badge_cy - badge_r,
              badge_cx + badge_r, badge_cy + badge_r], fill=WHITE)

# Google G – drawn as colored arcs/wedges
import math

def draw_arc_segment(draw, cx, cy, r, start_deg, end_deg, color, width=18):
    """Draw a thick arc segment."""
    bbox = [cx - r, cy - r, cx + r, cy + r]
    draw.arc(bbox, start=start_deg, end=end_deg, fill=color, width=width)

g_r = 38
# Blue arc (top → left, ~270° to ~30°)
draw_arc_segment(draw, badge_cx, badge_cy, g_r, start_deg=270, end_deg=30,   color=G_BLUE,   width=16)
# Red arc (30° → 90°)
draw_arc_segment(draw, badge_cx, badge_cy, g_r, start_deg=30,  end_deg=120,  color=G_RED,    width=16)
# Yellow arc (90° → 200°)
draw_arc_segment(draw, badge_cx, badge_cy, g_r, start_deg=120, end_deg=210,  color=G_YELLOW, width=16)
# Green arc (200° → 270°)
draw_arc_segment(draw, badge_cx, badge_cy, g_r, start_deg=210, end_deg=270,  color=G_GREEN,  width=16)

# Inner white circle to make it look like a ring
draw.ellipse([badge_cx - 22, badge_cy - 22, badge_cx + 22, badge_cy + 22], fill=WHITE)

# The "G" letter
f_g_letter = load_font("BricolageGrotesque-Bold.ttf", 38)
g_text = "G"
g_bbox = draw.textbbox((0, 0), g_text, font=f_g_letter)
g_w = g_bbox[2] - g_bbox[0]
g_h = g_bbox[3] - g_bbox[1]
draw.text((badge_cx - g_w // 2 - g_bbox[0], badge_cy - g_h // 2 - g_bbox[1]),
          g_text, font=f_g_letter, fill=G_BLUE)

# "Google" text below badge
f_google_label = load_font("InstrumentSans-Regular.ttf", 32)
google_text = "Bewertungen"
gt_bbox = draw.textbbox((0, 0), google_text, font=f_google_label)
gt_w = gt_bbox[2] - gt_bbox[0]
draw.text((center_x - gt_w // 2, badge_cy + badge_r + 14),
          google_text, font=f_google_label, fill=GRAY_MID)

# QR Code ─────────────────────────────────────────────────────────────────────
qr_img   = make_qr(REVIEW_URL, box_size=7, border=2)
qr_size  = 340
qr_img   = qr_img.resize((qr_size, qr_size), Image.LANCZOS)

qr_x = center_x - qr_size // 2
qr_y = badge_cy + badge_r + 65

# White rounded background with border
pad = 18
draw_rounded_rect(draw,
                  [qr_x - pad, qr_y - pad, qr_x + qr_size + pad, qr_y + qr_size + pad],
                  radius=18, fill=WHITE, outline=GRAY_LIGHT, width=2)

canvas.paste(qr_img, (qr_x, qr_y), qr_img)

# "Einfach scannen & bewerten"
f_scan_text = load_font("InstrumentSans-Regular.ttf", 32)
scan_text = "Einfach scannen & bewerten"
st_bbox = draw.textbbox((0, 0), scan_text, font=f_scan_text)
st_w = st_bbox[2] - st_bbox[0]
scan_y = qr_y + qr_size + pad + 18
draw.text((center_x - st_w // 2, scan_y), scan_text, font=f_scan_text, fill=GRAY_MID)

# Contact details bottom
f_contact_bold = load_font("InstrumentSans-Bold.ttf", 30)
f_contact_reg  = load_font("InstrumentSans-Regular.ttf", 26)

phone_text = "+49 179 1588576"
web_text   = "garten-landschaftsbau-bietigheim.de"

phone_bbox = draw.textbbox((0, 0), phone_text, font=f_contact_bold)
phone_w = phone_bbox[2] - phone_bbox[0]
web_bbox = draw.textbbox((0, 0), web_text, font=f_contact_reg)
web_w = web_bbox[2] - web_bbox[0]

contact_y = H - 100
draw.text((center_x - phone_w // 2, contact_y), phone_text, font=f_contact_bold, fill=GREEN_TEXT)
draw.text((center_x - web_w // 2, contact_y + 40), web_text, font=f_contact_reg, fill=GRAY_MID)

# Thin top accent line on right panel
draw.rectangle([right_x, 0, W, 4], fill=GRAY_LIGHT)

# ─── Save ────────────────────────────────────────────────────────────────────
out_path = r"C:\Users\kevin\Desktop\Galabau\Fotos\Website\bewertungskarte_osmani.png"
canvas.save(out_path, "PNG", dpi=(300, 300))
print(f"Saved: {out_path}")
print(f"Size: {W}x{H}px | A6 @300dpi")
