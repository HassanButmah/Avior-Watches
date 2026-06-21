#!/usr/bin/env python3
"""
Advanced 3D Watch Animation Frame Generator
Professional cinematic watch deconstruction - NO BLENDER NEEDED
Uses advanced rendering techniques for premium quality frames
"""

import os
import math
import json
from PIL import Image, ImageDraw, ImageFilter
import random

# Configuration
FRAME_COUNT = 120
FRAME_WIDTH = 1920
FRAME_HEIGHT = 1080
OUTPUT_DIR = "public/frames"
QUALITY = 95
DPI = 300

# Premium Colors
GOLD = "#C8A96E"
GOLD_LIGHT = "#E8C98E"
STEEL = "#CCCCCC"
STEEL_DARK = "#888888"
DIAL_BG = "#191923"
BLACK_BG = "#000000"
SHADOW = "#1a1a1a"

os.makedirs(OUTPUT_DIR, exist_ok=True)

def ease_out_cubic(t):
    """Smooth easing function for natural animation"""
    return 1 - (1 - t) ** 3

def ease_in_out_quad(t):
    """Smooth in-out easing"""
    if t < 0.5:
        return 2 * t * t
    return -1 + (4 - 2 * t) * t

def draw_circle_with_gradient(draw, center, radius, color_inner, color_outer, steps=20):
    """Draw a circle with gradient effect"""
    x, y = center
    for i in range(steps, 0, -1):
        r = int(radius * (i / steps))
        # Interpolate color
        ratio = (steps - i) / steps
        color = tuple(
            int(c_inner * (1 - ratio) + c_outer * ratio)
            for c_inner, c_outer in zip(
                tuple(int(color_inner[j:j+2], 16) for j in (1, 3, 5)),
                tuple(int(color_outer[j:j+2], 16) for j in (1, 3, 5))
            )
        )
        draw.ellipse([x - r, y - r, x + r, y + r], outline=f"#{color[0]:02x}{color[1]:02x}{color[2]:02x}")

def create_case_shadow(img, x, y, size, progress):
    """Create dynamic shadow under case based on explosion progress"""
    shadow_img = Image.new('RGBA', (img.width, img.height), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow_img)
    
    shadow_alpha = int(80 * (1 - progress * 0.7))
    shadow_size = size * (1.2 + progress * 0.5)
    shadow_blur = int(15 + progress * 20)
    
    shadow_draw.ellipse(
        [x - shadow_size, y + size * 0.3, x + shadow_size, y + size * 0.5],
        fill=(0, 0, 0, shadow_alpha)
    )
    
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(radius=shadow_blur))
    return shadow_img

def create_frame(frame_num):
    """Generate a single animation frame"""
    # Progress: 0 (assembled) to 1 (fully exploded)
    progress = frame_num / (FRAME_COUNT - 1)
    
    # Eased progress for smoother animation
    eased = ease_out_cubic(progress)
    
    # Create base image
    img = Image.new('RGB', (FRAME_WIDTH, FRAME_HEIGHT), BLACK_BG)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    center_x = FRAME_WIDTH // 2
    center_y = FRAME_HEIGHT // 2
    
    # ========== BACKGROUND ELEMENTS ==========
    # Subtle radial glow
    glow_size = int(400 + eased * 200)
    for i in range(50, 0, -1):
        alpha = int(3 * (50 - i) / 50)
        radius = int(glow_size * (i / 50))
        draw.ellipse(
            [center_x - radius, center_y - radius, center_x + radius, center_y + radius],
            outline=(200, 169, 110, alpha)
        )
    
    # ========== WATCH CASE (stays mostly centered) ==========
    case_size = 280
    case_x = center_x
    case_y = center_y + int(eased * 50)
    
    # Shadow
    shadow = create_case_shadow(img, case_x, case_y, case_size // 2, eased)
    img = Image.alpha_composite(img.convert('RGBA'), shadow).convert('RGB')
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Case ring (3D effect with shading)
    draw.ellipse(
        [case_x - case_size, case_y - case_size, case_x + case_size, case_y + case_size],
        outline=STEEL,
        width=12
    )
    draw.ellipse(
        [case_x - case_size + 6, case_y - case_size + 6, case_x + case_size - 6, case_y + case_size - 6],
        outline=STEEL_DARK,
        width=2
    )
    
    # ========== DIAL (lifts up during explosion) ==========
    dial_size = case_size - 20
    dial_y = case_y - int(eased * 100)
    
    # Dial background
    draw.ellipse(
        [case_x - dial_size, dial_y - dial_size, case_x + dial_size, dial_y + dial_size],
        fill=DIAL_BG,
        outline=STEEL_DARK
    )
    
    # Hour markers (gold)
    marker_distance = dial_size - 40
    for i in range(12):
        angle = (i / 12) * 2 * math.pi - math.pi / 2
        marker_x = case_x + marker_distance * math.cos(angle)
        marker_y = dial_y + marker_distance * math.sin(angle)
        
        marker_size = 12 if i % 3 == 0 else 8
        draw.rectangle(
            [marker_x - marker_size, marker_y - marker_size, marker_x + marker_size, marker_y + marker_size],
            fill=GOLD_LIGHT
        )
    
    # Watch hands (rotate as dial explodes)
    hand_angle = eased * math.pi / 3  # Rotate during explosion
    
    # Hour hand
    hour_length = dial_size * 0.4
    hour_end_x = case_x + hour_length * math.cos(hand_angle)
    hour_end_y = dial_y + hour_length * math.sin(hand_angle)
    draw.line([(case_x, dial_y), (hour_end_x, hour_end_y)], fill=STEEL, width=6)
    
    # Minute hand
    minute_angle = hand_angle - math.pi / 6
    minute_length = dial_size * 0.55
    minute_end_x = case_x + minute_length * math.cos(minute_angle)
    minute_end_y = dial_y + minute_length * math.sin(minute_angle)
    draw.line([(case_x, dial_y), (minute_end_x, minute_end_y)], fill=STEEL, width=4)
    
    # Center cap
    draw.ellipse(
        [case_x - 8, dial_y - 8, case_x + 8, dial_y + 8],
        fill=GOLD
    )
    
    # ========== CRYSTAL (rises and floats away) ==========
    crystal_y = case_y - int(eased * 250)
    crystal_size = dial_size - 30
    crystal_alpha = int(100 * (1 - eased * 0.3))
    
    draw.ellipse(
        [case_x - crystal_size, crystal_y - crystal_size, case_x + crystal_size, crystal_y + crystal_size],
        outline=(220, 220, 255, crystal_alpha),
        width=8
    )
    
    # Crystal shine
    shine_x = case_x - crystal_size // 2
    shine_y = crystal_y - crystal_size // 2
    draw.ellipse(
        [shine_x - 20, shine_y - 20, shine_x + 40, shine_y + 40],
        fill=(255, 255, 255, crystal_alpha // 2)
    )
    
    # ========== CROWN (shoots to the right and up) ==========
    crown_distance = 200 + eased * 400
    crown_angle = eased * math.pi / 4  # Angle up
    crown_x = case_x + crown_distance * math.cos(crown_angle)
    crown_y = case_y - crown_distance * math.sin(crown_angle)
    
    # Crown with 3D effect
    draw.ellipse(
        [crown_x - 25, crown_y - 35, crown_x + 25, crown_y + 35],
        fill=GOLD,
        outline=GOLD_LIGHT,
        width=3
    )
    draw.rectangle(
        [crown_x - 20, crown_y - 30, crown_x + 20, crown_y - 15],
        fill=STEEL
    )
    
    # ========== BRACELET LINKS (spread horizontally) ==========
    bracelet_y = case_y + case_size + 30
    link_count = 7
    base_spread = 150
    explosion_spread = eased * 600
    
    for i in range(link_count):
        offset = (i - link_count // 2) * 80
        link_x = case_x + offset + (explosion_spread * math.cos(i * 0.5))
        link_y = bracelet_y + (eased * 150)
        
        # Link rectangle
        draw.rectangle(
            [link_x - 30, link_y - 40, link_x + 30, link_y + 40],
            fill=STEEL,
            outline=STEEL_DARK,
            width=2
        )
        
        # Link detail
        draw.line([(link_x - 20, link_y), (link_x + 20, link_y)], fill=STEEL_DARK, width=1)
    
    # ========== MOVEMENT COMPONENTS (radiate outward) ==========
    movement_distance = 300 + eased * 500
    
    # Rotor (main circular component)
    rotor_angle = eased * math.pi / 3
    rotor_x = case_x + movement_distance * math.cos(rotor_angle)
    rotor_y = case_y + movement_distance * math.sin(rotor_angle) - (eased * 150)
    
    # Draw rotor with gear teeth
    rotor_size = 80
    draw.ellipse(
        [rotor_x - rotor_size, rotor_y - rotor_size, rotor_x + rotor_size, rotor_y + rotor_size],
        fill=GOLD,
        outline=GOLD_LIGHT,
        width=3
    )
    
    # Gear teeth
    for tooth in range(12):
        tooth_angle = (tooth / 12) * 2 * math.pi + (eased * math.pi / 2)
        tooth_distance = rotor_size + 15
        tooth_x = rotor_x + tooth_distance * math.cos(tooth_angle)
        tooth_y = rotor_y + tooth_distance * math.sin(tooth_angle)
        draw.ellipse(
            [tooth_x - 8, tooth_y - 8, tooth_x + 8, tooth_y + 8],
            fill=GOLD_LIGHT
        )
    
    # Decorative gears (3 more)
    for i in range(3):
        gear_angle = (i / 3) * 2 * math.pi + eased * math.pi
        gear_x = case_x + (200 + eased * 450) * math.cos(gear_angle)
        gear_y = case_y + (200 + eased * 450) * math.sin(gear_angle) - (eased * 120)
        
        gear_size = 50
        draw.ellipse(
            [gear_x - gear_size, gear_y - gear_size, gear_x + gear_size, gear_y + gear_size],
            fill=STEEL_DARK,
            outline=GOLD,
            width=2
        )
        
        # Gear teeth
        for tooth in range(8):
            tooth_angle = (tooth / 8) * 2 * math.pi - (eased * math.pi / 3)
            tooth_distance = gear_size + 10
            tooth_x = gear_x + tooth_distance * math.cos(tooth_angle)
            tooth_y = gear_y + tooth_distance * math.sin(tooth_angle)
            draw.rectangle(
                [tooth_x - 5, tooth_y - 5, tooth_x + 5, tooth_y + 5],
                fill=GOLD
            )
    
    # ========== BEZEL (rotates and moves) ==========
    bezel_angle = eased * math.pi / 2
    bezel_distance = 150 + eased * 200
    bezel_x = case_x + bezel_distance * math.cos(bezel_angle)
    bezel_y = case_y - bezel_distance * math.sin(bezel_angle)
    
    bezel_size = 100
    draw.ellipse(
        [bezel_x - bezel_size, bezel_y - bezel_size, bezel_x + bezel_size, bezel_y + bezel_size],
        outline=STEEL,
        width=8
    )
    
    # Inner ring
    draw.ellipse(
        [bezel_x - bezel_size + 15, bezel_y - bezel_size + 15, 
         bezel_x + bezel_size - 15, bezel_y + bezel_size - 15],
        outline=GOLD,
        width=3
    )
    
    # ========== PROGRESS BAR (at bottom) ==========
    bar_height = 8
    bar_y = FRAME_HEIGHT - 40
    bar_width = int(FRAME_WIDTH * 0.6 * eased)
    bar_x = (FRAME_WIDTH - FRAME_WIDTH * 0.6) // 2
    
    draw.rectangle(
        [bar_x, bar_y, bar_x + int(FRAME_WIDTH * 0.6), bar_y + bar_height],
        fill=STEEL_DARK,
        outline=GOLD
    )
    draw.rectangle(
        [bar_x, bar_y, bar_x + bar_width, bar_y + bar_height],
        fill=GOLD
    )
    
    # ========== TEXT OVERLAY (with gradient effect) ==========
    text_y = FRAME_HEIGHT - 80
    text = "AVIOR"
    text_color = (200, 169, 110, int(150 * (1 - eased * 0.3)))
    
    # Draw text with subtle outline effect
    for offset in range(-2, 3):
        draw.text(
            (FRAME_WIDTH // 2 + offset, text_y),
            text,
            fill=(30, 30, 30, 80),
            anchor="mm",
            font=None
        )
    
    draw.text(
        (FRAME_WIDTH // 2, text_y),
        text,
        fill=text_color,
        anchor="mm",
        font=None
    )
    
    return img

def generate_all_frames():
    """Generate all 120 animation frames"""
    print("🎬 Generating Professional 3D Watch Animation Frames")
    print(f"📊 Settings: {FRAME_COUNT} frames @ {FRAME_WIDTH}x{FRAME_HEIGHT} pixels")
    print(f"💾 Output: {OUTPUT_DIR}/\n")
    
    for frame_num in range(FRAME_COUNT):
        # Show progress
        progress = (frame_num + 1) / FRAME_COUNT * 100
        bar_length = 40
        filled = int(bar_length * progress / 100)
        bar = "█" * filled + "░" * (bar_length - filled)
        print(f"\r[{bar}] {progress:.1f}% ({frame_num + 1}/{FRAME_COUNT})", end="", flush=True)
        
        # Create frame
        frame_img = create_frame(frame_num)
        
        # Save frame
        frame_path = os.path.join(OUTPUT_DIR, f"frame_{frame_num + 1:04d}.jpg")
        frame_img.save(frame_path, quality=QUALITY, optimize=False)
    
    print("\n\n✅ Successfully generated all frames!")
    print(f"📁 Location: {OUTPUT_DIR}/")
    print(f"💾 Total size: ~{os.path.getsize(OUTPUT_DIR) / 1024 / 1024:.1f}MB")

if __name__ == "__main__":
    try:
        generate_all_frames()
    except KeyboardInterrupt:
        print("\n⚠️  Generation interrupted by user")
    except Exception as e:
        print(f"\n❌ Error: {e}")
