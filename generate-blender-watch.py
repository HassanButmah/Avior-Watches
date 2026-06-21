#!/usr/bin/env python3
"""
Professional Blender 3D Watch Animation Generator
Generates cinematic watch deconstruction sequence at 2K resolution
For use with: blender -b -P generate-blender-watch.py

Requirements: Blender 3.0+ (open-source)
Output: 120 high-quality frames at 1920x1080 resolution
"""

import bpy
import math
from mathutils import Vector, Matrix

# ============================================================================
# CONFIGURATION
# ============================================================================
FRAME_COUNT = 120
FRAME_WIDTH = 1920
FRAME_HEIGHT = 1080
OUTPUT_DIR = "public/frames"
FRAME_START = 1
RENDER_SAMPLES = 256  # Quality samples (higher = more realistic)

# Colors
COLOR_GOLD = (0.788, 0.659, 0.431)  # #C8A96E
COLOR_DIAL = (0.098, 0.098, 0.149)  # #191923
COLOR_STEEL = (0.8, 0.8, 0.8)
COLOR_BLACK = (0.0, 0.0, 0.0)

# ============================================================================
# SETUP SCENE
# ============================================================================
def setup_scene():
    """Initialize Blender scene with proper settings"""
    # Clear default objects
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    
    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    scene.render.resolution_x = FRAME_WIDTH
    scene.render.resolution_y = FRAME_HEIGHT
    scene.render.resolution_percentage = 100
    scene.render.filepath = f"{OUTPUT_DIR}/frame_"
    scene.cycles.samples = RENDER_SAMPLES
    scene.cycles.use_denoising = True
    scene.frame_start = FRAME_START
    scene.frame_end = FRAME_COUNT
    
    # World/Environment
    world = bpy.data.worlds["World"]
    world.use_nodes = True
    bg = world.node_tree.nodes["Background"]
    bg.inputs[0].default_value = (*COLOR_BLACK, 1.0)
    bg.inputs[1].default_value = 1.0

# ============================================================================
# LIGHTING
# ============================================================================
def setup_lighting():
    """Create professional 3-point lighting"""
    
    # Key Light (bright directional)
    key_light = bpy.data.lights.new(name="KeyLight", type='SUN')
    key_light.energy = 2.5
    key_light.angle = math.radians(15)
    key_light_obj = bpy.data.objects.new("KeyLight", key_light)
    bpy.context.collection.objects.link(key_light_obj)
    key_light_obj.location = (5, 3, 8)
    key_light_obj.rotation_euler = (math.radians(45), math.radians(-45), 0)
    
    # Fill Light (softer)
    fill_light = bpy.data.lights.new(name="FillLight", type='AREA')
    fill_light.energy = 1.2
    fill_light.size = 6
    fill_light_obj = bpy.data.objects.new("FillLight", fill_light)
    bpy.context.collection.objects.link(fill_light_obj)
    fill_light_obj.location = (-4, 2, 6)
    
    # Rim Light (behind for depth)
    rim_light = bpy.data.lights.new(name="RimLight", type='SUN')
    rim_light.energy = 1.0
    rim_light_obj = bpy.data.objects.new("RimLight", rim_light)
    bpy.context.collection.objects.link(rim_light_obj)
    rim_light_obj.location = (0, -2, 4)
    rim_light_obj.rotation_euler = (math.radians(135), 0, 0)

# ============================================================================
# MATERIALS
# ============================================================================
def create_material(name, color, metallic=0.5, roughness=0.3):
    """Create a realistic material"""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    return mat

# ============================================================================
# WATCH COMPONENTS - 3D MESH GEOMETRY
# ============================================================================
def create_watch_case():
    """Create the watch case (circular bezel)"""
    bpy.ops.mesh.primitive_cylinder_add(
        radius=1.0,
        depth=0.15,
        location=(0, 0, 0)
    )
    case = bpy.context.active_object
    case.name = "WatchCase"
    
    # Material: brushed steel
    mat = create_material("CaseMaterial", COLOR_STEEL, metallic=0.8, roughness=0.2)
    case.data.materials.append(mat)
    
    # Chamfer edges for realism
    bpy.context.view_layer.objects.active = case
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.bevel(weight=0.05, segments=3)
    bpy.ops.object.mode_set(mode='OBJECT')
    
    return case

def create_dial():
    """Create the watch dial (face)"""
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.95,
        depth=0.02,
        location=(0, 0, 0.1)
    )
    dial = bpy.context.active_object
    dial.name = "Dial"
    
    mat = create_material("DialMaterial", COLOR_DIAL, metallic=0.3, roughness=0.1)
    dial.data.materials.append(mat)
    
    return dial

def create_hour_markers():
    """Create 12 hour markers around the dial"""
    markers = []
    for i in range(12):
        angle = (i / 12) * 2 * math.pi
        x = 0.85 * math.cos(angle)
        y = 0.85 * math.sin(angle)
        
        bpy.ops.mesh.primitive_cube_add(
            size=0.08,
            location=(x, y, 0.12)
        )
        marker = bpy.context.active_object
        marker.name = f"Marker{i}"
        marker.scale = (0.15, 0.08, 0.04)
        
        mat = create_material(f"MarkerMat{i}", COLOR_GOLD, metallic=0.9, roughness=0.15)
        marker.data.materials.append(mat)
        markers.append(marker)
    
    return markers

def create_hands():
    """Create hour and minute hands"""
    # Hour hand
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0.15))
    hour_hand = bpy.context.active_object
    hour_hand.name = "HourHand"
    hour_hand.scale = (0.12, 0.35, 0.05)
    
    mat = create_material("HandMaterial", COLOR_STEEL, metallic=0.85, roughness=0.1)
    hour_hand.data.materials.append(mat)
    
    # Minute hand
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0.16))
    minute_hand = bpy.context.active_object
    minute_hand.name = "MinuteHand"
    minute_hand.scale = (0.1, 0.5, 0.05)
    minute_hand.data.materials.append(mat)
    
    return hour_hand, minute_hand

def create_crown():
    """Create the crown (winding mechanism)"""
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.15,
        depth=0.2,
        location=(1.05, 0, 0.05)
    )
    crown = bpy.context.active_object
    crown.name = "Crown"
    crown.rotation_euler = (0, math.radians(90), 0)
    
    mat = create_material("CrownMaterial", COLOR_STEEL, metallic=0.7, roughness=0.3)
    crown.data.materials.append(mat)
    
    return crown

def create_bracelet():
    """Create bracelet links"""
    links = []
    for i in range(7):
        x_offset = (i - 3) * 0.4
        
        bpy.ops.mesh.primitive_cube_add(
            size=1,
            location=(x_offset, -1.2, 0)
        )
        link = bpy.context.active_object
        link.name = f"BraceletLink{i}"
        link.scale = (0.25, 0.35, 0.15)
        
        mat = create_material(f"BraceletMat{i}", COLOR_STEEL, metallic=0.8, roughness=0.2)
        link.data.materials.append(mat)
        links.append(link)
    
    return links

def create_crystal():
    """Create sapphire crystal dome"""
    bpy.ops.mesh.primitive_uv_sphere_add(
        radius=1.0,
        location=(0, 0, 0.3)
    )
    crystal = bpy.context.active_object
    crystal.name = "Crystal"
    crystal.scale = (0.92, 0.92, 0.35)
    
    mat = bpy.data.materials.new(name="CrystalMaterial")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (0.95, 0.95, 1.0, 0.8)
    bsdf.inputs["Metallic"].default_value = 0.0
    bsdf.inputs["Roughness"].default_value = 0.05
    bsdf.inputs["IOR"].default_value = 1.52  # Sapphire IOR
    mat.blend_method = 'BLEND'
    crystal.data.materials.append(mat)
    
    return crystal

def create_movement():
    """Create visible movement mechanism (gears, rotor)"""
    components = []
    
    # Main rotor
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.6,
        depth=0.1,
        location=(0, 0, -0.3)
    )
    rotor = bpy.context.active_object
    rotor.name = "Rotor"
    
    mat = create_material("RotorMaterial", COLOR_GOLD, metallic=0.7, roughness=0.2)
    rotor.data.materials.append(mat)
    components.append(rotor)
    
    # Decorative gears
    for i in range(3):
        angle = (i / 3) * 2 * math.pi
        x = 0.4 * math.cos(angle)
        y = 0.4 * math.sin(angle)
        
        bpy.ops.mesh.primitive_cylinder_add(
            radius=0.2,
            depth=0.08,
            location=(x, y, -0.35)
        )
        gear = bpy.context.active_object
        gear.name = f"Gear{i}"
        gear.data.materials.append(mat)
        components.append(gear)
    
    return components

# ============================================================================
# ANIMATION & EXPLOSION
# ============================================================================
def animate_explosion(objects_dict, frame_count):
    """Animate watch components exploding outward"""
    
    for frame in range(frame_count):
        # Progress: 0 to 1
        progress = frame / (frame_count - 1)
        
        # Eased explosion (ease out cubic)
        explosion_factor = 1 - (1 - progress) ** 3
        
        # -------- CASE & DIAL (stay mostly centered) --------
        case = objects_dict['case']
        case.location = (0, 0, 0)
        case.keyframe_insert(data_path="location", frame=frame)
        
        dial = objects_dict['dial']
        dial.location = (0, 0, 0.1 + explosion_factor * 0.2)
        dial.keyframe_insert(data_path="location", frame=frame)
        
        # -------- CRYSTAL (rises up) --------
        crystal = objects_dict['crystal']
        crystal.location = (0, 0, 0.3 + explosion_factor * 1.5)
        crystal.keyframe_insert(data_path="location", frame=frame)
        
        # -------- CROWN (shoots to right) --------
        crown = objects_dict['crown']
        crown.location = (1.05 + explosion_factor * 2.0, explosion_factor * 0.8, 0.05 + explosion_factor * 0.5)
        crown.keyframe_insert(data_path="location", frame=frame)
        
        # -------- HANDS (rotate & lift) --------
        hour_hand = objects_dict['hour_hand']
        hour_hand.rotation_euler = (0, 0, math.radians(explosion_factor * 45))
        hour_hand.location = (0, 0, 0.15 + explosion_factor * 1.2)
        hour_hand.keyframe_insert(data_path="location", frame=frame)
        hour_hand.keyframe_insert(data_path="rotation_euler", frame=frame)
        
        minute_hand = objects_dict['minute_hand']
        minute_hand.rotation_euler = (0, 0, math.radians(-explosion_factor * 60))
        minute_hand.location = (0, 0, 0.16 + explosion_factor * 1.5)
        minute_hand.keyframe_insert(data_path="location", frame=frame)
        minute_hand.keyframe_insert(data_path="rotation_euler", frame=frame)
        
        # -------- BRACELET LINKS (spread horizontally) --------
        for i, link in enumerate(objects_dict['bracelet_links']):
            center_offset = (i - 3) * 0.4
            spread = explosion_factor * 3.5
            link.location = (center_offset + spread * math.cos(i * 45 * math.pi / 180), 
                            -1.2 - spread * math.sin(i * 45 * math.pi / 180),
                            explosion_factor * 1.0)
            link.keyframe_insert(data_path="location", frame=frame)
        
        # -------- MOVEMENT COMPONENTS (radiate outward) --------
        rotor = objects_dict['rotor']
        rotor.location = (explosion_factor * 1.8, explosion_factor * 1.8, -0.3)
        rotor.rotation_euler = (0, 0, frame * 0.1)  # Spin
        rotor.keyframe_insert(data_path="location", frame=frame)
        rotor.keyframe_insert(data_path="rotation_euler", frame=frame)
        
        for i, gear in enumerate(objects_dict['gears']):
            angle = (i / 3) * 2 * math.pi
            distance = 0.4 + explosion_factor * 2.5
            gear.location = (distance * math.cos(angle), 
                            distance * math.sin(angle), 
                            -0.35 + explosion_factor * 1.2)
            gear.rotation_euler = (frame * 0.15, frame * 0.1, angle)
            gear.keyframe_insert(data_path="location", frame=frame)
            gear.keyframe_insert(data_path="rotation_euler", frame=frame)

# ============================================================================
# CAMERA SETUP
# ============================================================================
def setup_camera():
    """Setup cinematic camera"""
    bpy.ops.object.camera_add(location=(0, -3.5, 1.8))
    camera = bpy.context.active_object
    camera.name = "CinematicCamera"
    
    # Point at watch (0,0,0)
    direction = Vector((0, 0, 0)) - Vector(camera.location)
    rot_quat = direction.to_track_quat('-Z', 'Y')
    camera.rotation_euler = rot_quat.to_euler()
    
    bpy.context.scene.camera = camera
    camera.data.lens = 50  # 50mm lens
    camera.data.sensor_width = 36

# ============================================================================
# MAIN EXECUTION
# ============================================================================
def main():
    print("🎬 Starting Blender Watch Animation Generation...")
    
    setup_scene()
    setup_lighting()
    setup_camera()
    
    print("📦 Creating watch components...")
    
    objects_dict = {
        'case': create_watch_case(),
        'dial': create_dial(),
        'markers': create_hour_markers(),
        'hour_hand': create_hands()[0],
        'minute_hand': create_hands()[1],
        'crown': create_crown(),
        'bracelet_links': create_bracelet(),
        'crystal': create_crystal(),
        'rotor': create_movement()[0],
        'gears': create_movement()[1:],
    }
    
    print("⚙️ Animating explosion sequence...")
    animate_explosion(objects_dict, FRAME_COUNT)
    
    print(f"🎥 Rendering {FRAME_COUNT} frames...")
    bpy.ops.render.render(animation=True, write_still=True)
    
    print(f"✅ Successfully generated {FRAME_COUNT} watch animation frames!")
    print(f"📁 Output: {OUTPUT_DIR}/")

# ============================================================================
if __name__ == "__main__":
    main()
