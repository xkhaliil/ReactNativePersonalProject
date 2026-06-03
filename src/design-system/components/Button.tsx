/**
 * Button
 * Reusability: HIGH — used across all screens and feature areas.
 *
 * Variants:
 *   - primary: solid accent background (main CTA)
 *   - outline: transparent with a colored border
 *   - ghost:   subtle dark background with a neutral border
 */

import { StyleSheet, Text, TouchableOpacity } from "react-native"

import {
  colors,
  spacing,
  radii,
  fontSizes,
  fontWeights,
  borderWidths,
} from "../tokens"

type ButtonVariant = "primary" | "outline" | "ghost"

type ButtonProps = {
  label: string
  onPress: () => void
  variant?: ButtonVariant
  /** Override border/text color for dynamic mood-colored buttons */
  accentColor?: string
  disabled?: boolean
  activeOpacity?: number
}

export function Button({
  label,
  onPress,
  variant = "primary",
  accentColor,
  disabled = false,
  activeOpacity = 0.8,
}: ButtonProps): React.JSX.Element {
  const resolvedAccent = accentColor ?? colors.accent.default

  const containerStyle = [
    styles.base,
    variant === "primary" && {
      backgroundColor: resolvedAccent,
    },
    variant === "outline" && {
      borderColor: resolvedAccent,
      borderWidth: borderWidths.base,
    },
    variant === "ghost" && styles.ghost,
    disabled && styles.disabled,
  ]

  const textStyle = [
    styles.label,
    variant === "primary" && { color: colors.accent.on },
    (variant === "outline" || variant === "ghost") && {
      color: variant === "outline" ? resolvedAccent : colors.text.primary,
    },
  ]

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={disabled ? 1 : activeOpacity}
      disabled={disabled}
    >
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing["4xl"],
    borderRadius: radii.full,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  ghost: {
    backgroundColor: colors.bg.surfaceAlt,
    borderWidth: borderWidths.thin,
    borderColor: colors.border.default,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.base,
  },
})
