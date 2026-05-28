/**
 * Border Radius Primitives
 */

export const radii = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const

/**
 * Border Width Primitives
 */

export const borderWidths = {
  thin: 1,
  base: 1.5,
  thick: 3,
  heavy: 4,
} as const

/**
 * Component Size Primitives
 * Named dimensions for specific UI elements.
 */

export const sizes = {
  viewfinder: 240,
  cornerIndicator: 24,
  trackNumber: 20,
  tabIconFocused: 22,
  tabIconDefault: 20,
} as const
