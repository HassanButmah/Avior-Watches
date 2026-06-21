#!/usr/bin/env python3
"""
Photorealistic Luxury Watch Animation Generator
Creates detailed mechanical watch frames with realistic components
Similar to luxury brands (Rolex, etc.) with full dial details
"""

import os
import math
import json
from PIL import Image, ImageDraw, ImageFilter

# Configuration
FRAME_COUNT = 120
FRAME_WIDTH = 1920
FRAME_HEIGHT = 1080
OUTPUT_DIR = "public/frames"
QUALITY = 95

# Premium Colors (Rolex-inspired)
GOLD = (200, 169, 110)           # #C8A96E
GOLD_LIGHT = (232, 201, 142)     # #E8C98E
STEEL = (200, 200, 200)          # #C8C8C8
STEEL_DARK = (100, 100, 100)     # #646464
DIAL_BG = (25, 25, 35)           # #191923
DIAL_BLACK = (15, 15, 20)        # #0F0F14
BLACK_BG = (0, 0, 0)             # #000000
WHITE = (255, 255, 255)
SHADOW_DARK = (20, 20, 20)

os.makedirs(OUTPUT_DIR, exist_ok=True)

def ease_out_cubic(t):
    """Smooth easing for natural animation"""
    return 1 - (1 - t) ** 3

def draw_text_rotated(draw, text, position, angle, font_size=12, fill=WHITE, anchor="mm"):
    """Draw rotated text on image"""
    # Create temp image for text
    temp = Image.new('RGBA', (200, 200), (0, 0, 0, 0))
    temp_draw = ImageDraw.Draw(temp)
    temp_draw.text((100, 100), text, fill=fill, anchor=anchor)
    
    # Rotate
    temp = temp.rotate(-angle, expand=True, resample=Image.BICUBIC)
    
    # Paste on main image
    # This is simplified - in production, use PIL's font rotation

def draw_line_rotated(draw, start, center, angle, length, **kwargs):
    """Draw a rotated line from center point"""
    end_x = center[0] + length * math.cos(math.radians(angle))
    end_y = center[1] - length * math.sin(math.radians(angle))
    draw.line([center, (end_x, end_y)], **kwargs)

def create_photorealistic_watch(frame_num):
    """Generate a single photorealistic watch frame"""
    progress = frame_num / (FRAME_COUNT - 1)
    eased = ease_out_cubic(progress)
    
    # Create base with gradient background
    img = Image.new('RGB', (FRAME_WIDTH, FRAME_HEIGHT), BLACK_BG)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    center_x = FRAME_WIDTH // 2
    center_y = FRAME_HEIGHT // 2
    
    # ========== BACKGROUND LIGHTING EFFECT ==========
    # Create radial glow
    glow_layers = []
    for i in range(100, 0, -5):
        alpha = int(2 * (100 - i) / 100)
        radius = int(500 + eased * 300) * (i / 100)
        draw.ellipse(
            [center_x - radius, center_y - radius, center_x + radius, center_y + radius],
            outline=(*GOLD, alpha)
        )
    
    # ========== WATCH CASE ==========
    case_size = 350  # Watch diameter in pixels
    case_x = center_x
    case_y = center_y + int(eased * 60)
    
    # Outer case with 3D beveled effect
    # Outer ring shadow
    draw.ellipse(
        [case_x - case_size - 3, case_y - case_size - 3, 
         case_x + case_size + 3, case_y + case_size + 3],
        fill=(*SHADOW_DARK, 100)
    )
    
    # Main case ring
    draw.ellipse(
        [case_x - case_size, case_y - case_size, 
         case_x + case_size, case_y + case_size],
        fill=(*STEEL_DARK, 255),
        outline=(*STEEL, 255)
    )
    
    # Case highlight (3D effect)
    draw.ellipse(
        [case_x - case_size + 5, case_y - case_size + 5, 
         case_x - case_size + 100, case_y - case_size + 80],
        fill=(*WHITE, 50)
    )
    
    # ========== BEZEL (rotating ring with numbers) ==========
    bezel_inner = case_size - 30
    bezel_outer = case_size - 8
    bezel_rotation = eased * 360  # Rotate during animation
    
    # Draw bezel ring
    draw.ellipse(
        [case_x - bezel_outer, case_y - bezel_outer,
         case_x + bezel_outer, case_y + bezel_outer],
        outline=(*GOLD_LIGHT, 255),
        width=4
    )
    
    # Bezel numbers (0, 10, 20, 30, etc.)
    for i in range(0, 60, 5):
        angle = (i / 60) * 360 - 90 + bezel_rotation
        rad = math.radians(angle)
        
        # Number position on bezel
        num_x = case_x + (bezel_outer - 15) * math.cos(rad)
        num_y = case_y + (bezel_outer - 15) * math.sin(rad)
        
        # Draw number (simplified - just draw position marks)
        mark_len = 12 if i % 10 == 0 else 8
        mark_x_start = case_x + (bezel_outer - 2) * math.cos(rad)
        mark_y_start = case_y + (bezel_outer - 2) * math.sin(rad)
        mark_x_end = case_x + (bezel_outer - mark_len) * math.cos(rad)
        mark_y_end = case_y + (bezel_outer - mark_len) * math.sin(rad)
        
        color = GOLD_LIGHT if i % 10 == 0 else GOLD
        draw.line([(mark_x_start, mark_y_start), (mark_x_end, mark_y_end)], 
                 fill=color, width=2)
    
    # ========== DIAL (lifts up during explosion) ==========
    dial_size = bezel_inner - 10
    dial_y = case_y - int(eased * 120)
    
    # Dial background with sunburst effect
    draw.ellipse(
        [case_x - dial_size, dial_y - dial_size,
         case_x + dial_size, dial_y + dial_size],
        fill=(*DIAL_BG, 255),
        outline=(*STEEL, 255)
    )
    
    # Sunburst pattern (subtle radial lines)
    for angle_deg in range(0, 360, 15):
        rad = math.radians(angle_deg)
        start_r = dial_size * 0.7
        end_r = dial_size * 0.95
        
        start_x = case_x + start_r * math.cos(rad)
        start_y = dial_y + start_r * math.sin(rad)
        end_x = case_x + end_r * math.cos(rad)
        end_y = dial_y + end_r * math.sin(rad)
        
        draw.line([(start_x, start_y), (end_x, end_y)],
                 fill=(*STEEL_DARK, 80), width=1)
    
    # ========== HOUR MARKERS (Luminous dots) ==========
    marker_radius = dial_size - 40
    for i in range(12):
        angle = (i / 12) * 360 - 90
        rad = math.radians(angle)
        
        marker_x = case_x + marker_radius * math.cos(rad)
        marker_y = dial_y + marker_radius * math.sin(rad)
        
        # Luminous dot
        dot_size = 8 if i % 3 == 0 else 5
        draw.ellipse(
            [marker_x - dot_size, marker_y - dot_size,
             marker_x + dot_size, marker_y + dot_size],
            fill=WHITE,
            outline=GOLD_LIGHT
        )
        
        # Glow effect on larger markers
        if i % 3 == 0:
            draw.ellipse(
                [marker_x - dot_size - 3, marker_y - dot_size - 3,
                 marker_x + dot_size + 3, marker_y + dot_size + 3],
                outline=(*GOLD_LIGHT, 100),
                width=1
            )
    
    # ========== DATE WINDOW ==========
    date_x = case_x + 80
    date_y = dial_y - 30
    date_width = 50
    date_height = 40
    
    draw.rectangle(
        [date_x - date_width/2, date_y - date_height/2,
         date_x + date_width/2, date_y + date_height/2],
        fill=(*WHITE, 255),
        outline=(*STEEL, 255)
    )
    
    # Date text (simplified as placeholder)
    draw.text((date_x, date_y), "21", fill=BLACK_BG, anchor="mm")
    
    # ========== WATCH HANDS (Rotate as dial explodes) ==========
    hand_rotation = eased * 180
    
    # Hour hand
    hour_angle = hand_rotation - 90
    hour_length = dial_size * 0.35
    hour_end_x = case_x + hour_length * math.cos(math.radians(hour_angle))
    hour_end_y = dial_y + hour_length * math.sin(math.radians(hour_angle))
    
    draw.line([(case_x, dial_y), (hour_end_x, hour_end_y)],
             fill=(*WHITE, 255), width=7)
    
    # Minute hand
    minute_angle = hand_rotation * 1.5 - 90
    minute_length = dial_size * 0.5
    minute_end_x = case_x + minute_length * math.cos(math.radians(minute_angle))
    minute_end_y = dial_y + minute_length * math.sin(math.radians(minute_angle))
    
    draw.line([(case_x, dial_y), (minute_end_x, minute_end_y)],
             fill=(*WHITE, 255), width=5)
    
    # Second hand
    second_angle = hand_rotation * 3 - 90
    second_length = dial_size * 0.55
    second_end_x = case_x + second_length * math.cos(math.radians(second_angle))
    second_end_y = dial_y + second_length * math.sin(math.radians(second_angle))
    
    draw.line([(case_x, dial_y), (second_end_x, second_end_y)],
             fill=(*GOLD_LIGHT, 200), width=2)
    
    # Center cap
    draw.ellipse(
        [case_x - 10, dial_y - 10,
         case_x + 10, dial_y + 10],
        fill=GOLD,
        outline=GOLD_LIGHT
    )
    
    # ========== CROWN (Winding stem) ==========
    crown_y = case_y
    crown_distance = 200 + eased * 350
    crown_angle = eased * 45
    crown_x = case_x + crown_distance * math.cos(math.radians(crown_angle))
    crown_y_pos = crown_y - crown_distance * math.sin(math.radians(crown_angle))
    
    # Crown body (cylinder)
    draw.ellipse(
        [crown_x - 20, crown_y_pos - 30,
         crown_x + 20, crown_y_pos + 30],
        fill=STEEL,
        outline=STEEL_DARK
    )
    
    # Crown grip (textured)
    for i in range(-3, 4):
        draw.line([(crown_x - 15 + i * 3, crown_y_pos - 25),
                  (crown_x - 15 + i * 3, crown_y_pos + 25)],
                 fill=STEEL_DARK, width=1)
    
    # Crown guard (protective elements)
    draw.rectangle(
        [crown_x - 25, crown_y_pos - 8,
         crown_x - 22, crown_y_pos + 8],
        fill=STEEL_DARK
    )
    draw.rectangle(
        [crown_x + 22, crown_y_pos - 8,
         crown_x + 25, crown_y_pos + 8],
        fill=STEEL_DARK
    )
    
    # ========== BRACELET (Two-tone steel and gold) ==========
    bracelet_y = case_y + case_size + 20
    
    # Bracelet links (expandable during animation)
    link_count = 9
    base_spacing = 70
    explosion_spread = eased * 500
    
    for i in range(link_count):
        offset = (i - link_count // 2) * base_spacing
        link_x = case_x + offset + (explosion_spread * math.cos(i * 0.4))
        link_y = bracelet_y + (eased * 180)
        
        # Alternate steel and gold for two-tone look
        link_color = GOLD if i % 2 == 0 else STEEL
        link_outline = GOLD_LIGHT if i % 2 == 0 else STEEL_DARK
        
        # Link rectangle (3D effect with highlight)
        draw.rectangle(
            [link_x - 35, link_y - 45,
             link_x + 35, link_y + 45],
            fill=link_color,
            outline=link_outline
        )
        
        # Link detail line down center
        draw.line([(link_x - 20, link_y - 40), (link_x - 20, link_y + 40)],
                 fill=link_outline, width=1)
        draw.line([(link_x + 20, link_y - 40), (link_x + 20, link_y + 40)],
                 fill=link_outline, width=1)
        
        # Highlight on top (3D effect)
        if i % 2 == 0:
            draw.rectangle(
                [link_x - 30, link_y - 40, link_x + 30, link_y - 30],
                fill=(*GOLD_LIGHT, 100)
            )
        else:
            draw.rectangle(
                [link_x - 30, link_y - 40, link_x + 30, link_y - 30],
                fill=(*WHITE, 50)
            )
    
    # ========== INTERNAL VISIBLE COMPONENTS (During explosion) ==========
    movement_distance = 280 + eased * 550
    
    # Rotor (main oscillating weight)
    rotor_angle = eased * 90
    rotor_x = case_x + movement_distance * math.cos(math.radians(rotor_angle))
    rotor_y = case_y + movement_distance * math.sin(math.radians(rotor_angle)) - (eased * 150)
    
    rotor_size = 90
    draw.ellipse(
        [rotor_x - rotor_size, rotor_y - rotor_size,
         rotor_x + rotor_size, rotor_y + rotor_size],
        fill=GOLD,
        outline=GOLD_LIGHT
    )
    
    # Rotor gear teeth
    for tooth in range(16):
        tooth_angle = (tooth / 16) * 360 + (eased * 180)
        tooth_rad = math.radians(tooth_angle)
        tooth_distance = rotor_size + 18
        tooth_x = rotor_x + tooth_distance * math.cos(tooth_rad)
        tooth_y = rotor_y + tooth_distance * math.sin(tooth_rad)
        
        draw.ellipse(
            [tooth_x - 7, tooth_y - 7,
             tooth_x + 7, tooth_y + 7],
            fill=GOLD_LIGHT
        )
    
    # Escape wheel and other gears
    for gear_idx in range(2):
        gear_angle = (gear_idx / 2) * 180 + eased * 270
        gear_x = case_x + (180 + eased * 400) * math.cos(math.radians(gear_angle))
        gear_y = case_y + (180 + eased * 400) * math.sin(math.radians(gear_angle)) - (eased * 130)
        
        gear_size = 60
        draw.ellipse(
            [gear_x - gear_size, gear_y - gear_size,
             gear_x + gear_size, gear_y + gear_size],
            fill=STEEL_DARK,
            outline=GOLD
        )
        
        # Gear teeth
        for tooth in range(12):
            tooth_angle = (tooth / 12) * 360 - (eased * 120)
            tooth_rad = math.radians(tooth_angle)
            tooth_distance = gear_size + 12
            tooth_x = gear_x + tooth_distance * math.cos(tooth_rad)
            tooth_y = gear_y + tooth_distance * math.sin(tooth_rad)
            
            draw.rectangle(
                [tooth_x - 6, tooth_y - 6,
                 tooth_x + 6, tooth_y + 6],
                fill=GOLD
            )
    
    # ========== CRYSTAL (Sapphire dome - lifts away) ==========
    crystal_y = dial_y - int(eased * 280)
    crystal_size = dial_size - 20
    crystal_alpha = int(120 * (1 - eased * 0.4))
    
    # Crystal dome
    draw.ellipse(
        [case_x - crystal_size, crystal_y - crystal_size,
         case_x + crystal_size, crystal_y + crystal_size],
        outline=(200, 200, 255, crystal_alpha),
        width=6
    )
    
    # Crystal reflection/shine
    shine_x = case_x - crystal_size * 0.6
    shine_y = crystal_y - crystal_size * 0.6
    draw.ellipse(
        [shine_x - 40, shine_y - 40,
         shine_x + 60, shine_y + 40],
        fill=(255, 255, 255, crystal_alpha // 2)
    )
    
    # ========== PROGRESS BAR ==========
    bar_height = 10
    bar_y = FRAME_HEIGHT - 50
    bar_width = int(FRAME_WIDTH * 0.5 * eased)
    bar_x = (FRAME_WIDTH - FRAME_WIDTH * 0.5) // 2
    
    draw.rectangle(
        [bar_x, bar_y, bar_x + int(FRAME_WIDTH * 0.5), bar_y + bar_height],
        fill=(*STEEL_DARK, 255),
        outline=GOLD
    )
    draw.rectangle(
        [bar_x, bar_y, bar_x + bar_width, bar_y + bar_height],
        fill=GOLD
    )
    
    # ========== BRANDING TEXT ==========
    text_y = FRAME_HEIGHT - 90
    text = "AVIOR PRESTIGE"
    
    # Text shadow
    for offset_x in [-2, -1, 0, 1, 2]:
        for offset_y in [-2, -1, 0, 1, 2]:
            draw.text(
                (FRAME_WIDTH // 2 + offset_x, text_y + offset_y),
                text,
                fill=(*SHADOW_DARK, 150),
                anchor="mm"
            )
    
    # Main text with glow
    draw.text(
        (FRAME_WIDTH // 2, text_y),
        text,
        fill=(*GOLD_LIGHT, 255),
        anchor="mm"
    )
    
    return img

def generate_all_frames():
    """Generate all 120 photorealistic watch frames"""
    print("🎬 Generating Photorealistic Luxury Watch Frames")
    print(f"📊 Settings: {FRAME_COUNT} frames @ {FRAME_WIDTH}x{FRAME_HEIGHT} pixels")
    print(f"💾 Output: {OUTPUT_DIR}/\n")
    
    for frame_num in range(FRAME_COUNT):
        # Progress display
        progress = (frame_num + 1) / FRAME_COUNT * 100
        bar_length = 40
        filled = int(bar_length * progress / 100)
        bar = "█" * filled + "░" * (bar_length - filled)
        print(f"\r[{bar}] {progress:.1f}% ({frame_num + 1}/{FRAME_COUNT})", end="", flush=True)
        
        # Create frame
        frame_img = create_photorealistic_watch(frame_num)
        
        # Save frame
        frame_path = os.path.join(OUTPUT_DIR, f"frame_{frame_num + 1:04d}.jpg")
        frame_img.save(frame_path, quality=QUALITY, optimize=False)
    
    print("\n\n✅ Successfully generated all photorealistic frames!")
    print(f"📁 Location: {OUTPUT_DIR}/")
    print(f"💾 Frames ready for animation")

if __name__ == "__main__":
    try:
        generate_all_frames()
    except KeyboardInterrupt:
        print("\n⚠️  Generation interrupted")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
