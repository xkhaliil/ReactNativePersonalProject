import { moodToAudioFeatures } from "../moodToAudioFeatures"

describe("moodToAudioFeatures", () => {
  it("returns the configured Spotify audio targets for known moods", () => {
    expect(moodToAudioFeatures("Happy")).toEqual({
      target_valence: 0.85,
      target_energy: 0.75,
      target_tempo: 120,
      target_danceability: 0.75,
      seed_genres: "pop,indie-pop,happy",
    })

    expect(moodToAudioFeatures("Hype")).toEqual({
      target_valence: 0.75,
      target_energy: 0.95,
      target_tempo: 140,
      target_danceability: 0.9,
      seed_genres: "edm,hip-hop,dance",
    })
  })

  it("falls back to neutral audio targets for unknown moods", () => {
    expect(moodToAudioFeatures("Confused")).toEqual({
      target_valence: 0.5,
      target_energy: 0.5,
      target_tempo: 110,
      target_danceability: 0.6,
      seed_genres: "pop",
    })
  })
})
