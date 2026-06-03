import { render, fireEvent } from "@testing-library/react-native"

import { Button } from "../Button"

// ─── Smoke Test ──────────────────────────────────────────────────────────────

describe("Button – smoke", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Button label="Hello" onPress={jest.fn()} />)
    expect(toJSON()).not.toBeNull()
  })
})

// ─── Unit Tests ──────────────────────────────────────────────────────────────

describe("Button – unit", () => {
  it("displays the provided label", () => {
    const { getByText } = render(<Button label="Save" onPress={jest.fn()} />)
    expect(getByText("Save")).toBeTruthy()
  })

  it("renders all three variants without crashing", () => {
    const { rerender, toJSON } = render(
      <Button label="Primary" onPress={jest.fn()} variant="primary" />,
    )
    expect(toJSON()).not.toBeNull()

    rerender(<Button label="Outline" onPress={jest.fn()} variant="outline" />)
    expect(toJSON()).not.toBeNull()

    rerender(<Button label="Ghost" onPress={jest.fn()} variant="ghost" />)
    expect(toJSON()).not.toBeNull()
  })

  // Unit test that uses a mock function and a user action
  it("calls onPress when tapped", () => {
    const onPressMock = jest.fn()
    const { getByText } = render(
      <Button label="Tap me" onPress={onPressMock} />,
    )

    fireEvent.press(getByText("Tap me"))

    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it("does not call onPress when disabled", () => {
    const onPressMock = jest.fn()
    const { getByText } = render(
      <Button label="Disabled" onPress={onPressMock} disabled />,
    )

    fireEvent.press(getByText("Disabled"))

    expect(onPressMock).not.toHaveBeenCalled()
  })
})
