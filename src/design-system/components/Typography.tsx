/**
 * Typography Components
 * Reusability: HIGH — text variants used across every screen.
 *
 * These are thin wrappers that apply design tokens so individual
 * components never hard-code font sizes or colors.
 */

import type React from "react"
import { Text, type TextProps } from "react-native"

import { typography } from "../tokens"

export function ScreenTitle({ style, ...props }: TextProps): React.JSX.Element {
  return <Text style={[typography.screenTitle, style]} {...props} />
}

export function SectionTitle({
  style,
  ...props
}: TextProps): React.JSX.Element {
  return <Text style={[typography.sectionTitle, style]} {...props} />
}

export function CardTitle({ style, ...props }: TextProps): React.JSX.Element {
  return <Text style={[typography.cardTitle, style]} {...props} />
}

export function Body({ style, ...props }: TextProps): React.JSX.Element {
  return <Text style={[typography.body, style]} {...props} />
}

export function BodySecondary({
  style,
  ...props
}: TextProps): React.JSX.Element {
  return <Text style={[typography.bodySecondary, style]} {...props} />
}

export function Caption({ style, ...props }: TextProps): React.JSX.Element {
  return <Text style={[typography.caption, style]} {...props} />
}

export function Label({ style, ...props }: TextProps): React.JSX.Element {
  return <Text style={[typography.label, style]} {...props} />
}
