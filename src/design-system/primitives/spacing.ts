/**
 * Spacing Primitives
 * A fixed scale — use these values everywhere instead of raw numbers.
 */

export const spacing = {
  none: 0,
  "2xs": 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 28,
  "4xl": 36,
  "5xl": 40,
  "6xl": 48,
} as const

export type SpacingKey = keyof typeof spacing
