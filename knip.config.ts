import { type KnipConfiguration } from "knip"

const config: KnipConfiguration = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  ignore: ["babel.config.cjs"],
  ignoreDependencies: [
    "expo-updates",
    "expo-system-ui",
    // globals is used in eslint.config.js but listed as a transitive dep
    "globals",
  ],
  ignoreExportsUsedInFile: true,
}

export default config
