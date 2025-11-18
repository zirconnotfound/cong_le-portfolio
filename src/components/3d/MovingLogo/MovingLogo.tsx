/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { a, useSpring } from "@react-spring/three";
import * as THREE from "three";
import { Environment, Lightformer } from "@react-three/drei";
import Logo from "../Logo/Logo";

const MovingLogo = ({ isClicked }: { isClicked: boolean }) => {
  const logoRef = useRef<THREE.Group | null>(null);
  //   const { viewport } = useThree();

  const startRotation = [
    (146 / 180) * Math.PI,
    (-16 / 180) * Math.PI,
    (-201 / 180) * Math.PI,
  ];
  const endRotation = [
    (138 / 180) * Math.PI,
    (16 / 180) * Math.PI,
    (-152 / 180) * Math.PI,
  ];

  // top-level spring for rotation so toggling `isClicked` interpolates smoothly
  const { rotation: rotationSpring } = useSpring({
    rotation: isClicked ? endRotation : startRotation,
    config: { mass: 1, tension: 140, friction: 46 },
  });

  // Responsive wrapper component that adjusts scale on mobile
  function ResponsiveLogo({
    isClicked,
    logoRef,
  }: {
    isClicked: boolean;
    logoRef: React.RefObject<THREE.Group | null>;
  }) {
    const { size, invalidate } = useThree();

    // determine a scale factor based on viewport width (pixels)
    const isMobile = size.width <= 768;
    const targetScale = isMobile ? 0.6 : 1.2;

    const { scale } = useSpring({
      scale: [targetScale, targetScale, targetScale],
      config: { mass: 1, tension: 140, friction: 46 },
    });

    // subscribe to spring updates so we invalidate the canvas only while springs animate
    // this allows us to keep frameloop="demand" for better perf
    useEffect(() => {
      // try to subscribe to animated value changes; react-spring animated values expose onChange
      const rotAny = rotationSpring as any;
      const scaleAny = scale as any;
      let unsubRot: (() => void) | undefined;
      let unsubScale: (() => void) | undefined;

      if (rotAny && typeof rotAny.onChange === "function") {
        unsubRot = rotAny.onChange(() => invalidate());
      }
      if (scaleAny && typeof scaleAny.onChange === "function") {
        unsubScale = scaleAny.onChange(() => invalidate());
      }

      // ensure one initial render
      invalidate();

      return () => {
        if (unsubRot) unsubRot();
        if (unsubScale) unsubScale();
      };
    }, [scale, invalidate]);

    return (
      <a.group rotation={rotationSpring as any}>
        <a.group scale={scale as any}>
          <Logo ref={logoRef} />
        </a.group>
        <Environment files="/hdr/fireplace_1k.hdr">
          <Lightformer
            intensity={2}
            position={!isClicked ? [-2, -2, -3] : [1, -2, -1]}
            scale={[10, 10, 1]}
          />
        </Environment>
      </a.group>
    );
  }

  return (
    <Canvas
      frameloop="always"
      gl={{
        powerPreference: "high-performance",
        antialias: true,
        failIfMajorPerformanceCaveat: false,
      }}
    >
      <Suspense fallback={null}>
        {/* invalidate canvas when isClicked changes to trigger a render */}
        <InvalidateOnChange value={isClicked} />
        <ResponsiveLogo isClicked={isClicked} logoRef={logoRef} />
      </Suspense>
    </Canvas>
  );
};

function InvalidateOnChange({ value }: { value: any }) {
  const { invalidate } = useThree();
  useEffect(() => {
    if (invalidate) invalidate();
  }, [invalidate, value]);
  return null;
}

export default MovingLogo;
