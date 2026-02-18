"use client";

import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

export function Iphone(props: any) {
  const { nodes, materials } = useGLTF("/iphone_17_pro_max_model.glb");
  const n = (key: string) => nodes[key] as THREE.Mesh;

  return (
    <group {...props} dispose={null}>
      {/* Center auto-computes the bounding box and centers the geometry at origin */}
      <Center>
        <group position={[-0.004, 2.83, 0.004]}>
          <mesh
            castShadow
            receiveShadow
            geometry={n("Object_4").geometry}
            material={materials["default"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={n("Object_5").geometry}
            material={materials.BodyLine}
          />
          <group position={[-0.001, -0.541, -0.154]}>
            <mesh
              castShadow
              receiveShadow
              geometry={n("Object_15").geometry}
              material={materials["default"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={n("Object_16").geometry}
              material={materials.Black}
            />
          </group>
          <group position={[0.004, -2.755, -0.054]}>
            <mesh
              castShadow
              receiveShadow
              geometry={n("Object_26").geometry}
              material={materials.steel}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={n("Object_27").geometry}
              material={materials.charge_chip}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={n("Object_7").geometry}
            material={materials["default"]}
            position={[-1.038, -1.388, -0.049]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={n("Object_9").geometry}
            material={materials["default"]}
            position={[0.012, 1.077, 0.068]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={n("Object_11").geometry}
            material={materials["default"]}
            position={[-0.691, 0.81, -0.085]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={n("Object_13").geometry}
            material={materials.lens}
            position={[-0.691, 1.348, 0.185]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={n("Object_18").geometry}
            material={materials["default"]}
            position={[-1.06, 0.195, -0.046]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={n("Object_20").geometry}
            material={materials.steel}
            position={[-0.217, -2.794, -0.054]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={n("Object_22").geometry}
            material={materials.sensor_flash}
            position={[0.012, 1.077, 0.068]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={n("Object_24").geometry}
            material={materials.sound_filter}
            position={[2.271, -2.772, -0.054]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={n("Object_29").geometry}
            material={materials["default"]}
            position={[1.067, 0.328, -0.046]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={n("Object_31").geometry}
            material={materials.backSheild}
            position={[0.004, -1.169, 0.057]}
          />
        </group>
      </Center>
    </group>
  );
}

useGLTF.preload("/iphone_17_pro_max_model.glb");
