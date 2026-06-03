import type React from "react"
import { Pressable, StyleSheet, Text } from "react-native"

import {
  borderWidths,
  colors,
  fontSizes,
  radii,
  spacing,
} from "../design-system"

import { navigateToSettings, useRootNavigation } from "./hooks"

/**
 * Opens the root Settings modal from the Discover stack header.
 * Lives in navigation/ because it crosses navigator boundaries (Home Stack → Root Stack).
 */
export function SettingsHeaderButton(): React.JSX.Element {
  const navigation = useRootNavigation()

  return (
    <Pressable
      onPress={() => navigateToSettings(navigation)}
      hitSlop={borderWidths.heavy}
      style={({ pressed }) => [
        styles.settingsBtn,
        pressed && styles.settingsBtnPressed,
      ]}
      accessibilityLabel="Open settings"
      accessibilityRole="button"
    >
      <Text style={styles.settingsIcon}>⚙</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  settingsBtn: {
    width: 36,
    height: 36,
    borderRadius: radii.full,
    borderWidth: borderWidths.thin,
    borderColor: colors.border.default,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg.glass,
    marginRight: spacing.xs,
  },
  settingsBtnPressed: {
    opacity: 0.65,
    backgroundColor: colors.bg.surface,
  },
  settingsIcon: {
    fontSize: fontSizes.base,
    color: colors.text.secondary,
  },
})
