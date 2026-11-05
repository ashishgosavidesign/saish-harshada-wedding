import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

/** Frames temple on the shore with lake in the foreground (mobile-first portrait) */
export function CameraRig() {
  const { camera, size } = useThree()

  useEffect(() => {
    const aspect = size.width / size.height
    const isNarrow = aspect < 0.55

    if (isNarrow) {
      camera.position.set(-1.2, 3.4, 8.8)
      camera.lookAt(5.2, 1.4, 0.5)
    } else {
      camera.position.set(-2.4, 3.9, 10.2)
      camera.lookAt(4.8, 1.3, 0)
    }

    if (camera.isPerspectiveCamera) {
      camera.fov = isNarrow ? 40 : 36
      camera.updateProjectionMatrix()
    }
  }, [camera, size.width, size.height])

  return null
}
