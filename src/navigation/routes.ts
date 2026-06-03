/**
 * Route names — single source of truth for every navigator screen.
 *
 * Use these constants instead of string literals so jumps between
 * navigators are easy to grep and review.
 */

export const ROUTES = {
  root: {
    tabs: "Tabs",
    settings: "Settings",
  },
  tabs: {
    homeTab: "HomeTab",
    history: "History",
    profile: "Profile",
  },
  homeStack: {
    home: "Home",
    playlistDetail: "PlaylistDetail",
  },
} as const

/** Tab bar labels shown to the user (route name → label). */
export const TAB_LABELS: Record<
  (typeof ROUTES.tabs)[keyof typeof ROUTES.tabs],
  string
> = {
  [ROUTES.tabs.homeTab]: "Discover",
  [ROUTES.tabs.history]: "History",
  [ROUTES.tabs.profile]: "Profile",
}
