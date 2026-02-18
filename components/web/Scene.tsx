"use client";

import { OrbitControls, Environment } from "@react-three/drei";
import { Iphone } from "./iphone";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Section keyframes: rotY, rotX, rotZ, posY
// S1: Phone lying horizontal (landscape), charging port facing viewer
// S2: Upright, angled back+side
// S3: Upright, front display
// S4: Upright, slight tilt
// S5: Upright, 3/4 premium angle
const SECTION_KEYFRAMES = [
  { rotY: 0, rotX: Math.PI / 2, rotZ: 0, posY: 0 }, // S1: horizontal, charging port side
  { rotY: Math.PI * 1.3, rotX: 0.1, rotZ: 0, posY: 0 }, // S2: angled back+side
  { rotY: Math.PI * 2.5, rotX: 0.0, rotZ: 0, posY: 0 }, // S3: front display
  { rotY: Math.PI * 2.5, rotX: 0.2, rotZ: 0, posY: -0.3 }, // S4: slight tilt
  { rotY: Math.PI * 1.75, rotX: 0.15, rotZ: 0, posY: 0 }, // S5: 3/4 premium angle
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getTargetFromProgress(progress: number) {
  const totalSections = SECTION_KEYFRAMES.length - 1;
  const scaled = progress * totalSections;
  const sectionIndex = Math.min(Math.floor(scaled), totalSections - 1);
  const t = scaled - sectionIndex;
  const from = SECTION_KEYFRAMES[sectionIndex];
  const to = SECTION_KEYFRAMES[sectionIndex + 1];
  return {
    rotY: lerp(from.rotY, to.rotY, t),
    rotX: lerp(from.rotX, to.rotX, t),
    rotZ: lerp(from.rotZ, to.rotZ, t),
    posY: lerp(from.posY, to.posY, t),
  };
}

interface SceneProps {
  scrollProgress: number;
}

function AnimatedModel({ scrollProgress }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const target = getTargetFromProgress(scrollProgress);
    groupRef.current.rotation.y = lerp(
      groupRef.current.rotation.y,
      target.rotY,
      0.06,
    );
    groupRef.current.rotation.x = lerp(
      groupRef.current.rotation.x,
      target.rotX,
      0.06,
    );
    groupRef.current.rotation.z = lerp(
      groupRef.current.rotation.z,
      target.rotZ,
      0.06,
    );
    groupRef.current.position.y = lerp(
      groupRef.current.position.y,
      target.posY,
      0.06,
    );
  });

  return (
    <group ref={groupRef}>
      <Iphone scale={0.8} position={[0, 0, 0]} />
    </group>
  );
}

export default function Scene({ scrollProgress }: SceneProps) {
  return (
    <Suspense fallback={null}>
      {/* Soft white lighting only */}
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight
        position={[3, 8, 5]}
        intensity={1.8}
        color="#ffffff"
        castShadow
      />
      <directionalLight
        position={[-3, 4, -3]}
        intensity={0.5}
        color="#ffffff"
      />
      <directionalLight position={[0, -4, 3]} intensity={0.3} color="#ffffff" />

      <AnimatedModel scrollProgress={scrollProgress} />

      <Environment preset="city" />

      {/* Y-axis rotation only; zoom and pan disabled */}
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2 - 0.25}
        maxPolarAngle={Math.PI / 2 + 0.25}
      />
    </Suspense>
  );
}
