/**
 * useHaptics
 *
 * Fully abstracts expo-haptics. No component or other hook imports
 * expo-haptics directly — everything goes through here.
 *
 * Each mood has a distinct haptic pattern that physically reinforces
 * the emotional character of the scan result:
 *
 *   Happy  → light tap   (bright, quick)
 *   Sad    → soft tap    (gentle, subdued)
 *   Angry  → heavy       (intense, physical)
 *   Chill  → light tap   (easy, effortless)
 *   Hype   → rigid + medium sequence (energetic, punchy)
 *
 * Falls back silently if haptics are unavailable (older devices, web).
 */

import * as Haptics from "expo-haptics"
import { useCallback } from "react"

// Maps a mood label to a haptic pattern function.
// Each entry is an async function so sequences can use awaited delays.
const MOOD_PATTERNS: Record<string, () => Promise<void>> = {
  Happy: async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  },
  Sad: async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
  },
  Angry: async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  },
  Chill: async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  },
  Hype: async () => {
    // Two quick hits — energetic double-bump
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
    await delay(80)
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  },
}

const FALLBACK_PATTERN = async () => {
  await Haptics.selectionAsync()
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

type UseHapticsReturn = {
  triggerMoodScan: (mood: string) => Promise<void>
}

export function useHaptics(): UseHapticsReturn {
  const triggerMoodScan = useCallback(async (mood: string) => {
    try {
      const pattern = MOOD_PATTERNS[mood] ?? FALLBACK_PATTERN
      await pattern()
    } catch {
      // Haptics unavailable on this device — fail silently
    }
  }, [])

  return { triggerMoodScan }
}
