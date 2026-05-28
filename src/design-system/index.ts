/**
 * Design System — Public API
 *
 * Import everything from here. Never import directly from
 * primitives/ or components/ outside this barrel.
 */

// ─── Tokens (what components consume) ────────────────────────────────────────
export * from "./tokens"

// ─── Raw primitives (exported for reference / advanced use) ──────────────────
export * from "./primitives/colors"
export * from "./primitives/spacing"
export * from "./primitives/typography"
export * from "./primitives/borders"  // includes sizes

// ─── Components ──────────────────────────────────────────────────────────────
export { Button } from "./components/Button"
export { Card } from "./components/Card"
export { ScreenLayout } from "./components/ScreenLayout"
export { SettingsRow } from "./components/SettingsRow"
export { FormField } from "./components/FormField"
export {
  ScreenTitle,
  SectionTitle,
  CardTitle,
  Body,
  BodySecondary,
  Caption,
  Label,
} from "./components/Typography"
