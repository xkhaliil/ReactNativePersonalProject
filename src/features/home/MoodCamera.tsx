import type React from "react"
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  Text,
  View,
} from "react-native"

import {
  borderWidths,
  fontSizes,
  fontWeights,
  radii,
  spacing,
  useAppTheme,
  useThemedStyles,
} from "#shared/ui"

import { detectMoodFromPhoto } from "../spotify"

import { useMoodCamera } from "./model/useMoodCamera"
import { MoodCameraPreview } from "./ui/MoodCameraPreview"

type MoodCameraProps = {
  onMoodDetected: (mood: string) => void
}

const SCREEN_WIDTH = Dimensions.get("window").width
const VIEWFINDER_SIZE = SCREEN_WIDTH - spacing.xl * 2

export default function MoodCamera({
  onMoodDetected,
}: MoodCameraProps): React.JSX.Element {
  const { colors } = useAppTheme()
  const styles = useThemedStyles(({ colors: themeColors }) => ({
    section: {
      width: "100%",
      alignItems: "center",
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.lg,
      paddingBottom: spacing.md,
    },
    viewfinder: {
      width: VIEWFINDER_SIZE,
      height: VIEWFINDER_SIZE * 0.78,
      backgroundColor: themeColors.bg.viewfinder,
      borderRadius: radii["2xl"],
      overflow: "hidden",
      position: "relative",
      marginBottom: spacing.lg,
      borderWidth: borderWidths.thin,
      borderColor: themeColors.border.default,
    },
    cameraClip: {
      ...ABSOLUTE_FILL_STYLE,
      borderRadius: radii["2xl"],
      overflow: "hidden",
    },
    scanOverlay: {
      ...ABSOLUTE_FILL_STYLE,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: themeColors.bg.overlay,
      gap: spacing.md,
    },
    scanLabel: {
      color: themeColors.text.primary,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.semibold,
      letterSpacing: 0.3,
    },
    corner: {
      position: "absolute",
      width: CORNER_SIZE,
      height: CORNER_SIZE,
      borderColor: themeColors.accent.default,
    },
    cornerTL: {
      top: 12,
      left: 12,
      borderTopWidth: CORNER_THICKNESS,
      borderLeftWidth: CORNER_THICKNESS,
      borderTopLeftRadius: radii.sm,
    },
    cornerTR: {
      top: 12,
      right: 12,
      borderTopWidth: CORNER_THICKNESS,
      borderRightWidth: CORNER_THICKNESS,
      borderTopRightRadius: radii.sm,
    },
    cornerBL: {
      bottom: 12,
      left: 12,
      borderBottomWidth: CORNER_THICKNESS,
      borderLeftWidth: CORNER_THICKNESS,
      borderBottomLeftRadius: radii.sm,
    },
    cornerBR: {
      bottom: 12,
      right: 12,
      borderBottomWidth: CORNER_THICKNESS,
      borderRightWidth: CORNER_THICKNESS,
      borderBottomRightRadius: radii.sm,
    },
    scanBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.sm,
      backgroundColor: themeColors.accent.default,
      borderRadius: radii.full,
      paddingVertical: spacing.md + 2,
      paddingHorizontal: spacing["4xl"],
      alignSelf: "stretch",
      shadowColor: themeColors.accent.default,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 14,
      elevation: 8,
    },
    scanBtnScanning: {
      backgroundColor: themeColors.accent.dim,
      shadowOpacity: 0.15,
    },
    scanBtnPressed: {
      opacity: 0.88,
      shadowOpacity: 0.25,
    },
    scanBtnIcon: {
      fontSize: fontSizes.base,
    },
    scanBtnText: {
      color: themeColors.accent.on,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.bold,
      letterSpacing: 0.3,
    },
    permissionBox: {
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.md,
      padding: spacing["3xl"],
    },
    permissionIcon: {
      fontSize: fontSizes.emojiMd,
    },
    permissionTitle: {
      color: themeColors.text.primary,
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold,
      textAlign: "center",
    },
    permissionDesc: {
      color: themeColors.text.muted,
      fontSize: fontSizes.sm,
      textAlign: "center",
      lineHeight: 20,
    },
    allowBtn: {
      marginTop: spacing.sm,
      backgroundColor: themeColors.accent.default,
      borderRadius: radii.full,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing["3xl"],
    },
    allowBtnPressed: {
      opacity: 0.85,
    },
    allowBtnText: {
      color: themeColors.accent.on,
      fontWeight: fontWeights.bold,
      fontSize: fontSizes.base,
    },
  }))
  const { permission, requestPermission, isScanning, cameraRef, scan } =
    useMoodCamera({ detectMood: detectMoodFromPhoto })

  const handleScan = (): void => {
    scan(onMoodDetected)
  }

  if (!permission) {
    return (
      <View style={styles.section}>
        <View style={styles.viewfinder}>
          <ActivityIndicator size="large" color={colors.accent.default} />
        </View>
      </View>
    )
  }

  if (!permission.granted) {
    return (
      <View style={styles.section}>
        <View style={[styles.viewfinder, styles.permissionBox]}>
          <Text style={styles.permissionIcon}>CAM</Text>
          <Text style={styles.permissionTitle}>Camera Access Needed</Text>
          <Text style={styles.permissionDesc}>
            Allow camera access to scan your mood
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.allowBtn,
              pressed && styles.allowBtnPressed,
            ]}
            onPress={(): void => {
              void requestPermission()
            }}
          >
            <Text style={styles.allowBtnText}>Allow Camera</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.section}>
      {/* Viewfinder */}
      <View style={styles.viewfinder}>
        <View style={styles.cameraClip}>
          <MoodCameraPreview cameraRef={cameraRef} />
          {isScanning && (
            <View style={styles.scanOverlay}>
              <ActivityIndicator size="large" color={colors.accent.default} />
              <Text style={styles.scanLabel}>Analyzing your mood...</Text>
            </View>
          )}
        </View>

        {/* Corner brackets */}
        <View style={[styles.corner, styles.cornerTL]} />
        <View style={[styles.corner, styles.cornerTR]} />
        <View style={[styles.corner, styles.cornerBL]} />
        <View style={[styles.corner, styles.cornerBR]} />
      </View>

      {/* Scan button */}
      <Pressable
        style={({ pressed }) => [
          styles.scanBtn,
          isScanning && styles.scanBtnScanning,
          pressed && !isScanning && styles.scanBtnPressed,
        ]}
        onPress={handleScan}
        disabled={isScanning}
      >
        {isScanning ? (
          <ActivityIndicator size="small" color={colors.accent.on} />
        ) : (
          <Text style={styles.scanBtnIcon}>*</Text>
        )}
        <Text style={styles.scanBtnText}>
          {isScanning ? "Scanning..." : "Scan My Mood"}
        </Text>
      </Pressable>
    </View>
  )
}

const CORNER_SIZE = 22
const CORNER_THICKNESS = 3
const ABSOLUTE_FILL_STYLE = {
  position: "absolute" as const,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}
