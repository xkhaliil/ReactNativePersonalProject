import * as LocalAuthentication from "expo-local-authentication"
import { Platform } from "react-native"

export type BiometricSupport = {
  available: boolean
  message?: string
  label: string
}

function getBiometricLabel(
  types: LocalAuthentication.AuthenticationType[],
): string {
  if (
    types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)
  ) {
    return "face recognition"
  }

  if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
    return "fingerprint"
  }

  if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
    return "iris"
  }

  return "biometrics"
}

export async function getBiometricSupport(): Promise<BiometricSupport> {
  if (Platform.OS === "web") {
    return {
      available: false,
      label: "biometrics",
      message: "Biometric authentication is only available on iOS and Android.",
    }
  }

  const hasHardware = await LocalAuthentication.hasHardwareAsync()

  if (!hasHardware) {
    return {
      available: false,
      label: "biometrics",
      message: "No biometric hardware was detected on this device.",
    }
  }

  const supportedTypes =
    await LocalAuthentication.supportedAuthenticationTypesAsync()
  const label = getBiometricLabel(supportedTypes)
  const isEnrolled = await LocalAuthentication.isEnrolledAsync()

  if (!isEnrolled) {
    return {
      available: false,
      label,
      message: `No ${label} is set up on this device yet.`,
    }
  }

  return {
    available: true,
    label,
  }
}

export async function authenticateWithBiometrics(
  promptMessage: string,
): Promise<LocalAuthentication.LocalAuthenticationResult> {
  return LocalAuthentication.authenticateAsync({
    promptMessage,
    cancelLabel: "Cancel",
  })
}

export function getBiometricErrorMessage(error?: string): string {
  switch (error) {
    case "user_cancel":
    case "app_cancel":
    case "system_cancel":
      return "Authentication was canceled."
    case "not_enrolled":
      return "No biometric profile is enrolled on this device."
    case "not_available":
      return "Biometric authentication is not available on this device."
    case "lockout":
      return "Biometrics are temporarily locked. Try again in a moment."
    case "timeout":
      return "Authentication timed out. Try again."
    default:
      return "Authentication failed. Try again."
  }
}
