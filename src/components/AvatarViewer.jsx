import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import Loader from "./Loader";
import { TechOrbitButtons } from "./TechOrbitButtons";
import { OrbitControls } from "@react-three/drei";
/* ---------------- READY ---------------- */
function AvatarReady({ children, onReady }) {
  useEffect(() => {
    const t = setTimeout(() => onReady?.(), 1200);
    return () => clearTimeout(t);
  }, []);
  return children;
}

/* ---------------- CAMERA RIG ---------------- */
function CameraRig({ trigger }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!trigger) return;

    gsap.fromTo(
      camera.position,
      { z: 7.5 },
      {
        z: 3.2,
        duration: 3.2,
        ease: "power2.out",
      },
    );
  }, [trigger]);

  return null;
}

/* ---------------- RESPONSIVE WRAPPER ---------------- */
function ResponsiveScene({ children }) {
  const { size } = useThree();

  const responsiveScale = Math.min(1, size.width / 400);

  return <group scale={responsiveScale}>{children}</group>;
}

/* ---------------- MODEL ---------------- */
function AvatarModel({ apiRef, accentColor, setIsAnimating, triggerCamera }) {
  const { scene, animations } = useGLTF("/avatar.glb");

  const group = useRef();
  const mixer = useRef();
  const actionRef = useRef();
  const idleTimer = useRef(0);
  const idleThreshold = useRef(5 + Math.random() * 5); // 5-10 seconds

  const shirtMesh = useRef(null);
  const defaultMap = useRef(null);
  const isAnimating = useRef(false);

  const shimmerLight = useRef();

  const shirtTextures = useTexture({
    blender: "/techTshirtMaterial/Image_13.blender.webp",
    gsap: "/techTshirtMaterial/Image_13.gsap.webp",
    inkscape: "/techTshirtMaterial/Image_13.inkscape.webp",
    react: "/techTshirtMaterial/Image_13.react.webp",
    three: "/techTshirtMaterial/Image_13.three.webp",
    unity: "/techTshirtMaterial/Image_13.unity.webp",
  });

  Object.values(shirtTextures).forEach((tex) => {
    tex.flipY = false;
    tex.colorSpace = THREE.SRGBColorSpace;
  });

  useEffect(() => {
    if (shimmerLight.current)
      shimmerLight.current.color = new THREE.Color("#ffffff");

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
      if (child.name === "avaturn_look_0") {
        shirtMesh.current = child;
        defaultMap.current = child.material.map;
        child.material.transparent = true;
      }
    });

    mixer.current = new THREE.AnimationMixer(scene);

    // Prepare the initial wave animation
    const waveClip =
      THREE.AnimationClip.findByName(animations, "waving") || animations[0];
    if (waveClip) {
      const action = mixer.current.clipAction(waveClip);
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
      action.reset().play();
      actionRef.current = action;
    }

    // Intro rotation
    gsap.to(group.current.rotation, {
      y: 0,
      duration: 3,
      ease: "power2.out",
    });

    /* ---------------- BUTTON ACTION ---------------- */
    const switchShirt = (key) => {
      if (!shirtMesh.current || isAnimating.current) return;

      isAnimating.current = true;

      // Reset idle timer and threshold for next wave
      idleTimer.current = 0;
      idleThreshold.current = 5 + Math.random() * 5;
      setIsAnimating(true);

      const mat = shirtMesh.current.material;

      gsap.to(mat, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          mat.map = key === "default" ? defaultMap.current : shirtTextures[key];
          mat.needsUpdate = true;
          gsap.to(mat, { opacity: 1, duration: 0.2 });
        },
      });

      if (actionRef.current) {
        actionRef.current.reset();
        actionRef.current.play();
      }

      gsap.fromTo(
        shimmerLight.current,
        { intensity: 0 },
        { intensity: 2.5, duration: 1, yoyo: true, repeat: 1 },
      );
      gsap.fromTo(
        shimmerLight.current.position,
        { x: -2.5 },
        { x: 2.5, duration: 2 },
      );

      group.current.rotation.y = -Math.PI;
      gsap.to(group.current.rotation, {
        y: 0,
        duration: 1.6,
        ease: "power2.out",
      });

      triggerCamera();

      setTimeout(() => {
        isAnimating.current = false;
        setIsAnimating(false);
      }, 1800);
    };

    apiRef.current = switchShirt;
  }, [scene, animations]);

  /* ---------------- ANIMATION LOOP ---------------- */
  useFrame((_, delta) => {
    mixer.current?.update(delta);

    // Idle wave logic
    if (!isAnimating.current && actionRef.current) {
      idleTimer.current += delta;

      if (idleTimer.current >= idleThreshold.current) {
        const waveClip = THREE.AnimationClip.findByName(animations, "waving");
        if (waveClip) {
          const waveAction = mixer.current.clipAction(waveClip);

          // Only play if not already running
          if (!waveAction.isRunning()) {
            waveAction.reset();
            waveAction.setLoop(THREE.LoopOnce);
            waveAction.clampWhenFinished = true;
            waveAction.play();

            // Reset idle timer and random threshold for next wave
            idleTimer.current = 0;
            idleThreshold.current = 5 + Math.random() * 5; // 5-10 seconds
          }
        }
      }
    }
  });

  return (
    <group ref={group} rotation={[0, -Math.PI, 0]} position={[0, -0.1, 0]}>
      <primitive object={scene} />
      {/* pedestal */}
      <mesh position={[0, -0.06, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.14, 64]} />
        <meshStandardMaterial
          color={accentColor}
          metalness={0.5}
          roughness={0.25}
          emissive={accentColor}
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.11, 0]}>
        <circleGeometry args={[0.7, 32]} />
        <meshBasicMaterial transparent opacity={0.15} color="black" />
      </mesh>

      <directionalLight
        ref={shimmerLight}
        position={[-2.5, 1.5, 2]}
        intensity={0}
      />
    </group>
  );
}

/* ---------------- MAIN ---------------- */
export default function AvatarViewer({ onLoaded, onTechClick }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [cameraTrigger, setCameraTrigger] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  const apiRef = useRef(null);

  const triggerCamera = () => setCameraTrigger((v) => v + 1);

  const themes = {
    default: "#FF00FF",
    blender: "#EA7600",
    gsap: "#88CE02",
    inkscape: "#818181",
    react: "#61DAFB",
    three: "#F9F9F9",
    unity: "#3A5BC7",
  };

  const [accentColor, setAccentColor] = useState(themes.default);

  // 🎬 intro camera animation
  useEffect(() => {
    triggerCamera();
  }, []);

  return (
    <div className="w-full flex flex-col items-center md:items-start">
      <div className="w-full max-w-120 h-120">
        <Canvas
          camera={{ position: [0, 1, 10.5], fov: 48.5 }}
          shadows={{ type: THREE.PCFShadowMap }}
          gl={{
            antialias: true,
          }}
        >
         
          <CameraRig trigger={cameraTrigger} />
           <ambientLight intensity={1.4} />
          <directionalLight position={[2, 3, 2]} intensity={1.8} castShadow />

          <ResponsiveScene>
          <TechOrbitButtons
            show={showButtons && !isAnimating}
            isAnimating={isAnimating}
            onSelect={(tech) => {
              const color = themes[tech];
              setAccentColor(color);
              apiRef.current?.(tech);             
              onTechClick?.(color);
            }}
          />

         
          <Suspense fallback={<Loader />}>
            <AvatarReady
              onReady={() => {
                onLoaded?.();

                // ⏱ delay for nicer staging
                setTimeout(() => {
                  setShowButtons(true);
                }, 600);
              }}
            >
              <AvatarModel
                apiRef={apiRef}
                accentColor={accentColor}
                setIsAnimating={setIsAnimating}
                triggerCamera={triggerCamera}
              />
            </AvatarReady>
          </Suspense>
          </ResponsiveScene>
        </Canvas>
      </div>
    </div>
  );
}

useGLTF.preload("/avatar.glb");
