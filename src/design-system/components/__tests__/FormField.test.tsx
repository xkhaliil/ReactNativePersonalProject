import React, { useState } from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { FormField } from "../FormField"

// ─── Smoke Test ──────────────────────────────────────────────────────────────

describe("FormField – smoke", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<FormField label="Username" />)
    expect(toJSON()).not.toBeNull()
  })
})

// ─── Unit Tests ──────────────────────────────────────────────────────────────

describe("FormField – unit", () => {
  it("displays the label", () => {
    const { getByText } = render(<FormField label="Email" />)
    expect(getByText("Email")).toBeTruthy()
  })

  it("displays hint text when provided", () => {
    const { getByText } = render(
      <FormField label="Password" hint="At least 8 characters" />,
    )
    expect(getByText("At least 8 characters")).toBeTruthy()
  })

  it("displays error text instead of hint when error is provided", () => {
    const { getByText, queryByText } = render(
      <FormField label="Email" hint="Enter your email" error="Invalid email" />,
    )
    expect(getByText("Invalid email")).toBeTruthy()
    expect(queryByText("Enter your email")).toBeNull()
  })
})

// ─── Integration Test ────────────────────────────────────────────────────────

/**
 * Integration test: exercises FormField as a controlled input, simulating
 * a real user typing and triggering validation — the way the component
 * would behave when embedded in a screen.
 */
function ControlledFormField() {
  const [value, setValue] = useState("")
  const error = value.length > 0 && !value.includes("@") ? "Must be a valid email" : undefined

  return (
    <FormField
      label="Email"
      hint="Enter your email address"
      value={value}
      onChangeText={setValue}
      error={error}
      testID="email-input"
    />
  )
}

describe("FormField – integration", () => {
  it("shows no error for an empty field", () => {
    const { queryByText } = render(<ControlledFormField />)
    expect(queryByText("Must be a valid email")).toBeNull()
    expect(queryByText("Enter your email address")).toBeTruthy()
  })

  it("shows a validation error when the user types a non-email string", () => {
    const { getByTestId, getByText } = render(<ControlledFormField />)

    fireEvent.changeText(getByTestId("email-input"), "notanemail")

    expect(getByText("Must be a valid email")).toBeTruthy()
  })

  it("clears the error once a valid email is typed", () => {
    const { getByTestId, queryByText } = render(<ControlledFormField />)

    fireEvent.changeText(getByTestId("email-input"), "notanemail")
    fireEvent.changeText(getByTestId("email-input"), "user@example.com")

    expect(queryByText("Must be a valid email")).toBeNull()
  })

  it("shows hint text again after the error is resolved", () => {
    const { getByTestId, getByText } = render(<ControlledFormField />)

    fireEvent.changeText(getByTestId("email-input"), "bad")
    fireEvent.changeText(getByTestId("email-input"), "good@email.com")

    expect(getByText("Enter your email address")).toBeTruthy()
  })
})
