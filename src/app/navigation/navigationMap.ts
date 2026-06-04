/**
 * Navigation map - how users move between screens.
 *
 * Read this file first when reviewing routing. Navigator components
 * live in `src/app/navigation`; route param types live in `types.ts`.
 */

import { ROUTES } from "./routes"

export type NavigationTransition = {
  /** Screen the user is on (human-readable). */
  from: string
  /** What they do (button, tab, gesture). */
  trigger: string
  /** Destination screen (human-readable). */
  to: string
  /** Navigator that handles the transition. */
  navigator: "Root Stack" | "Bottom Tabs" | "Home Stack"
  /** Route name(s) used in code - see ROUTES in routes.ts. */
  route: string
}

/**
 * Every intentional navigation in the app.
 * There is no file-based routing; all paths are declared in `src/app/navigation`.
 */
/** Documented transitions for code review — see README Navigation section. */
export const NAVIGATION_TRANSITIONS: NavigationTransition[] = [
  {
    from: "App launch",
    trigger: "Initial route",
    to: "Discover (Home)",
    navigator: "Root Stack",
    route: `${ROUTES.root.tabs} → ${ROUTES.tabs.homeTab} → ${ROUTES.homeStack.home}`,
  },
  {
    from: "Discover (Home)",
    trigger: "Tap ⚙️ in header",
    to: "Settings (modal)",
    navigator: "Root Stack",
    route: ROUTES.root.settings,
  },
  {
    from: "Settings",
    trigger: "Swipe down / back",
    to: "Previous screen (usually Discover)",
    navigator: "Root Stack",
    route: "goBack()",
  },
  {
    from: "Discover (Home)",
    trigger: 'Tap "View Full Playlist →"',
    to: "Playlist Detail",
    navigator: "Home Stack",
    route: ROUTES.homeStack.playlistDetail,
  },
  {
    from: "Playlist Detail",
    trigger: 'Tap "← Back" or header back',
    to: "Discover (Home)",
    navigator: "Home Stack",
    route: "goBack()",
  },
  {
    from: "Any tab",
    trigger: "Tap History tab",
    to: "History",
    navigator: "Bottom Tabs",
    route: ROUTES.tabs.history,
  },
  {
    from: "Any tab",
    trigger: "Tap Profile tab",
    to: "Profile",
    navigator: "Bottom Tabs",
    route: ROUTES.tabs.profile,
  },
  {
    from: "History or Profile",
    trigger: "Tap Discover tab",
    to: "Discover (Home)",
    navigator: "Bottom Tabs",
    route: `${ROUTES.tabs.homeTab} → ${ROUTES.homeStack.home}`,
  },
]
