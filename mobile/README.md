# Tetris Mobile - iOS & Android

A native mobile version of the classic Tetris game built with React Native and Expo.

## Features

- 🎮 Classic Tetris gameplay with all 7 tetromino pieces
- 📱 Touch-optimized controls for mobile devices
- 🔊 Sound effects and background music
- 📳 Haptic feedback for better gaming experience
- 🎯 Score tracking with levels and line counting
- ⏸️ Pause and resume functionality
- 🌙 Mobile-optimized UI with dark theme

## Setup Instructions

### Prerequisites

1. Install Node.js (version 16 or higher)
2. Install Expo CLI: `npm install -g @expo/cli`
3. Install EAS CLI: `npm install -g eas-cli`

### Development Setup

1. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on your device:
   - Install Expo Go app on your iOS/Android device
   - Scan the QR code shown in the terminal
   - Or press 'i' for iOS simulator, 'a' for Android emulator

### Building for Production

#### Setup EAS Build

1. Create an Expo account at https://expo.dev
2. Login to EAS:
   ```bash
   eas login
   ```

3. Configure your project:
   ```bash
   eas build:configure
   ```

#### Build APK for Android

```bash
eas build --platform android --profile preview
```

#### Build for iOS

```bash
eas build --platform ios --profile preview
```

#### Submit to App Stores

For Google Play Store:
```bash
eas submit --platform android
```

For Apple App Store:
```bash
eas submit --platform ios
```

## Game Controls

### Touch Controls
- **Left/Right arrows**: Move piece horizontally
- **Down arrow**: Soft drop (move piece down faster)
- **Rotate button**: Rotate piece clockwise
- **Drop button**: Hard drop (instantly drop to bottom)

### Game Features
- **Pause**: Tap pause button in header
- **Mute/Unmute**: Tap sound button in header
- **New Game**: Available when game ends

## Technical Details

### Architecture
- **Game Logic**: Shared tetris engine with collision detection and line clearing
- **State Management**: Zustand for game state and audio management
- **Audio**: Expo AV with haptic feedback
- **Rendering**: React Native Views with optimized game board rendering

### Performance
- 60 FPS game loop for smooth gameplay
- Optimized touch controls with minimal input delay
- Efficient board rendering with minimal re-renders

## Publishing Guide

### Android (Google Play Store)

1. **Prepare App**:
   - Update `app.json` with your app details
   - Update package name in `android.package`
   - Add app icon and splash screen

2. **Build Release**:
   ```bash
   eas build --platform android --profile production
   ```

3. **Submit**:
   ```bash
   eas submit --platform android
   ```

### iOS (Apple App Store)

1. **Apple Developer Account**: Required ($99/year)

2. **Prepare App**:
   - Update `app.json` with your app details
   - Update bundle identifier in `ios.bundleIdentifier`
   - Add app icon and splash screen

3. **Build Release**:
   ```bash
   eas build --platform ios --profile production
   ```

4. **Submit**:
   ```bash
   eas submit --platform ios
   ```

## Assets Required

Add these files to `/assets/` directory:
- `icon.png` (1024x1024) - App icon
- `splash.png` (1284x2778) - Splash screen
- `adaptive-icon.png` (1024x1024) - Android adaptive icon
- `favicon.png` (48x48) - Web favicon

Add sound files to `/assets/sounds/`:
- `background.mp3` - Background music
- `hit.mp3` - Move/rotate sound effect
- `success.mp3` - Line clear sound effect

## Customization

### Game Settings
Modify game parameters in `src/lib/tetris/gameLogic.ts`:
- Board dimensions
- Drop speed progression
- Scoring system

### Visual Theme
Update colors and styles in component StyleSheet objects:
- Tetromino colors in `src/lib/tetris/tetrominoes.ts`
- UI colors in component style files

### Audio
Replace sound files in `/assets/sounds/` with your own audio files.

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **Build failures**: Check EAS build logs at https://expo.dev
3. **Audio not working**: Ensure audio files are in correct format (MP3 recommended)
4. **Touch controls unresponsive**: Check device performance and reduce game complexity

### Support

- Expo Documentation: https://docs.expo.dev
- React Native Documentation: https://reactnative.dev
- EAS Build Documentation: https://docs.expo.dev/build/introduction/