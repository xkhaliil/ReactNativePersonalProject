/**
 * ─────────────────────────────────────────────────────────────
 * Navigation tree
 * ─────────────────────────────────────────────────────────────
 *
 * RootStack  (Stack – root of the whole app)
 * ├── Tabs          → MainTabNavigator     (Bottom Tabs)
 * │   ├── HomeTab   → HomeStackNavigator   (nested Stack)
 * │   │   ├── Home             (main discover screen)
 * │   │   └── PlaylistDetail   (detail pushed from Home)
 * │   ├── History              (mood history screen)
 * │   └── Profile              (user profile screen)
 * └── Settings  (modal, reachable from anywhere via ⚙️ button)
 *
 * ─────────────────────────────────────────────────────────────
 * Files
 * ─────────────────────────────────────────────────────────────
 * src/navigation/RootNavigator.tsx        — RootStack
 * src/navigation/MainTabNavigator.tsx     — Bottom Tabs (Tabs)
 * src/features/home/HomeStackNavigator.tsx — nested Stack (HomeTab)
 * ─────────────────────────────────────────────────────────────
 */

/** Root-level stack. Holds the tab navigator + the Settings modal. */
export type RootStackParamList = {
  /** The main app experience — hosts all bottom tabs. */
  Tabs: undefined
  /** Settings modal — pushed from any screen via the ⚙️ header button. */
  Settings: undefined
}

/** Bottom tab bar. Each tab maps to a screen or a nested stack. */
export type MainTabParamList = {
  /** "Discover" tab — hosts HomeStackNavigator (Home + PlaylistDetail). */
  HomeTab: undefined
  /** "History" tab — flat screen showing past mood scans. */
  History: undefined
  /** "Profile" tab — flat screen for user settings/profile. */
  Profile: undefined
}

/** Nested stack inside the Discover tab. */
export type HomeStackParamList = {
  /** Landing screen — scan mood, see generated playlist cards. */
  Home: undefined
  /** Detail screen — pushed when a playlist card is tapped. */
  PlaylistDetail: {
    mood: string
    emoji: string
    color: string
    playlistTitle: string
    genre: string
    /** Real Spotify track strings ("Name – Artist"). Falls back to static list when absent. */
    tracks?: string[]
    /** Spotify external URLs for each track, aligned by index with `tracks`. */
    trackUrls?: string[]
    /** Spotify URL for the matched playlist — opens directly in the Spotify app. */
    playlistUrl?: string
  }
}
