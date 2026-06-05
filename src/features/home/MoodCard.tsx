import type React from "react"
import { Text, View } from "react-native"

import {
  borderWidths,
  fontSizes,
  fontWeights,
  radii,
  spacing,
  useThemedStyles,
} from "#shared/ui"

type MoodCardProps = {
  emoji: string
  label: string
  color: string
}

export default function MoodCard({
  emoji,
  label,
  color,
}: MoodCardProps): React.JSX.Element {
  const styles = useThemedStyles(({ colors }) => ({
    wrapper: {
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.xs,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: radii.xl,
      borderWidth: borderWidths.base,
      padding: spacing.lg,
      gap: spacing.lg,
      shadowColor: colors.shadow.base,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    emojiContainer: {
      width: 52,
      height: 52,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.bg.glass,
      borderRadius: radii.lg,
    },
    emoji: {
      fontSize: fontSizes.emojiSm,
    },
    textBlock: {
      flex: 1,
      gap: spacing["2xs"],
    },
    detectedLabel: {
      color: colors.text.muted,
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.semibold,
      textTransform: "uppercase",
      letterSpacing: 1.2,
    },
    moodLabel: {
      fontSize: fontSizes["2xl"],
      fontWeight: fontWeights.bold,
      textTransform: "uppercase",
      letterSpacing: 2,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: radii.full,
      alignSelf: "flex-start",
      marginTop: 4,
      opacity: 0.9,
    },
  }))
  // Create a subtle tinted background using hex + alpha
  const tintBg = `${color}18`
  const tintBorder = `${color}40`

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.card,
          { backgroundColor: tintBg, borderColor: tintBorder },
        ]}
      >
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.detectedLabel}>Mood detected</Text>
          <Text style={[styles.moodLabel, { color }]}>{label}</Text>
        </View>

        {/* Accent dot */}
        <View style={[styles.dot, { backgroundColor: color }]} />
      </View>
    </View>
  )
}
