/**
 * Button
 * Reusability: HIGH — used across all screens and feature areas.
 *
 * Variants:
 *   - primary: solid Spotify-green with shadow (main CTA)
 *   - outline: transparent with a colored border
 *   - ghost:   subtle dark background, used for secondary actions
 */

import { Pressable, Text } from "react-native"

import { useAppTheme, useThemedStyles } from "../theme"
import {
  borderWidths,
  fontSizes,
  fontWeights,
  radii,
  sizes,
  spacing,
} from "../tokens"

type ButtonVariant = "primary" | "outline" | "ghost"

type ButtonProps = {
  label: string
  onPress: () => void
  variant?: ButtonVariant
  /** Override border/text color for mood-colored buttons */
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
}: ButtonProps): React.JSX.Element {
  const { colors } = useAppTheme()
  const styles = useThemedStyles(({ colors: themeColors }) => ({
    base: {
      height: sizes.buttonHeight,
      borderRadius: radii.full,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing["4xl"],
      alignSelf: "stretch",
    },
    primary: {
      shadowColor: themeColors.accent.default,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 12,
      elevation: 8,
    },
    pressedPrimary: {
      opacity: 0.88,
      shadowOpacity: 0.2,
    },
    outline: {
      borderWidth: borderWidths.base,
      backgroundColor: "transparent",
    },
    pressedOutline: {
      opacity: 0.75,
    },
    ghost: {
      backgroundColor: themeColors.bg.glass,
      borderWidth: borderWidths.thin,
      borderColor: themeColors.border.default,
    },
    pressedGhost: {
      backgroundColor: themeColors.bg.surface,
    },
    disabled: {
      opacity: 0.38,
    },
    label: {
      fontSize: fontSizes.base,
      fontWeight: fontWeights.bold,
      letterSpacing: 0.3,
    },
    labelPrimary: {
      color: themeColors.accent.on,
    },
    labelGhost: {
      color: themeColors.text.primary,
    },
  }))
  const resolvedAccent = accentColor ?? colors.accent.default

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variant === "primary" && [
          styles.primary,
          { backgroundColor: resolvedAccent },
          pressed && styles.pressedPrimary,
        ],
        variant === "outline" && [
          styles.outline,
          { borderColor: resolvedAccent },
          pressed && styles.pressedOutline,
        ],
        variant === "ghost" && [styles.ghost, pressed && styles.pressedGhost],
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.label,
          variant === "primary" && styles.labelPrimary,
          variant === "outline" && { color: resolvedAccent },
          variant === "ghost" && styles.labelGhost,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  )
}
