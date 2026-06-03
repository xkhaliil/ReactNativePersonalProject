/**
 * useHomeMood
 *
 * Owns mood-scan business logic for the Discover screen: mood catalogue,
 * Spotify recommendations, history persistence triggers, and genre hints.
 * HomeScreen stays focused on layout and navigation.
 */

import { useCallback, useState } from "react"

import { palette } from "../../design-system"
import { useMoodHistory, useProfile } from "../../hooks"
import {
  fetchMoodPlaylist,
  fetchRecommendations,
  moodToAudioFeatures,
  useSpotifyAuth,
  type SpotifyTrack,
} from "../spotify"

export type HomeMood = {
  emoji: string
  label: string
  color: string
  playlist: {
    title: string
    genre: string
  }
}

const MOODS: HomeMood[] = [
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

type UseHomeMoodReturn = {
  currentMood: HomeMood
  spotifyTracks: SpotifyTrack[]
  playlistUrl: string | undefined
  genreHint: string
  isConnected: boolean
  handleMoodDetected: (detectedLabel: string) => void
}

export function useHomeMood(): UseHomeMoodReturn {
  const [currentMood, setCurrentMood] = useState<HomeMood>(MOODS[0])
  const [spotifyTracks, setSpotifyTracks] = useState<SpotifyTrack[]>([])
  const [playlistUrl, setPlaylistUrl] = useState<string | undefined>(undefined)
  const { addEntry } = useMoodHistory()
  const { profile, showGenreHints } = useProfile()
  const { accessToken, isConnected } = useSpotifyAuth()

  const genreHint =
    showGenreHints && profile.favouriteGenre.trim()
      ? `Your ${profile.favouriteGenre} playlist`
      : "Suggested Playlist"

  const handleMoodDetected = useCallback(
    (detectedLabel: string) => {
      const mood = MOODS.find((m) => m.label === detectedLabel) ?? MOODS[0]
      setCurrentMood(mood)
      setSpotifyTracks([])
      setPlaylistUrl(undefined)
      void addEntry({ mood: mood.label, emoji: mood.emoji, color: mood.color })

      if (accessToken) {
        void (async (): Promise<void> => {
          try {
            const [fetched, playlist] = await Promise.all([
              fetchRecommendations(
                accessToken,
                moodToAudioFeatures(mood.label),
                10,
              ),
              fetchMoodPlaylist(accessToken, mood.playlist.genre),
            ])
            setSpotifyTracks(fetched)
            setPlaylistUrl(playlist?.external_urls.spotify)
          } catch {
            setSpotifyTracks([])
          }
        })()
      }
    },
    [accessToken, addEntry],
  )

  return {
    currentMood,
    spotifyTracks,
    playlistUrl,
    genreHint,
    isConnected,
    handleMoodDetected,
  }
}
