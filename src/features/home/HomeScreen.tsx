import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { HomeStackParamList } from "#shared"
import {
  ScreenLayout,
  ScreenTitle,
  BodySecondary,
  Label,
  Button,
  spacing,
  palette,
} from "../../design-system"
import { useMoodHistory, useProfile } from "../../hooks"
import MoodCamera from "./MoodCamera"
import MoodCard from "./MoodCard"
import PlaylistCard from "./PlaylistCard"

type HomeNavProp = NativeStackNavigationProp<HomeStackParamList, "Home">

type Mood = {
  emoji: string
  label: string
  color: string
  playlist: {
    title: string
    genre: string
  }
}

const MOODS: Mood[] = [
  {
    emoji: "😊",
    label: "Happy",
    color: palette.yellow500,
    playlist: { title: "Sunshine Hits", genre: "Pop / Indie Pop" },
  },
  {
    emoji: "😢",
    label: "Sad",
    color: palette.blue500,
    playlist: { title: "Rainy Day Blues", genre: "Sad Indie / Lo-Fi" },
  },
  {
    emoji: "😤",
    label: "Angry",
    color: palette.orange500,
    playlist: { title: "Rage Mode 💢", genre: "Metal / Hard Rock" },
  },
  {
    emoji: "😎",
    label: "Chill",
    color: palette.cyan500,
    playlist: { title: "Sunday Vibes", genre: "Chillwave / Lo-Fi" },
  },
  {
    emoji: "🔥",
    label: "Hype",
    color: palette.pink500,
    playlist: { title: "LET'S GO 🔥", genre: "EDM / Hip-Hop" },
  },
]

export default function HomeScreen() {
  const [moodIndex, setMoodIndex] = useState(0)
  const navigation = useNavigation<HomeNavProp>()
  const { addEntry } = useMoodHistory()
  const { profile, showGenreHints } = useProfile()
  const currentMood = MOODS[moodIndex]

  const genreHint =
    showGenreHints && profile.favouriteGenre.trim()
      ? `🎼 Suggested Playlist · ${profile.favouriteGenre}`
      : "🎼 Suggested Playlist"

  const handleScan = () => {
    const nextIndex = (moodIndex + 1) % MOODS.length
    const scannedMood = MOODS[nextIndex]
    setMoodIndex(nextIndex)
    void addEntry({
      mood: scannedMood.label,
      emoji: scannedMood.emoji,
      color: scannedMood.color,
    })
  }

  return (
    <ScreenLayout centered>
      <ScreenTitle style={styles.title}>🎧 Mood Playlist</ScreenTitle>
      <BodySecondary style={styles.subtitle}>Let your vibe pick your music</BodySecondary>

      <MoodCamera onScan={handleScan} />

      <MoodCard
        emoji={currentMood.emoji}
        label={currentMood.label}
        color={currentMood.color}
      />

      <View style={styles.sectionRow}>
        <Label style={styles.sectionLabel}>{genreHint}</Label>
      </View>

      <PlaylistCard
        title={currentMood.playlist.title}
        genre={currentMood.playlist.genre}
      />

      <Button
        label="🎵 View Full Playlist"
        onPress={() =>
          navigation.navigate("PlaylistDetail", {
            mood: currentMood.label,
            emoji: currentMood.emoji,
            color: currentMood.color,
            playlistTitle: currentMood.playlist.title,
            genre: currentMood.playlist.genre,
          })
        }
        variant="outline"
        accentColor={currentMood.color}
      />

      <Button
        label="🔀 Change Mood"
        onPress={handleScan}
        variant="ghost"
      />
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    marginBottom: spacing["3xl"],
  },
  sectionRow: {
    width: "100%",
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  sectionLabel: {
    color: undefined,
  },
})
