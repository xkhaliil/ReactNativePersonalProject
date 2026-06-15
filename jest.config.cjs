/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^#app$": "<rootDir>/src/app/index.ts",
    "^#app/(.*)$": "<rootDir>/src/app/$1",
    "^#features/(.*)$": "<rootDir>/src/features/$1",
    "^#shared$": "<rootDir>/src/shared/index.ts",
    "^#shared/ui$": "<rootDir>/src/shared/ui/index.ts",
    "^#shared/(.*)$": "<rootDir>/src/shared/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|sentry-expo|native-base|react-native-svg)",
  ],
}
