import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { a, useSpring } from "@react-spring/three";
import * as THREE from "three";
import { Environment, Lightformer } from "@react-three/drei";
import Logo from "../Logo/Logo";

const MovingLogo = ({ isClicked }: { isClicked: boolean }) => {
  const logoRef = useRef<THREE.Group>(null);
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

  const { position, rotation, scale } = useSpring({
    position: [0, 0, 0],
    rotation: isClicked ? endRotation : startRotation,
    scale: [1.2, 1.2, 1.2],
    config: { mass: 1, tension: 140, friction: 46 },
  });

  return (
    <Canvas
      frameloop="demand"
      gl={{
        powerPreference: "high-performance",
        antialias: true,
        failIfMajorPerformanceCaveat: false,
      }}
    >
      <Suspense fallback={null}>
        {/* invalidate canvas when isClicked changes to trigger a render */}
        <InvalidateOnChange value={isClicked} />
        {/* <ambientLight intensity={0.3} color="#ffffff" /> */}
        <a.group
          position={position as any}
          rotation={rotation as any}
          scale={[0.7, 0.7, 0.7]}
        >
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
