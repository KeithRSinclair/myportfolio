import React, { useEffect, useRef, useMemo } from "react";
import { useGraph, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";
import gsap from "gsap";

export function Avatar({ activeTech, setIsAnimating, ...props }) {
  const group = useRef();

  const { scene, animations } = useGLTF("/avatar.glb");

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  const { actions, names, mixer } = useAnimations(animations, group);

  const currentAction = useRef(null);
  const idleLoops = useRef(0);
  const stage = useRef("intro");
  
  // 🔄 Track background intervals across hooks so we can kill them on demand
  const activeInterval = useRef(null);

  // Reusable core clip player
  const playAction = (name, loop = THREE.LoopOnce) => {
    if (!actions) return;
    const action = actions[name];

    if (!action) {
      console.warn(`Animation "${name}" not found`);
      return;
    }

    action.reset();
    action.enabled = true;
    action.setLoop(loop);

    if (loop === THREE.LoopOnce) {
      action.clampWhenFinished = true;
    }

    action.play();

    if (currentAction.current && currentAction.current !== action) {
      action.crossFadeFrom(currentAction.current, 0.5, true);
    }

    currentAction.current = action;
  };

  // Shadow Map Pass
  useEffect(() => {
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clone]);

  // ------------------------------------------------------------
  // ⚡ 1. BUTTON CLICK REACTION HOOK (GSAP SPIN + WAVE INTERRUPT)
  // ------------------------------------------------------------
  useEffect(() => {
    // Keep it idling smoothly on page mount
    if (!activeTech || activeTech === "default") return;
    if (!actions) return;

    // A. Intercept the background state loops immediately
    setIsAnimating(true);
    if (activeInterval.current) clearInterval(activeInterval.current);
    stage.current = "tech_react";

    // B. Trigger the wave animation clip
    if (actions["waving"]) {
      playAction("waving", THREE.LoopOnce);
    }

    // C. Force a full 360-degree rotation spin via GSAP
    group.current.rotation.y = -Math.PI * 2; 
    gsap.to(group.current.rotation, {
      y: 0,
      duration: 1.6,
      ease: "power2.out",
    });

    // D. Return structural control gracefully back to the native state loop
    const timeout = setTimeout(() => {
      setIsAnimating(false);
      stage.current = "idle";
      idleLoops.current = 0;
      playAction("idle", THREE.LoopRepeat);
    }, 1800);

    return () => clearTimeout(timeout);
  }, [activeTech, actions, setIsAnimating]);

  // ------------------------------------------------------------
  // 🔄 2. NATIVE AMBIENT IDLE STATE MACHINE
  // ------------------------------------------------------------
  useEffect(() => {
    if (!actions) return;

    stage.current = "wave";
    playAction("waving", THREE.LoopOnce);

    const handleFinished = (e) => {
      const finished = e.action;

      // Hard safety block: Ignore structural loop transitions if we are spinning!
      if (stage.current === "tech_react") return;

      // WAVE FINISHED
      if (stage.current === "wave" && finished === actions["waving"]) {
        stage.current = "wait";

        setTimeout(() => {
          if (stage.current === "tech_react") return; // Guard clause
          idleLoops.current = 0;
          stage.current = "idle";

          playAction("idle", THREE.LoopRepeat);

          const idleDuration = actions["idle"].getClip().duration;

          activeInterval.current = setInterval(() => {
            idleLoops.current++;

            if (idleLoops.current >= 2) {
              clearInterval(activeInterval.current);

              stage.current = "neckstretching";
              playAction("neckstretching", THREE.LoopOnce);
            }
          }, idleDuration * 1000);
        }, 3000);
      }

      // NECK STRETCH FINISHED
      else if (stage.current === "neckstretching" && finished === actions["neckstretching"]) {
        stage.current = "armstretching";
        playAction("armstretching", THREE.LoopOnce);
      }

      // ARM STRETCH FINISHED
      else if (stage.current === "armstretching" && finished === actions["armstretching"]) {
        idleLoops.current = 0;
        stage.current = "idle";

        playAction("idle", THREE.LoopRepeat);

        const idleDuration = actions["idle"].getClip().duration;

        activeInterval.current = setInterval(() => {
          idleLoops.current++;

          if (idleLoops.current >= 2) {
            clearInterval(activeInterval.current);

            stage.current = "neckstretching";
            playAction("neckstretching", THREE.LoopOnce);
          }
        }, idleDuration * 1000);
      }
    };

    mixer.addEventListener("finished", handleFinished);

    return () => {
      mixer.removeEventListener("finished", handleFinished);
      if (activeInterval.current) clearInterval(activeInterval.current);
    };
  }, [actions, mixer, clone]);

  // ------------------------------------------------------------
  // 🖥️ 3. RENDER FRAME MATRIX
  // ------------------------------------------------------------
  useFrame(() => {
    if (!group.current) return;
    
    // Drop execution context here if GSAP is running the 360-degree calculation cycle
    if (stage.current === "tech_react") return;

    // Rotate avatar smoothly back to baseline front position
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      0,
      0.05
    );
  });

  return (
    <group
      ref={group}
      {...props}
      rotation={[0, -Math.PI, 0]}
      dispose={null}
    >
      <group name="Scene">
        <group name="avatar">
          <primitive object={nodes.Hips} />
        </group>

        <skinnedMesh
          geometry={nodes.avaturn_body.geometry}
          material={materials["avaturn_body_material.001"]}
          skeleton={nodes.avaturn_body.skeleton}
        />

        <skinnedMesh
          geometry={nodes.avaturn_glasses_0.geometry}
          material={materials["avaturn_glasses_0_material.001"]}
          skeleton={nodes.avaturn_glasses_0.skeleton}
        />

        <skinnedMesh
          geometry={nodes.avaturn_glasses_1.geometry}
          material={materials["avaturn_glasses_1_material.001"]}
          skeleton={nodes.avaturn_glasses_1.skeleton}
        />

        <skinnedMesh
          geometry={nodes.avaturn_hair_0.geometry}
          material={materials["avaturn_hair_0_material.001"]}
          skeleton={nodes.avaturn_hair_0.skeleton}
        />

        <skinnedMesh
          geometry={nodes.avaturn_look_0.geometry}
          material={materials["avaturn_look_0_material.001"]}
          skeleton={nodes.avaturn_look_0.skeleton}
        />

        <skinnedMesh
          geometry={nodes.avaturn_shoes_0.geometry}
          material={materials["avaturn_shoes_0_material.001"]}
          skeleton={nodes.avaturn_shoes_0.skeleton}
        />        
      </group>    
         
      <mesh position={[0, -0.06, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.14, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          metalness={0.6}
          roughness={0.5}
          emissive="#fff"
          emissiveIntensity={0.15}
        />
      </mesh>     
    </group>
  );
}

useGLTF.preload("/avatar.glb");