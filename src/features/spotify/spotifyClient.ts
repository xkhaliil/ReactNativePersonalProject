/**
 * spotifyClient
 *
 * Typed, token-aware fetch wrappers for the Spotify Web API.
 * Every function takes an `accessToken` so callers stay stateless —
 * the token comes from `useSpotifyAuth`.
 *
 * Endpoints used:
 *   GET /v1/me                     — current user profile
 *   GET /v1/recommendations        — seed-based track recommendations
 *   GET /v1/search                 — search tracks/playlists
 */

const BASE = "https://api.spotify.com/v1"

// ─── Response shapes ──────────────────────────────────────────────────────────

export type SpotifyImage = { url: string; width: number; height: number }

export type SpotifyUser = {
  id: string
  display_name: string
  email: string
  images: SpotifyImage[]
}

export type SpotifyTrack = {
  id: string
  name: string
  uri: string
  duration_ms: number
  artists: Array<{ id: string; name: string }>
  album: {
    id: string
    name: string
    images: SpotifyImage[]
  }
  external_urls: { spotify: string }
}

export type SpotifyRecommendationsResponse = {
  tracks: SpotifyTrack[]
}

export type SpotifySearchResponse = {
  tracks: {
    items: SpotifyTrack[]
    total: number
  }
}

export type SpotifyPlaylist = {
  id: string
  name: string
  uri: string
  external_urls: { spotify: string }
  images: SpotifyImage[]
}

type SpotifyPlaylistSearchResponse = {
  playlists: {
    items: SpotifyPlaylist[]
  }
}

// ─── Audio feature seeds (used in recommendations) ────────────────────────────

export type AudioFeatureSeeds = {
  /** 0.0 (sad) → 1.0 (happy) */
  target_valence: number
  /** 0.0 (calm) → 1.0 (energetic) */
  target_energy: number
  /** BPM */
  target_tempo: number
  /** 0.0 (acoustic) → 1.0 (electronic/danceable) */
  target_danceability: number
  /** Genre seeds (up to 5 combined with artist/track seeds) */
  seed_genres: string
}

// ─── Helper ───────────────────────────────────────────────────────────────────

async function spotifyFetch<T>(
  path: string,
  accessToken: string,
  params?: Record<string, string>,
): Promise<T> {
  const url = new URL(`${BASE}${path}`)
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v)
    }
  }

  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Spotify API ${response.status}: ${body}`)
  }

  return response.json() as Promise<T>
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Fetch the authenticated user's Spotify profile. */
export async function fetchCurrentUser(
  accessToken: string,
): Promise<SpotifyUser> {
  return spotifyFetch<SpotifyUser>("/me", accessToken)
}

/**
 * Fetch track recommendations seeded by mood-derived audio features.
 * Returns up to `limit` tracks (default 10).
 */
export async function fetchRecommendations(
  accessToken: string,
  seeds: AudioFeatureSeeds,
  limit = 10,
): Promise<SpotifyTrack[]> {
  const params: Record<string, string> = {
    limit: String(limit),
    seed_genres: seeds.seed_genres,
    target_valence: String(seeds.target_valence),
    target_energy: String(seeds.target_energy),
    target_tempo: String(seeds.target_tempo),
    target_danceability: String(seeds.target_danceability),
  }

  const data = await spotifyFetch<SpotifyRecommendationsResponse>(
    "/recommendations",
    accessToken,
    params,
  )
  return data.tracks
}

/**
 * Search Spotify for tracks matching `query`.
 * Returns up to `limit` tracks (default 10).
 */
export async function searchTracks(
  accessToken: string,
  query: string,
  limit = 10,
): Promise<SpotifyTrack[]> {
  const data = await spotifyFetch<SpotifySearchResponse>(
    "/search",
    accessToken,
    {
      q: query,
      type: "track",
      limit: String(limit),
    },
  )
  return data.tracks.items
}

/**
 * Search Spotify for a playlist matching a mood/genre query.
 * Returns the first result, or null if nothing found or the request fails.
 */
export async function fetchMoodPlaylist(
  accessToken: string,
  query: string,
): Promise<SpotifyPlaylist | null> {
  try {
    const data = await spotifyFetch<SpotifyPlaylistSearchResponse>(
      "/search",
      accessToken,
      { q: query, type: "playlist", limit: "1" },
    )
    return data.playlists.items[0] ?? null
  } catch {
    return null
  }
}
