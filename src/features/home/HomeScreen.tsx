import { useNavigation } from "@react-navigation/native"
import { type NativeStackNavigationProp } from "@react-navigation/native-stack"
import type React from "react"

import { StyleSheet, Text, View } from "react-native"

import { type HomeStackParamList } from "#shared"

import {
  BodySecondary,
  Button,
  colors,
  fontSizes,
  fontWeights,
  radii,
  spacing,
} from "../../design-system"

import MoodCamera from "./MoodCamera"
import MoodCard from "./MoodCard"
import PlaylistCard from "./PlaylistCard"
import { useHomeMood } from "./useHomeMood"

type HomeNavProp = NativeStackNavigationProp<HomeStackParamList, "Home">

export default function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeNavProp>()
  const {
    currentMood,
    spotifyTracks,
    playlistUrl,
    genreHint,
    isConnected,
    handleMoodDetected,
  } = useHomeMood()

  return (
    <View style={styles.screen}>
      <MoodCamera onMoodDetected={handleMoodDetected} />

      {!isConnected && (
        <View style={styles.noticeBadge}>
          <Text style={styles.noticeText}>
            Connect Spotify in Settings for real tracks
          </Text>
        </View>
      )}

      <MoodCard
        emoji={currentMood.emoji}
        label={currentMood.label}
        color={currentMood.color}
      />

      <View style={styles.playlistSection}>
        <View style={styles.playlistHeader}>
          <BodySecondary style={styles.playlistHintLabel}>
            {genreHint}
          </BodySecondary>
        </View>

        <PlaylistCard
          title={currentMood.playlist.title}
          genre={currentMood.playlist.genre}
          moodColor={currentMood.color}
          spotifyUrl={playlistUrl}
        />

        <Button
          label="View Full Playlist →"
          onPress={(): void =>
            navigation.navigate("PlaylistDetail", {
              mood: currentMood.label,
              emoji: currentMood.emoji,
              color: currentMood.color,
              playlistTitle: currentMood.playlist.title,
              genre: currentMood.playlist.genre,
              tracks:
                spotifyTracks.length > 0
                  ? spotifyTracks.map(
                      (t) => `${t.name} – ${t.artists[0]?.name ?? ""}`,
                    )
                  : undefined,
              trackUrls:
                spotifyTracks.length > 0
                  ? spotifyTracks.map((t) => t.external_urls.spotify)
                  : undefined,
              playlistUrl,
            })
          }
          variant="outline"
          accentColor={currentMood.color}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg.screen,
    paddingBottom: spacing["6xl"],
  },
  noticeBadge: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.sm,
    backgroundColor: colors.bg.surfaceAlt,
    borderRadius: radii.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
    alignItems: "center",
  },
  noticeText: {
    color: colors.text.muted,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    letterSpacing: 0.2,
  },
  playlistSection: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  playlistHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  playlistHintLabel: {
    color: colors.text.muted,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
})
