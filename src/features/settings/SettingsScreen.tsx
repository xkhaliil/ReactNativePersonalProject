import type React from "react"
import { StyleSheet } from "react-native"

import {
  ScreenLayout,
  ScreenTitle,
  Card,
  Label,
  Caption,
  SettingsRow,
  colors,
  spacing,
} from "../../design-system"
import { useSettings } from "../../hooks"

export default function SettingsScreen(): React.JSX.Element {
  const { settings, setSetting } = useSettings()

  return (
    <ScreenLayout>
      <ScreenTitle style={styles.title}>⚙️ Settings</ScreenTitle>

      <Card variant="surface" style={styles.section}>
        <Label style={styles.sectionLabel}>Mood Detection</Label>
        <SettingsRow
          title="Camera Mood Scan"
          description="Use camera to detect your mood"
          value={settings.cameraEnabled}
          onValueChange={(v) => void setSetting("cameraEnabled", v)}
        />
      </Card>

      <Card variant="surface" style={styles.section}>
        <Label style={styles.sectionLabel}>Playback</Label>
        <SettingsRow
          title="Auto-play on mood select"
          description="Automatically open Spotify playlist"
          value={settings.autoPlay}
          onValueChange={(v) => void setSetting("autoPlay", v)}
        />
      </Card>

      <Card variant="surface" style={styles.section}>
        <Label style={styles.sectionLabel}>General</Label>
        <SettingsRow
          title="Daily Mood Reminder"
          description="Get a nudge to check your mood"
          value={settings.notifications}
          onValueChange={(v) => void setSetting("notifications", v)}
        />
      </Card>

      <Caption style={styles.version}>SpotifyMood v1.0.0</Caption>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing["2xl"],
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    color: colors.accent.default,
    marginBottom: spacing.md,
  },
  version: {
    textAlign: "center",
    color: colors.text.faint,
    marginTop: spacing.sm,
  },
})
