"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Logo from "../Logo/Logo";
import { Environment } from "@react-three/drei";
import styles from "./RotatingLogo.module.scss";

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
