import type React from "react"
import { ScrollView, Text, View } from "react-native"

import { useProfile } from "#features/profile"
import {
  FormField,
  SettingsRow,
  Button,
  Skeleton,
  SkeletonItem,
  borderWidths,
  fontSizes,
  fontWeights,
  radii,
  spacing,
  useThemedStyles,
} from "#shared/ui"

export default function ProfileScreen(): React.JSX.Element {
  const styles = useThemedStyles(({ colors }) => ({
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
      padding: spacing.lg,
      shadowColor: colors.shadow.base,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 2,
    },
    saveRow: {
      gap: spacing.sm,
      marginTop: spacing.xs,
    },
  }))
  const {
    draft,
    errors,
    isDirty,
    isValid,
    saving,
    loading,
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

  if (loading) {
    return (
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.pageTitle}>Profile</Text>

        <View style={styles.group}>
          <Text style={styles.groupLabel}>About You</Text>
          <View style={styles.groupCard}>
            <Skeleton>
              <SkeletonItem>
                <SkeletonItem width={96} height={14} />
                <SkeletonItem
                  marginTop={10}
                  width="100%"
                  height={48}
                  borderRadius={16}
                />
              </SkeletonItem>

              <SkeletonItem marginTop={20}>
                <SkeletonItem width={52} height={14} />
                <SkeletonItem
                  marginTop={10}
                  width="100%"
                  height={96}
                  borderRadius={16}
                />
              </SkeletonItem>

              <SkeletonItem marginTop={20}>
                <SkeletonItem width={118} height={14} />
                <SkeletonItem
                  marginTop={10}
                  width="100%"
                  height={48}
                  borderRadius={16}
                />
              </SkeletonItem>

              <SkeletonItem
                marginTop={20}
                flexDirection="row"
                justifyContent="space-between"
              >
                <SkeletonItem width="58%" height={48} borderRadius={999} />
                <SkeletonItem width="36%" height={48} borderRadius={999} />
              </SkeletonItem>
            </Skeleton>
          </View>
        </View>

        <View style={styles.group}>
          <Text style={styles.groupLabel}>Preferences</Text>
          <View style={styles.groupCard}>
            <Skeleton>
              <SkeletonItem width="100%" height={62} />
              <SkeletonItem marginTop={12} width="100%" height={62} />
              <SkeletonItem marginTop={12} width="100%" height={62} />
            </Skeleton>
          </View>
        </View>
      </ScrollView>
    )
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.pageTitle}>Profile</Text>

      {/* About section */}
      <View style={styles.group}>
        <Text style={styles.groupLabel}>About You</Text>
        <View style={styles.groupCard}>
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
            placeholder="e.g. Music lover, coffee addict"
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
            placeholder="e.g. Lo-Fi, Jazz, Metal..."
            value={draft.favouriteGenre}
            onChangeText={(v) => setField("favouriteGenre", v)}
            error={errors.favouriteGenre}
            hint="Shown as a hint on playlist suggestions"
            maxLength={40}
            returnKeyType="done"
          />

          {isDirty && (
            <View style={styles.saveRow}>
              <Button
                label={saving ? "Saving..." : "Save Profile"}
                onPress={save}
                variant="primary"
                disabled={!isValid || saving}
              />
              <Button label="Discard" onPress={reset} variant="ghost" />
            </View>
          )}
        </View>
      </View>

      {/* Preferences section */}
      <View style={styles.group}>
        <Text style={styles.groupLabel}>Preferences</Text>
        <View style={styles.groupCard}>
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
        </View>
      </View>
    </ScrollView>
  )
}
