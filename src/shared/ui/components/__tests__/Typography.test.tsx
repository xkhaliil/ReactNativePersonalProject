import { render } from "@testing-library/react-native"

import {
  ScreenTitle,
  SectionTitle,
  CardTitle,
  Body,
  BodySecondary,
  Caption,
  Label,
} from "../Typography"

// ─── Smoke Tests ─────────────────────────────────────────────────────────────

describe("Typography – smoke", () => {
  it("ScreenTitle renders without crashing", () => {
    const { toJSON } = render(<ScreenTitle>Screen Title</ScreenTitle>)
    expect(toJSON()).not.toBeNull()
  })

  it("SectionTitle renders without crashing", () => {
    const { toJSON } = render(<SectionTitle>Section</SectionTitle>)
    expect(toJSON()).not.toBeNull()
  })

  it("CardTitle renders without crashing", () => {
    const { toJSON } = render(<CardTitle>Card</CardTitle>)
    expect(toJSON()).not.toBeNull()
  })

  it("Body renders without crashing", () => {
    const { toJSON } = render(<Body>Body text</Body>)
    expect(toJSON()).not.toBeNull()
  })

  it("BodySecondary renders without crashing", () => {
    const { toJSON } = render(<BodySecondary>Secondary</BodySecondary>)
    expect(toJSON()).not.toBeNull()
  })

  it("Caption renders without crashing", () => {
    const { toJSON } = render(<Caption>Caption text</Caption>)
    expect(toJSON()).not.toBeNull()
  })

  it("Label renders without crashing", () => {
    const { toJSON } = render(<Label>Label text</Label>)
    expect(toJSON()).not.toBeNull()
  })

  it("renders text content correctly", () => {
    const { getByText } = render(<Body>Hello World</Body>)
    expect(getByText("Hello World")).toBeTruthy()
  })
})
