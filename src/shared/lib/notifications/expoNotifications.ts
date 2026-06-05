import ExpoConstants from "expo-constants"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import { Platform } from "react-native"

const DAILY_REMINDER_CHANNEL_ID = "daily-mood-reminders"
const DAILY_REMINDER_INTERVAL_SECONDS = 60 * 60 * 24

let isNotificationHandlerConfigured = false

export type PushRegistrationResult = {
  granted: boolean
  token: string | null
  message?: string
}

type ExpoProjectConfig = {
  projectId?: string
}

type ExpoConstantsWithProjectId = typeof ExpoConstants & {
  easConfig?: ExpoProjectConfig | null
  expoConfig?: {
    extra?: {
      eas?: ExpoProjectConfig
    }
  } | null
}

export function configureNotificationBehavior(): void {
  if (isNotificationHandlerConfigured) {
    return
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  })

  isNotificationHandlerConfigured = true
}

export async function ensureNotificationChannelAsync(): Promise<void> {
  if (Platform.OS !== "android") {
    return
  }

  await Notifications.setNotificationChannelAsync(DAILY_REMINDER_CHANNEL_ID, {
    name: "Daily Mood Reminders",
    importance: Notifications.AndroidImportance.DEFAULT,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#7C3AED",
  })
}

export async function requestNotificationPermissionsAsync(): Promise<boolean> {
  const existing = await Notifications.getPermissionsAsync()

  if (existing.granted) {
    return true
  }

  if (!existing.canAskAgain) {
    return false
  }

  const requested = await Notifications.requestPermissionsAsync()
  return requested.granted
}

export async function registerForPushNotificationsAsync(): Promise<PushRegistrationResult> {
  configureNotificationBehavior()
  await ensureNotificationChannelAsync()

  const granted = await requestNotificationPermissionsAsync()

  if (!granted) {
    return {
      granted: false,
      token: null,
      message: "Notifications permission was not granted.",
    }
  }

  if (!Device.isDevice) {
    return {
      granted: true,
      token: null,
      message: "Expo push tokens require a physical device.",
    }
  }

  const constants = ExpoConstants as ExpoConstantsWithProjectId
  const projectId =
    constants.easConfig?.projectId ??
    constants.expoConfig?.extra?.eas?.projectId ??
    null

  if (!projectId) {
    return {
      granted: true,
      token: null,
      message: "Missing EAS project ID for Expo push token registration.",
    }
  }

  const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data

  return {
    granted: true,
    token,
  }
}

export async function scheduleDailyMoodReminderAsync(
  previousIdentifier?: string | null,
): Promise<string> {
  configureNotificationBehavior()
  await ensureNotificationChannelAsync()

  if (previousIdentifier) {
    await Notifications.cancelScheduledNotificationAsync(previousIdentifier)
  }

  return Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Mood Reminder",
      body: "Check in with your mood and refresh your playlist.",
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: DAILY_REMINDER_INTERVAL_SECONDS,
      repeats: true,
      channelId:
        Platform.OS === "android" ? DAILY_REMINDER_CHANNEL_ID : undefined,
    },
  })
}

export async function cancelDailyMoodReminderAsync(
  identifier?: string | null,
): Promise<void> {
  if (!identifier) {
    return
  }

  await Notifications.cancelScheduledNotificationAsync(identifier)
}

export function getNotificationPermissionMessage(message?: string): string {
  return (
    message ??
    "Notifications are unavailable right now. Check device settings and try again."
  )
}
