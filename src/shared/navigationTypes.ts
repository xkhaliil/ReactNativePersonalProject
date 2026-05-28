export type RootStackParamList = {
  Main: undefined
  Settings: undefined
}

export type MainTabParamList = {
  HomeTab: undefined
  History: undefined
  Profile: undefined
}

export type HomeStackParamList = {
  Home: undefined
  PlaylistDetail: {
    mood: string
    emoji: string
    color: string
    playlistTitle: string
    genre: string
  }
}
