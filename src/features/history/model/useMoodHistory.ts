/**
 * useMoodHistory
 *
 * Persists the list of mood scans across app launches.
 * Every time the user scans, call `addEntry` and the entry is saved
 * immediately and survives app restarts.
 *
 * Haptic feedback is fired here via useHaptics, so neither HomeScreen
 * nor MoodCamera know anything about the device feature.
 *
 * HistoryScreen reads `entries` to show real data.
 * HomeScreen calls `addEntry` on every scan.
 */

import { useCallback, useState } from "react"

import { useHaptics, useStorage } from "#shared"

const STORAGE_KEY = "mood-history-v1"
const MAX_ENTRIES = 50

export type MoodEntry = {
  id: string
  mood: string
  emoji: string
  color: string
  timestamp: number // Unix ms
}

type UseMoodHistoryReturn = {
  entries: MoodEntry[]
  addEntry: (mood: Omit<MoodEntry, "id" | "timestamp">) => Promise<void>
  clearHistory: () => Promise<void>
  loading: boolean
  refreshing: boolean
  refresh: () => Promise<void>
}

export function useMoodHistory(): UseMoodHistoryReturn {
  const [entries, setEntries, { loading }] = useStorage<MoodEntry[]>(
    STORAGE_KEY,
    [],
  )
  const [refreshing, setRefreshing] = useState(false)
  const { triggerMoodScan } = useHaptics()

  const addEntry = useCallback(
    async (mood: Omit<MoodEntry, "id" | "timestamp">) => {
      const entry: MoodEntry = {
        ...mood,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: Date.now(),
      }
      // Persist and give physical feedback at the same moment
      await Promise.all([
        setEntries((prev) => [entry, ...prev].slice(0, MAX_ENTRIES)),
        triggerMoodScan(mood.mood),
      ])
    },
    [setEntries, triggerMoodScan],
  )

  const clearHistory = useCallback(async () => {
    await setEntries([])
  }, [setEntries])

  const refresh = useCallback(async () => {
    setRefreshing(true)
    // Re-read is handled automatically by useStorage on mount; here we just
    // give a brief visual pulse so the pull-to-refresh feels responsive.
    await new Promise<void>((resolve) => setTimeout(resolve, 600))
    setRefreshing(false)
  }, [setRefreshing])

  return { entries, addEntry, clearHistory, loading, refreshing, refresh }
}

/**
 * Formats a timestamp into a human-readable relative label.
 * e.g. "Today, 9:14 AM" / "Yesterday, 3:45 PM" / "Mon, Jun 3"
 */
export function formatEntryTime(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()

  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()

  const timeStr = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })

  if (isToday) return `Today, ${timeStr}`
  if (isYesterday) return `Yesterday, ${timeStr}`

  return date.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}
