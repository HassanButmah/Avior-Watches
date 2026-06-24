'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface LuxuryWatchModelProps {
  scrollProgress: number;
}

function WatchHand({ rotation, length, width, height, color }: { rotation: number; length: number; width: number; height: number; color: string }) {
  return (
    <mesh rotation={[0, 0, rotation]} position={[0, 0, 0.12]}>
      <boxGeometry args={[width, length, height]} />
      <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
    </mesh>
  );
}

function HourMarker({ angle, radius }: { angle: number; radius: number }) {
  const x = Math.sin(angle) * radius;
  const y = Math.cos(angle) * radius;
  return (
    <mesh position={[x, y, 0.08]} rotation={[0, 0, -angle]}>
      <boxGeometry args={[0.04, 0.18, 0.02]} />
      <meshStandardMaterial color="#C8A96E" metalness={0.95} roughness={0.1} />
    </mesh>
  );
}

function BraceletLink({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[0.55, 0.35, 0.08]} />
      <meshStandardMaterial color="#B8B8B8" metalness={0.95} roughness={0.2} />
    </mesh>
  );
}

export default function LuxuryWatchModel({ scrollProgress }: LuxuryWatchModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const crownRef = useRef<THREE.Mesh>(null);

  const hourMarkers = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * Math.PI * 2,
      radius: 1.05,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = scrollProgress * Math.PI * 0.8 + t * 0.15;
    groupRef.current.rotation.x = -0.3 + scrollProgress * 0.4;
    groupRef.current.rotation.z = Math.sin(scrollProgress * Math.PI) * 0.1;
    if (crownRef.current) {
      crownRef.current.rotation.z = t * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} scale={1.1}>
        {/* Bracelet top */}
        {[-1.2, -1.55, -1.9].map((y, i) => (
          <BraceletLink key={`top-${i}`} position={[0, y, 0]} rotation={[0, 0, 0]} />
        ))}

        {/* Case body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.35, 1.35, 0.35, 64]} />
          <meshStandardMaterial color="#E8E8E8" metalness={0.95} roughness={0.12} envMapIntensity={1.5} />
        </mesh>

        {/* Gold bezel */}
        <mesh position={[0, 0, 0.12]}>
          <torusGeometry args={[1.28, 0.12, 16, 64]} />
          <meshStandardMaterial color="#C8A96E" metalness={0.98} roughness={0.08} envMapIntensity={2} />
        </mesh>

        {/* Bezel insert */}
        <mesh position={[0, 0, 0.14]}>
          <cylinderGeometry args={[1.15, 1.15, 0.04, 64]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Dial */}
        <mesh position={[0, 0, 0.16]}>
          <cylinderGeometry args={[1.1, 1.1, 0.02, 64]} />
          <meshStandardMaterial color="#0a1628" metalness={0.3} roughness={0.6} />
        </mesh>

        {/* Sunburst dial ring */}
        <mesh position={[0, 0, 0.17]}>
          <ringGeometry args={[0.3, 1.05, 64]} />
          <meshStandardMaterial color="#0d1f3c" metalness={0.5} roughness={0.35} side={THREE.DoubleSide} />
        </mesh>

        {/* Hour markers */}
        {hourMarkers.map((m, i) => (
          <HourMarker key={i} angle={m.angle} radius={m.radius} />
        ))}

        {/* Center pin */}
        <mesh position={[0, 0, 0.19]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
          <meshStandardMaterial color="#C8A96E" metalness={0.98} roughness={0.05} />
        </mesh>

        {/* Hands */}
        <WatchHand rotation={0} length={0.65} width={0.06} height={0.02} color="#C8A96E" />
        <WatchHand rotation={Math.PI / 3} length={0.9} width={0.04} height={0.015} color="#E8C98E" />
        <WatchHand rotation={Math.PI / 1.5} length={1.0} width={0.025} height={0.01} color="#C8A96E" />

        {/* Date window */}
        <mesh position={[0.55, -0.15, 0.18]}>
          <boxGeometry args={[0.22, 0.18, 0.02]} />
          <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.3} />
        </mesh>

        {/* Crystal */}
        <mesh position={[0, 0, 0.22]}>
          <cylinderGeometry args={[1.2, 1.2, 0.08, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.2}
            chromaticAberration={0.02}
            anisotropy={0.3}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.1}
            iridescence={0.1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
            clearcoat={1}
            attenuationDistance={0.5}
            attenuationColor="#ffffff"
            color="#ffffff"
            opacity={0.15}
            transparent
          />
        </mesh>

        {/* Crown */}
        <group position={[1.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh ref={crownRef}>
            <cylinderGeometry args={[0.12, 0.14, 0.2, 16]} />
            <meshStandardMaterial color="#C8A96E" metalness={0.98} roughness={0.1} />
          </mesh>
        </group>

        {/* Crown guards */}
        <mesh position={[1.25, 0.18, 0]}>
          <boxGeometry args={[0.08, 0.25, 0.15]} />
          <meshStandardMaterial color="#D0D0D0" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[1.25, -0.18, 0]}>
          <boxGeometry args={[0.08, 0.25, 0.15]} />
          <meshStandardMaterial color="#D0D0D0" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Bracelet bottom */}
        {[1.2, 1.55, 1.9].map((y, i) => (
          <BraceletLink key={`bot-${i}`} position={[0, y, 0]} rotation={[0, 0, 0]} />
        ))}

        {/* Lugs */}
        {[
          [0.9, 0.9, 0],
          [-0.9, 0.9, 0],
          [0.9, -0.9, 0],
          [-0.9, -0.9, 0],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]}>
            <boxGeometry args={[0.25, 0.35, 0.12]} />
            <meshStandardMaterial color="#D0D0D0" metalness={0.92} roughness={0.18} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}
