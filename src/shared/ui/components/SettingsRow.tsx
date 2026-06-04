/**
 * SettingsRow
 * Reusability: MEDIUM — a labeled toggle row pattern reused inside every
 * settings section. Generic enough to be used anywhere a title/description
 * + switch control is needed.
 */

import type React from "react"
import { StyleSheet, Switch, View } from "react-native"

import { borderWidths, colors, fontWeights, spacing } from "../tokens"

import { Body, Caption } from "./Typography"

type SettingsRowProps = {
  title: string
  description: string
  value: boolean
  onValueChange: (value: boolean) => void
}

export function SettingsRow({
  title,
  description,
  value,
  onValueChange,
}: SettingsRowProps): React.JSX.Element {
  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Body style={styles.title}>{title}</Body>
        <Caption style={styles.desc}>{description}</Caption>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: colors.switch.trackOff,
          true: colors.switch.trackOn,
        }}
        thumbColor={colors.switch.thumb}
        ios_backgroundColor={colors.switch.trackOff}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    borderBottomWidth: borderWidths.thin,
    borderBottomColor: colors.border.divider,
  },
  info: {
    flex: 1,
    marginRight: spacing.lg,
  },
  title: {
    fontWeight: fontWeights.semibold,
    color: colors.text.primary,
  },
  desc: {
    marginTop: spacing["2xs"],
    color: colors.text.muted,
  },
})
