import { create } from "zustand";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";

interface AudioState {
  backgroundMusic: Audio.Sound | null;
  hitSound: Audio.Sound | null;
  successSound: Audio.Sound | null;
  isMuted: boolean;
  isInitialized: boolean;
  
  // Control functions
  initializeAudio: () => Promise<void>;
  toggleMute: () => void;
  playHit: () => void;
  playSuccess: () => void;
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
}

export const useAudio = create<AudioState>((set, get) => ({
  backgroundMusic: null,
  hitSound: null,
  successSound: null,
  isMuted: false,
  isInitialized: false,

  initializeAudio: async () => {
    try {
      const { sound: bgMusic } = await Audio.Sound.createAsync(
        require('../../assets/sounds/background.mp3'),
        { shouldPlay: false, isLooping: true, volume: 0.3 }
      );

      const { sound: hitAudio } = await Audio.Sound.createAsync(
        require('../../assets/sounds/hit.mp3'),
        { shouldPlay: false, volume: 0.5 }
      );

      const { sound: successAudio } = await Audio.Sound.createAsync(
        require('../../assets/sounds/success.mp3'),
        { shouldPlay: false, volume: 0.7 }
      );

      set({
        backgroundMusic: bgMusic,
        hitSound: hitAudio,
        successSound: successAudio,
        isInitialized: true,
      });
    } catch (error) {
      console.log('Audio initialization failed:', error);
      set({ isInitialized: true }); // Still mark as initialized to prevent retries
    }
  },

  toggleMute: () => {
    const { isMuted, backgroundMusic } = get();
    set({ isMuted: !isMuted });
    
    if (backgroundMusic) {
      if (isMuted) {
        backgroundMusic.setVolumeAsync(0.3);
      } else {
        backgroundMusic.setVolumeAsync(0);
      }
    }
  },

  playHit: () => {
    const { hitSound, isMuted } = get();
    if (!isMuted && hitSound) {
      hitSound.replayAsync();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  },

  playSuccess: () => {
    const { successSound, isMuted } = get();
    if (!isMuted && successSound) {
      successSound.replayAsync();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  },

  playBackgroundMusic: () => {
    const { backgroundMusic, isMuted } = get();
    if (!isMuted && backgroundMusic) {
      backgroundMusic.playAsync();
    }
  },

  stopBackgroundMusic: () => {
    const { backgroundMusic } = get();
    if (backgroundMusic) {
      backgroundMusic.pauseAsync();
    }
  },
}));