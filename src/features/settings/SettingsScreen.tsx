import type React from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

import {
  SettingsRow,
  borderWidths,
  colors,
  fontSizes,
  fontWeights,
  radii,
  spacing,
} from "../../design-system"
import { useSettings } from "../../hooks"
import { useSpotifyAuth } from "../spotify"

export default function SettingsScreen(): React.JSX.Element {
  const { settings, setSetting } = useSettings()
  const { isConnected, isLoading, connect, disconnect } = useSpotifyAuth()

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>Settings</Text>

      {/* Spotify */}
      <View style={styles.group}>
        <Text style={styles.groupLabel}>Spotify</Text>
        <View style={styles.groupCard}>
          <View style={styles.spotifyRow}>
            <View style={styles.spotifyIconBox}>
              <Text style={styles.spotifyIcon}>🎵</Text>
            </View>
            <View style={styles.spotifyInfo}>
              <Text style={styles.spotifyStatus}>
                {isConnected ? "Connected" : "Not Connected"}
              </Text>
              <Text style={styles.spotifyDesc}>
                {isConnected
                  ? "Real recommendations enabled"
                  : "Connect for personalised tracks"}
              </Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.spotifyBtn,
                isConnected
                  ? styles.spotifyBtnDisconnect
                  : styles.spotifyBtnConnect,
                pressed && styles.spotifyBtnPressed,
                isLoading && styles.spotifyBtnLoading,
              ]}
              onPress={isConnected ? () => void disconnect() : connect}
              disabled={isLoading}
            >
              <Text
                style={[
                  styles.spotifyBtnText,
                  isConnected && styles.spotifyBtnTextDisconnect,
                ]}
              >
                {isLoading ? "…" : isConnected ? "Disconnect" : "Connect"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Mood Detection */}
      <View style={styles.group}>
        <Text style={styles.groupLabel}>Mood Detection</Text>
        <View style={styles.groupCard}>
          <SettingsRow
            title="Camera Mood Scan"
            description="Use camera to detect your mood"
            value={settings.cameraEnabled}
            onValueChange={(v) => void setSetting("cameraEnabled", v)}
          />
        </View>
      </View>

      {/* Playback */}
      <View style={styles.group}>
        <Text style={styles.groupLabel}>Playback</Text>
        <View style={styles.groupCard}>
          <SettingsRow
            title="Auto-play on mood select"
            description="Automatically open Spotify playlist"
            value={settings.autoPlay}
            onValueChange={(v) => void setSetting("autoPlay", v)}
          />
        </View>
      </View>

      {/* General */}
      <View style={styles.group}>
        <Text style={styles.groupLabel}>General</Text>
        <View style={styles.groupCard}>
          <SettingsRow
            title="Daily Mood Reminder"
            description="Get a nudge to check your mood"
            value={settings.notifications}
            onValueChange={(v) => void setSetting("notifications", v)}
          />
        </View>
      </View>

      <Text style={styles.version}>SpotifyMood v1.0.0</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg.screen,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing["6xl"],
    gap: spacing.sm,
  },
  pageTitle: {
    fontSize: fontSizes["4xl"],
    fontWeight: fontWeights.bold,
    color: colors.text.primary,
    letterSpacing: -0.5,
    marginBottom: spacing.lg,
  },
  group: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  groupLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    color: colors.text.muted,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginLeft: spacing.xs,
  },
  groupCard: {
    backgroundColor: colors.bg.surface,
    borderRadius: radii.xl,
    borderWidth: borderWidths.thin,
    borderColor: colors.border.subtle,
    paddingHorizontal: spacing.lg,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  // Spotify row
  spotifyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  spotifyIconBox: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.bg.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  spotifyIcon: {
    fontSize: fontSizes.xl,
  },
  spotifyInfo: {
    flex: 1,
    gap: spacing["2xs"],
  },
  spotifyStatus: {
    color: colors.text.primary,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
  },
  spotifyDesc: {
    color: colors.text.muted,
    fontSize: fontSizes.xs,
    lineHeight: 18,
  },
  spotifyBtn: {
    borderRadius: radii.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    minWidth: 80,
    alignItems: "center",
  },
  spotifyBtnConnect: {
    backgroundColor: colors.accent.default,
  },
  spotifyBtnDisconnect: {
    backgroundColor: colors.bg.surfaceAlt,
    borderWidth: borderWidths.base,
    borderColor: colors.border.default,
  },
  spotifyBtnLoading: {
    opacity: 0.5,
  },
  spotifyBtnPressed: {
    opacity: 0.75,
  },
  spotifyBtnText: {
    color: colors.accent.on,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.bold,
  },
  spotifyBtnTextDisconnect: {
    color: colors.text.secondary,
  },
  version: {
    textAlign: "center",
    color: colors.text.faint,
    fontSize: fontSizes.xs,
    marginTop: spacing.lg,
  },
})
