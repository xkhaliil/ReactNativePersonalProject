import { createNativeStackNavigator } from "@react-navigation/native-stack"
import type React from "react"

import { HomeScreen, PlaylistDetailScreen } from "#features/home"
import {
  fontSizes,
  fontWeights,
  useAppTheme,
  useThemedStyles,
} from "#shared/ui"

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
  const { colors } = useAppTheme()
  const styles = useThemedStyles(({ colors: themeColors }) => ({
    header: {
      backgroundColor: themeColors.bg.screen,
    },
    headerTitle: {
      color: themeColors.text.primary,
      fontWeight: fontWeights.bold,
      fontSize: fontSizes.lg,
      letterSpacing: -0.3,
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

