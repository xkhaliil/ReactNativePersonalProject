import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import type React from "react"

import RootNavigator from "./navigation/RootNavigator"

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <RootNavigator />
    </NavigationContainer>
  )
}
