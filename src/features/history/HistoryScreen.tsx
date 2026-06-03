import type React from "react"
import { useCallback, useMemo, useState } from "react"
import {
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native"

import {
  ScreenTitle,
  BodySecondary,
  Card,
  Button,
  Label,
  typography,
  colors,
  spacing,
  fontSizes,
} from "../../design-system"
import { useMoodHistory, formatEntryTime, useProfile } from "../../hooks"
import { type MoodEntry } from "../../hooks/useMoodHistory"

const PAGE_SIZE = 20

type Section = {
  title: string
  data: MoodEntry[]
}

function groupByDate(entries: MoodEntry[]): Section[] {
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)

  const isSameDay = (a: Date, b: Date): boolean =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  const buckets: Record<string, MoodEntry[]> = {}
  for (const entry of entries) {
    const d = new Date(entry.timestamp)
    const key = isSameDay(d, now)
      ? "Today"
      : isSameDay(d, yesterday)
        ? "Yesterday"
        : d.toLocaleDateString([], {
            weekday: "short",
            month: "short",
            day: "numeric",
          })
    buckets[key] ??= []
    buckets[key].push(entry)
  }

  return Object.entries(buckets).map(([title, data]) => ({ title, data }))
}

export default function HistoryScreen(): React.JSX.Element {
  const { entries, clearHistory, loading, refreshing, refresh } =
    useMoodHistory()
  const { profile } = useProfile()
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const greeting = profile.displayName.trim()
    ? `${profile.displayName}'s recent vibes`
    : "Your recent vibes"

  const sections = useMemo(
    () => groupByDate(entries.slice(0, visibleCount)),
    [entries, visibleCount],
  )

  const loadMore = useCallback(() => {
    if (visibleCount < entries.length) {
      setVisibleCount((n) => Math.min(n + PAGE_SIZE, entries.length))
    }
  }, [visibleCount, entries.length])

  const handleRefresh = useCallback(async () => {
    setVisibleCount(PAGE_SIZE)
    await refresh()
  }, [refresh])

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      stickySectionHeadersEnabled
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      refreshControl={
        <RefreshControl
          refreshing={refreshing || loading}
          onRefresh={handleRefresh}
          tintColor={colors.accent.default}
          colors={[colors.accent.default]}
        />
      }
      ListHeaderComponent={
        <View>
          <ScreenTitle style={styles.title}>📅 Mood History</ScreenTitle>
          <BodySecondary style={styles.subtitle}>{greeting}</BodySecondary>
        </View>
      }
      ListEmptyComponent={
        !loading ? (
          <Card variant="surface" style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>🎭</Text>
            <BodySecondary style={styles.emptyText}>
              No mood scans yet.{"\n"}Head to Discover and scan your first mood!
            </BodySecondary>
          </Card>
        ) : null
      }
      ListFooterComponent={
        entries.length > 0 ? (
          <Button
            label="🗑 Clear History"
            onPress={clearHistory}
            variant="ghost"
          />
        ) : null
      }
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeader}>
          <Label style={styles.sectionLabel}>{section.title}</Label>
        </View>
      )}
      renderItem={({ item }) => (
        <Card variant="leftAccent" accentColor={item.color} style={styles.card}>
          <Text style={styles.emoji}>{item.emoji}</Text>
          <View style={styles.info}>
            <Text style={[typography.moodLabelSm, { color: item.color }]}>
              {item.mood}
            </Text>
            <Text style={styles.time}>{formatEntryTime(item.timestamp)}</Text>
          </View>
        </Card>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing["2xl"],
    paddingBottom: spacing["4xl"],
    backgroundColor: colors.bg.screen,
  },
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    marginBottom: spacing["2xl"],
  },
  sectionHeader: {
    backgroundColor: colors.bg.screen,
    paddingVertical: spacing.xs,
    paddingTop: spacing.md,
  },
  sectionLabel: {
    color: colors.text.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
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
    marginTop: spacing.xl,
  },
  emptyEmoji: {
    fontSize: fontSizes.emojiXl,
    marginBottom: spacing.md,
  },
  emptyText: {
    textAlign: "center",
  },
  clearButton: {
    marginTop: spacing["2xl"],
  },
})
