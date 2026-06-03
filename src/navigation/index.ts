/**
 * Navigation — public API
 *
 * All navigators and routing documentation live here.
 * Screens should not define navigators; they only call hooks from ./hooks.
 *
 * Quick reference:
 *   navigationMap.ts  — tree + every user-facing transition
 *   routes.ts         — route name constants (ROUTES)
 *   hooks.ts          — useRootNavigation, useHomeStackNavigation, navigate* helpers
 */

export { default as RootNavigator } from "./RootNavigator"
export { default as MainTabNavigator } from "./MainTabNavigator"
export { default as HomeStackNavigator } from "./HomeStackNavigator"

export { ROUTES, TAB_LABELS } from "./routes"
export { NAVIGATION_TRANSITIONS } from "./navigationMap"
export type { NavigationTransition } from "./navigationMap"

export {
  useRootNavigation,
  useHomeStackNavigation,
  navigateToSettings,
  navigateToPlaylistDetail,
} from "./hooks"
export type { RootNavigation, HomeStackNavigation } from "./hooks"
