import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import type React from "react"
import { StyleSheet, View } from "react-native"

import BiometricGate from "#app/BiometricGate"
import { RootNavigator } from "#app/navigation"
import { configureNotificationBehavior } from "#shared"
import { AppThemeProvider, useAppTheme } from "#shared/ui"

configureNotificationBehavior()

export default function App(): React.JSX.Element {
  return (
    <AppThemeProvider>
      <ThemedApp />
    </AppThemeProvider>
  )
}

function ThemedApp(): React.JSX.Element {
  const { colors, navigationTheme, isReady } = useAppTheme()

  return (
    <View style={[styles.root, { backgroundColor: colors.bg.screen }]}>
      <StatusBar style={colors.statusBar} />
      {isReady ? (
        <BiometricGate>
          <NavigationContainer theme={navigationTheme}>
            <RootNavigator />
          </NavigationContainer>
        </BiometricGate>
      ) : (
        <View style={styles.root} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})
