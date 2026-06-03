/**
 * Typography Primitives
 * Raw font size and weight values.
 */

export const fontSizes = {
  xs: 12,
  sm: 13,
  md: 14,
  base: 15,
  lg: 18,
  xl: 20,
  "2xl": 26,
  "3xl": 28,
  "4xl": 32,
  "5xl": 64,
  "6xl": 72,
  // Emoji-specific sizes
  emojiSm: 36,
  emojiMd: 56,
  emojiLg: 64,
  emojiXl: 72,
} as const

export const fontWeights = {
  regular: "400" as const,
  semibold: "600" as const,
  bold: "700" as const,
}

export const letterSpacings = {
  tight: 0,
  normal: 1.5,
  wide: 2,
  wider: 4,
} as const
