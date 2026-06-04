/**
 * useSpotifyAuth
 *
 * Manages the Spotify OAuth 2.0 Authorization Code + PKCE flow using
 * expo-auth-session. No client secret is required, and PKCE is safe for
 * mobile apps.
 *
 * Setup required (once, before using):
 *   1. Create a Spotify app at https://developer.spotify.com/dashboard
 *   2. Add redirect URI:  skycast://spotify-auth  (production)
 *                         exp://localhost:8081     (Expo Go dev)
 *   3. Copy the Client ID into .env as EXPO_PUBLIC_SPOTIFY_CLIENT_ID
 *
 * Usage:
 *   const { accessToken, isConnected, isLoading, connect, disconnect } =
 *     useSpotifyAuth()
 */

import { makeRedirectUri, useAuthRequest } from "expo-auth-session"
import * as WebBrowser from "expo-web-browser"
import { useCallback, useEffect, useState } from "react"

import { useStorage } from "#shared"

// Required so expo-auth-session can close the browser tab on redirect
WebBrowser.maybeCompleteAuthSession()

// Constants

const CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID ?? ""

const DISCOVERY = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
}

/**
 * Scopes requested from Spotify.
 * Keep this minimal - only request what the app actually uses.
 */
const SCOPES = [
  "user-read-email",
  "user-read-private",
  "user-top-read",
  "streaming",
]

const STORAGE_KEY = "spotify-auth-v1"

// Types

type StoredTokens = {
  accessToken: string
  /** Unix timestamp (ms) when the access token expires */
  expiresAt: number
}

type UseSpotifyAuthReturn = {
  /** The current access token, or null if not connected */
  accessToken: string | null
  isConnected: boolean
  isLoading: boolean
  /** Open the Spotify login page */
  connect: () => void
  /** Clear all stored tokens */
  disconnect: () => Promise<void>
}

// Hook

export function useSpotifyAuth(): UseSpotifyAuthReturn {
  const redirectUri = makeRedirectUri({
    scheme: "skycast",
    path: "spotify-auth",
  })

  const [storedTokens, setStoredTokens, { loading: storageLoading }] =
    useStorage<StoredTokens | null>(STORAGE_KEY, null)

  const [isExchanging, setIsExchanging] = useState(false)

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: SCOPES,
      redirectUri,
      usePKCE: true,
    },
    DISCOVERY,
  )

  // Exchange auth code -> access token when Spotify redirects back
  useEffect(() => {
    if (response?.type !== "success") return
    const { code } = response.params

    setIsExchanging(true)
    void (async () => {
      try {
        const body = new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
          client_id: CLIENT_ID,
          code_verifier: request?.codeVerifier ?? "",
        })

        const res = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        })

        if (!res.ok) {
          throw new Error(`Token exchange failed: ${res.status}`)
        }

        const json = (await res.json()) as {
          access_token: string
          expires_in: number
        }

        await setStoredTokens({
          accessToken: json.access_token,
          expiresAt: Date.now() + json.expires_in * 1000,
        })
      } finally {
        setIsExchanging(false)
      }
    })()
  }, [response, request, redirectUri, setStoredTokens])

  const isTokenValid =
    storedTokens !== null && storedTokens.expiresAt > Date.now()

  const connect = useCallback(() => {
    void promptAsync()
  }, [promptAsync])

  const disconnect = useCallback(async () => {
    await setStoredTokens(null)
  }, [setStoredTokens])

  return {
    accessToken: isTokenValid ? storedTokens.accessToken : null,
    isConnected: isTokenValid,
    isLoading: storageLoading || isExchanging,
    connect,
    disconnect,
  }
}

