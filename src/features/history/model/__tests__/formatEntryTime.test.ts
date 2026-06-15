jest.mock("#shared", () => ({
  useHaptics: jest.fn(),
  useStorage: jest.fn(),
}))

/* eslint-disable @typescript-eslint/no-require-imports */
const {
  formatEntryTime,
}: {
  formatEntryTime: (timestamp: number) => string
} = require("../useMoodHistory")
/* eslint-enable @typescript-eslint/no-require-imports */

describe("formatEntryTime", () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2026, 5, 5, 12, 0, 0))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("formats entries from today with a Today prefix and local time", () => {
    const timestamp = new Date(2026, 5, 5, 9, 14, 0).getTime()
    const expectedTime = new Date(timestamp).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    })

    expect(formatEntryTime(timestamp)).toBe(`Today, ${expectedTime}`)
  })

  it("formats entries from yesterday with a Yesterday prefix and local time", () => {
    const timestamp = new Date(2026, 5, 4, 15, 45, 0).getTime()
    const expectedTime = new Date(timestamp).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    })

    expect(formatEntryTime(timestamp)).toBe(`Yesterday, ${expectedTime}`)
  })

  it("formats older entries with a short date label", () => {
    const timestamp = new Date(2026, 4, 30, 8, 0, 0).getTime()
    const expectedDate = new Date(timestamp).toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    })

    expect(formatEntryTime(timestamp)).toBe(expectedDate)
  })
})
