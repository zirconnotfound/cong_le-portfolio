import { useGLTF } from "@react-three/drei";
import { useEffect, forwardRef, useMemo } from "react";
import * as THREE from "three";

const Logo = forwardRef((props: any, ref: React.ForwardedRef<THREE.Group>) => {
  const original = useGLTF("/gltf/logo.glb");
  const cloned = useMemo(() => original.scene.clone(), [original]);

  useEffect(() => {
    cloned.scale.set(0.85, 0.85, 0.85);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.sub(center);

    return () => {
      cloned.traverse((obj) => {
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

useGLTF.preload("/gltf/logo.glb");

export default Logo;
