/**
 * Border Radius Primitives
 */

export const radii = {
  xs: 2,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  "2xl": 24,
  "3xl": 32,
  full: 9999,
} as const

/**
 * Border Width Primitives
 */

export const borderWidths = {
  thin: 0.5,
  base: 1,
  thick: 1.5,
  heavy: 3,
} as const

/**
 * Component Size Primitives
 * Named dimensions for specific UI elements.
 */

export const sizes = {
  viewfinder: 300,
  cornerIndicator: 20,
  trackNumber: 28,
  tabIconFocused: 22,
  tabIconDefault: 20,
  buttonHeight: 54,
  buttonHeightSm: 40,
  tabBarHeight: 70,
} as const
