const mockPlatform = { OS: "ios" }

const mockLocalAuthentication = {
  AuthenticationType: {
    FINGERPRINT: 1,
    FACIAL_RECOGNITION: 2,
    IRIS: 3,
  },
  authenticateAsync: jest.fn(),
  hasHardwareAsync: jest.fn(),
  isEnrolledAsync: jest.fn(),
  supportedAuthenticationTypesAsync: jest.fn(),
}

jest.mock("react-native", () => ({
  Platform: mockPlatform,
}))

jest.mock("expo-local-authentication", () => mockLocalAuthentication)

type AuthenticateWithBiometrics = (
  promptMessage: string,
) => Promise<{ success: boolean }>
type GetBiometricErrorMessage = (error?: string) => string
type GetBiometricSupport = () => Promise<{
  available: boolean
  label: string
  message?: string
}>

/* eslint-disable @typescript-eslint/no-require-imports */
const {
  authenticateWithBiometrics,
  getBiometricErrorMessage,
  getBiometricSupport,
}: {
  authenticateWithBiometrics: AuthenticateWithBiometrics
  getBiometricErrorMessage: GetBiometricErrorMessage
  getBiometricSupport: GetBiometricSupport
} = require("../localAuthentication")
/* eslint-enable @typescript-eslint/no-require-imports */

describe("localAuthentication helpers", () => {
  beforeEach(() => {
    mockPlatform.OS = "ios"
    jest.clearAllMocks()
  })

  it("returns a helpful unsupported message on web", async () => {
    mockPlatform.OS = "web"

    await expect(getBiometricSupport()).resolves.toEqual({
      available: false,
      label: "biometrics",
      message: "Biometric authentication is only available on iOS and Android.",
    })
  })

  it("detects enrolled face recognition support", async () => {
    mockLocalAuthentication.hasHardwareAsync.mockResolvedValue(true)
    mockLocalAuthentication.supportedAuthenticationTypesAsync.mockResolvedValue(
      [mockLocalAuthentication.AuthenticationType.FACIAL_RECOGNITION],
    )
    mockLocalAuthentication.isEnrolledAsync.mockResolvedValue(true)

    await expect(getBiometricSupport()).resolves.toEqual({
      available: true,
      label: "face recognition",
    })
  })

  it("reports when biometric hardware exists but nothing is enrolled", async () => {
    mockLocalAuthentication.hasHardwareAsync.mockResolvedValue(true)
    mockLocalAuthentication.supportedAuthenticationTypesAsync.mockResolvedValue(
      [mockLocalAuthentication.AuthenticationType.FINGERPRINT],
    )
    mockLocalAuthentication.isEnrolledAsync.mockResolvedValue(false)

    await expect(getBiometricSupport()).resolves.toEqual({
      available: false,
      label: "fingerprint",
      message: "No fingerprint is set up on this device yet.",
    })
  })

  it("passes the expected prompt options to expo-local-authentication", async () => {
    mockLocalAuthentication.authenticateAsync.mockResolvedValue({
      success: true,
    })

    await expect(authenticateWithBiometrics("Unlock app")).resolves.toEqual({
      success: true,
    })
    expect(mockLocalAuthentication.authenticateAsync).toHaveBeenCalledWith({
      promptMessage: "Unlock app",
      cancelLabel: "Cancel",
    })
  })

  it("maps native biometric errors to user-friendly text", () => {
    expect(getBiometricErrorMessage("timeout")).toBe(
      "Authentication timed out. Try again.",
    )
    expect(getBiometricErrorMessage("lockout")).toBe(
      "Biometrics are temporarily locked. Try again in a moment.",
    )
    expect(getBiometricErrorMessage("something-else")).toBe(
      "Authentication failed. Try again.",
    )
  })
})
