import type React from "react"
import { useRef } from "react"
import { StyleSheet, Text, View } from "react-native"

import {
  Button,
  colors,
  spacing,
  radii,
  borderWidths,
  fontSizes,
  sizes,
} from "../../design-system"

type MoodCameraProps = {
  onScan: () => void
}

export default function MoodCamera({
  onScan,
}: MoodCameraProps): React.JSX.Element {
  const scanCount = useRef(0)

  const handleScan = () => {
    scanCount.current += 1
    onScan()
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewfinder}>
        <Text style={styles.cameraIcon}>📷</Text>
        <Text style={styles.hint}>Point at your face</Text>
        <View style={styles.cornerTL} />
        <View style={styles.cornerTR} />
        <View style={styles.cornerBL} />
        <View style={styles.cornerBR} />
      </View>
      <Button
        label="✨ Scan My Mood"
        onPress={handleScan}
        variant="primary"
        activeOpacity={0.7}
      />
    </View>
  )
}

const cornerBase = {
  position: "absolute" as const,
  width: sizes.cornerIndicator,
  height: sizes.cornerIndicator,
  borderColor: colors.accent.default,
  borderRadius: radii.sm,
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    marginBottom: spacing.sm,
  },
  viewfinder: {
    width: sizes.viewfinder,
    height: sizes.viewfinder,
    backgroundColor: colors.bg.viewfinder,
    borderRadius: radii.lg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: borderWidths.base,
    borderColor: colors.accent.default,
    position: "relative",
    marginBottom: spacing.xl,
  },
  cameraIcon: { fontSize: fontSizes.emojiLg },
  hint: {
    color: colors.text.muted,
    fontSize: fontSizes.sm,
    marginTop: spacing.sm,
  },
  cornerTL: {
    ...cornerBase,
    top: -2,
    left: -2,
    borderTopWidth: borderWidths.heavy,
    borderLeftWidth: borderWidths.heavy,
  },
  cornerTR: {
    ...cornerBase,
    top: -2,
    right: -2,
    borderTopWidth: borderWidths.heavy,
    borderRightWidth: borderWidths.heavy,
  },
  cornerBL: {
    ...cornerBase,
    bottom: -2,
    left: -2,
    borderBottomWidth: borderWidths.heavy,
    borderLeftWidth: borderWidths.heavy,
  },
  cornerBR: {
    ...cornerBase,
    bottom: -2,
    right: -2,
    borderBottomWidth: borderWidths.heavy,
    borderRightWidth: borderWidths.heavy,
  },
})
