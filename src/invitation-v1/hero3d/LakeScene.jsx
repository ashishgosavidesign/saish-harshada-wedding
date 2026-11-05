import { Suspense, useMemo } from 'react'
import { ContactShadows, Environment, Sky } from '@react-three/drei'
import * as THREE from 'three'
import { CameraRig } from './CameraRig'
import { WaterLake } from './WaterLake'
import { Lotus } from './Lotus'
import { Hills, ShoreVegetation, TempleShore } from './TempleShore'

export function LakeScene({ reducedMotion = false }) {
  const lotusPositions = useMemo(
    () => [
      [-2.2, 0.06, 2.5],
      [0.8, 0.05, 3.8],
      [3.2, 0.06, 2.2],
      [-0.6, 0.05, 5],
      [2.5, 0.04, 4.8],
    ],
    [],
  )

  return (
    <>
      <CameraRig />

      <color attach="background" args={['#c5dfe8']} />
      <fog attach="fog" args={['#c5dfe8', 18, 42]} />

      <Sky
        distance={450000}
        sunPosition={[100, 28, 60]}
        inclination={0.49}
        azimuth={0.25}
        mieCoefficient={0.005}
        mieDirectionalG={0.85}
        rayleigh={0.4}
        turbidity={6}
      />

      <ambientLight intensity={0.4} />
      <hemisphereLight color="#eef6ff" groundColor="#2d4a35" intensity={0.55} />
      <directionalLight
        position={[14, 22, 10]}
        intensity={1.2}
        color="#fff5e6"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={45}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
      />

      <Suspense fallback={null}>
        <Environment preset="dawn" environmentIntensity={0.35} />
      </Suspense>

      <Hills />
      <ShoreVegetation />
      <TempleShore />

      {/* Shore strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, 0.02, -1.5]} receiveShadow>
        <planeGeometry args={[14, 8]} />
        <meshStandardMaterial color="#5a9e58" roughness={1} />
      </mesh>

      <WaterLake reducedMotion={reducedMotion} />

      {lotusPositions.map((pos, i) => (
        <Lotus key={i} position={pos} phase={i * 1.7} reducedMotion={reducedMotion} />
      ))}

      <ContactShadows
        position={[0, 0.04, 2]}
        opacity={0.45}
        scale={22}
        blur={2.2}
        far={8}
        color="#1a3a2a"
      />
    </>
  )
}

export function initRenderer(gl) {
  gl.toneMapping = THREE.ACESFilmicToneMapping
  gl.toneMappingExposure = 1.08
  gl.shadowMap.enabled = true
  gl.shadowMap.type = THREE.PCFSoftShadowMap
}
