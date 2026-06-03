import type React from "react"
import { StyleSheet, View } from "react-native"

import {
  Card,
  CardTitle,
  BodySecondary,
  Button,
  spacing,
} from "../../design-system"

type PlaylistCardProps = {
  title: string
  genre: string
}

export default function PlaylistCard({
  title,
  genre,
}: PlaylistCardProps): React.JSX.Element {
  return (
    <Card variant="surfaceAlt" style={styles.card}>
      <View style={styles.info}>
        <CardTitle>🎵 {title}</CardTitle>
        <BodySecondary style={styles.genre}>{genre}</BodySecondary>
      </View>
      <Button
        label="▶ Play on Spotify"
        onPress={() => undefined}
        variant="primary"
        disabled
      />
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginVertical: spacing.xs,
    width: "100%",
  },
  info: {
    marginBottom: spacing.md,
  },
  genre: {
    marginTop: spacing.xs,
  },
})
