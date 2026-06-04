/**
 * useSettings
 *
 * Persists user preferences across app launches.
 * All boolean toggle state lives here and is read/written through this hook
 * so switches survive app restarts.
 */

import { useCallback } from "react"

import { useStorage } from "#shared"

const STORAGE_KEY = "app-settings-v1"

export type AppSettings = {
  // Legacy settings (SettingsScreen)
  cameraEnabled: boolean
  autoPlay: boolean
  notifications: boolean
  // Profile preferences
  hapticsEnabled: boolean
  compactHistory: boolean
  showGenreHints: boolean
}

const DEFAULT_SETTINGS: AppSettings = {
  cameraEnabled: true,
  autoPlay: false,
  notifications: true,
  hapticsEnabled: true,
  compactHistory: false,
  showGenreHints: true,
}

type UseSettingsReturn = {
  settings: AppSettings
  setSetting: <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K],
  ) => Promise<void>
  loading: boolean
}

export function useSettings(): UseSettingsReturn {
  const [settings, setSettings, { loading }] = useStorage<AppSettings>(
    STORAGE_KEY,
    DEFAULT_SETTINGS,
  )

  const setSetting = useCallback(
    async <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
      await setSettings((prev) => ({ ...prev, [key]: value }))
    },
    [setSettings],
  )

  return { settings, setSetting, loading }
}

