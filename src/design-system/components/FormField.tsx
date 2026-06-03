/**
 * FormField
 * Reusability: HIGH — a labelled TextInput used wherever text input is needed.
 *
 * Wraps TextInput with consistent design-system styling so no screen
 * ever reaches for raw TextInput or hardcodes colors/sizes.
 */

import type React from "react"
import { StyleSheet, TextInput, type TextInputProps, View } from "react-native"

import { colors, spacing, fontSizes, radii, borderWidths } from "../tokens"

import { Body, Caption } from "./Typography"

type FormFieldProps = TextInputProps & {
  label: string
  /** Optional helper text shown below the input */
  hint?: string
  /** Validation error — shown in place of hint when present */
  error?: string
}

export function FormField({
  label,
  hint,
  error,
  style,
  ...inputProps
}: FormFieldProps): React.JSX.Element {
  const hasError = Boolean(error)

  return (
    <View style={styles.wrapper}>
      <Body style={styles.label}>{label}</Body>
      <TextInput
        style={[styles.input, hasError && styles.inputError, style]}
        placeholderTextColor={colors.text.muted}
        selectionColor={colors.accent.default}
        {...inputProps}
      />
      {(error ?? hint) ? (
        <Caption style={[styles.hint, hasError && styles.hintError]}>
          {error ?? hint}
        </Caption>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.lg,
  },
  label: {
    marginBottom: spacing.xs,
    fontWeight: "600",
  },
  input: {
    backgroundColor: colors.bg.input,
    color: colors.text.primary,
    fontSize: fontSizes.base,
    borderRadius: radii.lg,
    borderWidth: borderWidths.thin,
    borderColor: colors.border.subtle,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  inputError: {
    borderColor: colors.accent.default,
  },
  hint: {
    marginTop: spacing.xs,
  },
  hintError: {
    color: colors.accent.default,
  },
})
