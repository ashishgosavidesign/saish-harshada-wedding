import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { waterFragmentShader, waterVertexShader } from './shaders/water'

export function WaterLake({ reducedMotion = false }) {
  const meshRef = useRef()
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWaveAmp: { value: reducedMotion ? 0.15 : 1 },
      uDeepColor: { value: new THREE.Color('#3d7a8c') },
      uShallowColor: { value: new THREE.Color('#9fd4e8') },
      uSunDirection: { value: new THREE.Vector3(0.4, 0.85, 0.2).normalize() },
    }),
    [reducedMotion],
  )

  useFrame((state) => {
    if (reducedMotion) return
    uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 1.5]} receiveShadow>
      <planeGeometry args={[36, 28, 80, 80]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
