/**
 * ScreenLayout
 * Reusability: LOW — page-level scaffold used once per screen.
 * Provides a consistent scrollable background and content padding.
 */

import type React from "react"
import { ScrollView, type ScrollViewProps } from "react-native"

import { useThemedStyles } from "../theme"
import { spacing } from "../tokens"

type ScreenLayoutProps = ScrollViewProps & {
  /** Extra horizontal padding (defaults to xl = 20) */
  paddingHorizontal?: number
  /** Center content horizontally — useful for camera/scan screens */
  centered?: boolean
}

export function ScreenLayout({
  paddingHorizontal = spacing.xl,
  centered = false,
  contentContainerStyle,
  style,
  ...props
}: ScreenLayoutProps): React.JSX.Element {
  const styles = useThemedStyles(({ colors }) => ({
    scroll: {
      flex: 1,
      backgroundColor: colors.bg.screen,
    },
    container: {
      paddingTop: spacing.xl,
      paddingBottom: spacing["7xl"],
      gap: spacing.md,
    },
    centered: {
      alignItems: "center",
    },
  }))
  return (
    <ScrollView
      style={[styles.scroll, style]}
      contentContainerStyle={[
        styles.container,
        { paddingHorizontal },
        centered && styles.centered,
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  )
}
