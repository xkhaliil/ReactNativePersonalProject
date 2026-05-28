import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet, Text } from "react-native"
import { HistoryScreen } from "../features/history"
import { HomeStackNavigator } from "../features/home"
import { ProfileScreen } from "../features/profile"
import type { MainTabParamList } from "#shared"
import { colors, sizes, borderWidths } from "../design-system"

const Tab = createBottomTabNavigator<MainTabParamList>()

const TAB_ICONS: Record<string, string> = {
  HomeTab: "🎧",
  History: "📅",
  Profile: "👤",
}

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={focused ? styles.iconFocused : styles.iconDefault}>
      {TAB_ICONS[label]}
    </Text>
  )
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tab.bg,
          borderTopColor: colors.tab.border,
          borderTopWidth: borderWidths.thin,
        },
        tabBarActiveTintColor: colors.tab.active,
        tabBarInactiveTintColor: colors.tab.inactive,
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
  iconFocused: {
    fontSize: sizes.tabIconFocused,
    opacity: 1,
  },
  iconDefault: {
    fontSize: sizes.tabIconDefault,
    opacity: 0.5,
  },
})
