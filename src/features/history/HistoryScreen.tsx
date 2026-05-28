import { StyleSheet, Text, View } from "react-native"
import {
  ScreenLayout,
  ScreenTitle,
  BodySecondary,
  Card,
  Button,
  typography,
  colors,
  spacing,
  fontSizes,
} from "../../design-system"
import { useMoodHistory, formatEntryTime, useProfile } from "../../hooks"

export default function HistoryScreen() {
  const { entries, clearHistory, loading } = useMoodHistory()
  const { profile } = useProfile()

  const greeting = profile.displayName.trim()
    ? `${profile.displayName}'s recent vibes`
    : "Your recent vibes"

  return (
    <ScreenLayout>
      <ScreenTitle style={styles.title}>📅 Mood History</ScreenTitle>
      <BodySecondary style={styles.subtitle}>{greeting}</BodySecondary>

      {!loading && entries.length === 0 && (
        <Card variant="surface" style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>🎭</Text>
          <BodySecondary style={styles.emptyText}>
            No mood scans yet.{"\n"}Head to Discover and scan your first mood!
          </BodySecondary>
        </Card>
      )}

      {entries.map((entry) => (
        <Card key={entry.id} variant="leftAccent" accentColor={entry.color} style={styles.card}>
          <Text style={styles.emoji}>{entry.emoji}</Text>
          <View style={styles.info}>
            <Text style={[typography.moodLabelSm, { color: entry.color }]}>
              {entry.mood}
            </Text>
            <Text style={styles.time}>{formatEntryTime(entry.timestamp)}</Text>
          </View>
        </Card>
      ))}

      {entries.length > 0 && (
        <Button
          label="🗑 Clear History"
          onPress={clearHistory}
          variant="ghost"
        />
      )}
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    marginBottom: spacing["2xl"],
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
    gap: spacing.lg,
  },
  emoji: {
    fontSize: fontSizes.emojiMd,
  },
  info: {
    flex: 1,
  },
  time: {
    color: colors.text.muted,
    fontSize: fontSizes.xs,
    marginTop: spacing["2xs"],
  },
  emptyCard: {
    alignItems: "center",
    paddingVertical: spacing["4xl"],
  },
  emptyEmoji: {
    fontSize: fontSizes.emojiXl,
    marginBottom: spacing.md,
  },
  emptyText: {
    textAlign: "center",
  },
})
