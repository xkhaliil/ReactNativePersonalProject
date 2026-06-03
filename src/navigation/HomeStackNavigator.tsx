import { createNativeStackNavigator } from "@react-navigation/native-stack"
import type React from "react"
import { StyleSheet } from "react-native"

import { type HomeStackParamList } from "#shared"

import {
  colors,
  fontSizes,
  fontWeights,
} from "../design-system"
import HomeScreen from "../features/home/HomeScreen"
import PlaylistDetailScreen from "../features/home/PlaylistDetailScreen"

import { ROUTES } from "./routes"
import { SettingsHeaderButton } from "./SettingsHeaderButton"

/**
 * HomeStackNavigator — nested Stack inside the Discover tab.
 *
 * Screens:
 *   Home            — mood scan + playlist preview (initial)
 *   PlaylistDetail  — full track list (pushed from Home)
 *
 * Cross-stack: header ⚙️ opens Root Stack → Settings (see SettingsHeaderButton).
 */
const Stack = createNativeStackNavigator<HomeStackParamList>()

export default function HomeStackNavigator(): React.JSX.Element {
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
        name={ROUTES.homeStack.home}
        component={HomeScreen}
        options={{
          title: "Discover",
          headerRight: () => <SettingsHeaderButton />,
        }}
      />
      <Stack.Screen
        name={ROUTES.homeStack.playlistDetail}
        component={PlaylistDetailScreen}
        options={({ route }) => ({
          title: `${route.params.emoji} ${route.params.mood}`,
        })}
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
    fontSize: fontSizes.lg,
    letterSpacing: -0.3,
  },
  content: {
    backgroundColor: colors.bg.screen,
  },
})
