# 🎧 SkyCast — Mood Playlist

## What is this?

SkyCast helps you find music that matches how you feel, right now. You open the app, tap **Scan My Mood**, and the app picks an emotion (Happy, Sad, Angry, Chill, or Hype) and instantly surfaces a curated playlist to go with it. Every scan is saved to a personal history so you can look back at your mood patterns over time, browse past playlists, and clear entries whenever you want. A profile screen lets you personalize the experience with a display name, bio, and preferred genres, while a settings screen controls haptic feedback and other preferences — all persisted locally so nothing is lost between sessions.

## How it's built

SkyCast is a React Native app built on **Expo SDK 54** (New Architecture enabled) and written entirely in **TypeScript** with strict type-checking. Navigation uses a three-level React Navigation structure: a root `NativeStackNavigator` owns the app shell and a global Settings modal; inside it, a `BottomTabNavigator` provides the three main tabs (Discover, History, Profile); the Discover tab itself contains a nested `NativeStackNavigator` that handles the Home → PlaylistDetail push transition. All persistent state (mood history, profile, settings) is stored on-device via **AsyncStorage**. Haptic feedback is delivered through **expo-haptics**. The project is organised by feature (`features/`, `hooks/`, `navigation/`, `design-system/`) with a shared public API barrel at `src/shared/index.ts` aliased as `#shared`. Code quality is enforced by **ESLint** (`@christopherjbaker/eslint-config/react-strict`), **Prettier**, **TypeScript**, and **Knip**. Tests are written with **Jest 29 + jest-expo + React Native Testing Library**. CI runs lint checks and the test suite on every push via **GitHub Actions**, and preview builds for Android (APK) and iOS (Simulator) are published through **EAS Build** on every merge to `main`.

**Key tech stack:**

- Expo SDK 54 / React Native 0.81 / React 19
- TypeScript 5.9 (strict)
- React Navigation 7 (native-stack + bottom-tabs)
- AsyncStorage — on-device persistence
- expo-haptics — tactile feedback
- Jest 29 + jest-expo + React Native Testing Library — unit & integration tests
- ESLint + Prettier + Knip — linting & dead-code detection
- EAS Build (Expo Application Services) — cloud builds for Android & iOS

## Getting started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10
- **Expo Go** installed on your phone, or an Android Emulator / iOS Simulator
- _(For builds only)_ An [Expo account](https://expo.dev) and `eas-cli` (`npm i -g eas-cli`)

### Environment variables

This project has **no required environment variables** for local development — all data is stored on-device. The only external credential is an **Expo token** used by CI:

| Secret       | Where                                      | Purpose                       |
| ------------ | ------------------------------------------ | ----------------------------- |
| `EXPO_TOKEN` | GitHub repo → Settings → Secrets → Actions | Authenticates EAS Build in CI |

To create a token: log in to [expo.dev](https://expo.dev) → left sidebar → **Access tokens** → **Create token**.

### Local development

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm start          # opens Expo Dev Tools — scan QR with Expo Go
npm run android    # launch on Android emulator/device
npm run ios        # launch on iOS simulator
```

### Running checks

```bash
npm run lint        # typecheck + ESLint + Prettier + Knip (all in one)
npm test            # Jest test suite (33 tests across 6 files)
```

### EAS cloud builds

```bash
# First-time setup (interactive, run once)
eas init
eas build --profile preview --platform all   # interactive
```

Subsequent preview builds run automatically via GitHub Actions on every push to `main`.

## Project structure

```
src/
  index.ts                    # app entry point
  App.tsx                     # NavigationContainer wrapper
  shared/                     # cross-feature public API (#shared alias)
    index.ts                  # re-exports types used across features
    navigationTypes.ts        # all ParamList types + navigation tree diagram
    colors.ts                 # semantic colour tokens (shared read)
  design-system/              # reusable UI components + tokens
    tokens.ts                 # spacing, colour, typography, radius tokens
    index.ts                  # public barrel (components + tokens)
    components/               # Button, Card, FormField, Typography, …
    primitives/               # raw scale values (spacing, borders, …)
  features/                   # feature modules (self-contained)
    home/                     # Discover tab: scan + playlist cards
    history/                  # History tab: SectionList of past scans
    profile/                  # Profile tab: display name, bio, genres
    settings/                 # Settings modal: haptics toggle, …
  hooks/                      # shared business-logic hooks
    useStorage.ts             # generic AsyncStorage wrapper
    useMoodHistory.ts         # scan history CRUD + refresh
    useProfile.ts             # profile read/write + validation
    useSettings.ts            # app settings read/write
    useHaptics.ts             # haptic feedback abstraction
  navigation/                 # navigator components (routing only)
    RootNavigator.tsx         # root Stack (Tabs + Settings modal)
    MainTabNavigator.tsx      # bottom tabs (Discover / History / Profile)
```

> The Discover tab's nested stack lives in `src/features/home/HomeStackNavigator.tsx` — co-located with the screens it owns.

- **Mood history** — Store past mood scans with timestamps using `expo-sqlite` or AsyncStorage
- **Animated scan effect** — Pulsing ring animation on the camera viewfinder while "scanning"
- **Haptic feedback** — Use `expo-haptics` to buzz on mood detection
- **Playlist preview** — Embed Spotify's 30-second track previews with `expo-av`
- **Share your vibe** — Screenshot the mood card and share via `expo-sharing`
- **Dark / Light theme toggle** — Use React Context + `useColorScheme` for theming
- **Multiple moods per scan** — Show a confidence breakdown (e.g. 70% Happy, 30% Chill)
- **Onboarding flow** — First-launch walkthrough with `react-native-reanimated` transitions
