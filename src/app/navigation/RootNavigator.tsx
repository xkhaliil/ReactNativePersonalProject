import { createNativeStackNavigator } from "@react-navigation/native-stack"
import type React from "react"

import { SettingsScreen } from "#features/settings"
import { fontWeights, useAppTheme, useThemedStyles } from "#shared/ui"

import MainTabNavigator from "./MainTabNavigator"
import { ROUTES } from "./routes"
import { type RootStackParamList } from "./types"

/**
 * RootNavigator - root stack navigator.
 *
 * | Route     | Component          | Notes                          |
 * |-----------|--------------------|--------------------------------|
 * | Tabs      | MainTabNavigator   | Initial screen, no root header |
 * | Settings  | SettingsScreen     | Modal, opened from Discover       |
 *
 * @see navigationMap.ts for all transitions involving this navigator.
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator(): React.JSX.Element {
  const { colors } = useAppTheme()
  const styles = useThemedStyles(({ colors: themeColors }) => ({
    header: {
      backgroundColor: themeColors.bg.screen,
    },
    headerTitle: {
      color: themeColors.text.primary,
      fontWeight: fontWeights.bold,
    },
    content: {
      backgroundColor: themeColors.bg.screen,
    },
  }))

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: colors.accent.default,
        headerTitleStyle: styles.headerTitle,
        headerShadowVisible: false,
        contentStyle: styles.content,
      }}
    >
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

