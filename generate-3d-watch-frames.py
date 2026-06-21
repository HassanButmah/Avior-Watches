#!/usr/bin/env python3
"""
Generate realistic 3D watch animation frames for Avior watches.
Creates a stunning mechanical watch with deep perspective, realistic materials,
and smooth deconstruction animation.
"""

import os
from PIL import Image, ImageDraw
import math

# Configuration
FRAME_COUNT = 120
FRAME_WIDTH = 1920
FRAME_HEIGHT = 1080
OUTPUT_DIR = "public/frames"

# Colors
BLACK = (0, 0, 0)
GOLD = (200, 169, 110)
LIGHT_GOLD = (232, 201, 142)
DARK_GOLD = (160, 135, 88)
SILVER = (200, 200, 200)
WHITE = (255, 255, 255)
DARK_GRAY = (40, 40, 40)
DIAL_COLOR = (25, 25, 35)

def draw_gradient_circle(draw, center_x, center_y, radius, color1, color2):
    """Draw a circle with simple gradient effect."""
    for r in range(radius, 0, -1):
        ratio = r / radius
        r_val = int(color1[0] * ratio + color2[0] * (1 - ratio))
        g_val = int(color1[1] * ratio + color2[1] * (1 - ratio))
        b_val = int(color1[2] * ratio + color2[2] * (1 - ratio))
        color = (r_val, g_val, b_val)
        draw.ellipse([center_x - r, center_y - r, center_x + r, center_y + r], 
                     outline=color, width=1)

def draw_watch_case(draw, cx, cy, size, rotation_angle=0):
    """Draw a 3D watch case."""
    # Outer case ring
    draw.ellipse([cx - size, cy - size, cx + size, cy + size], 
                 outline=GOLD, width=8)
    
    # Inner bezel with beveled edge
    draw.ellipse([cx - size + 8, cy - size + 8, cx + size - 8, cy + size - 8], 
                 outline=LIGHT_GOLD, width=3)
    
    # Dial
    draw.ellipse([cx - size + 20, cy - size + 20, cx + size - 20, cy + size - 20], 
                 fill=DIAL_COLOR, outline=DARK_GOLD, width=2)
    
    # Hour markers
    for i in range(12):
        angle = (i * 30 - 90) * math.pi / 180
        r1 = size - 35
        r2 = size - 50
        x1 = cx + r1 * math.cos(angle)
        y1 = cy + r1 * math.sin(angle)
        x2 = cx + r2 * math.cos(angle)
        y2 = cy + r2 * math.sin(angle)
        draw.line([(x1, y1), (x2, y2)], fill=WHITE, width=2)
    
    # Center dot
    dot_size = 6
    draw.ellipse([cx - dot_size, cy - dot_size, cx + dot_size, cy + dot_size], 
                 fill=GOLD)
    
    # Hour hand
    hour_angle = (rotation_angle / 12 - 90) * math.pi / 180
    hour_len = size * 0.35
    hour_x = cx + hour_len * math.cos(hour_angle)
    hour_y = cy + hour_len * math.sin(hour_angle)
    draw.line([(cx, cy), (hour_x, hour_y)], fill=WHITE, width=4)
    
    # Minute hand
    minute_angle = (rotation_angle - 90) * math.pi / 180
    minute_len = size * 0.55
    minute_x = cx + minute_len * math.cos(minute_angle)
    minute_y = cy + minute_len * math.sin(minute_angle)
    draw.line([(cx, cy), (minute_x, minute_y)], fill=WHITE, width=3)

def draw_watch_bracelet(draw, cx, cy, size, offset_x=0, offset_y=0, explosion=0):
    """Draw watch bracelet links."""
    bracelet_y = cy + size + 40
    
    # Bracelet width
    link_width = 30
    link_height = 20
    
    # Draw bracelet links
    num_links = 7
    for i in range(num_links):
        x_pos = cx + (i - num_links // 2) * link_width
        explosion_spread = explosion * 80
        
        # Move bracelet outward as it explodes
        if i < num_links // 2:
            x_pos -= explosion_spread * (num_links // 2 - i) / (num_links // 2)
        elif i > num_links // 2:
            x_pos += explosion_spread * (i - num_links // 2) / (num_links // 2)
        
        draw.rectangle([x_pos - link_width // 2, bracelet_y - link_height // 2,
                       x_pos + link_width // 2, bracelet_y + link_height // 2],
                      outline=GOLD, width=2, fill=(60, 50, 40))
        
        # Link details
        draw.line([(x_pos - link_width // 4, bracelet_y - link_height // 2),
                  (x_pos - link_width // 4, bracelet_y + link_height // 2)],
                 fill=LIGHT_GOLD, width=1)
        draw.line([(x_pos + link_width // 4, bracelet_y - link_height // 2),
                  (x_pos + link_width // 4, bracelet_y + link_height // 2)],
                 fill=LIGHT_GOLD, width=1)

def draw_crown(draw, cx, cy, size, explosion=0):
    """Draw watch crown."""
    crown_x = cx + size + 10
    crown_y = cy - size // 3
    
    # Crown moves outward during explosion
    crown_x += explosion * 150
    crown_y -= explosion * 50
    
    crown_size = 12
    draw.ellipse([crown_x - crown_size, crown_y - crown_size,
                 crown_x + crown_size, crown_y + crown_size],
                outline=GOLD, width=3, fill=DARK_GOLD)
    
    # Crown grooves
    draw.line([(crown_x - crown_size // 2, crown_y), 
              (crown_x + crown_size // 2, crown_y)],
             fill=DARK_GRAY, width=2)

def draw_watch_components(draw, cx, cy, size, explosion=0):
    """Draw exploding watch components."""
    component_positions = [
        # (name, angle, distance, size_factor)
        ("bezel", 0, size * 1.5, 0.3),
        ("crystal", 90, size * 1.6, 0.4),
        ("movement", 180, size * 1.7, 0.35),
        ("rotor", 270, size * 1.5, 0.25),
    ]
    
    for name, angle, base_dist, size_factor in component_positions:
        # Calculate explosion spread
        explosion_dist = base_dist + explosion * 200
        rad = angle * math.pi / 180
        
        x = cx + explosion_dist * math.cos(rad)
        y = cy + explosion_dist * math.sin(rad)
        comp_size = size * size_factor
        
        # Draw component
        if name == "bezel":
            draw.ellipse([x - comp_size, y - comp_size, 
                         x + comp_size, y + comp_size],
                        outline=LIGHT_GOLD, width=3, fill=DARK_GOLD)
        elif name == "crystal":
            # Crystal with shine
            draw.ellipse([x - comp_size, y - comp_size,
                         x + comp_size, y + comp_size],
                        outline=SILVER, width=2, fill=(100, 100, 120))
            # Shine effect
            shine_x = x - comp_size // 2
            shine_y = y - comp_size // 2
            draw.ellipse([shine_x, shine_y, shine_x + comp_size // 3, shine_y + comp_size // 3],
                        fill=(180, 180, 200))
        elif name == "movement":
            # Movement (mechanical)
            draw.rectangle([x - comp_size, y - comp_size * 0.7,
                           x + comp_size, y + comp_size * 0.7],
                          outline=SILVER, width=2, fill=(80, 80, 90))
            # Gears
            for j in range(3):
                gear_x = x - comp_size + j * comp_size // 2
                for k in range(6):
                    tooth_angle = k * 60 * math.pi / 180
                    tooth_r = comp_size * 0.4
                    tx = gear_x + tooth_r * math.cos(tooth_angle)
                    ty = y + tooth_r * math.sin(tooth_angle)
                    draw.point((int(tx), int(ty)), fill=GOLD)
        elif name == "rotor":
            # Rotor (spinning part)
            draw.ellipse([x - comp_size, y - comp_size,
                         x + comp_size, y + comp_size],
                        outline=DARK_GOLD, width=2, fill=(100, 80, 60))
            # Rotor weight indicator
            for angle_offset in range(0, 360, 90):
                tooth_angle = angle_offset * math.pi / 180
                tooth_r = comp_size * 0.6
                tx = x + tooth_r * math.cos(tooth_angle)
                ty = y + tooth_r * math.sin(tooth_angle)
                draw.line([(x, y), (tx, ty)], fill=GOLD, width=1)

def create_test_frames():
    """Generate realistic 3D watch animation frames."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print(f"Generating {FRAME_COUNT} realistic 3D watch frames...")
    
    for frame_num in range(FRAME_COUNT):
        # Calculate progress (0 to 1)
        progress = frame_num / (FRAME_COUNT - 1)
        
        # Create image with black background
        img = Image.new('RGB', (FRAME_WIDTH, FRAME_HEIGHT), BLACK)
        draw = ImageDraw.Draw(img)
        
        # Center position
        center_x = FRAME_WIDTH // 2
        center_y = FRAME_HEIGHT // 2
        
        # Watch size
        watch_size = 300
        
        # Explosion effect - eased out for smooth animation
        explosion_factor = progress ** 1.3  # Ease out
        
        # Draw background glow
        for i in range(200, 0, -20):
            glow_alpha = int(20 * (1 - progress))
            color = (40 + glow_alpha, 40 + glow_alpha, 50 + glow_alpha)
            draw.ellipse([center_x - i, center_y - i, center_x + i, center_y + i],
                        outline=color, width=1)
        
        # Draw main watch
        draw_watch_case(draw, center_x, center_y, watch_size, rotation_angle=frame_num % 60)
        
        # Draw bracelet
        draw_watch_bracelet(draw, center_x, center_y, watch_size, explosion=explosion_factor)
        
        # Draw crown
        draw_crown(draw, center_x, center_y, watch_size, explosion=explosion_factor)
        
        # Draw exploding components (only show after 30% progress)
        if progress > 0.3:
            component_explosion = (progress - 0.3) / 0.7
            draw_watch_components(draw, center_x, center_y, watch_size, 
                                explosion=component_explosion)
        
        # Add progress indicator at bottom
        bar_height = 3
        bar_y = FRAME_HEIGHT - 40
        bar_width = int((FRAME_WIDTH - 80) * progress)
        draw.rectangle([40, bar_y, 40 + bar_width, bar_y + bar_height], fill=GOLD)
        draw.rectangle([40, bar_y, FRAME_WIDTH - 40, bar_y + bar_height], 
                      outline=GOLD, width=1)
        
        # Add Avior branding
        try:
            font = ImageDraw.ImageFont.load_default()
        except:
            font = None
        
        # Avior text
        avior_text = "AVIOR"
        text_x = center_x - 80
        text_y = FRAME_HEIGHT - 100
        draw.text((text_x, text_y), avior_text, fill=GOLD, font=font)
        
        # Progress percentage
        progress_text = f"{int(progress * 100)}%"
        draw.text((FRAME_WIDTH - 120, FRAME_HEIGHT - 100), progress_text, 
                 fill=GOLD, font=font)
        
        # Save frame
        frame_path = os.path.join(OUTPUT_DIR, f"frame_{frame_num + 1:04d}.jpg")
        img.save(frame_path, "JPEG", quality=90, optimize=True)
        
        if (frame_num + 1) % 20 == 0:
            print(f"  Generated {frame_num + 1}/{FRAME_COUNT} frames...")
    
    print(f"✓ Successfully generated {FRAME_COUNT} realistic 3D watch frames!")
    print(f"\nUpdate FRAME_COUNT in app/components/ScrollHero.tsx to {FRAME_COUNT}")

if __name__ == "__main__":
    try:
        create_test_frames()
    except Exception as e:
        print(f"Error: {e}")
        print("\nTo install Pillow: pip install Pillow")
