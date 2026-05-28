/**
 * Color Primitives
 * Raw color values — do not use directly in components.
 * Use semantic tokens from `tokens.ts` instead.
 */

export const palette = {
  // Greens
  green500: "#1DB954",

  // Neutrals
  black: "#000000",
  neutral950: "#0D0D0D",
  neutral900: "#121212",
  neutral800: "#1E1E1E",
  neutral700: "#282828",
  neutral600: "#333333",
  neutral500: "#535353",
  neutral550: "#555555",
  neutral400: "#888888",
  neutral300: "#B3B3B3",
  neutral200: "#CCCCCC",
  neutral100: "#EEEEEE",
  white: "#FFFFFF",

  // Mood colors (used as data, not semantic tokens)
  yellow500: "#FFD700",
  blue500: "#4169E1",
  orange500: "#FF4500",
  cyan500: "#00CED1",
  pink500: "#FF69B4",
} as const
