import React, { useEffect, useRef } from 'react'
import { useGraph, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'

export function Avatar(props) {
  const group = useRef()
  const { scene, animations } = useGLTF('/avatar.glb')
  
  // Cleanly clone for SkinnedMesh re-use safety
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  
  // Use Drei's built-in hooks for tracking the animations bound to this group
  const { actions } = useAnimations(animations, group)
  
  // Keep-alive timers for tracking the idle loop
  const idleTimer = useRef(0)
  const idleThreshold = useRef(5 + Math.random() * 5) // Random interval between 5-10 seconds

  useEffect(() => {
    // 1. Automatically apply shadow maps across your individual meshes
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    // 2. Play the initial wave when your portfolio loads
    const waveAction = actions['waving'] || Object.values(actions)[0]
    if (waveAction) {
      waveAction.clampWhenFinished = true
      waveAction.loop = THREE.LoopOnce
      waveAction.play()
    }
  }, [actions, clone])

  /* ---------------- ANIMATION FRAME LOOP ---------------- */
  useFrame((state, delta) => {
    // Smooth entry rotation: Starts slightly away and faces forward over time
    if (group.current && group.current.rotation.y < 0) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, 0, 1.1)
    }

    // Keep-alive loop checks
    idleTimer.current += delta
    if (idleTimer.current >= idleThreshold.current) {
      const waveAction = actions['waving']
      
      if (waveAction && !waveAction.isRunning()) {
        waveAction.reset()
        waveAction.setLoop(THREE.LoopOnce)
        waveAction.clampWhenFinished = true
        waveAction.play()

        // Reset timer and randomize next trigger frame delay
        idleTimer.current = 0
        idleThreshold.current = 5 + Math.random() * 5
      }
    }
  })

  return (
    // Component drops into canvas initialized at -Math.PI to match your intro spin
    <group ref={group} {...props} rotation={[0, -Math.PI, 0]} position={[0, 0, 0]} dispose={null}>
      <group name="Scene">
        <group name="avatar">
          <primitive object={nodes.Hips} />
        </group>
        <skinnedMesh name="avaturn_body" geometry={nodes.avaturn_body.geometry} material={materials['avaturn_body_material.001']} skeleton={nodes.avaturn_body.skeleton} />
        <skinnedMesh name="avaturn_glasses_0" geometry={nodes.avaturn_glasses_0.geometry} material={materials['avaturn_glasses_0_material.001']} skeleton={nodes.avaturn_glasses_0.skeleton} />
        <skinnedMesh name="avaturn_glasses_1" geometry={nodes.avaturn_glasses_1.geometry} material={materials['avaturn_glasses_1_material.001']} skeleton={nodes.avaturn_glasses_1.skeleton} />
        <skinnedMesh name="avaturn_hair_0" geometry={nodes.avaturn_hair_0.geometry} material={materials['avaturn_hair_0_material.001']} skeleton={nodes.avaturn_hair_0.skeleton} />
        <skinnedMesh name="avaturn_look_0" geometry={nodes.avaturn_look_0.geometry} material={materials['avaturn_look_0_material.001']} skeleton={nodes.avaturn_look_0.skeleton} />
        <skinnedMesh name="avaturn_shoes_0" geometry={nodes.avaturn_shoes_0.geometry} material={materials['avaturn_shoes_0_material.001']} skeleton={nodes.avaturn_shoes_0.skeleton} />
      </group>
    </group>
  )
}

useGLTF.preload('/avatar.glb')