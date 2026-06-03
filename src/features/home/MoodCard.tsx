import type React from "react"
import { StyleSheet, Text } from "react-native"

import { Card, typography, spacing, fontSizes } from "../../design-system"

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
  return (
    <Card variant="bordered" accentColor={color} style={styles.card}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[typography.moodLabel, { color }]}>{label}</Text>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.md,
    width: "100%",
  },
  emoji: {
    fontSize: fontSizes.emojiXl,
  },
})
