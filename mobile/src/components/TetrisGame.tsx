import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameBoard from './GameBoard';
import GameStats from './GameStats';
import TouchControls from './TouchControls';
import { useTetris } from '../stores/useTetris';
import { useAudio } from '../stores/useAudio';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function TetrisGame() {
  const {
    board,
    currentPiece,
    nextPiece,
    score,
    level,
    lines,
    gamePhase,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    movePiece,
    rotatePiece,
    dropPiece,
    hardDrop,
    _updateGameTime,
  } = useTetris();

  const {
    playHit,
    playSuccess,
    toggleMute,
    isMuted,
    playBackgroundMusic,
    stopBackgroundMusic,
    isInitialized,
  } = useAudio();

  const gameLoopRef = useRef<NodeJS.Timeout>();

  // Game loop for mobile
  useEffect(() => {
    if (gamePhase === 'playing') {
      gameLoopRef.current = setInterval(() => {
        _updateGameTime();
      }, 16); // 60fps
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gamePhase, _updateGameTime]);

  // Handle background music
  useEffect(() => {
    if (isInitialized) {
      if (gamePhase === 'playing' && !isMuted) {
        playBackgroundMusic();
      } else {
        stopBackgroundMusic();
      }
    }
  }, [gamePhase, isMuted, isInitialized, playBackgroundMusic, stopBackgroundMusic]);

  const handleMovePiece = (deltaX: number, deltaY: number) => {
    movePiece(deltaX, deltaY);
    if (deltaX !== 0) playHit();
  };

  const handleRotatePiece = () => {
    rotatePiece();
    playHit();
  };

  const handleDropPiece = () => {
    dropPiece();
  };

  const handleHardDrop = () => {
    hardDrop();
    playSuccess();
  };

  const renderGameOverlay = () => {
    if (gamePhase === 'ready') {
      return (
        <View style={styles.overlay}>
          <Text style={styles.overlayTitle}>TETRIS</Text>
          <Text style={styles.overlaySubtitle}>Ready to play?</Text>
          <TouchableOpacity style={styles.button} onPress={startGame}>
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (gamePhase === 'ended') {
      return (
        <View style={styles.overlay}>
          <Text style={styles.overlayTitle}>Game Over!</Text>
          <Text style={styles.overlaySubtitle}>Final Score: {score.toLocaleString()}</Text>
          <TouchableOpacity style={[styles.button, styles.buttonGreen]} onPress={resetGame}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (gamePhase === 'paused') {
      return (
        <View style={styles.overlay}>
          <Text style={styles.overlayTitle}>Game Paused</Text>
          <TouchableOpacity style={[styles.button, styles.buttonYellow]} onPress={resumeGame}>
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>TETRIS</Text>
        <View style={styles.headerButtons}>
          {gamePhase === 'playing' && (
            <TouchableOpacity style={styles.headerButton} onPress={pauseGame}>
              <Text style={styles.headerButtonText}>⏸</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.headerButton} onPress={toggleMute}>
            <Text style={styles.headerButtonText}>{isMuted ? '🔇' : '🔊'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Game Area */}
      <View style={styles.gameArea}>
        {/* Stats Panel */}
        <GameStats score={score} level={level} lines={lines} nextPiece={nextPiece} />
        
        {/* Game Board */}
        <View style={styles.boardContainer}>
          <GameBoard board={board} currentPiece={currentPiece} />
          {renderGameOverlay()}
        </View>
      </View>

      {/* Touch Controls */}
      {gamePhase === 'playing' && (
        <TouchControls
          onMove={handleMovePiece}
          onRotate={handleRotatePiece}
          onDrop={handleDropPiece}
          onHardDrop={handleHardDrop}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#16213e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0f4c75',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 16,
    color: '#ffffff',
  },
  gameArea: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  boardContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  overlayTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  overlaySubtitle: {
    fontSize: 18,
    color: '#cccccc',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonGreen: {
    backgroundColor: '#00cc66',
  },
  buttonYellow: {
    backgroundColor: '#ffcc00',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});