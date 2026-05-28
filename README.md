# 🎧 Mood Playlist

A React Native (Expo) app that reads your mood and curates a Spotify playlist to match your vibe. Point your camera at your face, let the app detect your emotion, and instantly get a playlist that fits.

Built with **Expo SDK 54**, **React Native 0.81**, and **TypeScript**.

---

## 🚀 Getting Started

```bash
npm install
npm start
```

Then scan the QR code with Expo Go or run on an emulator.

---

## 📁 Project Structure

```
src/
  App.tsx               # Root component — SafeAreaView wrapper
  screens/
    HomeScreen.tsx      # Main screen — mood state + playlist logic
  components/
    MoodCamera.tsx      # Fake camera viewfinder + scan button
    MoodCard.tsx        # Mood emoji + label display
    PlaylistCard.tsx    # Playlist info + Play on Spotify button
```

---

## ✅ Current Features (UI Shell)

- Fake camera viewfinder with scan-corner overlays
- Mood cycling through 5 emotions: Happy 😊, Sad 😢, Angry 😤, Chill 😎, Hype 🔥
- Mood card with emoji, label, and accent color per mood
- Playlist card showing matched title and genre
- `useEffect` logging mood changes to console
- Dark Spotify-inspired theme throughout

---

## 💡 Potential Features to Add Later

- **Real camera mood detection** — Integrate `expo-camera` + a face emotion ML model (e.g. TensorFlow.js `face-landmarks-detection` or a custom API)
- **Spotify OAuth** — Authenticate users via `expo-auth-session` + Spotify Authorization Code Flow
- **Live playlist search** — Query Spotify's `/recommendations` endpoint based on detected mood (valence, energy, tempo)
- **Mood history** — Store past mood scans with timestamps using `expo-sqlite` or AsyncStorage
- **Animated scan effect** — Pulsing ring animation on the camera viewfinder while "scanning"
- **Haptic feedback** — Use `expo-haptics` to buzz on mood detection
- **Playlist preview** — Embed Spotify's 30-second track previews with `expo-av`
- **Share your vibe** — Screenshot the mood card and share via `expo-sharing`
- **Dark / Light theme toggle** — Use React Context + `useColorScheme` for theming
- **Multiple moods per scan** — Show a confidence breakdown (e.g. 70% Happy, 30% Chill)
- **Onboarding flow** — First-launch walkthrough with `react-native-reanimated` transitions
