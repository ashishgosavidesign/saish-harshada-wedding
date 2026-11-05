import { Component, Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { initRenderer, LakeScene } from './LakeScene'
import PlainFallback from './PlainFallback'

class WebGLErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) return <PlainFallback />
    return this.props.children
  }
}

function LakeCanvasInner() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const [webgl, setWebgl] = useState(true)
  useEffect(() => {
    try {
      const c = document.createElement('canvas')
      setWebgl(!!(c.getContext('webgl2') || c.getContext('webgl')))
    } catch {
      setWebgl(false)
    }
  }, [])

  if (!webgl) return <PlainFallback />

  return (
    <WebGLErrorBoundary>
      <Canvas
        className="lake-canvas__gl"
        shadows
        resize={{ scroll: false, offsetSize: true }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.75)]}
        camera={{ fov: 40, near: 0.1, far: 60, position: [-1.2, 3.4, 8.8] }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => initRenderer(gl)}
      >
        <Suspense fallback={null}>
          <LakeScene reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  )
}

export default function LakeCanvas() {
  return (
    <div className="lake-canvas">
      <LakeCanvasInner />
    </div>
  )
}
