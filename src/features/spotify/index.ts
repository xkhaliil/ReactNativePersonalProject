/**
 * spotify feature — public barrel
 *
 * Import everything Spotify-related from here, not from sub-files.
 */

export { useSpotifyAuth } from "./useSpotifyAuth"
export { moodToAudioFeatures } from "./moodToAudioFeatures"
export { detectMoodFromPhoto } from "./detectMood"
export {
  fetchCurrentUser,
  fetchRecommendations,
  fetchMoodPlaylist,
  searchTracks,
} from "./spotifyClient"
export type {
  SpotifyUser,
  SpotifyTrack,
  SpotifyPlaylist,
  SpotifyImage,
  AudioFeatureSeeds,
} from "./spotifyClient"
