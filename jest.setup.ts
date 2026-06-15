import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock"

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage)

const expoGlobal = globalThis as typeof globalThis & {
  expo?: {
    modules?: Record<string, { addListener: jest.Mock }>
  }
}

expoGlobal.expo = expoGlobal.expo ?? {}
expoGlobal.expo.modules = {
  ...(expoGlobal.expo.modules ?? {}),
  ExpoModulesCoreJSLogger: {
    addListener: jest.fn(),
  },
}
