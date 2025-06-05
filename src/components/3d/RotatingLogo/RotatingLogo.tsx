"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import Logo from "../Logo/Logo";
import { Environment } from "@react-three/drei";
import styles from "./RotatingLogo.module.scss";
import * as THREE from "three";

const NewLogo = () => {
  const logoRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (logoRef.current) {
      logoRef.current.rotation.y += delta * 0.5;
    }
  });

  return <Logo ref={logoRef} />;
};

const RotatingLogo = () => {
  return (
    <div className={styles["logo-container"]}>
      <Canvas
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          failIfMajorPerformanceCaveat: false,
        }}
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [5, 0, 0],
        }}
      >
        <Suspense fallback={null}>
          <NewLogo />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RotatingLogo;
