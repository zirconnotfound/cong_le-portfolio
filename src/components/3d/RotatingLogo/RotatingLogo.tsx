import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../Logo/Logo";
import { Environment } from "@react-three/drei";
import styles from "./RotatingLogo.module.scss";
import * as THREE from "three";
import { useInView } from "react-intersection-observer";

const NewLogo = ({ active }: { active: boolean }) => {
  const logoRef = useRef<THREE.Group>(null);

  // rotation is now handled by an external RAF loop to work with frameloop='demand'
  useEffect(() => {
    if (!active || !logoRef.current) return;
    let mounted = true;
    let last = performance.now();

    const loop = () => {
      if (!mounted || !logoRef.current) return;
      const now = performance.now();
      const delta = (now - last) / 1000;
      last = now;
      logoRef.current.rotation.y += delta * 0.5;
      requestAnimationFrame(loop);
    };
    const id = requestAnimationFrame(loop);
    return () => {
      mounted = false;
      cancelAnimationFrame(id);
    };
  }, [active]);

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
          src="/img/webver.webp"
          alt="webver"
          width={1363}
          height={363}
          className={styles["webver-image"]}
        />
      </div>
      {hasEntered && (
        <Canvas
          frameloop="demand"
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
            <ActiveRender active={inView} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

function ActiveRender({ active }: { active: boolean }) {
  const { invalidate } = useThree();
  useEffect(() => {
    if (!active) return;
    let mounted = true;
    const loop = () => {
      if (!mounted) return;
      invalidate();
      requestAnimationFrame(loop);
    };
    const id = requestAnimationFrame(loop);
    return () => {
      mounted = false;
      cancelAnimationFrame(id);
    };
  }, [active, invalidate]);
  return null;
}

export default RotatingLogo;
