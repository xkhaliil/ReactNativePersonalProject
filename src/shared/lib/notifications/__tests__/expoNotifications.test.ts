const mockPlatform = { OS: "ios" }
let mockIsDevice = true

const mockNotifications = {
  AndroidImportance: {
    DEFAULT: "default",
  },
  SchedulableTriggerInputTypes: {
    TIME_INTERVAL: "timeInterval",
  },
  cancelScheduledNotificationAsync: jest.fn(),
  getExpoPushTokenAsync: jest.fn(),
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
  setNotificationChannelAsync: jest.fn(),
  setNotificationHandler: jest.fn(),
}

const mockExpoConstants = {
  easConfig: {
    projectId: "project-123",
  },
  expoConfig: null,
}

jest.mock("react-native", () => ({
  Platform: mockPlatform,
}))

jest.mock("expo-notifications", () => mockNotifications)
jest.mock("expo-device", () => ({
  get isDevice() {
    return mockIsDevice
  },
}))
jest.mock("expo-constants", () => ({
  __esModule: true,
  default: mockExpoConstants,
}))

type CancelDailyMoodReminderAsync = (
  identifier?: string | null,
) => Promise<void>
type GetNotificationPermissionMessage = (message?: string) => string
type RegisterForPushNotificationsAsync = () => Promise<{
  granted: boolean
  token: string | null
  message?: string
}>
type RequestNotificationPermissionsAsync = () => Promise<boolean>
type ScheduleDailyMoodReminderAsync = (
  previousIdentifier?: string | null,
) => Promise<string>

/* eslint-disable @typescript-eslint/no-require-imports */
const {
  cancelDailyMoodReminderAsync,
  getNotificationPermissionMessage,
  registerForPushNotificationsAsync,
  requestNotificationPermissionsAsync,
  scheduleDailyMoodReminderAsync,
}: {
  cancelDailyMoodReminderAsync: CancelDailyMoodReminderAsync
  getNotificationPermissionMessage: GetNotificationPermissionMessage
  registerForPushNotificationsAsync: RegisterForPushNotificationsAsync
  requestNotificationPermissionsAsync: RequestNotificationPermissionsAsync
  scheduleDailyMoodReminderAsync: ScheduleDailyMoodReminderAsync
} = require("../expoNotifications")
/* eslint-enable @typescript-eslint/no-require-imports */

describe("expoNotifications helpers", () => {
  beforeEach(() => {
    mockPlatform.OS = "ios"
    mockIsDevice = true
    mockExpoConstants.easConfig = {
      projectId: "project-123",
    }
    mockNotifications.getPermissionsAsync.mockResolvedValue({
      granted: false,
      canAskAgain: true,
    })
    mockNotifications.requestPermissionsAsync.mockResolvedValue({
      granted: true,
    })
    mockNotifications.getExpoPushTokenAsync.mockResolvedValue({
      data: "ExponentPushToken[test]",
    })
    mockNotifications.scheduleNotificationAsync.mockResolvedValue(
      "notification-id",
    )
    jest.clearAllMocks()
  })

  it("reuses existing notification permission when already granted", async () => {
    mockNotifications.getPermissionsAsync.mockResolvedValue({
      granted: true,
      canAskAgain: true,
    })

    await expect(requestNotificationPermissionsAsync()).resolves.toBe(true)
    expect(mockNotifications.requestPermissionsAsync).not.toHaveBeenCalled()
  })

  it("returns a denied result when the user cannot be prompted again", async () => {
    mockNotifications.getPermissionsAsync.mockResolvedValue({
      granted: false,
      canAskAgain: false,
    })

    await expect(registerForPushNotificationsAsync()).resolves.toEqual({
      granted: false,
      token: null,
      message: "Notifications permission was not granted.",
    })
  })

  it("returns a helpful message when running on a simulator", async () => {
    mockIsDevice = false

    await expect(registerForPushNotificationsAsync()).resolves.toEqual({
      granted: true,
      token: null,
      message: "Expo push tokens require a physical device.",
    })
  })

  it("returns a push token when permissions and project id are available", async () => {
    await expect(registerForPushNotificationsAsync()).resolves.toEqual({
      granted: true,
      token: "ExponentPushToken[test]",
    })
    expect(mockNotifications.getExpoPushTokenAsync).toHaveBeenCalledWith({
      projectId: "project-123",
    })
  })

  it("cancels the previous reminder before scheduling a new one", async () => {
    mockPlatform.OS = "android"

    await expect(
      scheduleDailyMoodReminderAsync("old-notification-id"),
    ).resolves.toBe("notification-id")

    expect(
      mockNotifications.cancelScheduledNotificationAsync,
    ).toHaveBeenCalledWith("old-notification-id")
    expect(mockNotifications.setNotificationChannelAsync).toHaveBeenCalledWith(
      "daily-mood-reminders",
      expect.objectContaining({
        name: "Daily Mood Reminders",
      }),
    )
    expect(mockNotifications.scheduleNotificationAsync).toHaveBeenCalledWith({
      content: {
        title: "Daily Mood Reminder",
        body: "Check in with your mood and refresh your playlist.",
        sound: true,
      },
      trigger: {
        type: "timeInterval",
        seconds: 60 * 60 * 24,
        repeats: true,
        channelId: "daily-mood-reminders",
      },
    })
  })

  it("returns a fallback permission message and safely skips empty cancel ids", async () => {
    expect(getNotificationPermissionMessage()).toBe(
      "Notifications are unavailable right now. Check device settings and try again.",
    )
    expect(getNotificationPermissionMessage("Custom message")).toBe(
      "Custom message",
    )

    await cancelDailyMoodReminderAsync(null)
    expect(
      mockNotifications.cancelScheduledNotificationAsync,
    ).not.toHaveBeenCalled()
  })
})
