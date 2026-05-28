import {
  useNavigation,
  useRoute,
  type RouteProp,
} from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StyleSheet, Text, View } from "react-native"
import type { HomeStackParamList } from "#shared"
import {
  ScreenLayout,
  SectionTitle,
  CardTitle,
  BodySecondary,
  Button,
  Card,
  colors,
  typography,
  spacing,
  fontSizes,
  radii,
} from "../../design-system"

type PlaylistDetailRouteProp = RouteProp<HomeStackParamList, "PlaylistDetail">
type PlaylistDetailNavProp = NativeStackNavigationProp<
  HomeStackParamList,
  "PlaylistDetail"
>

const TRACK_LIST: Record<string, string[]> = {
  Happy: [
    "Good as Hell – Lizzo",
    "Can't Stop the Feeling – Justin Timberlake",
    "Happy – Pharrell",
    "Walking on Sunshine – Katrina",
    "Uptown Funk – Bruno Mars",
  ],
  Sad: [
    "The Night We Met – Lord Huron",
    "Skinny Love – Bon Iver",
    "Liability – Lorde",
    "Lua – Bright Eyes",
    "Holocene – Bon Iver",
  ],
  Angry: [
    "Break Stuff – Limp Bizkit",
    "Given Up – Linkin Park",
    "Killing in the Name – RATM",
    "Du Hast – Rammstein",
    "Bodies – Drowning Pool",
  ],
  Chill: [
    "Redbone – Childish Gambino",
    "Breathe – Pink Floyd",
    "Intro – The xx",
    "Banana Pancakes – Jack Johnson",
    "The Less I Know – Tame Impala",
  ],
  Hype: [
    "HUMBLE. – Kendrick Lamar",
    "Level Up – Ciara",
    "Power – Kanye West",
    "Turn Down for What – DJ Snake",
    "Sicko Mode – Travis Scott",
  ],
}

export default function PlaylistDetailScreen() {
  const route = useRoute<PlaylistDetailRouteProp>()
  const navigation = useNavigation<PlaylistDetailNavProp>()
  const { mood, emoji, color, playlistTitle, genre } = route.params
  const tracks = TRACK_LIST[mood] ?? []

  return (
    <ScreenLayout>
      <Card variant="bordered" accentColor={color} style={styles.header}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={[typography.moodLabel, { color }]}>{mood}</Text>
        <CardTitle style={styles.playlistTitle}>{playlistTitle}</CardTitle>
        <BodySecondary style={styles.genre}>{genre}</BodySecondary>
      </Card>

      <SectionTitle style={styles.sectionTitle}>🎵 Tracks</SectionTitle>

      {tracks.map((track, i) => (
        <Card key={i} variant="surfaceAlt" style={styles.trackRow}>
          <Text style={typography.trackNumber}>{i + 1}</Text>
          <Text style={styles.trackName}>{track}</Text>
        </Card>
      ))}

      <Button
        label="← Back to Mood Picker"
        onPress={() => navigation.goBack()}
        variant="primary"
        accentColor={color}
      />
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: spacing["2xl"],
  },
  emoji: {
    fontSize: fontSizes.emojiXl,
  },
  playlistTitle: {
    marginTop: spacing.md,
    textAlign: "center",
  },
  genre: {
    marginTop: spacing.xs,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radii.md,
    marginBottom: spacing.sm,
    gap: spacing.lg,
  },
  trackName: {
    color: colors.text.primary,
    fontSize: fontSizes.md,
    flex: 1,
  },
})
