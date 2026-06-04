/**
 * useMoodCamera
 *
 * Fully abstracts expo-camera permissions, capture, and scan state.
 * Rendering uses MoodCameraPreview from this hooks package.
 */

import { useCameraPermissions, type CameraView } from "expo-camera"
import { useCallback, useRef, useState, type RefObject } from "react"

type UseMoodCameraOptions = {
  detectMood: (photoUri: string) => Promise<string>
}

type UseMoodCameraReturn = {
  permission: ReturnType<typeof useCameraPermissions>[0]
  requestPermission: ReturnType<typeof useCameraPermissions>[1]
  isScanning: boolean
  cameraRef: RefObject<CameraView | null>
  scan: (onMoodDetected: (mood: string) => void) => void
}

export function useMoodCamera({
  detectMood,
}: UseMoodCameraOptions): UseMoodCameraReturn {
  const [permission, requestPermission] = useCameraPermissions()
  const [isScanning, setIsScanning] = useState(false)
  const cameraRef = useRef<CameraView>(null)

  const scan = useCallback(
    (onMoodDetected: (mood: string) => void) => {
      void (async (): Promise<void> => {
        if (!cameraRef.current) return
        setIsScanning(true)
        try {
          const photo = await cameraRef.current.takePictureAsync({
            quality: 0.9,
          })
          const mood = await detectMood(photo?.uri ?? "")
          onMoodDetected(mood)
        } finally {
          setIsScanning(false)
        }
      })()
    },
    [detectMood],
  )

  return {
    permission,
    requestPermission,
    isScanning,
    cameraRef,
    scan,
  }
}
