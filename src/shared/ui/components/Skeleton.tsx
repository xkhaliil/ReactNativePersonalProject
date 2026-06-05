import type React from "react"

import SkeletonPlaceholder from "react-native-skeleton-placeholder"

import { useAppTheme } from "../theme"

type SkeletonProps = React.ComponentProps<typeof SkeletonPlaceholder>

export function Skeleton({
  backgroundColor,
  highlightColor,
  borderRadius = 8,
  speed = 1100,
  children,
  ...props
}: SkeletonProps): React.JSX.Element {
  const { colors, scheme } = useAppTheme()

  const resolvedBackgroundColor =
    backgroundColor ??
    (scheme === "dark" ? colors.bg.surfaceAlt : colors.bg.surfaceElevated)
  const resolvedHighlightColor =
    highlightColor ??
    (scheme === "dark" ? colors.bg.surfaceElevated : colors.bg.surface)

  return (
    <SkeletonPlaceholder
      backgroundColor={resolvedBackgroundColor}
      highlightColor={resolvedHighlightColor}
      borderRadius={borderRadius}
      speed={speed}
      {...props}
    >
      {children}
    </SkeletonPlaceholder>
  )
}

export const SkeletonItem = SkeletonPlaceholder.Item
