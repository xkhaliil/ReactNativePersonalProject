import { useRoute, type RouteProp } from "@react-navigation/native"
import type React from "react"
import { useMemo } from "react"
import {
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native"

import { type HomeStackParamList } from "#shared"

import { useHomeStackNavigation } from "../../navigation"

import {
  borderWidths,
  colors,
  fontSizes,
  fontWeights,
  radii,
  spacing,
} from "../../design-system"

import {
  buildPlaylistTrackRows,
  type PlaylistTrackRow,
} from "./playlistTracks"

type PlaylistDetailRouteProp = RouteProp<HomeStackParamList, "PlaylistDetail">

export default function PlaylistDetailScreen(): React.JSX.Element {
  const route = useRoute<PlaylistDetailRouteProp>()
  const navigation = useHomeStackNavigation()
  const {
    mood,
    emoji,
    color,
    playlistTitle,
    genre,
    tracks: passedTracks,
    trackUrls,
    playlistUrl,
  } = route.params

  const trackRows = useMemo(
    () => buildPlaylistTrackRows(mood, passedTracks, trackUrls),
    [mood, passedTracks, trackUrls],
  )

  const tintBg = `${color}14`
  const tintBorder = `${color}35`

  const openInSpotify = (url: string): void => {
    void Linking.openURL(url)
  }

  const renderTrack = ({
    item,
    index,
  }: {
    item: PlaylistTrackRow
    index: number
  }): React.JSX.Element => {
    const row = (
      <View
        style={[
          styles.trackRow,
          item.spotifyUrl !== undefined && styles.trackRowTappable,
        ]}
      >
        <Text style={[styles.trackNum, { color }]}>{index + 1}</Text>
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle} numberOfLines={1}>
            {item.title}
          </Text>
          {item.artist !== undefined && (
            <Text style={styles.trackArtist} numberOfLines={1}>
              {item.artist}
            </Text>
          )}
        </View>
        {item.spotifyUrl !== undefined ? (
          <Text style={[styles.spotifyIcon, { color }]}>▶</Text>
        ) : (
          <Text style={styles.trackChevron}>›</Text>
        )}
      </View>
    )

    if (item.spotifyUrl !== undefined) {
      return (
        <Pressable
          onPress={() => openInSpotify(item.spotifyUrl!)}
          style={({ pressed }) => [
            styles.trackItem,
            pressed && styles.trackRowPressed,
          ]}
        >
          {row}
        </Pressable>
      )
    }

    return <View style={styles.trackItem}>{row}</View>
  }

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={trackRows}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.trackSeparator} />}
      ListHeaderComponent={
        <>
          <View
            style={[
              styles.header,
              { backgroundColor: tintBg, borderColor: tintBorder },
            ]}
          >
            <Text style={styles.emoji}>{emoji}</Text>
            <Text style={[styles.moodLabel, { color }]}>{mood}</Text>
            <Text style={styles.playlistTitle}>{playlistTitle}</Text>
            <Text style={styles.genre}>{genre}</Text>

            {playlistUrl !== undefined && (
              <Pressable
                style={({ pressed }) => [
                  styles.openPlaylistBtn,
                  { borderColor: color },
                  pressed && styles.openPlaylistBtnPressed,
                ]}
                onPress={() => openInSpotify(playlistUrl)}
              >
                <Text style={styles.openPlaylistIcon}>▶</Text>
                <Text style={[styles.openPlaylistText, { color }]}>
                  Open Playlist in Spotify
                </Text>
              </Pressable>
            )}
          </View>

          <Text style={styles.sectionHeading}>Tracks</Text>
        </>
      }
      renderItem={renderTrack}
      ListFooterComponent={
        <Pressable
          style={({ pressed }) => [
            styles.backBtn,
            { borderColor: tintBorder },
            pressed && styles.backBtnPressed,
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backBtnText, { color }]}>← Back</Text>
        </Pressable>
      }
    />
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg.screen,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing["7xl"],
  },
  header: {
    alignItems: "center",
    borderRadius: radii["2xl"],
    borderWidth: borderWidths.base,
    padding: spacing["3xl"],
    gap: spacing.sm,
    marginBottom: spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  emoji: {
    fontSize: fontSizes.emojiLg,
    marginBottom: spacing.xs,
  },
  moodLabel: {
    fontSize: fontSizes["3xl"],
    fontWeight: fontWeights.bold,
    textTransform: "uppercase",
    letterSpacing: 3,
  },
  playlistTitle: {
    color: colors.text.primary,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    textAlign: "center",
  },
  genre: {
    color: colors.text.muted,
    fontSize: fontSizes.sm,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  sectionHeading: {
    color: colors.text.muted,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  trackItem: {
    marginBottom: 0,
  },
  trackSeparator: {
    height: spacing.xs,
  },
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bg.surface,
    borderRadius: radii.lg,
    borderWidth: borderWidths.thin,
    borderColor: colors.border.subtle,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  trackRowTappable: {
    borderColor: colors.border.default,
  },
  trackRowPressed: {
    opacity: 0.7,
  },
  trackNum: {
    width: 24,
    textAlign: "center",
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.bold,
  },
  trackInfo: {
    flex: 1,
    gap: 2,
  },
  trackTitle: {
    color: colors.text.primary,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
  },
  trackArtist: {
    color: colors.text.muted,
    fontSize: fontSizes.xs,
  },
  trackChevron: {
    color: colors.text.faint,
    fontSize: 22,
    lineHeight: 22,
  },
  spotifyIcon: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: fontWeights.bold,
  },
  openPlaylistBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.md,
    borderWidth: borderWidths.base,
    borderRadius: radii.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  openPlaylistBtnPressed: {
    opacity: 0.7,
  },
  openPlaylistIcon: {
    fontSize: 12,
    color: colors.accent.default,
  },
  openPlaylistText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.bold,
    letterSpacing: 0.3,
  },
  backBtn: {
    borderWidth: borderWidths.base,
    borderRadius: radii.full,
    paddingVertical: spacing.md,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  backBtnPressed: {
    opacity: 0.7,
  },
  backBtnText: {
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.base,
    letterSpacing: 0.3,
  },
})
