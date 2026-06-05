# SpotifyMood

## Project Description

SpotifyMood is a mobile app that helps users translate their current mood into music recommendations in a fast and engaging way. The app lets a user scan their mood with the camera, browse mood-matched playlists, connect Spotify for richer recommendations, and keep a personal history of past mood scans. It is useful because it combines mood capture, personalized music discovery, persistent settings, profile customization, reminders, theme support, and biometric protection into a single mobile experience that is easy to reuse day to day.

## High-Level Technical Overview

SpotifyMood is built as a feature-based React Native application using Expo 56 and strict TypeScript. Routing is intentionally separated from feature and rendering logic under `src/app/navigation`, while application domains such as `home`, `history`, `profile`, `settings`, and `spotify` live under `src/features`. Shared capabilities such as theming, notifications, local storage, biometrics, haptics, and reusable UI components are isolated in `src/shared`, and each feature exposes a small public surface through an `index.ts` barrel so the rest of the app does not reach into private internals. This structure supports modlet-style isolation, keeps code maintainable, and clearly distinguishes shared infrastructure from domain-specific behavior.

**Important tech stack**

- Expo 56
- React Native 0.85
- React 19
- TypeScript 6
- React Navigation 7
- AsyncStorage
- Expo Camera
- Expo Haptics
- Expo Local Authentication
- Expo Notifications
- Expo Splash Screen
- Expo System UI
- Expo Auth Session
- Spotify Web API
- Jest + `jest-expo` + React Native Testing Library
- ESLint + Prettier + Knip
- EAS Build / Expo services

## Onboarding

### Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- Expo Go or a simulator/emulator
- Expo account for cloud builds
- Optional Spotify Developer account for live Spotify integration

### Environment Variables

Copy `.env.example` to `.env` and set the values you need:

| Variable                        | Required                                   | Purpose                                                    |
| ------------------------------- | ------------------------------------------ | ---------------------------------------------------------- |
| `EXPO_PUBLIC_SPOTIFY_CLIENT_ID` | Optional                                   | Enables Spotify OAuth and live Spotify recommendations     |
| `EXPO_PUBLIC_FACEPP_API_SECRET` | Optional, depending on your detection flow | Used by the existing mood-detection environment setup      |
| `EXPO_TOKEN`                    | CI / EAS only                              | Allows authenticated Expo and EAS operations in automation |

### Install And Run

```bash
npm install
npm start
```

Useful local commands:

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
npx expo-doctor@latest
```

### Spotify Setup

If you want live Spotify recommendations:

1. Create an app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Add `skycast://spotify-auth` as a redirect URI.
3. Put the client ID into `.env` as `EXPO_PUBLIC_SPOTIFY_CLIENT_ID`.

The app uses PKCE, so no client secret is required on-device.

### Build Commands

```bash
eas init
eas build --profile preview --platform all
```

## Architecture Notes

### All App Code Lives In `src`

All application code is kept inside the `src` directory:

```text
src/
  app/                # app shell and routing
    navigation/       # stack/tab navigators, routes, route types, helpers
  features/           # feature/domain folders
  shared/             # shared UI, storage, hooks, notifications, biometrics, tokens
  index.ts            # Expo entry point
```

### Routing Is Distinct From Rendering Logic

Routing is clearly separated from domain logic and UI composition. Navigators, route definitions, and navigation helpers live in `src/app/navigation`, while screens and feature behavior live in `src/features`. This keeps application flow easy to inspect and avoids mixing routing concerns into business logic.

### Feature-Based Organization

The project uses domain-based organization rather than a purely layer-based structure. Each main concept in the app is represented as a feature folder, such as:

- `src/features/home`
- `src/features/history`
- `src/features/profile`
- `src/features/settings`
- `src/features/spotify`

### Modlets And Explicit Public APIs

Each feature exposes what the rest of the app is allowed to consume through its `index.ts` barrel, which acts as a modlet-style boundary. Commonly used cross-cutting functionality is also explicitly exposed through public entry points such as `src/shared/index.ts` and `src/shared/ui/index.ts`, instead of being accessed through deep internal imports or excessive `..` traversal.

### Course Concepts Represented In Code

The project includes the concepts expected from the course and earlier assignments:

- reusable components and hooks
- typed navigation with separate routing files
- local persistence with AsyncStorage
- device integration with camera, haptics, biometrics, and notifications
- clear logic/render separation through hooks and helper modules
- testing with Jest and React Native Testing Library
- shared UI tokens and reusable components
- feature isolation with public module boundaries
- validation through TypeScript, ESLint, Prettier, Knip, and Expo Doctor

## Final Status

At the current final state:

- the project is upgraded to Expo 56
- all application code remains under `src`
- routing is separated from rendering and domain logic
- the app uses a feature-based structure with modlet-style barrels
- commonly shared functionality is explicitly exposed
- tests, ESLint, TypeScript, and Expo Doctor pass
- Prettier can be finalized with `prettier --write .` if a formatting-only cleanup is required
