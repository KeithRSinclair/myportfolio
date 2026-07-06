import { useRef, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";

export function TechOrbitButtons({ onSelect, isAnimating, show }) {
  const group = useRef();

  const textures = useTexture({
    react: "/icons/react.png",
    three: "/icons/three.png",
    unity: "/icons/unity.png",
    blender: "/icons/blender.png",
    gsap: "/icons/gsap.png",
    inkscape: "/icons/inkscape.png",
  });

  Object.values(textures).forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
  });

  const colors = {
    blender: "#EA7600",
    gsap: "#88CE02",
    inkscape: "#818181",
    react: "#61DAFB",
    three: "#F9F9F9",
    unity: "#3A5BC7",
  };

  const ring1 = { y: 1.4, radius: 0.7, zScale: 0.6, offset: 0 };
  const ring2 = { y: 0.9, radius: 0.9, zScale: 0.6, offset: 0 };
  const ring3 = { y: 0.4, radius: 0.75, zScale: 0.6, offset: 0 };

  const rings = [
    { config: ring1, items: ["inkscape", "three"] },
    { config: ring2, items: ["react", "gsap"] },
    { config: ring3, items: ["blender", "unity"] },
  ];

  // 🌊 PS Vita Bubble Style - Organic, ultra-subtle drift
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;

    group.current.children.forEach((child, i) => {
      const baseY = child.userData?.baseY ?? child.position.y;

      // 1. Gentle, slow vertical float (Vita style)
      child.position.y = baseY + Math.sin(t * 0.6 + i * 0.5) * 0.04;

      // 2. Micro-pulse: Scale only shifts between 0.695 and 0.705
      // We add a Math.PI / 2 offset so the pulse is out-of-phase with the float
      let s = 0.7 + Math.sin(t * 0.5 + i + Math.PI / 2) * 0.005;

      child.scale.set(s, s, s);
    });
  });
  // ✨ show / hide
  useEffect(() => {
    if (!group.current) return;
    gsap.killTweensOf(group.current.scale);

    if (show) {
      group.current.scale.set(0, 0, 0);
      gsap.to(group.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(group.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [show]);

  return (
    <group ref={group} scale={[0, 0, 0]}>
      {/* 🔵 Tech Rings */}
      {rings.map((ring) =>
        ring.items.map((tech, i) => {
          const { y, radius, zScale, offset } = ring.config;
          const angle = (i === 0 ? 0 : Math.PI) + offset;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius * zScale;
          const baseColor = new THREE.Color(colors[tech]).multiplyScalar(0.6);

          return (
            <group
              key={tech}
              position={[x, y, z]}
              rotation={[1.4, 0, 0]}
              scale={[0.7, 0.7, 0.7]}
              userData={{ baseY: y }}
            >
              <mesh
                castShadow
                receiveShadow
                onClick={() => {
                  if (isAnimating) return;

                  // ✅ defer to next frame (fixes React warning)
                  requestAnimationFrame(() => {
                    onSelect?.(tech);
                  });
                }}
                onPointerOver={(e) => {
                  if (isAnimating) return;
                  document.body.style.cursor = "pointer";
                  const parent = e.object.parent;

                  gsap.to(parent.scale, {
                    x: 0.78,
                    y: 0.78,
                    z: 0.78,
                    duration: 0.25,
                    ease: "elastic.out(1, 0.5)",
                  });

                  gsap.to(parent.position, {
                    y: parent.userData.baseY + 0.05,
                    duration: 0.25,
                    ease: "elastic.out(1, 0.4)",
                  });
                }}
                onPointerOut={(e) => {
                  document.body.style.cursor = "default";
                  const parent = e.object.parent;

                  gsap.to(parent.scale, {
                    x: 0.7,
                    y: 0.7,
                    z: 0.7,
                    duration: 0.3,
                    ease: "elastic.out(1, 0.6)",
                  });

                  gsap.to(parent.position, {
                    y: parent.userData.baseY,
                    duration: 0.3,
                    ease: "elastic.out(1, 0.5)",
                  });
                }}
              >
                <cylinderGeometry args={[0.28, 0.3, 0.12, 32]} />
                <meshPhongMaterial
                  color={baseColor}
                  shininess={70}
                  specular={colors[tech]}
                />
              </mesh>

              {/* icon */}
              <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.22, 32]} />
                <meshPhongMaterial
                  map={textures[tech]}
                  transparent
                  toneMapped={false}
                  depthWrite={false}
                />
              </mesh>
            </group>
          );
        }),
      )}
    </group>
  );
}
