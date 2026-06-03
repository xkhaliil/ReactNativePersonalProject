import { type KnipConfiguration } from "knip"

const config: KnipConfiguration = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  ignore: ["babel.config.cjs"],
  ignoreDependencies: [
    "expo-updates",
    "expo-system-ui",
    // globals is used in eslint.config.js but listed as a transitive dep
    "globals",
    // expo-crypto is a peer dep consumed internally by expo-auth-session (not imported directly)
    "expo-crypto",
    // babel-preset-expo is consumed by Metro bundler, not imported by source files
    "babel-preset-expo",
  ],
  // Spotify feature exports are the public API for future screens — not yet consumed
  ignoreExportsUsedInFile: true,
  ignoreBinaries: [],
  // Treat spotify client/mapper files as entry points so their exports aren't flagged
  entry: [
    "src/features/spotify/spotifyClient.ts",
    "src/features/spotify/moodToAudioFeatures.ts",
    "src/features/spotify/detectMood.ts",
  ],
}

export default config
