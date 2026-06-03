/**
 * Typography Components
 * Reusability: HIGH — text variants used across every screen.
 *
 * These are thin wrappers that apply design tokens so individual
 * components never hard-code font sizes or colors.
 */

import type React from "react"
import { StyleSheet, Text, type TextProps } from "react-native"

import { typography } from "../tokens"

const styles = StyleSheet.create({
  screenTitle: typography.screenTitle,
  sectionTitle: typography.sectionTitle,
  cardTitle: typography.cardTitle,
  body: typography.body,
  bodySecondary: typography.bodySecondary,
  caption: typography.caption,
  label: typography.label,
})

export function ScreenTitle({ style, ...props }: TextProps): React.JSX.Element {
  return <Text style={[styles.screenTitle, style]} {...props} />
}

export function SectionTitle({
  style,
  ...props
}: TextProps): React.JSX.Element {
  return <Text style={[styles.sectionTitle, style]} {...props} />
}

export function CardTitle({ style, ...props }: TextProps): React.JSX.Element {
  return <Text style={[styles.cardTitle, style]} {...props} />
}

export function Body({ style, ...props }: TextProps): React.JSX.Element {
  return <Text style={[styles.body, style]} {...props} />
}

export function BodySecondary({
  style,
  ...props
}: TextProps): React.JSX.Element {
  return <Text style={[styles.bodySecondary, style]} {...props} />
}

export function Caption({ style, ...props }: TextProps): React.JSX.Element {
  return <Text style={[styles.caption, style]} {...props} />
}

export function Label({ style, ...props }: TextProps): React.JSX.Element {
  return <Text style={[styles.label, style]} {...props} />
}
