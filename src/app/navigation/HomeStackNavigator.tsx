import { createNativeStackNavigator } from "@react-navigation/native-stack"
import type React from "react"
import { StyleSheet } from "react-native"


import { HomeScreen, PlaylistDetailScreen } from "#features/home"
import { colors, fontSizes, fontWeights } from "#shared/ui"

import { ROUTES } from "./routes"
import { SettingsHeaderButton } from "./SettingsHeaderButton"
import { type HomeStackParamList } from "./types"

/**
 * HomeStackNavigator - nested stack inside the Discover tab.
 *
 * Screens:
 *   Home            - mood scan + playlist preview (initial)
 *   PlaylistDetail  - full track list (pushed from Home)
 *
 * Cross-stack: header button opens Root Stack -> Settings.
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

