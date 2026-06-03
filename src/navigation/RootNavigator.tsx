import { createNativeStackNavigator } from "@react-navigation/native-stack"
import type React from "react"
import { StyleSheet } from "react-native"

import { type RootStackParamList } from "#shared"

import { colors, fontWeights } from "../design-system"
import { SettingsScreen } from "../features/settings"

import MainTabNavigator from "./MainTabNavigator"

/**
 * RootNavigator — top-level Stack navigator.
 *
 * Screen map:
 *   Tabs      → MainTabNavigator  (bottom tabs, shown first, no header)
 *   Settings  → SettingsScreen    (modal overlay, reachable app-wide)
 *
 * This stack owns the Settings modal so any tab or nested stack can
 * push it without needing to pass a callback down.
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {/* Primary experience — hides the root header so each tab manages its own */}
      <Stack.Screen
        name="Tabs"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      {/* Modal pushed from HomeStackNavigator's ⚙️ button */}
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings", presentation: "modal" }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.bg.screen,
  },
  headerTitle: {
    color: colors.text.primary,
    fontWeight: fontWeights.bold,
  },
  content: {
    backgroundColor: colors.bg.screen,
  },
})

const screenOptions = {
  headerStyle: styles.header,
  headerTintColor: colors.accent.default,
  headerTitleStyle: styles.headerTitle,
  headerShadowVisible: false,
  contentStyle: styles.content,
}
