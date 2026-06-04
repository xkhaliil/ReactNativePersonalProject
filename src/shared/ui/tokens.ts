/**
 * Design Tokens
 * Semantic aliases over raw primitives. These are what components consume.
 * Import from here, not from individual primitive files.
 */

import { radii, borderWidths, sizes } from "./primitives/borders"
import { palette } from "./primitives/colors"
import { spacing } from "./primitives/spacing"
import { fontSizes, fontWeights, letterSpacings } from "./primitives/typography"

// ─── Color Tokens ────────────────────────────────────────────────────────────

export const colors = {
  // Backgrounds — layered depth system
  bg: {
    screen: palette.neutral950,
    surface: palette.neutral850,
    surfaceAlt: palette.neutral800,
    surfaceElevated: palette.neutral750,
    viewfinder: palette.neutral1000,
    input: palette.neutral700,
    overlay: palette.black70,
    glass: palette.white06,
  },

  // Text
  text: {
    primary: palette.white,
    secondary: palette.neutral300,
    muted: palette.neutral400,
    faint: palette.neutral450,
    onAccent: palette.black,
  },

  // Borders
  border: {
    default: palette.white10,
    subtle: palette.white06,
    strong: palette.white14,
    divider: palette.white03,
  },

  // Accent / brand
  accent: {
    default: palette.green500,
    bright: palette.green400,
    dim: palette.green700,
    on: palette.black,
  },

  // Tabs
  tab: {
    active: palette.green500,
    inactive: palette.neutral400,
    bg: palette.neutral950,
    border: palette.white06,
  },

  // Switch
  switch: {
    trackOn: palette.green500,
    trackOff: palette.neutral650,
    thumb: palette.white,
  },
} as const

// ─── Typography Tokens ───────────────────────────────────────────────────────

export const typography = {
  screenTitle: {
    fontSize: fontSizes["4xl"],
    fontWeight: fontWeights.bold,
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  sectionTitle: {
    fontSize: fontSizes["2xl"],
    fontWeight: fontWeights.bold,
    color: colors.text.primary,
    letterSpacing: -0.3,
  },
  cardTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    color: colors.text.primary,
  },
  body: {
    fontSize: fontSizes.base,
    color: colors.text.primary,
    lineHeight: 22,
  },
  bodySecondary: {
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  caption: {
    fontSize: fontSizes.xs,
    color: colors.text.muted,
    lineHeight: 18,
  },
  label: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacings.wide,
    textTransform: "uppercase" as const,
    color: colors.text.muted,
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
    fontSize: fontSizes.sm,
  },
} as const

// ─── Re-export primitives for use in components ──────────────────────────────

export { spacing, radii, borderWidths, sizes, fontSizes, fontWeights }
