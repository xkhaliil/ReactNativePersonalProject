import React from "react"
import { Text } from "react-native"
import { render } from "@testing-library/react-native"
import { Card } from "../Card"

// ─── Smoke Tests ─────────────────────────────────────────────────────────────

describe("Card – smoke", () => {
  it("renders without crashing (default surface variant)", () => {
    const { toJSON } = render(
      <Card>
        <Text>Content</Text>
      </Card>,
    )
    expect(toJSON()).not.toBeNull()
  })

  it("renders surfaceAlt variant without crashing", () => {
    const { toJSON } = render(
      <Card variant="surfaceAlt">
        <Text>Alt</Text>
      </Card>,
    )
    expect(toJSON()).not.toBeNull()
  })

  it("renders bordered variant without crashing", () => {
    const { toJSON } = render(
      <Card variant="bordered" accentColor="#1DB954">
        <Text>Bordered</Text>
      </Card>,
    )
    expect(toJSON()).not.toBeNull()
  })

  it("renders leftAccent variant without crashing", () => {
    const { toJSON } = render(
      <Card variant="leftAccent" accentColor="#1DB954">
        <Text>Accented</Text>
      </Card>,
    )
    expect(toJSON()).not.toBeNull()
  })

  it("renders children correctly", () => {
    const { getByText } = render(
      <Card>
        <Text>Hello Card</Text>
      </Card>,
    )
    expect(getByText("Hello Card")).toBeTruthy()
  })
})
