import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

interface TouchControlsProps {
  onMove: (deltaX: number, deltaY: number) => void;
  onRotate: () => void;
  onDrop: () => void;
  onHardDrop: () => void;
}

const { width: screenWidth } = Dimensions.get('window');

export default function TouchControls({ onMove, onRotate, onDrop, onHardDrop }: TouchControlsProps) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.controlsContainer}>
        {/* Left Controls - Movement */}
        <View style={styles.leftControls}>
          <View style={styles.dPad}>
            {/* Up button - not used in Tetris but kept for symmetry */}
            <View style={styles.dPadRow}>
              <TouchableOpacity
                style={[styles.dPadButton, styles.dPadButtonInactive]}
                disabled
              >
                <Text style={styles.buttonTextInactive}>▲</Text>
              </TouchableOpacity>
            </View>
            
            {/* Middle row - Left and Right */}
            <View style={styles.dPadRow}>
              <TouchableOpacity
                style={styles.dPadButton}
                onPress={() => onMove(-1, 0)}
                delayPressIn={0}
              >
                <Text style={styles.buttonText}>◀</Text>
              </TouchableOpacity>
              
              <View style={styles.dPadCenter} />
              
              <TouchableOpacity
                style={styles.dPadButton}
                onPress={() => onMove(1, 0)}
                delayPressIn={0}
              >
                <Text style={styles.buttonText}>▶</Text>
              </TouchableOpacity>
            </View>
            
            {/* Down button */}
            <View style={styles.dPadRow}>
              <TouchableOpacity
                style={styles.dPadButton}
                onPress={() => onMove(0, 1)}
                delayPressIn={0}
              >
                <Text style={styles.buttonText}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Right Controls - Actions */}
        <View style={styles.rightControls}>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.rotateButton]}
              onPress={onRotate}
              delayPressIn={0}
            >
              <Text style={styles.actionButtonText}>↻</Text>
              <Text style={styles.actionButtonLabel}>Rotate</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.dropButton]}
              onPress={onHardDrop}
              delayPressIn={0}
            >
              <Text style={styles.actionButtonText}>⇩</Text>
              <Text style={styles.actionButtonLabel}>Drop</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    height: 140,
  },
  leftControls: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightControls: {
    flex: 1,
    alignItems: 'flex-end',
  },
  dPad: {
    width: 120,
    height: 120,
  },
  dPadRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  dPadButton: {
    width: 40,
    height: 40,
    backgroundColor: '#0066cc',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  dPadButtonInactive: {
    backgroundColor: '#333',
  },
  dPadCenter: {
    width: 40,
    height: 40,
    margin: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  buttonTextInactive: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'column',
    gap: 15,
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotateButton: {
    backgroundColor: '#00cc66',
  },
  dropButton: {
    backgroundColor: '#ff6600',
  },
  actionButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  actionButtonLabel: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});