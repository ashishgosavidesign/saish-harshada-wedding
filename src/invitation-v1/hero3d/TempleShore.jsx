export function TempleShore() {
  return (
    <group position={[7.5, 0.2, -4.5]} rotation={[0, -0.35, 0]}>
      {/* Platform */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 0.3, 3.6]} />
        <meshStandardMaterial color="#d4c8b0" roughness={0.9} />
      </mesh>

      {/* Main hall */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[3.4, 2, 2.6]} />
        <meshStandardMaterial color="#f5ead8" roughness={0.75} />
      </mesh>

      {/* Shikhara tiers */}
      <mesh position={[0, 2.55, 0]} castShadow>
        <coneGeometry args={[1.35, 1.5, 4]} />
        <meshStandardMaterial color="#e07a2a" roughness={0.55} metalness={0.05} />
      </mesh>
      <mesh position={[0, 3.35, 0]} castShadow>
        <coneGeometry args={[0.85, 1.1, 4]} />
        <meshStandardMaterial color="#f09440" roughness={0.5} />
      </mesh>
      <mesh position={[0, 4.05, 0]} castShadow>
        <coneGeometry args={[0.35, 0.55, 4]} />
        <meshStandardMaterial color="#ffb74d" roughness={0.45} emissive="#e65100" emissiveIntensity={0.06} />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.85, 1.32]} castShadow>
        <boxGeometry args={[0.75, 1.35, 0.08]} />
        <meshStandardMaterial color="#4e342e" roughness={0.8} />
      </mesh>

      {/* Side pavilion */}
      <group position={[-2.4, 0.65, 0.2]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 1.1, 1.2]} />
          <meshStandardMaterial color="#efe2cc" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.35, 0]} castShadow>
          <coneGeometry args={[0.75, 0.7, 4]} />
          <meshStandardMaterial color="#e89440" roughness={0.55} />
        </mesh>
      </group>
    </group>
  )
}

function Palm({ position, rotationY = 0 }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 2.8, 8]} />
        <meshStandardMaterial color="#6b4423" roughness={0.9} />
      </mesh>
      {[0, 1.2, 2.4, 3.6, 4.8].map((a) => (
        <mesh key={a} position={[0, 2.75, 0]} rotation={[0.55, a, 0]} castShadow>
          <coneGeometry args={[0.08, 1.6, 6]} />
          <meshStandardMaterial color="#2d5a3a" roughness={0.75} />
        </mesh>
      ))}
    </group>
  )
}

export function ShoreVegetation() {
  return (
    <>
      <Palm position={[6.2, 0, -2.2]} rotationY={0.2} />
      <Palm position={[8.8, 0, -3.4]} rotationY={-0.15} />
      <mesh position={[-7, 0.8, -6]} scale={[2.2, 1.4, 1.6]} castShadow>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshStandardMaterial color="#3d7a52" roughness={0.85} />
      </mesh>
      <mesh position={[-5.5, 0.6, -5.5]} scale={[1.6, 1.1, 1.3]} castShadow>
        <sphereGeometry args={[1, 14, 14]} />
        <meshStandardMaterial color="#2d5a3a" roughness={0.88} />
      </mesh>
    </>
  )
}

export function Hills() {
  return (
    <>
      <mesh position={[-8, 2.5, -18]} scale={[9, 3.5, 4]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#8ec4a8" roughness={1} />
      </mesh>
      <mesh position={[6, 2.8, -20]} scale={[11, 4, 5]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#7cb896" roughness={1} />
      </mesh>
      <mesh position={[2, 0.8, -10]} scale={[16, 2, 6]}>
        <sphereGeometry args={[1, 20, 20]} />
        <meshStandardMaterial color="#5a9e72" roughness={1} />
      </mesh>
    </>
  )
}
