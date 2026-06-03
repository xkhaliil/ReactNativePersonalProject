import { useNavigation } from "@react-navigation/native"
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from "@react-navigation/native-stack"
import type React from "react"
import { Pressable, StyleSheet, Text } from "react-native"

import { type HomeStackParamList, type RootStackParamList } from "#shared"

import {
  borderWidths,
  colors,
  fontSizes,
  fontWeights,
  radii,
  spacing,
} from "../../design-system"

import HomeScreen from "./HomeScreen"
import PlaylistDetailScreen from "./PlaylistDetailScreen"

const Stack = createNativeStackNavigator<HomeStackParamList>()

function SettingsButton(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  return (
    <Pressable
      onPress={() => navigation.navigate("Settings")}
      hitSlop={borderWidths.heavy}
      style={({ pressed }) => [
        styles.settingsBtn,
        pressed && styles.settingsBtnPressed,
      ]}
    >
      <Text style={styles.settingsIcon}>⚙</Text>
    </Pressable>
  )
}

export default function HomeStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: colors.accent.default,
        headerTitleStyle: styles.headerTitle,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.bg.screen },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Discover",
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
  header: {
    backgroundColor: colors.bg.screen,
  },
  headerTitle: {
    color: colors.text.primary,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.lg,
    letterSpacing: -0.3,
  },
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
