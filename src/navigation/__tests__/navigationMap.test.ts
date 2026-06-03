import { NAVIGATION_TRANSITIONS } from "../navigationMap"
import { ROUTES } from "../routes"

describe("navigationMap", () => {
  it("lists every documented route transition", () => {
    expect(NAVIGATION_TRANSITIONS.length).toBeGreaterThanOrEqual(7)
  })

  it("references real ROUTES constants", () => {
    const routes = NAVIGATION_TRANSITIONS.map((t) => t.route).join(" ")
    expect(routes).toContain(ROUTES.root.settings)
    expect(routes).toContain(ROUTES.homeStack.playlistDetail)
  })
})
