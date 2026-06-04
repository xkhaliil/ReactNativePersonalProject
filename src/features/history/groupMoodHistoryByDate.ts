import { type MoodEntry } from "#features/history"

export type MoodHistorySection = {
  title: string
  data: MoodEntry[]
}

export function groupMoodHistoryByDate(
  entries: MoodEntry[],
): MoodHistorySection[] {
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)

  const isSameDay = (a: Date, b: Date): boolean =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  const buckets: Record<string, MoodEntry[]> = {}
  for (const entry of entries) {
    const d = new Date(entry.timestamp)
    const key = isSameDay(d, now)
      ? "Today"
      : isSameDay(d, yesterday)
        ? "Yesterday"
        : d.toLocaleDateString([], {
            weekday: "short",
            month: "short",
            day: "numeric",
          })
    buckets[key] ??= []
    buckets[key].push(entry)
  }

  return Object.entries(buckets).map(([title, data]) => ({ title, data }))
}

