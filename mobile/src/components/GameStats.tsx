import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Piece } from '../lib/tetris/types';
import { TETROMINO_COLORS } from '../lib/tetris/tetrominoes';

interface GameStatsProps {
  score: number;
  level: number;
  lines: number;
  nextPiece: Piece | null;
}

export default function GameStats({ score, level, lines, nextPiece }: GameStatsProps) {
  const renderNextPiece = () => {
    if (!nextPiece) return null;

    const PREVIEW_CELL_SIZE = 12;
    
    return (
      <View style={styles.nextPieceContainer}>
        {nextPiece.shape.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.nextPieceRow}>
            {row.map((cell, colIndex) => (
              <View
                key={colIndex}
                style={[
                  styles.nextPieceCell,
                  {
                    width: PREVIEW_CELL_SIZE,
                    height: PREVIEW_CELL_SIZE,
                    backgroundColor: cell !== 0 ? TETROMINO_COLORS[nextPiece.type] : 'transparent',
                  },
                ]}
              />
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Next Piece */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next</Text>
        <View style={styles.nextPieceBox}>
          {renderNextPiece()}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stats</Text>
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Score</Text>
          <Text style={styles.statValue}>{score.toLocaleString()}</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Level</Text>
          <Text style={[styles.statValue, styles.levelValue]}>{level}</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Lines</Text>
          <Text style={[styles.statValue, styles.linesValue]}>{lines}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    gap: 15,
  },
  section: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  nextPieceBox: {
    backgroundColor: '#000',
    borderRadius: 4,
    padding: 8,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextPieceContainer: {
    alignItems: 'center',
  },
  nextPieceRow: {
    flexDirection: 'row',
  },
  nextPieceCell: {
    borderWidth: 0.5,
    borderColor: '#333',
  },
  statItem: {
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 10,
    color: '#cccccc',
    textAlign: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 2,
  },
  levelValue: {
    color: '#ffcc00',
  },
  linesValue: {
    color: '#00ccff',
  },
});