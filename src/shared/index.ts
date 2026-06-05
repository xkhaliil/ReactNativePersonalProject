export * from "./ui"
export {
  authenticateWithBiometrics,
  getBiometricErrorMessage,
  getBiometricSupport,
} from "./lib/biometrics/localAuthentication"
export {
  cancelDailyMoodReminderAsync,
  configureNotificationBehavior,
  getNotificationPermissionMessage,
  registerForPushNotificationsAsync,
  scheduleDailyMoodReminderAsync,
} from "./lib/notifications/expoNotifications"
export { useStorage } from "./lib/storage/useStorage"
export { useHaptics } from "./lib/haptics/useHaptics"
