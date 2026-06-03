import { type KnipConfiguration } from "knip"

const config: KnipConfiguration = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  ignoreDependencies: [
    "expo-updates",
    "expo-system-ui",
    // Testing stack — consumed by jest.config.cjs / babel.config.cjs (CJS files
    // that knip doesn't trace in an ESM project) and by the test runner itself.
    "jest",
    "jest-expo",
    "@testing-library/react-native",
    "@types/jest",
    "babel-preset-expo",
  ],
}

export default config
