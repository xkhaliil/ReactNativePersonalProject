/**
 * Card
 * Reusability: MEDIUM — a generic surface container used in several
 * feature areas (MoodCard, PlaylistCard, HistoryCard, SettingsSection).
 * Not tied to any single feature's data shape.
 */

import type React from "react"
import { StyleSheet, View, type ViewProps } from "react-native"

import { colors, spacing, radii, borderWidths } from "../tokens"

type CardVariant =
  | "surface" // Standard card (#1E1E1E)
  | "surfaceAlt" // Slightly lighter surface (#282828)
  | "bordered" // Surface with a colored border
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
  },
  surface: {
    backgroundColor: colors.bg.surface,
  },
  surfaceAlt: {
    backgroundColor: colors.bg.surfaceAlt,
    borderRadius: radii.lg,
    padding: spacing.lg,
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
  },
})
