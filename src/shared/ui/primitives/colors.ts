/**
 * Color Primitives
 * Raw color values — do not use directly in components.
 * Use semantic tokens from `tokens.ts` instead.
 */

export const palette = {
  // Greens
  green400: "#1ED760",
  green500: "#1DB954",
  green700: "#148A41",

  // Neutrals — multi-layer dark system
  black: "#000000",
  neutral1000: "#080808",
  neutral950: "#0D0D0D",
  neutral900: "#111111",
  neutral850: "#161616",
  neutral800: "#1A1A1A",
  neutral750: "#1F1F1F",
  neutral700: "#252525",
  neutral650: "#2C2C2C",
  neutral600: "#333333",
  neutral550: "#3A3A3A",
  neutral500: "#484848",
  neutral450: "#585858",
  neutral400: "#727272",
  neutral300: "#A8A8A8",
  neutral200: "#D0D0D0",
  neutral100: "#F0F0F0",
  white: "#FFFFFF",

  // Semi-transparent overlays (for glass effects)
  white14: "rgba(255,255,255,0.14)",
  white10: "rgba(255,255,255,0.10)",
  white06: "rgba(255,255,255,0.06)",
  white03: "rgba(255,255,255,0.03)",
  black70: "rgba(0,0,0,0.70)",
  black85: "rgba(0,0,0,0.85)",

  // Mood colors (used as data, not semantic tokens)
  yellow500: "#FFD700",
  blue500: "#4169E1",
  orange500: "#FF4500",
  cyan500: "#00CED1",
  pink500: "#FF69B4",
} as const
