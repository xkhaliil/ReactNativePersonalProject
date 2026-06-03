/**
 * MoodCameraPreview — wraps expo-camera so feature screens never import it.
 */

import { CameraView } from "expo-camera"
import type React from "react"
import { type RefObject } from "react"
import { StyleSheet } from "react-native"

type MoodCameraPreviewProps = {
  cameraRef: RefObject<CameraView | null>
}

export function MoodCameraPreview({
  cameraRef,
}: MoodCameraPreviewProps): React.JSX.Element {
  return (
    <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="front" />
  )
}
