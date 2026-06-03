const MOODS = ["Happy", "Chill", "Hype", "Sad", "Angry"] as const

/**
 * Returns a random mood label from a captured photo URI.
 * No native module required — works in Expo Go.
 */
export async function detectMoodFromPhoto(_photoUri: string): Promise<string> {
  return MOODS[Math.floor(Math.random() * MOODS.length)]
}
