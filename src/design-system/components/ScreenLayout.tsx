/**
 * ScreenLayout
 * Reusability: LOW — page-level scaffold used once per screen.
 * Provides a consistent scrollable background and content padding.
 *
 * Because it is so structural, it lives in the design system so the
 * screen-level background color and padding remain a single source of truth.
 */

import type React from "react"
import { ScrollView, StyleSheet, type ScrollViewProps } from "react-native"

import { colors, spacing } from "../tokens"

type ScreenLayoutProps = ScrollViewProps & {
  /** Extra horizontal padding (defaults to xl = 20) */
  paddingHorizontal?: number
  /** Center content horizontally — useful for Home-style screens */
  centered?: boolean
}

export function ScreenLayout({
  paddingHorizontal = spacing.xl,
  centered = false,
  contentContainerStyle,
  style,
  ...props
}: ScreenLayoutProps): React.JSX.Element {
  return (
    <ScrollView
      style={[styles.scroll, style]}
      contentContainerStyle={[
        styles.container,
        { paddingHorizontal },
        centered && styles.centered,
        contentContainerStyle,
      ]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.bg.screen,
  },
  container: {
    paddingTop: spacing.lg,
    paddingBottom: spacing["6xl"],
  },
  centered: {
    alignItems: "center",
  },
})
