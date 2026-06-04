import { render } from "@testing-library/react-native"

import { Text } from "react-native"

import { ScreenLayout } from "../ScreenLayout"

// ─── Smoke Tests ─────────────────────────────────────────────────────────────

describe("ScreenLayout – smoke", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <ScreenLayout>
        <Text>Screen content</Text>
      </ScreenLayout>,
    )
    expect(toJSON()).not.toBeNull()
  })

  it("renders with centered prop without crashing", () => {
    const { toJSON } = render(
      <ScreenLayout centered>
        <Text>Centered</Text>
      </ScreenLayout>,
    )
    expect(toJSON()).not.toBeNull()
  })

  it("renders children correctly", () => {
    const { getByText } = render(
      <ScreenLayout>
        <Text>My Screen</Text>
      </ScreenLayout>,
    )
    expect(getByText("My Screen")).toBeTruthy()
  })
})
