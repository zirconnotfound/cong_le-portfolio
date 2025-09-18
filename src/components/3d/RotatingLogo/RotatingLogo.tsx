import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../Logo/Logo";
import { Environment } from "@react-three/drei";
import styles from "./RotatingLogo.module.scss";
import * as THREE from "three";
import { useInView } from "react-intersection-observer";

const NewLogo = ({ active }: { active: boolean }) => {
  const logoRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (active && logoRef.current) {
      logoRef.current.rotation.y += delta * 0.5;
    }
  });

  useEffect(() => {
    if (logoRef.current) {
      logoRef.current.scale.set(1.2, 1.2, 1.2);
    }
  }, []);

  return <Logo ref={logoRef} />;
};

const RotatingLogo = () => {
  const { ref, inView } = useInView({
    rootMargin: "48px 0px 0px 0px",
    threshold: 0,
    triggerOnce: false,
  });

  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (inView) setHasEntered(true);
  }, [inView]);

  return (
    <div className={styles["logo-container"]} ref={ref}>
      <div className={styles["webver"]}>
        <Image
          src="/img/webver.png"
          alt="webver"
          width={1363}
          height={363}
          className={styles["webver-image"]}
        />
      </div>
      {hasEntered && (
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
            position: [6.5, 1.2, 0],
          }}
        >
          <Suspense fallback={null}>
            <NewLogo active={inView} />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default RotatingLogo;
