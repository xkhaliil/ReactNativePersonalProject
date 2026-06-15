import { groupMoodHistoryByDate } from "../groupMoodHistoryByDate"

describe("groupMoodHistoryByDate", () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2026, 5, 5, 12, 0, 0))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("groups today, yesterday, and older entries into separate sections", () => {
    const now = Date.now()
    const olderDate = new Date(2026, 4, 30, 9, 30, 0)
    const olderLabel = olderDate.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    })

    const sections = groupMoodHistoryByDate([
      {
        id: "today-1",
        mood: "Happy",
        emoji: "🙂",
        color: "#fff",
        timestamp: now,
      },
      {
        id: "yesterday-1",
        mood: "Sad",
        emoji: "😢",
        color: "#000",
        timestamp: new Date(2026, 5, 4, 18, 15, 0).getTime(),
      },
      {
        id: "older-1",
        mood: "Chill",
        emoji: "😌",
        color: "#123456",
        timestamp: olderDate.getTime(),
      },
      {
        id: "today-2",
        mood: "Hype",
        emoji: "🔥",
        color: "#abcdef",
        timestamp: now - 60_000,
      },
    ])

    expect(sections).toHaveLength(3)
    expect(sections[0]).toMatchObject({
      title: "Today",
      data: expect.arrayContaining([
        expect.objectContaining({ id: "today-1" }),
        expect.objectContaining({ id: "today-2" }),
      ]),
    })
    expect(sections[1]).toMatchObject({
      title: "Yesterday",
      data: [expect.objectContaining({ id: "yesterday-1" })],
    })
    expect(sections[2]).toMatchObject({
      title: olderLabel,
      data: [expect.objectContaining({ id: "older-1" })],
    })
  })

  it("returns an empty list when there are no history entries", () => {
    expect(groupMoodHistoryByDate([])).toEqual([])
  })
})
