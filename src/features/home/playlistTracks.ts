export const FALLBACK_TRACK_LIST: Record<string, string[]> = {
  Happy: [
    "Good as Hell – Lizzo",
    "Can't Stop the Feeling – Justin Timberlake",
    "Happy – Pharrell",
    "Walking on Sunshine – Katrina",
    "Uptown Funk – Bruno Mars",
  ],
  Sad: [
    "The Night We Met – Lord Huron",
    "Skinny Love – Bon Iver",
    "Liability – Lorde",
    "Lua – Bright Eyes",
    "Holocene – Bon Iver",
  ],
  Angry: [
    "Break Stuff – Limp Bizkit",
    "Given Up – Linkin Park",
    "Killing in the Name – RATM",
    "Du Hast – Rammstein",
    "Bodies – Drowning Pool",
  ],
  Chill: [
    "Redbone – Childish Gambino",
    "Breathe – Pink Floyd",
    "Intro – The xx",
    "Banana Pancakes – Jack Johnson",
    "The Less I Know – Tame Impala",
  ],
  Hype: [
    "HUMBLE. – Kendrick Lamar",
    "Level Up – Ciara",
    "Power – Kanye West",
    "Turn Down for What – DJ Snake",
    "Sicko Mode – Travis Scott",
  ],
}

export type PlaylistTrackRow = {
  id: string
  label: string
  title: string
  artist?: string
  spotifyUrl?: string
}

export function buildPlaylistTrackRows(
  mood: string,
  passedTracks: string[] | undefined,
  trackUrls: string[] | undefined,
): PlaylistTrackRow[] {
  const labels =
    passedTracks !== undefined && passedTracks.length > 0
      ? passedTracks
      : (FALLBACK_TRACK_LIST[mood] ?? [])

  return labels.map((label, index) => {
    const [title, artist] = label.split(" – ")
    return {
      id: `${mood}-${index}`,
      label,
      title: title ?? label,
      artist,
      spotifyUrl: trackUrls?.[index],
    }
  })
}
