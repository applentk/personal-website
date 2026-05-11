"use client"

import { HTMLAttributes, useEffect, useRef } from "react"
import * as THREE from "three"

import { APPLE_3D_MODEL_PATH, SCENE_HEIGHT, SCENE_WIDTH } from "../constansts"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

export default function Apple3D({ ...props }: HTMLAttributes<HTMLDivElement>) {
  const modelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!modelRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, SCENE_WIDTH / SCENE_HEIGHT, 0.1, 100)
    camera.position.z = 20

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT)

    const ambientLight = new THREE.AmbientLight(0xffffff, 2) // Soft light
    ambientLight.position.set(5, 5, 5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 4) // Stronger light
    scene.add(directionalLight)

    let appleModel: THREE.Group<THREE.Object3DEventMap>

    const loader = new GLTFLoader()
    loader.load(APPLE_3D_MODEL_PATH, (gltf) => {
      appleModel = gltf.scene
      appleModel.rotateX(0.3)
      appleModel.scale.set(5, 5, 5)
      scene.add(appleModel)
    })

    function randomSpeed(): number {
      const pos = [-1, 1]
      const index = Math.random()

      return pos[Math.round(index)] * 2.69
    }

    // Initial rotation speeds for X, Y, and Z axes
    let currentSpeedX = 0,
        currentSpeedY = 0, 
        currentSpeedZ = 0

    // Random initial target speeds
    let targetSpeedX = randomSpeed(),
        targetSpeedY = randomSpeed(),
        targetSpeedZ = randomSpeed()

    // The speed of the smooth transition
    const lerpSpeed = 0.02

    const speedInterval = setInterval(() => {
      targetSpeedX = randomSpeed()  // New random speed for X axis
      targetSpeedY = randomSpeed()  // New random speed for Y axis
      targetSpeedZ = randomSpeed()  // New random speed for Z axis    
    }, 3000)

    const timer = new THREE.Timer()
    renderer.setAnimationLoop(() => {
      timer.update()
      const deltaTime = Math.min(timer.getDelta(), 0.05)

      currentSpeedX = THREE.MathUtils.lerp(currentSpeedX, targetSpeedX, lerpSpeed)
      currentSpeedY = THREE.MathUtils.lerp(currentSpeedY, targetSpeedY, lerpSpeed)
      currentSpeedZ = THREE.MathUtils.lerp(currentSpeedZ, targetSpeedZ, lerpSpeed)

      if (appleModel) {
        appleModel.rotateX(currentSpeedX * deltaTime)  // Rotate along the X axis
        appleModel.rotateY(currentSpeedY * deltaTime)  // Rotate along the Y axis
        appleModel.rotateZ(currentSpeedZ * deltaTime)  // Rotate along the Z axis
      }
      renderer.render(scene, camera)
    })

    modelRef.current.appendChild(renderer.domElement)

    return () => {
      clearInterval(speedInterval)
      renderer.setAnimationLoop(null)
      renderer.dispose()
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement)
      }
    }
  }, [])
  
  return (
    <div ref={modelRef} {...props} />
  )
} 