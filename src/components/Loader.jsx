import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import Loader from "./Loader"; // Ensure this path matches your project structure

/* ---------------- MODEL & WAVE ANIMATION ---------------- */
function AvatarModel() {
  const { scene, animations } = useGLTF("/avatar.glb");
  const group = useRef();
  const mixer = useRef();
  const idleTimer = useRef(0);
  const idleThreshold = useRef(5 + Math.random() * 5); // Random delay between waves (5-10s)

  useEffect(() => {
    // Apply shadow support to the model
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // Set up the animation mixer
    mixer.current = new THREE.AnimationMixer(scene);

    // Find and play the initial intro wave
    const waveClip = THREE.AnimationClip.findByName(animations, "waving") || animations[0];
    if (waveClip) {
      const action = mixer.current.clipAction(waveClip);
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
      action.play();
    }
  }, [scene, animations]);

  /* ---------------- ANIMATION LOOP ---------------- */
  useFrame((state, delta) => {
    // 1. Update the animations
    if (mixer.current) mixer.current.update(delta);

    // 2. Smooth entry rotation (spins into view gracefully on load)
    if (group.current && group.current.rotation.y < 0) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, 0, 0.05);
    }

    // 3. Keep-alive idle wave logic
    idleTimer.current += delta;
    if (idleTimer.current >= idleThreshold.current) {
      const waveClip = THREE.AnimationClip.findByName(animations, "waving");
      if (waveClip) {
        const waveAction = mixer.current.clipAction(waveClip);
        
        if (!waveAction.isRunning()) {
          waveAction.reset();
          waveAction.setLoop(THREE.LoopOnce);
          waveAction.clampWhenFinished = true;
          waveAction.play();

          // Reset the timer and generate a new random wait interval
          idleTimer.current = 0;
          idleThreshold.current = 5 + Math.random() * 5; 
        }
      }
    }
  });

  return (
    // Starts facing slightly away (-Math.PI) and rotates to 0 in the useFrame loop
    <group ref={group} rotation={[0, -Math.PI, 0]} position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  );
}

/* ---------------- MAIN CANVAS CONTAINER ---------------- */
export default function AvatarViewer() {
  return (
    <div className="w-full h-full min-h-[50vh]">
      <Canvas
        camera={{ position: [0, 1.2, 3.5], fov: 45 }}
        shadows
        gl={{ antialias: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 4, 3]} intensity={1.5} castShadow />

        <Suspense fallback={<Loader />}>
          <AvatarModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the asset to optimize runtime delivery
useGLTF.preload("/avatar.glb");