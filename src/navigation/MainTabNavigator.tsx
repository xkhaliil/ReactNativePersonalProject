import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import type React from "react"

import { StyleSheet, Text, View } from "react-native"

import { type MainTabParamList } from "#shared"

import {
  borderWidths,
  colors,
  fontSizes,
  fontWeights,
  radii,
  sizes,
  spacing,
} from "../design-system"
import { HistoryScreen } from "../features/history"
import { HomeStackNavigator } from "../features/home"
import { ProfileScreen } from "../features/profile"

const Tab = createBottomTabNavigator<MainTabParamList>()

type TabIconProps = {
  label: string
  focused: boolean
}

const TAB_CONFIG: Record<string, { icon: string; title: string }> = {
  HomeTab: { icon: "◎", title: "Discover" },
  History: { icon: "≡", title: "History" },
  Profile: { icon: "○", title: "Profile" },
}

function TabIcon({ label, focused }: TabIconProps): React.JSX.Element {
  const config = TAB_CONFIG[label] ?? { icon: "•", title: label }
  return (
    <View style={[styles.tabItem, focused && styles.tabItemFocused]}>
      <Text
        style={[
          styles.tabIcon,
          focused ? styles.tabIconFocused : styles.tabIconDefault,
        ]}
      >
        {config.icon}
      </Text>
    </View>
  )
}

export default function MainTabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.tab.active,
        tabBarInactiveTintColor: colors.tab.inactive,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused }) => (
          <TabIcon label={route.name} focused={focused} />
        ),
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ title: "Discover" }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: "History" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tab.bg,
    borderTopColor: colors.tab.border,
    borderTopWidth: borderWidths.thin,
    height: sizes.tabBarHeight,
    paddingBottom: spacing.sm,
    paddingTop: spacing.xs,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: radii.md,
  },
  tabItemFocused: {
    backgroundColor: `${colors.accent.default}18`,
  },
  tabIcon: {
    fontSize: sizes.tabIconDefault,
    lineHeight: sizes.tabIconDefault + 4,
  },
  tabIconFocused: {
    color: colors.tab.active,
    fontSize: sizes.tabIconFocused,
    fontWeight: fontWeights.bold,
  },
  tabIconDefault: {
    color: colors.tab.inactive,
  },
  tabLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    marginTop: 2,
  },
})
