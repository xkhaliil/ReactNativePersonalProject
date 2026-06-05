import type React from "react"
import { Alert, Pressable, ScrollView, Text, View } from "react-native"

import { useSettings } from "#features/settings"
import {
  authenticateWithBiometrics,
  cancelDailyMoodReminderAsync,
  getBiometricErrorMessage,
  getBiometricSupport,
  getNotificationPermissionMessage,
  registerForPushNotificationsAsync,
  scheduleDailyMoodReminderAsync,
  useStorage,
} from "#shared"
import {
  SettingsRow,
  Skeleton,
  SkeletonItem,
  borderWidths,
  fontSizes,
  fontWeights,
  radii,
  spacing,
  type ThemePreference,
  useAppTheme,
  useThemedStyles,
} from "#shared/ui"

import { useSpotifyAuth } from "../spotify"

const THEME_OPTIONS: Array<{
  value: ThemePreference
  label: string
  description: string
}> = [
  {
    value: "system",
    label: "System",
    description: "Follow device appearance",
  },
  {
    value: "light",
    label: "Light",
    description: "Always use light mode",
  },
  {
    value: "dark",
    label: "Dark",
    description: "Always use dark mode",
  },
]

type NotificationState = {
  expoPushToken: string | null
  dailyReminderId: string | null
}

const NOTIFICATION_STORAGE_KEY = "app-notifications-v1"
const DEFAULT_NOTIFICATION_STATE: NotificationState = {
  expoPushToken: null,
  dailyReminderId: null,
}

export default function SettingsScreen(): React.JSX.Element {
  const { settings, setSetting, loading } = useSettings()
  const [notificationState, setNotificationState, { loading: notificationsLoading }] =
    useStorage<NotificationState>(
      NOTIFICATION_STORAGE_KEY,
      DEFAULT_NOTIFICATION_STATE,
    )
  const { isConnected, isLoading, connect, disconnect } = useSpotifyAuth()
  const { preference, setPreference, scheme } = useAppTheme()
  const isScreenLoading = loading || notificationsLoading
  const styles = useThemedStyles(({ colors }) => ({
    screen: {
      flex: 1,
      backgroundColor: colors.bg.screen,
    },
    content: {
      padding: spacing.xl,
      paddingBottom: spacing["6xl"],
      gap: spacing.sm,
    },
    pageTitle: {
      fontSize: fontSizes["4xl"],
      fontWeight: fontWeights.bold,
      color: colors.text.primary,
      letterSpacing: -0.5,
      marginBottom: spacing.lg,
    },
    group: {
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    groupLabel: {
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.bold,
      color: colors.text.muted,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      marginLeft: spacing.xs,
    },
    groupCard: {
      backgroundColor: colors.bg.surface,
      borderRadius: radii.xl,
      borderWidth: borderWidths.thin,
      borderColor: colors.border.subtle,
      paddingHorizontal: spacing.lg,
      overflow: "hidden",
      shadowColor: colors.shadow.base,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 2,
    },
    themeCard: {
      paddingVertical: spacing.lg,
      gap: spacing.md,
    },
    themeHeader: {
      gap: spacing["2xs"],
    },
    themeTitle: {
      color: colors.text.primary,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.semibold,
    },
    themeDescription: {
      color: colors.text.muted,
      fontSize: fontSizes.xs,
      lineHeight: 18,
    },
    themeOptions: {
      gap: spacing.sm,
    },
    themeOption: {
      borderWidth: borderWidths.thin,
      borderColor: colors.border.default,
      borderRadius: radii.lg,
      backgroundColor: colors.bg.surfaceAlt,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      gap: spacing["2xs"],
    },
    themeOptionActive: {
      borderColor: colors.accent.default,
      backgroundColor: `${colors.accent.default}14`,
    },
    themeOptionPressed: {
      opacity: 0.8,
    },
    themeOptionLabelRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    themeOptionLabel: {
      color: colors.text.primary,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.semibold,
    },
    themeOptionLabelActive: {
      color: colors.accent.default,
    },
    themeOptionBadge: {
      color: colors.text.faint,
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.semibold,
      textTransform: "uppercase",
      letterSpacing: 0.8,
    },
    themeOptionDescription: {
      color: colors.text.muted,
      fontSize: fontSizes.xs,
      lineHeight: 18,
    },
    spotifyRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.lg,
      gap: spacing.md,
    },
    spotifyIconBox: {
      width: 44,
      height: 44,
      borderRadius: radii.md,
      backgroundColor: colors.bg.surfaceAlt,
      alignItems: "center",
      justifyContent: "center",
    },
    spotifyIcon: {
      fontSize: fontSizes.xl,
    },
    spotifyInfo: {
      flex: 1,
      gap: spacing["2xs"],
    },
    spotifyStatus: {
      color: colors.text.primary,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.semibold,
    },
    spotifyDesc: {
      color: colors.text.muted,
      fontSize: fontSizes.xs,
      lineHeight: 18,
    },
    spotifyBtn: {
      borderRadius: radii.full,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      minWidth: 80,
      alignItems: "center",
    },
    spotifyBtnConnect: {
      backgroundColor: colors.accent.default,
    },
    spotifyBtnDisconnect: {
      backgroundColor: colors.bg.surfaceAlt,
      borderWidth: borderWidths.base,
      borderColor: colors.border.default,
    },
    spotifyBtnLoading: {
      opacity: 0.5,
    },
    spotifyBtnPressed: {
      opacity: 0.75,
    },
    spotifyBtnText: {
      color: colors.accent.on,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.bold,
    },
    spotifyBtnTextDisconnect: {
      color: colors.text.secondary,
    },
    version: {
      textAlign: "center",
      color: colors.text.faint,
      fontSize: fontSizes.xs,
      marginTop: spacing.lg,
    },
  }))

  const handleBiometricToggle = async (value: boolean): Promise<void> => {
    if (!value) {
      await setSetting("biometricLockEnabled", false)
      return
    }

    const support = await getBiometricSupport()

    if (!support.available) {
      Alert.alert(
        "Biometrics unavailable",
        support.message ?? "Biometric authentication is not available.",
      )
      return
    }

    const result = await authenticateWithBiometrics("Enable biometric lock")

    if (result.success) {
      await setSetting("biometricLockEnabled", true)
      return
    }

    Alert.alert(
      "Could not enable biometric lock",
      getBiometricErrorMessage(result.error),
    )
  }

  const handleNotificationToggle = async (value: boolean): Promise<void> => {
    if (!value) {
      await cancelDailyMoodReminderAsync(notificationState.dailyReminderId)
      await setNotificationState((prev) => ({
        ...prev,
        dailyReminderId: null,
      }))
      await setSetting("notifications", false)
      return
    }

    const registration = await registerForPushNotificationsAsync()

    if (!registration.granted) {
      Alert.alert(
        "Notifications unavailable",
        getNotificationPermissionMessage(registration.message),
      )
      return
    }

    const reminderId = await scheduleDailyMoodReminderAsync(
      notificationState.dailyReminderId,
    )

    await setNotificationState((prev) => ({
      expoPushToken: registration.token ?? prev.expoPushToken,
      dailyReminderId: reminderId,
    }))
    await setSetting("notifications", true)

    if (registration.message) {
      Alert.alert(
        "Daily reminder enabled",
        `${registration.message} Local reminders still work on this device.`,
      )
    }
  }

  if (isScreenLoading) {
    return (
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Settings</Text>

        <View style={styles.group}>
          <Text style={styles.groupLabel}>Appearance</Text>
          <View style={[styles.groupCard, styles.themeCard]}>
            <Skeleton>
              <SkeletonItem>
                <SkeletonItem width={120} height={20} />
                <SkeletonItem marginTop={8} width={160} height={16} />
              </SkeletonItem>
              <SkeletonItem marginTop={16}>
                <SkeletonItem width="100%" height={64} borderRadius={16} />
                <SkeletonItem
                  marginTop={12}
                  width="100%"
                  height={64}
                  borderRadius={16}
                />
                <SkeletonItem
                  marginTop={12}
                  width="100%"
                  height={64}
                  borderRadius={16}
                />
              </SkeletonItem>
            </Skeleton>
          </View>
        </View>

        <View style={styles.group}>
          <Text style={styles.groupLabel}>Spotify</Text>
          <View style={[styles.groupCard, styles.themeCard]}>
            <Skeleton>
              <SkeletonItem
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <SkeletonItem
                  width={44}
                  height={44}
                  borderRadius={12}
                  marginRight={12}
                />
                <SkeletonItem flex={1}>
                  <SkeletonItem width={110} height={18} />
                  <SkeletonItem marginTop={8} width={150} height={14} />
                </SkeletonItem>
                <SkeletonItem
                  width={86}
                  height={36}
                  borderRadius={999}
                  marginLeft={12}
                />
              </SkeletonItem>
            </Skeleton>
          </View>
        </View>

        <View style={styles.group}>
          <Text style={styles.groupLabel}>Mood Detection</Text>
          <View style={styles.groupCard}>
            <Skeleton>
              <SkeletonItem width="100%" height={62} />
            </Skeleton>
          </View>
        </View>

        <View style={styles.group}>
          <Text style={styles.groupLabel}>Playback</Text>
          <View style={styles.groupCard}>
            <Skeleton>
              <SkeletonItem width="100%" height={62} />
            </Skeleton>
          </View>
        </View>

        <View style={styles.group}>
          <Text style={styles.groupLabel}>General</Text>
          <View style={styles.groupCard}>
            <Skeleton>
              <SkeletonItem width="100%" height={62} />
            </Skeleton>
          </View>
        </View>

        <View style={styles.group}>
          <Text style={styles.groupLabel}>Security</Text>
          <View style={styles.groupCard}>
            <Skeleton>
              <SkeletonItem width="100%" height={62} />
            </Skeleton>
          </View>
        </View>
      </ScrollView>
    )
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>Settings</Text>

      <View style={styles.group}>
        <Text style={styles.groupLabel}>Appearance</Text>
        <View style={[styles.groupCard, styles.themeCard]}>
          <View style={styles.themeHeader}>
            <Text style={styles.themeTitle}>Theme</Text>
            <Text style={styles.themeDescription}>
              Current theme: {scheme === "dark" ? "Dark" : "Light"}
            </Text>
          </View>

          <View style={styles.themeOptions}>
            {THEME_OPTIONS.map((option) => {
              const isActive = preference === option.value

              return (
                <Pressable
                  key={option.value}
                  style={({ pressed }) => [
                    styles.themeOption,
                    isActive && styles.themeOptionActive,
                    pressed && styles.themeOptionPressed,
                  ]}
                  onPress={() => void setPreference(option.value)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isActive }}
                >
                  <View style={styles.themeOptionLabelRow}>
                    <Text
                      style={[
                        styles.themeOptionLabel,
                        isActive && styles.themeOptionLabelActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {option.value === "system" && (
                      <Text style={styles.themeOptionBadge}>Auto</Text>
                    )}
                  </View>
                  <Text style={styles.themeOptionDescription}>
                    {option.description}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        </View>
      </View>

      {/* Spotify */}
      <View style={styles.group}>
        <Text style={styles.groupLabel}>Spotify</Text>
        <View style={styles.groupCard}>
          <View style={styles.spotifyRow}>
            <View style={styles.spotifyIconBox}>
              <Text style={styles.spotifyIcon}>S</Text>
            </View>
            <View style={styles.spotifyInfo}>
              <Text style={styles.spotifyStatus}>
                {isConnected ? "Connected" : "Not Connected"}
              </Text>
              <Text style={styles.spotifyDesc}>
                {isConnected
                  ? "Real recommendations enabled"
                  : "Connect for personalised tracks"}
              </Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.spotifyBtn,
                isConnected
                  ? styles.spotifyBtnDisconnect
                  : styles.spotifyBtnConnect,
                pressed && styles.spotifyBtnPressed,
                isLoading && styles.spotifyBtnLoading,
              ]}
              onPress={isConnected ? () => void disconnect() : connect}
              disabled={isLoading}
            >
              <Text
                style={[
                  styles.spotifyBtnText,
                  isConnected && styles.spotifyBtnTextDisconnect,
                ]}
              >
                {isLoading ? "..." : isConnected ? "Disconnect" : "Connect"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Mood Detection */}
      <View style={styles.group}>
        <Text style={styles.groupLabel}>Mood Detection</Text>
        <View style={styles.groupCard}>
          <SettingsRow
            title="Camera Mood Scan"
            description="Use camera to detect your mood"
            value={settings.cameraEnabled}
            onValueChange={(v) => void setSetting("cameraEnabled", v)}
          />
        </View>
      </View>

      {/* Playback */}
      <View style={styles.group}>
        <Text style={styles.groupLabel}>Playback</Text>
        <View style={styles.groupCard}>
          <SettingsRow
            title="Auto-play on mood select"
            description="Automatically open Spotify playlist"
            value={settings.autoPlay}
            onValueChange={(v) => void setSetting("autoPlay", v)}
          />
        </View>
      </View>

      {/* General */}
      <View style={styles.group}>
        <Text style={styles.groupLabel}>General</Text>
        <View style={styles.groupCard}>
          <SettingsRow
            title="Daily Mood Reminder"
            description="Get a nudge to check your mood"
            value={settings.notifications}
            onValueChange={(value) => {
              void handleNotificationToggle(value)
            }}
          />
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupLabel}>Security</Text>
        <View style={styles.groupCard}>
          <SettingsRow
            title="Biometric Lock"
            description="Require Face ID or fingerprint when opening the app"
            value={settings.biometricLockEnabled}
            onValueChange={(value) => {
              void handleBiometricToggle(value)
            }}
          />
        </View>
      </View>

      <Text style={styles.version}>SpotifyMood v1.0.0</Text>
    </ScrollView>
  )
}
