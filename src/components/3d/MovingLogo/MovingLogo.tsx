import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
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

  const { position, rotation } = useSpring({
    position: [0, 0, 0],
    rotation: isClicked ? endRotation : startRotation,
    config: { mass: 1, tension: 140, friction: 46 },
  });

  return (
    <Canvas
      gl={{
        powerPreference: "high-performance",
        antialias: true,
        failIfMajorPerformanceCaveat: false,
      }}
    >
      <Suspense fallback={null}>
        {/* <ambientLight intensity={0.3} color="#ffffff" /> */}
        <a.group
          position={position as any}
          rotation={rotation as any}
          scale={0.7}
        >
          <Logo ref={logoRef} />
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

export default MovingLogo;
