/**
 * Navigation param lists — TypeScript types for every route.
 *
 * ┌─ HOW TO READ ROUTING IN THIS PROJECT ─────────────────────────────┐
 * │ 1. src/app/navigation/navigationMap.ts  - diagram + all transitions │
 * │ 2. src/app/navigation/routes.ts         - route name constants      │
 * │ 3. src/app/navigation/*.tsx             - navigator definitions     │
 * │ 4. This file                        — params per screen          │
 * └──────────────────────────────────────────────────────────────────┘
 *
 * Tree (3 levels — matches course requirements):
 *
 *   RootStack  [Stack — root]
 *   ├── Tabs          → MainTabNavigator     [Bottom Tabs]
 *   │   ├── HomeTab   → HomeStackNavigator   [nested Stack — Discover flow]
 *   │   │   ├── Home
 *   │   │   └── PlaylistDetail
 *   │   ├── History
 *   │   └── Profile
 *   └── Settings  [modal — from Discover ⚙️ only]
 */

/** Root stack: tab shell + global Settings modal. */
export type RootStackParamList = {
  /** Hosts bottom tabs (Discover, History, Profile). Initial route. */
  Tabs: undefined
  /** App-wide settings — presented as a modal over the current tab. */
  Settings: undefined
}

/** Bottom tab routes. HomeTab wraps the nested Discover stack. */
export type MainTabParamList = {
  /** Discover tab → HomeStackNavigator. */
  HomeTab: undefined
  /** Mood scan history. */
  History: undefined
  /** Profile and preference toggles. */
  Profile: undefined
}

/** Nested stack inside the Discover tab. */
export type HomeStackParamList = {
  /** Camera scan, mood card, playlist preview. */
  Home: undefined
  /** Full playlist — pushed from Home with mood + track params. */
  PlaylistDetail: {
    mood: string
    emoji: string
    color: string
    playlistTitle: string
    genre: string
    tracks?: string[]
    trackUrls?: string[]
    playlistUrl?: string
  }
}
