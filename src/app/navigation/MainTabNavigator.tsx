import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import type React from "react"

import { Text, View } from "react-native"

import { HistoryScreen } from "#features/history"
import { ProfileScreen } from "#features/profile"
import {
  borderWidths,
  fontSizes,
  fontWeights,
  radii,
  sizes,
  spacing,
  useAppTheme,
  useThemedStyles,
} from "#shared/ui"

import HomeStackNavigator from "./HomeStackNavigator"
import { ROUTES, TAB_LABELS } from "./routes"
import { type MainTabParamList } from "./types"

/**
 * MainTabNavigator - bottom tabs navigator.
 *
 * | Tab route  | Tab label  | Screen / nested navigator      |
 * |------------|------------|--------------------------------|
 * | HomeTab    | Discover   | HomeStackNavigator (nested Stack)|
 * | History    | History    | HistoryScreen                  |
 * | Profile    | Profile    | ProfileScreen                  |
 *
 * @see navigationMap.ts for tab switches.
 */
const Tab = createBottomTabNavigator<MainTabParamList>()

type TabIconProps = {
  routeName: keyof MainTabParamList
  focused: boolean
}

const TAB_ICONS: Record<keyof MainTabParamList, string> = {
  [ROUTES.tabs.homeTab]: "D",
  [ROUTES.tabs.history]: "H",
  [ROUTES.tabs.profile]: "P",
}

function TabIcon({ routeName, focused }: TabIconProps): React.JSX.Element {
  const styles = useThemedStyles(({ colors }) => ({
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
  }))

  return (
    <View style={[styles.tabItem, focused && styles.tabItemFocused]}>
      <Text
        style={[
          styles.tabIcon,
          focused ? styles.tabIconFocused : styles.tabIconDefault,
        ]}
      >
        {TAB_ICONS[routeName]}
      </Text>
    </View>
  )
}

export default function MainTabNavigator(): React.JSX.Element {
  const { colors } = useAppTheme()
  const styles = useThemedStyles(({ colors: themeColors }) => ({
    tabBar: {
      backgroundColor: themeColors.tab.bg,
      borderTopColor: themeColors.tab.border,
      borderTopWidth: borderWidths.thin,
      height: sizes.tabBarHeight,
      paddingBottom: spacing.sm,
      paddingTop: spacing.xs,
      elevation: 0,
      shadowOpacity: 0,
    },
    tabLabel: {
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.semibold,
      marginTop: 2,
    },
  }))

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.tab.active,
        tabBarInactiveTintColor: colors.tab.inactive,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused }) => (
          <TabIcon routeName={route.name} focused={focused} />
        ),
      })}
    >
      <Tab.Screen
        name={ROUTES.tabs.homeTab}
        component={HomeStackNavigator}
        options={{ title: TAB_LABELS[ROUTES.tabs.homeTab] }}
      />
      <Tab.Screen
        name={ROUTES.tabs.history}
        component={HistoryScreen}
        options={{ title: TAB_LABELS[ROUTES.tabs.history] }}
      />
      <Tab.Screen
        name={ROUTES.tabs.profile}
        component={ProfileScreen}
        options={{ title: TAB_LABELS[ROUTES.tabs.profile] }}
      />
    </Tab.Navigator>
  )
}
