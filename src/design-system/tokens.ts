/**
 * Design Tokens
 * Semantic aliases over raw primitives. These are what components consume.
 * Import from here, not from individual primitive files.
 */

import { palette } from "./primitives/colors"
import { fontSizes, fontWeights, letterSpacings } from "./primitives/typography"
import { spacing } from "./primitives/spacing"
import { radii, borderWidths, sizes } from "./primitives/borders"

// ─── Color Tokens ────────────────────────────────────────────────────────────

export const colors = {
  // Backgrounds
  bg: {
    screen: palette.neutral900,
    surface: palette.neutral800,
    surfaceAlt: palette.neutral700,
    viewfinder: palette.neutral950,
    input: palette.neutral600,
  },

  // Text
  text: {
    primary: palette.white,
    secondary: palette.neutral300,
    muted: palette.neutral400,
    faint: palette.neutral550,
    onAccent: palette.black,
  },

  // Borders
  border: {
    default: palette.neutral500,
    subtle: palette.neutral700,
  },

  // Accent / brand
  accent: {
    default: palette.green500,
    on: palette.black, // text on top of accent bg
  },

  // Tabs
  tab: {
    active: palette.green500,
    inactive: palette.neutral400,
    bg: palette.neutral900,
    border: palette.neutral700,
  },

  // Switch
  switch: {
    trackOn: palette.green500,
    trackOff: palette.neutral600,
    thumb: palette.white,
  },
} as const

// ─── Typography Tokens ───────────────────────────────────────────────────────

export const typography = {
  screenTitle: {
    fontSize: fontSizes["4xl"],
    fontWeight: fontWeights.bold,
    color: colors.text.primary,
  },
  sectionTitle: {
    fontSize: fontSizes["2xl"],
    fontWeight: fontWeights.bold,
    color: colors.text.primary,
  },
  cardTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    color: colors.text.primary,
  },
  body: {
    fontSize: fontSizes.base,
    color: colors.text.primary,
  },
  bodySecondary: {
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
  },
  caption: {
    fontSize: fontSizes.xs,
    color: colors.text.muted,
  },
  label: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacings.wide,
    textTransform: "uppercase" as const,
  },
  moodLabel: {
    fontSize: fontSizes["3xl"],
    fontWeight: fontWeights.bold,
    textTransform: "uppercase" as const,
    letterSpacing: letterSpacings.wider,
  },
  moodLabelSm: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    textTransform: "uppercase" as const,
    letterSpacing: letterSpacings.wide,
  },
  trackNumber: {
    fontWeight: fontWeights.bold,
    color: colors.accent.default,
    width: sizes.trackNumber,
    textAlign: "center" as const,
  },
} as const

// ─── Re-export primitives for use in components ──────────────────────────────

export { spacing, radii, borderWidths, sizes, fontSizes, fontWeights }
