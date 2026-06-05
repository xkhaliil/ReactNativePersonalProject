import {
  DarkTheme,
  DefaultTheme,
  type Theme as NavigationTheme,
} from "@react-navigation/native"
import * as SystemUI from "expo-system-ui"
import type React from "react"
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react"
import { StyleSheet, useColorScheme } from "react-native"

import { useStorage } from "#shared/lib/storage/useStorage"

import {
  createTypography,
  darkColors,
  getColorsForScheme,
  type AppColors,
  type AppTypography,
  type ThemeScheme,
} from "./tokens"

export type ThemePreference = "system" | ThemeScheme

type ThemeContextValue = {
  colors: AppColors
  typography: AppTypography
  scheme: ThemeScheme
  preference: ThemePreference
  setPreference: (preference: ThemePreference) => Promise<void>
  navigationTheme: NavigationTheme
  isReady: boolean
}

const STORAGE_KEY = "theme-preference-v1"

function createNavigationTheme(
  scheme: ThemeScheme,
  colors: AppColors,
): NavigationTheme {
  const baseTheme = scheme === "dark" ? DarkTheme : DefaultTheme

  return {
    ...baseTheme,
    dark: scheme === "dark",
    colors: {
      ...baseTheme.colors,
      primary: colors.accent.default,
      background: colors.bg.screen,
      card: colors.bg.screen,
      text: colors.text.primary,
      border: colors.border.subtle,
      notification: colors.accent.default,
    },
  }
}

const defaultValue: ThemeContextValue = {
  colors: darkColors,
  typography: createTypography(darkColors),
  scheme: "dark",
  preference: "system",
  setPreference: () => Promise.resolve(),
  navigationTheme: createNavigationTheme("dark", darkColors),
  isReady: true,
}

const ThemeContext = createContext<ThemeContextValue>(defaultValue)

type AppThemeProviderProps = {
  children: React.ReactNode
}

export function AppThemeProvider({
  children,
}: AppThemeProviderProps): React.JSX.Element {
  const systemScheme = useColorScheme()
  const [preference, setPreferenceState, { loading }] =
    useStorage<ThemePreference>(STORAGE_KEY, "system")
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const resolvedSystemScheme: ThemeScheme =
    systemScheme === "dark" ? "dark" : "light"
  const scheme: ThemeScheme =
    preference === "system" ? resolvedSystemScheme : preference
  const colors = useMemo(() => getColorsForScheme(scheme), [scheme])
  const typography = useMemo(() => createTypography(colors), [colors])
  const navigationTheme = useMemo(
    () => createNavigationTheme(scheme, colors),
    [scheme, colors],
  )

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(colors.bg.screen).catch(
      () => undefined,
    )
  }, [colors.bg.screen])

  const setPreference = useCallback(
    async (nextPreference: ThemePreference) => {
      await setPreferenceState(nextPreference)
    },
    [setPreferenceState],
  )

  const value = useMemo(
    () => ({
      colors,
      typography,
      scheme,
      preference,
      setPreference,
      navigationTheme,
      isReady: hasMounted && !loading,
    }),
    [
      colors,
      typography,
      scheme,
      preference,
      setPreference,
      navigationTheme,
      hasMounted,
      loading,
    ],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useAppTheme(): ThemeContextValue {
  return useContext(ThemeContext)
}

export function useThemedStyles<T extends StyleSheet.NamedStyles<T>>(
  createStyles: (theme: ThemeContextValue) => T,
): T {
  const theme = useAppTheme()
  return useMemo(
    () => StyleSheet.create(createStyles(theme)),
    [createStyles, theme],
  )
}
