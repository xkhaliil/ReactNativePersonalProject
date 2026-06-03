import { createNativeStackNavigator } from "@react-navigation/native-stack"
import type React from "react"

import { type RootStackParamList } from "#shared"

import { colors, fontWeights } from "../design-system"
import { SettingsScreen } from "../features/settings"

import MainTabNavigator from "./MainTabNavigator"

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg.screen },
        headerTintColor: colors.accent.default,
        headerTitleStyle: {
          color: colors.text.primary,
          fontWeight: fontWeights.bold,
        },
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings", presentation: "modal" }}
      />
    </Stack.Navigator>
  )
}
