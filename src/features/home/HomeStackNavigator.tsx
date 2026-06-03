import { useNavigation } from "@react-navigation/native"
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from "@react-navigation/native-stack"
import type React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

import { type HomeStackParamList, type RootStackParamList } from "#shared"

import {
  colors,
  fontWeights,
  fontSizes,
  spacing,
  borderWidths,
} from "../../design-system"

import HomeScreen from "./HomeScreen"
import PlaylistDetailScreen from "./PlaylistDetailScreen"

const Stack = createNativeStackNavigator<HomeStackParamList>()

function SettingsButton() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Settings")}
      hitSlop={borderWidths.heavy}
      style={styles.settingsButton}
    >
      <Text style={styles.settingsIcon}>⚙️</Text>
    </TouchableOpacity>
  )
}

export default function HomeStackNavigator(): React.JSX.Element {
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
        name="Home"
        component={HomeScreen}
        options={{
          title: "🎧 Mood Playlist",
          headerRight: () => <SettingsButton />,
        }}
      />
      <Stack.Screen
        name="PlaylistDetail"
        component={PlaylistDetailScreen}
        options={({ route }) => ({
          title: `${route.params.emoji} ${route.params.mood}`,
        })}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  settingsButton: {
    paddingHorizontal: spacing.xs,
  },
  settingsIcon: {
    fontSize: fontSizes.xl,
  },
})
