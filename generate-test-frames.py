#!/usr/bin/env python3
"""
Generate placeholder test frames for the Rolex watch animation.
This creates simple frames that transition from assembled to exploded view.
"""

import os
from PIL import Image, ImageDraw, ImageFont
import math

# Configuration
FRAME_COUNT = 96
FRAME_WIDTH = 1920
FRAME_HEIGHT = 1080
OUTPUT_DIR = "public/frames"

# Colors
BLACK = (0, 0, 0)
GOLD = (200, 169, 110)
WHITE = (255, 255, 255)
DARK_GRAY = (30, 30, 30)

def create_test_frames():
    """Generate test animation frames."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print(f"Generating {FRAME_COUNT} test frames...")
    
    for frame_num in range(FRAME_COUNT):
        # Calculate progress (0 to 1)
        progress = frame_num / (FRAME_COUNT - 1)
        
        # Create image with black background
        img = Image.new('RGB', (FRAME_WIDTH, FRAME_HEIGHT), BLACK)
        draw = ImageDraw.Draw(img)
        
        # Draw animated watch representation
        center_x = FRAME_WIDTH // 2
        center_y = FRAME_HEIGHT // 2
        
        # Base watch circle (assembled at start, explodes as we progress)
        watch_radius = 200
        
        # Calculate explosion effect - parts move outward
        explosion_factor = progress ** 1.5  # Ease out effect
        
        # Main watch body (center)
        body_offset = explosion_factor * 150
        body_x = center_x + body_offset * math.cos(0)
        body_y = center_y + body_offset * math.sin(0)
        draw.ellipse(
            [body_x - watch_radius, body_y - watch_radius,
             body_x + watch_radius, body_y + watch_radius],
            outline=GOLD, width=3
        )
        
        # Bezel (top)
        bezel_offset = explosion_factor * 250
        bezel_x = center_x
        bezel_y = center_y - bezel_offset
        draw.ellipse(
            [bezel_x - 180, bezel_y - 30,
             bezel_x + 180, bezel_y + 30],
            outline=GOLD, width=2
        )
        
        # Crystal (right)
        crystal_offset = explosion_factor * 280
        crystal_x = center_x + crystal_offset
        crystal_y = center_y
        draw.ellipse(
            [crystal_x - 120, crystal_y - 120,
             crystal_x + 120, crystal_y + 120],
            outline=GOLD, width=2
        )
        
        # Movement (bottom)
        movement_offset = explosion_factor * 300
        movement_x = center_x
        movement_y = center_y + movement_offset
        draw.rectangle(
            [movement_x - 100, movement_y - 80,
             movement_x + 100, movement_y + 80],
            outline=GOLD, width=2
        )
        
        # Bracelet parts (left and right)
        bracelet_offset = explosion_factor * 320
        bracelet_x_left = center_x - bracelet_offset
        bracelet_x_right = center_x + bracelet_offset
        draw.rectangle(
            [bracelet_x_left - 40, center_y - 150,
             bracelet_x_left + 40, center_y + 150],
            outline=GOLD, width=2
        )
        draw.rectangle(
            [bracelet_x_right - 40, center_y - 150,
             bracelet_x_right + 40, center_y + 150],
            outline=GOLD, width=2
        )
        
        # Add frame counter text
        try:
            # Try to use a built-in font
            font = ImageFont.load_default()
        except:
            font = None
        
        progress_percent = int(progress * 100)
        text = f"Frame {frame_num + 1}/{FRAME_COUNT} ({progress_percent}%)"
        text_bbox = draw.textbbox((0, 0), text, font=font)
        text_width = text_bbox[2] - text_bbox[0]
        text_x = FRAME_WIDTH - text_width - 40
        text_y = FRAME_HEIGHT - 60
        
        draw.text((text_x, text_y), text, fill=GOLD, font=font)
        
        # Add progress bar at bottom
        bar_height = 4
        bar_y = FRAME_HEIGHT - 20
        bar_width = int((FRAME_WIDTH - 80) * progress)
        draw.rectangle(
            [40, bar_y, 40 + bar_width, bar_y + bar_height],
            fill=GOLD
        )
        draw.rectangle(
            [40, bar_y, FRAME_WIDTH - 40, bar_y + bar_height],
            outline=GOLD, width=1
        )
        
        # Save frame
        frame_path = os.path.join(OUTPUT_DIR, f"frame_{frame_num + 1:04d}.jpg")
        img.save(frame_path, "JPEG", quality=85, optimize=True)
        
        if (frame_num + 1) % 10 == 0:
            print(f"  Generated {frame_num + 1}/{FRAME_COUNT} frames...")
    
    print(f"✓ Successfully generated {FRAME_COUNT} test frames in {OUTPUT_DIR}/")
    print(f"\nUpdate FRAME_COUNT in app/components/ScrollHero.tsx to {FRAME_COUNT}")
    print("Then reload the page and scroll to see the watch animation!")

if __name__ == "__main__":
    try:
        create_test_frames()
    except Exception as e:
        print(f"Error: {e}")
        print("\nTo install Pillow (required): pip install Pillow")
