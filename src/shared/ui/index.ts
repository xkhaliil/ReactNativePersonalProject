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
export * from "./components"

// ─── Theme ───────────────────────────────────────────────────────────────────
export {
  AppThemeProvider,
  useAppTheme,
  useThemedStyles,
  type ThemePreference,
} from "./theme"
