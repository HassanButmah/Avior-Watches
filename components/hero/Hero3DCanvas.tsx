'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import LuxuryWatchModel from './LuxuryWatchModel';
import * as THREE from 'three';

interface CameraControllerProps {
  scrollProgress: number;
}

function CameraController({ scrollProgress }: CameraControllerProps) {
  const { camera } = useThree();

  useFrame(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const targetZ = 5.5 - scrollProgress * 1.2;
    const targetY = scrollProgress * 0.5;
    const targetX = Math.sin(scrollProgress * Math.PI) * 0.3;

    cam.position.x = THREE.MathUtils.lerp(cam.position.x, targetX, 0.05);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, targetY, 0.05);
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, targetZ, 0.05);
    cam.lookAt(0, 0, 0);
  });

  return null;
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={40} />
      <CameraController scrollProgress={scrollProgress} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#C8A96E" />
      <spotLight position={[0, 5, 2]} intensity={0.8} angle={0.3} penumbra={1} color="#E8C98E" />
      <pointLight position={[2, -2, 3]} intensity={0.5} color="#C8A96E" />
      <LuxuryWatchModel scrollProgress={scrollProgress} />
      <Environment preset="city" />
    </>
  );
}

interface Hero3DCanvasProps {
  scrollProgress: number;
}

export default function Hero3DCanvas({ scrollProgress }: Hero3DCanvasProps) {
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setDpr(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
  }, []);

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}
