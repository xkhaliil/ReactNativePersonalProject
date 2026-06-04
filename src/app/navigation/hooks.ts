/**
 * Typed navigation hooks. Screens call these instead of wiring generics inline.
 */

import { useNavigation } from "@react-navigation/native"
import { type NativeStackNavigationProp } from "@react-navigation/native-stack"

import { ROUTES } from "./routes"
import { type HomeStackParamList, type RootStackParamList } from "./types"


export type RootNavigation = NativeStackNavigationProp<RootStackParamList>
export type HomeStackNavigation = NativeStackNavigationProp<HomeStackParamList>

/** Root stack: Tabs (initial) and Settings modal. */
export function useRootNavigation(): RootNavigation {
  return useNavigation<RootNavigation>()
}

/** Nested stack inside the Discover tab: Home and PlaylistDetail. */
export function useHomeStackNavigation(): HomeStackNavigation {
  return useNavigation<HomeStackNavigation>()
}

export function navigateToSettings(navigation: RootNavigation): void {
  navigation.navigate(ROUTES.root.settings)
}

export function navigateToPlaylistDetail(
  navigation: HomeStackNavigation,
  params: HomeStackParamList["PlaylistDetail"],
): void {
  navigation.navigate(ROUTES.homeStack.playlistDetail, params)
}

