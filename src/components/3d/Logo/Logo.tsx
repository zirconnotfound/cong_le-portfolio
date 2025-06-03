import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

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

export default Logo;
