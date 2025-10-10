"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGLTF } from "@react-three/drei";
import { useEffect, forwardRef, useMemo } from "react";
import * as THREE from "three";

type LogoProps = Record<string, unknown>;

const Logo = forwardRef<THREE.Group, LogoProps>(function Logo(props, ref) {
  const original = useGLTF("/gltf/logo.glb") as any;
  const cloned = useMemo(() => original.scene.clone(), [original]);

  useEffect(() => {
    cloned.scale.set(0.85, 0.85, 0.85);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.sub(center);

    return () => {
      cloned.traverse((obj: THREE.Object3D) => {
        if ((obj as THREE.Mesh).geometry)
          (obj as THREE.Mesh).geometry.dispose();
        if ((obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material;
          const disposeMaterial = (m: any) => {
            // dispose textures on the material
            [
              "map",
              "envMap",
              "aoMap",
              "normalMap",
              "roughnessMap",
              "metalnessMap",
              "emissiveMap",
            ].forEach((key) => {
              if (m[key] && m[key].dispose) {
                m[key].dispose();
              }
            });
            if (m.dispose) m.dispose();
          };

          if (Array.isArray(mat)) mat.forEach((m) => disposeMaterial(m));
          else disposeMaterial(mat);
        }
      });
    };
  }, [cloned]);

  return (
    <group ref={ref} {...props} dispose={null}>
      <primitive object={cloned} />
    </group>
  );
});

// set displayName explicitly for React devtools and to satisfy ESLint
(Logo as unknown as { displayName?: string }).displayName = "Logo";

export default Logo;
