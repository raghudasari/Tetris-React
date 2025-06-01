import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeepAwake } from 'expo-keep-awake';
import TetrisGame from './src/components/TetrisGame';
import { useAudio } from './src/stores/useAudio';

export default function App() {
  const { initializeAudio } = useAudio();

  useEffect(() => {
    initializeAudio();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <KeepAwake />
      <View style={styles.container}>
        <TetrisGame />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
});