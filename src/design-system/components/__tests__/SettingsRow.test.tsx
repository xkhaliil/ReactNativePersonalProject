import { render, fireEvent } from "@testing-library/react-native"

import { SettingsRow } from "../SettingsRow"

// ─── Smoke Test ──────────────────────────────────────────────────────────────

describe("SettingsRow – smoke", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <SettingsRow
        title="Dark Mode"
        description="Use a dark color theme"
        value={false}
        onValueChange={jest.fn()}
      />,
    )
    expect(toJSON()).not.toBeNull()
  })
})

// ─── Unit Tests ──────────────────────────────────────────────────────────────

describe("SettingsRow – unit", () => {
  it("displays title and description", () => {
    const { getByText } = render(
      <SettingsRow
        title="Notifications"
        description="Enable push notifications"
        value={true}
        onValueChange={jest.fn()}
      />,
    )
    expect(getByText("Notifications")).toBeTruthy()
    expect(getByText("Enable push notifications")).toBeTruthy()
  })

  // Unit test that uses a mock function and a user action (Switch toggle)
  it("calls onValueChange with the new value when toggled", () => {
    const onValueChangeMock = jest.fn()
    const { getByRole } = render(
      <SettingsRow
        title="Haptics"
        description="Vibrate on interactions"
        value={false}
        onValueChange={onValueChangeMock}
      />,
    )

    fireEvent(getByRole("switch"), "valueChange", true)

    expect(onValueChangeMock).toHaveBeenCalledTimes(1)
    expect(onValueChangeMock).toHaveBeenCalledWith(true)
  })

  it("reflects the current value prop on the switch", () => {
    const { getByRole, rerender } = render(
      <SettingsRow
        title="Sound"
        description="Play sounds"
        value={false}
        onValueChange={jest.fn()}
      />,
    )
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect((getByRole("switch").props as { value: boolean }).value).toBe(false)

    rerender(
      <SettingsRow
        title="Sound"
        description="Play sounds"
        value={true}
        onValueChange={jest.fn()}
      />,
    )
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect((getByRole("switch").props as { value: boolean }).value).toBe(true)
  })
})
