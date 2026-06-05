import type React from "react"
import { Linking, Pressable, Text, View } from "react-native"

import {
  borderWidths,
  fontSizes,
  fontWeights,
  radii,
  spacing,
  useAppTheme,
  useThemedStyles,
} from "#shared/ui"

type PlaylistCardProps = {
  title: string
  genre: string
  moodColor?: string
  spotifyUrl?: string
}

export default function PlaylistCard({
  title,
  genre,
  moodColor,
  spotifyUrl,
}: PlaylistCardProps): React.JSX.Element {
  const { colors } = useAppTheme()
  const styles = useThemedStyles(({ colors: themeColors }) => ({
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: themeColors.bg.surface,
      borderRadius: radii.xl,
      borderWidth: borderWidths.thin,
      borderColor: themeColors.border.subtle,
      padding: spacing.md,
      gap: spacing.md,
      shadowColor: themeColors.shadow.base,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 3,
    },
    artBox: {
      width: 56,
      height: 56,
      borderRadius: radii.md,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      position: "relative",
    },
    artIcon: {
      fontSize: 24,
    },
    artAccentBar: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 3,
    },
    info: {
      flex: 1,
      gap: spacing["2xs"],
    },
    genre: {
      color: themeColors.text.muted,
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.semibold,
      textTransform: "uppercase",
      letterSpacing: 0.8,
    },
    title: {
      color: themeColors.text.primary,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.bold,
    },
    spotifyBadge: {
      marginTop: spacing["2xs"],
      alignSelf: "flex-start",
    },
    spotifyBadgePressed: {
      opacity: 0.6,
    },
    spotifyBadgeText: {
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.bold,
      letterSpacing: 0.3,
    },
    chevron: {
      fontSize: 28,
      fontWeight: fontWeights.bold,
      lineHeight: 28,
      marginRight: spacing.xs,
    },
  }))
  const accentColor = moodColor ?? colors.accent.default

  return (
    <View style={styles.card}>
      {/* Album art placeholder */}
      <View style={[styles.artBox, { backgroundColor: `${accentColor}28` }]}>
        <Text style={styles.artIcon}>M</Text>
        <View style={[styles.artAccentBar, { backgroundColor: accentColor }]} />
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.genre}>{genre}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {spotifyUrl !== undefined && (
          <Pressable
            onPress={() => void Linking.openURL(spotifyUrl)}
            style={({ pressed }) => [
              styles.spotifyBadge,
              pressed && styles.spotifyBadgePressed,
            ]}
          >
            <Text style={[styles.spotifyBadgeText, { color: accentColor }]}>
              {"> Open in Spotify"}
            </Text>
          </Pressable>
        )}
      </View>

      {/* Chevron */}
      <Text style={[styles.chevron, { color: accentColor }]}>{">"}</Text>
    </View>
  )
}
