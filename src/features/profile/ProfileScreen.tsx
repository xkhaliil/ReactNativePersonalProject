import { StyleSheet } from "react-native"
import {
  ScreenLayout,
  ScreenTitle,
  Card,
  Label,
  Button,
  FormField,
  SettingsRow,
  colors,
  spacing,
} from "../../design-system"
import { useProfile } from "../../hooks"

export default function ProfileScreen() {
  const {
    draft,
    errors,
    isDirty,
    isValid,
    saving,
    bioHint,
    setField,
    save,
    reset,
    hapticsEnabled,
    compactHistory,
    showGenreHints,
    setHapticsEnabled,
    setCompactHistory,
    setShowGenreHints,
  } = useProfile()

  return (
    <ScreenLayout>
      <ScreenTitle style={styles.title}>👤 Profile</ScreenTitle>

      <Card variant="surface" style={styles.section}>
        <Label style={styles.sectionLabel}>About You</Label>

        <FormField
          label="Display Name"
          placeholder="e.g. Alex"
          value={draft.displayName}
          onChangeText={(v) => setField("displayName", v)}
          error={errors.displayName}
          hint="Shown as a greeting on the History tab"
          maxLength={30}
          autoCapitalize="words"
          returnKeyType="next"
        />

        <FormField
          label="Bio"
          placeholder="e.g. Music lover, coffee addict ☕"
          value={draft.bio}
          onChangeText={(v) => setField("bio", v)}
          error={errors.bio}
          hint={bioHint}
          maxLength={120}
          multiline
          numberOfLines={3}
          returnKeyType="next"
        />

        <FormField
          label="Favourite Genre"
          placeholder="e.g. Lo-Fi, Jazz, Metal…"
          value={draft.favouriteGenre}
          onChangeText={(v) => setField("favouriteGenre", v)}
          error={errors.favouriteGenre}
          hint="Shown as a hint on playlist suggestions"
          maxLength={40}
          returnKeyType="done"
        />

        {isDirty && (
          <Button
            label={saving ? "Saving…" : "💾 Save Profile"}
            onPress={save}
            variant="primary"
            disabled={!isValid || saving}
          />
        )}
        {isDirty && (
          <Button
            label="Discard Changes"
            onPress={reset}
            variant="ghost"
          />
        )}
      </Card>

      <Card variant="surface" style={styles.section}>
        <Label style={styles.sectionLabel}>Preferences</Label>

        <SettingsRow
          title="Haptic Feedback"
          description="Vibrate on mood scan"
          value={hapticsEnabled}
          onValueChange={setHapticsEnabled}
        />
        <SettingsRow
          title="Compact History"
          description="Show fewer details per entry"
          value={compactHistory}
          onValueChange={setCompactHistory}
        />
        <SettingsRow
          title="Genre Hints"
          description="Show your favourite genre on playlists"
          value={showGenreHints}
          onValueChange={setShowGenreHints}
        />
      </Card>
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
})
