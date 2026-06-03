import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import type React from "react"
import { StyleSheet, View } from "react-native"

import RootNavigator from "./navigation/RootNavigator"

export default function App(): React.JSX.Element {
  return (
    <View style={styles.root}>
      <NavigationContainer>
        <StatusBar style="light" />
        <RootNavigator />
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})
