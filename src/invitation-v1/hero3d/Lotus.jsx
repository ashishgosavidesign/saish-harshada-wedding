import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Petal({ angle }) {
  return (
    <mesh
      position={[Math.sin(angle) * 0.16, 0.05, Math.cos(angle) * 0.16]}
      rotation={[1.15, angle, 0]}
    >
      <sphereGeometry args={[0.12, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
      <meshStandardMaterial
        color="#f48fb1"
        roughness={0.35}
        metalness={0.02}
        emissive="#c2185b"
        emissiveIntensity={0.12}
      />
    </mesh>
  )
}

export function Lotus({ position = [0, 0, 0], phase = 0, reducedMotion = false }) {
  const group = useRef()

  useFrame((state) => {
    if (reducedMotion || !group.current) return
    const t = state.clock.elapsedTime + phase
    group.current.position.y = position[1] + Math.sin(t * 0.9) * 0.04
    group.current.rotation.y = Math.sin(t * 0.35) * 0.08
  })

  return (
    <group ref={group} position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[0.42, 24]} />
        <meshStandardMaterial color="#2d5a3a" roughness={0.85} />
      </mesh>
      {Array.from({ length: 10 }, (_, i) => {
        const angle = (i / 10) * Math.PI * 2
        return <Petal key={i} angle={angle} />
      })}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#fff59d" emissive="#fbc02d" emissiveIntensity={0.35} roughness={0.3} />
      </mesh>
    </group>
  )
}
