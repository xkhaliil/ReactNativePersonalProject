/**
 * Design System — Public API
 *
 * Import everything from here. Never import directly from
 * primitives/ or components/ outside this barrel.
 */

// ─── Tokens (what components consume) ────────────────────────────────────────
export * from "./tokens"

// ─── Raw primitives (palette exported for direct color access) ──────────────
export * from "./primitives/colors"

// ─── Components ──────────────────────────────────────────────────────────────
export { Button } from "./components/Button"
export { Card } from "./components/Card"
export { ScreenLayout } from "./components/ScreenLayout"
export { SettingsRow } from "./components/SettingsRow"
export { FormField } from "./components/FormField"
export { Skeleton, SkeletonItem } from "./components/Skeleton"
export {
  ScreenTitle,
  SectionTitle,
  CardTitle,
  Body,
  BodySecondary,
  Caption,
  Label,
} from "./components/Typography"

// ─── Theme ───────────────────────────────────────────────────────────────────
export {
  AppThemeProvider,
  useAppTheme,
  useThemedStyles,
  type ThemePreference,
} from "./theme"
