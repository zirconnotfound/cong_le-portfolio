import { Suspense, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { a, useSpring } from "@react-spring/three";
import * as THREE from "three";
import Logo from "../Logo/Logo";
import { Environment } from "@react-three/drei";

const MovingLogo = ({ isClicked }: { isClicked: boolean }) => {
  const logoRef = useRef<THREE.Group>(null);
  //   const { viewport } = useThree();

  const startRotation = [
    (146 / 180) * Math.PI,
    (-16 / 180) * Math.PI,
    (-201 / 180) * Math.PI,
  ];
  const endRotation = [
    (146 / 180) * Math.PI,
    (16 / 180) * Math.PI,
    (-147 / 180) * Math.PI,
  ];

  const { position, rotation } = useSpring({
    position: [0, 0, 0],
    rotation: isClicked ? endRotation : startRotation,
    config: { mass: 1, tension: 170, friction: 26 },
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
        <ambientLight intensity={0.5} color="#866957" />
        <directionalLight
          position={[-10, -10, 5]}
          intensity={0.5}
          color="#866957"
        />
        <a.group
          position={position as any}
          rotation={rotation as any}
          scale={0.7}
        >
          <Logo ref={logoRef} />
          <Environment preset="apartment" />
        </a.group>
      </Suspense>
    </Canvas>
  );
};

export default MovingLogo;
