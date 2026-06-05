import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  AppState,
  type AppStateStatus,
  StyleSheet,
  Text,
  View,
} from "react-native"

import { useSettings } from "#features/settings"
import {
  authenticateWithBiometrics,
  getBiometricErrorMessage,
  getBiometricSupport,
} from "#shared"
import {
  Button,
  fontSizes,
  fontWeights,
  radii,
  spacing,
  useThemedStyles,
} from "#shared/ui"

type BiometricGateProps = {
  children: React.ReactNode
}

export default function BiometricGate({
  children,
}: BiometricGateProps): React.JSX.Element {
  const { settings, setSetting, loading } = useSettings()
  const appStateRef = useRef<AppStateStatus>(AppState.currentState)
  const isAuthenticatingRef = useRef(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const styles = useThemedStyles(({ colors }) => ({
    screen: {
      flex: 1,
      backgroundColor: colors.bg.screen,
      alignItems: "center",
      justifyContent: "center",
      padding: spacing.xl,
      gap: spacing.lg,
    },
    lockCard: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: colors.bg.surface,
      borderRadius: radii.xl,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border.subtle,
      padding: spacing.xl,
      gap: spacing.md,
      shadowColor: colors.shadow.base,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    },
    icon: {
      fontSize: fontSizes.emojiMd,
      textAlign: "center",
    },
    title: {
      color: colors.text.primary,
      fontSize: fontSizes["2xl"],
      fontWeight: fontWeights.bold,
      textAlign: "center",
      letterSpacing: -0.3,
    },
    description: {
      color: colors.text.secondary,
      fontSize: fontSizes.sm,
      lineHeight: 22,
      textAlign: "center",
    },
    error: {
      color: colors.text.muted,
      fontSize: fontSizes.xs,
      lineHeight: 18,
      textAlign: "center",
    },
    actions: {
      marginTop: spacing.sm,
      gap: spacing.sm,
    },
  }))

  const authenticate = useCallback(async () => {
    if (
      loading ||
      !settings.biometricLockEnabled ||
      isAuthenticatingRef.current
    ) {
      return
    }

    isAuthenticatingRef.current = true
    setIsChecking(true)
    setErrorMessage(null)

    try {
      const support = await getBiometricSupport()

      if (!support.available) {
        await setSetting("biometricLockEnabled", false)
        setIsUnlocked(true)
        setErrorMessage(null)
        return
      }

      const result = await authenticateWithBiometrics("Unlock SpotifyMood")

      if (result.success) {
        setIsUnlocked(true)
        setErrorMessage(null)
        return
      }

      setIsUnlocked(false)
      setErrorMessage(getBiometricErrorMessage(result.error))
    } finally {
      isAuthenticatingRef.current = false
      setIsChecking(false)
    }
  }, [loading, setSetting, settings.biometricLockEnabled])

  useEffect(() => {
    if (loading) {
      setIsChecking(true)
      return
    }

    if (!settings.biometricLockEnabled) {
      setIsUnlocked(true)
      setIsChecking(false)
      setErrorMessage(null)
      return
    }

    setIsUnlocked(false)
    void authenticate()
  }, [authenticate, loading, settings.biometricLockEnabled])

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      const wasInBackground =
        appStateRef.current === "background" ||
        appStateRef.current === "inactive"

      appStateRef.current = nextState

      if (
        nextState === "active" &&
        wasInBackground &&
        settings.biometricLockEnabled
      ) {
        setIsUnlocked(false)
        void authenticate()
      }
    })

    return () => {
      subscription.remove()
    }
  }, [authenticate, settings.biometricLockEnabled])

  if (loading || isChecking) {
    return <View style={styles.screen} />
  }

  if (!settings.biometricLockEnabled || isUnlocked) {
    return <>{children}</>
  }

  return (
    <View style={styles.screen}>
      <View style={styles.lockCard}>
        <Text style={styles.icon}>LOCK</Text>
        <Text style={styles.title}>Biometric Lock</Text>
        <Text style={styles.description}>
          Authenticate with your enrolled biometrics to access SpotifyMood.
        </Text>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <View style={styles.actions}>
          <Button
            label="Unlock with biometrics"
            onPress={() => {
              void authenticate()
            }}
          />
          <Button
            label="Turn off lock"
            variant="ghost"
            onPress={() => {
              void setSetting("biometricLockEnabled", false)
            }}
          />
        </View>
      </View>
    </View>
  )
}
