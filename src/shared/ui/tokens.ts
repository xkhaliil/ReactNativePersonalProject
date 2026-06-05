/**
 * Design Tokens
 * Semantic aliases over raw primitives. These are what components consume.
 * Import from here, not from individual primitive files.
 */

import { type TextStyle } from "react-native"

import { borderWidths, radii, sizes } from "./primitives/borders"
import { palette } from "./primitives/colors"
import { spacing } from "./primitives/spacing"
import { fontSizes, fontWeights, letterSpacings } from "./primitives/typography"

export type ThemeScheme = "light" | "dark"

export const darkColors = {
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
  text: {
    primary: palette.white,
    secondary: palette.neutral300,
    muted: palette.neutral400,
    faint: palette.neutral450,
    onAccent: palette.black,
  },
  border: {
    default: palette.white10,
    subtle: palette.white06,
    strong: palette.white14,
    divider: palette.white03,
  },
  accent: {
    default: palette.green500,
    bright: palette.green400,
    dim: palette.green700,
    on: palette.black,
  },
  tab: {
    active: palette.green500,
    inactive: palette.neutral400,
    bg: palette.neutral950,
    border: palette.white06,
  },
  switch: {
    trackOn: palette.green500,
    trackOff: palette.neutral650,
    thumb: palette.white,
  },
  shadow: {
    base: palette.black,
  },
  statusBar: "light" as const,
} as const

export const lightColors = {
  bg: {
    screen: palette.neutral100,
    surface: palette.white,
    surfaceAlt: palette.neutral100,
    surfaceElevated: palette.white,
    viewfinder: palette.neutral200,
    input: palette.white,
    overlay: "rgba(255,255,255,0.78)",
    glass: "rgba(0,0,0,0.04)",
  },
  text: {
    primary: palette.neutral950,
    secondary: palette.neutral650,
    muted: palette.neutral500,
    faint: palette.neutral450,
    onAccent: palette.black,
  },
  border: {
    default: "rgba(8,8,8,0.12)",
    subtle: "rgba(8,8,8,0.08)",
    strong: "rgba(8,8,8,0.18)",
    divider: "rgba(8,8,8,0.05)",
  },
  accent: {
    default: palette.green500,
    bright: palette.green400,
    dim: palette.green700,
    on: palette.black,
  },
  tab: {
    active: palette.green500,
    inactive: palette.neutral500,
    bg: palette.white,
    border: "rgba(8,8,8,0.08)",
  },
  switch: {
    trackOn: palette.green500,
    trackOff: palette.neutral300,
    thumb: palette.white,
  },
  shadow: {
    base: palette.black,
  },
  statusBar: "dark" as const,
} as const

export type AppColors = typeof darkColors | typeof lightColors
export type AppTypography = Record<string, TextStyle>

export function getColorsForScheme(scheme: ThemeScheme): AppColors {
  return scheme === "light" ? lightColors : darkColors
}

export function createTypography(colors: AppColors): AppTypography {
  return {
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
}

export const colors = darkColors
export const typography = createTypography(colors)

export { spacing, radii, borderWidths, sizes, fontSizes, fontWeights }
