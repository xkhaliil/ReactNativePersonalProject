import type React from "react"
import { useCallback, useMemo, useState } from "react"
import {
  Pressable,
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native"

import {
  borderWidths,
  colors,
  fontSizes,
  fontWeights,
  radii,
  spacing,
  typography,
} from "../../design-system"
import { useMoodHistory, formatEntryTime, useProfile } from "../../hooks"

import { groupMoodHistoryByDate } from "./groupMoodHistoryByDate"

const PAGE_SIZE = 20

export default function HistoryScreen(): React.JSX.Element {
  const { entries, clearHistory, loading, refreshing, refresh } =
    useMoodHistory()
  const { profile } = useProfile()
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const greeting = profile.displayName.trim()
    ? `${profile.displayName}'s vibes`
    : "Your recent vibes"

  const sections = useMemo(
    () => groupMoodHistoryByDate(entries.slice(0, visibleCount)),
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
        <View style={styles.header}>
          <Text style={styles.title}>History</Text>
          <Text style={styles.subtitle}>{greeting}</Text>
        </View>
      }
      ListEmptyComponent={
        !loading ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>🎭</Text>
            <Text style={styles.emptyTitle}>No scans yet</Text>
            <Text style={styles.emptyDesc}>
              Head to Discover and scan your first mood
            </Text>
          </View>
        ) : null
      }
      ListFooterComponent={
        entries.length > 0 ? (
          <Pressable
            style={({ pressed }) => [
              styles.clearBtn,
              pressed && styles.clearBtnPressed,
            ]}
            onPress={clearHistory}
          >
            <Text style={styles.clearBtnText}>Clear History</Text>
          </Pressable>
        ) : null
      }
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>{section.title}</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={[styles.accentBar, { backgroundColor: item.color }]} />
          <View style={styles.emojiBox}>
            <Text style={styles.emoji}>{item.emoji}</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={[styles.moodLabel, { color: item.color }]}>
              {item.mood}
            </Text>
            <Text style={styles.timeLabel}>
              {formatEntryTime(item.timestamp)}
            </Text>
          </View>
          <View style={[styles.colorDot, { backgroundColor: item.color }]} />
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing["6xl"],
    backgroundColor: colors.bg.screen,
  },
  header: {
    marginBottom: spacing["2xl"],
    gap: spacing.xs,
  },
  title: {
    fontSize: fontSizes["4xl"],
    fontWeight: fontWeights.bold,
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  subtitle: {
    ...typography.bodySecondary,
    color: colors.text.muted,
  },
  sectionHeader: {
    backgroundColor: colors.bg.screen,
    paddingVertical: spacing.sm,
    paddingTop: spacing.lg,
    borderBottomWidth: borderWidths.thin,
    borderBottomColor: colors.border.divider,
    marginBottom: spacing.xs,
  },
  sectionLabel: {
    color: colors.text.muted,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bg.surface,
    borderRadius: radii.lg,
    borderWidth: borderWidths.thin,
    borderColor: colors.border.subtle,
    marginTop: spacing.sm,
    overflow: "hidden",
    gap: spacing.md,
    paddingRight: spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  accentBar: {
    width: 4,
    alignSelf: "stretch",
  },
  emojiBox: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg.surfaceAlt,
  },
  emoji: {
    fontSize: fontSizes.emojiSm,
    lineHeight: 40,
    textAlign: "center",
  },
  cardInfo: {
    flex: 1,
    paddingVertical: spacing.md,
    gap: spacing["2xs"],
  },
  moodLabel: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.bold,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  timeLabel: {
    color: colors.text.muted,
    fontSize: fontSizes.xs,
  },
  colorDot: {
    width: 6,
    height: 6,
    borderRadius: radii.full,
    opacity: 0.8,
  },
  emptyCard: {
    alignItems: "center",
    paddingVertical: spacing["5xl"],
    gap: spacing.md,
  },
  emptyEmoji: {
    fontSize: fontSizes.emojiLg,
  },
  emptyTitle: {
    color: colors.text.primary,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
  },
  emptyDesc: {
    color: colors.text.muted,
    fontSize: fontSizes.sm,
    textAlign: "center",
    lineHeight: 20,
  },
  clearBtn: {
    marginTop: spacing["3xl"],
    borderWidth: borderWidths.base,
    borderColor: colors.border.default,
    borderRadius: radii.full,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  clearBtnPressed: {
    opacity: 0.6,
    backgroundColor: colors.bg.surface,
  },
  clearBtnText: {
    color: colors.text.muted,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    letterSpacing: 0.3,
  },
})
