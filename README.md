# SpotifyMood

React Native (Expo) app that turns a camera-scanned mood into Spotify playlist recommendations

![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)

## What it does

SpotifyMood lets a user scan their current mood with the device camera, browse mood-matched playlists, and connect a Spotify account (via PKCE OAuth) for personalized recommendations. It keeps a history of past mood scans, supports profile customization and persistent local settings, sends notification reminders, offers light/dark theming, and shows a biometric lock screen before the app content loads.

## Tech stack

- Expo, React Native, React
- TypeScript
- React Navigation (native stack + bottom tabs)
- AsyncStorage for local persistence
- expo-camera, expo-local-authentication, expo-haptics, expo-notifications, expo-auth-session, expo-crypto
- Spotify Web API (via expo-auth-session PKCE flow)
- Jest, jest-expo, React Native Testing Library
- ESLint, Prettier, Knip
- EAS Build / Expo services

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- Expo Go or a simulator/emulator
- Expo account for cloud builds
- Optional Spotify Developer account for live Spotify integration

### Environment variables

Copy `.env.example` to `.env` and set the values you need:

| Variable                        | Required                                   | Purpose                                                    |
| -------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| `EXPO_PUBLIC_SPOTIFY_CLIENT_ID` | Optional                                   | Enables Spotify OAuth and live Spotify recommendations     |
| `EXPO_PUBLIC_FACEPP_API_SECRET` | Optional, depending on your detection flow | Used by the existing mood-detection environment setup      |
| `EXPO_TOKEN`                    | CI / EAS only                              | Allows authenticated Expo and EAS operations in automation |

### Install and run

```bash
npm install
npm start
```

Platform shortcuts:

```bash
npm run android
npm run ios
npm run web
```

Validation commands:

```bash
npm run lint-typecheck
npm run lint-eslint
npm run lint-prettier
npm run lint-knip
npm test -- --runInBand
```

### Spotify setup

To enable live Spotify recommendations:

1. Create an app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Add `skycast://spotify-auth` as a redirect URI.
3. Put the client ID into `.env` as `EXPO_PUBLIC_SPOTIFY_CLIENT_ID`.

The app uses PKCE, so no client secret is required on-device.

### Build commands

```bash
eas init
eas build --profile preview --platform all
```

<!-- TODO: add a screenshot -->

## Architecture notes

All application code lives under `src`:

```text
src/
  app/                # app shell and routing
    navigation/       # stack/tab navigators, routes, route types, helpers
  features/           # feature/domain folders (home, history, profile, settings, spotify)
  shared/             # shared UI, storage, hooks, notifications, biometrics, tokens
  index.ts            # Expo entry point
```

Routing is kept separate from domain logic and UI composition: navigators, route definitions, and navigation helpers live in `src/app/navigation`, while screens and feature behavior live in `src/features`. Each feature exposes its public surface through an `index.ts` barrel (a "modlet" boundary) rather than being reached into via deep internal imports, and shared cross-cutting functionality is explicitly exposed through `src/shared/index.ts` and `src/shared/ui/index.ts`.

## License

No license file is present in this repository yet.
