import { createNativeStackNavigator } from "@react-navigation/native-stack"
import type React from "react"
import { StyleSheet } from "react-native"

import { type RootStackParamList } from "#shared"

import { colors, fontWeights } from "../design-system"
import { SettingsScreen } from "../features/settings"

import MainTabNavigator from "./MainTabNavigator"
import { ROUTES } from "./routes"

/**
 * RootNavigator — root Stack (requirement: Stack as root routing).
 *
 * | Route     | Component          | Notes                          |
 * |-----------|--------------------|--------------------------------|
 * | Tabs      | MainTabNavigator   | Initial screen, no root header |
 * | Settings  | SettingsScreen     | Modal, opened from Discover ⚙️ |
 *
 * @see navigationMap.ts for all transitions involving this navigator.
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={ROUTES.root.tabs}
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.root.settings}
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
