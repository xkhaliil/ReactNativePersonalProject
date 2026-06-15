import { detectMoodFromPhoto } from "../detectMood"

describe("detectMoodFromPhoto", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("can return the first mood in the list", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0)

    await expect(detectMoodFromPhoto("file://photo.jpg")).resolves.toBe("Happy")
  })

  it("can return the last mood in the list", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0.99)

    await expect(detectMoodFromPhoto("file://photo.jpg")).resolves.toBe("Angry")
  })
})
