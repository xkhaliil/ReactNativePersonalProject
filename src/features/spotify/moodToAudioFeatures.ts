/**
 * moodToAudioFeatures
 *
 * Maps a mood label (as used throughout the app) to Spotify audio
 * feature targets for the /recommendations endpoint.
 *
 * Reference ranges from Spotify's audio-features documentation:
 *   valence      0.0 = very negative  → 1.0 = very positive
 *   energy       0.0 = calm/quiet     → 1.0 = loud/fast/noisy
 *   tempo        BPM
 *   danceability 0.0 = not danceable  → 1.0 = very danceable
 */

import { type AudioFeatureSeeds } from "./spotifyClient"

const MOOD_FEATURES: Record<string, AudioFeatureSeeds> = {
  Happy: {
    target_valence: 0.85,
    target_energy: 0.75,
    target_tempo: 120,
    target_danceability: 0.75,
    seed_genres: "pop,indie-pop,happy",
  },
  Sad: {
    target_valence: 0.15,
    target_energy: 0.25,
    target_tempo: 72,
    target_danceability: 0.3,
    seed_genres: "sad,indie,singer-songwriter",
  },
  Angry: {
    target_valence: 0.2,
    target_energy: 0.95,
    target_tempo: 160,
    target_danceability: 0.5,
    seed_genres: "metal,hard-rock,punk",
  },
  Chill: {
    target_valence: 0.6,
    target_energy: 0.3,
    target_tempo: 88,
    target_danceability: 0.55,
    seed_genres: "chill,lo-fi,ambient",
  },
  Hype: {
    target_valence: 0.75,
    target_energy: 0.95,
    target_tempo: 140,
    target_danceability: 0.9,
    seed_genres: "edm,hip-hop,dance",
  },
}

const FALLBACK: AudioFeatureSeeds = {
  target_valence: 0.5,
  target_energy: 0.5,
  target_tempo: 110,
  target_danceability: 0.6,
  seed_genres: "pop",
}

/**
 * Returns Spotify audio-feature seeds for a given mood label.
 * Falls back to neutral values for unrecognised moods.
 */
export function moodToAudioFeatures(mood: string): AudioFeatureSeeds {
  return MOOD_FEATURES[mood] ?? FALLBACK
}
