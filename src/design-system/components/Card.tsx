/**
 * Card
 * Reusability: MEDIUM — a generic surface container used in several
 * feature areas (MoodCard, PlaylistCard, HistoryCard, SettingsSection).
 * Not tied to any single feature's data shape.
 */

import type React from "react"
import { StyleSheet, View, type ViewProps } from "react-native"

import { borderWidths, colors, radii, spacing } from "../tokens"

type CardVariant =
  | "surface" // Standard card
  | "surfaceAlt" // Slightly elevated surface
  | "bordered" // Surface with a colored accent border
  | "leftAccent" // Horizontal list item with a left colored stripe

type CardProps = ViewProps & {
  variant?: CardVariant
  /** Used with "bordered" and "leftAccent" variants */
  accentColor?: string
  /** Border width for "bordered" variant */
  borderWidth?: number
}

export function Card({
  variant = "surface",
  accentColor,
  borderWidth = borderWidths.thick,
  style,
  ...props
}: CardProps): React.JSX.Element {
  const variantStyle = (() => {
    switch (variant) {
      case "surfaceAlt":
        return styles.surfaceAlt
      case "bordered":
        return [
          styles.bordered,
          accentColor ? { borderColor: accentColor, borderWidth } : null,
        ]
      case "leftAccent":
        return [
          styles.leftAccent,
          accentColor ? { borderLeftColor: accentColor } : null,
        ]
      default:
        return styles.surface
    }
  })()

  return <View style={[styles.base, variantStyle, style]} {...props} />
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.xl,
    padding: spacing["2xl"],
    // Elevation / shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  surface: {
    backgroundColor: colors.bg.surface,
    borderWidth: borderWidths.thin,
    borderColor: colors.border.subtle,
  },
  surfaceAlt: {
    backgroundColor: colors.bg.surfaceAlt,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: borderWidths.thin,
    borderColor: colors.border.subtle,
  },
  bordered: {
    backgroundColor: colors.bg.surface,
    borderWidth: borderWidths.thick,
    borderColor: colors.border.default,
  },
  leftAccent: {
    backgroundColor: colors.bg.surface,
    borderRadius: radii.lg,
    borderLeftWidth: borderWidths.heavy,
    borderLeftColor: colors.border.default,
    padding: spacing.lg,
    borderWidth: borderWidths.thin,
    borderColor: colors.border.subtle,
  },
})
