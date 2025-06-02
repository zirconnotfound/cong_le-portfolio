"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { Environment, useGLTF } from "@react-three/drei";
import styles from "./RotatingLogo.module.scss";

const Logo = (props: any) => {
  const { scene } = useGLTF("/gltf/logo.glb");
  const logoRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.scale.set(0.85, 0.85, 0.85);
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
  }, [scene]);

  useFrame((state, delta) => {
    if (logoRef.current) {
      logoRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={logoRef} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload("/gltf/logo.glb");

const RotatingLogo = () => {
  return (
    <div className={styles["logo-container"]}>
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [5, 0, 0],
        }}
      >
        <Suspense fallback={null}>
          <Logo />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RotatingLogo;
