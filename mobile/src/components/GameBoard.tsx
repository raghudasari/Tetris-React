import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Board, Piece } from '../lib/tetris/types';
import { TETROMINO_COLORS } from '../lib/tetris/tetrominoes';

interface GameBoardProps {
  board: Board;
  currentPiece: Piece | null;
}

const { width: screenWidth } = Dimensions.get('window');
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = Math.min((screenWidth - 120) / BOARD_WIDTH, 20);

export default function GameBoard({ board, currentPiece }: GameBoardProps) {
  const renderCell = (cellValue: number, row: number, col: number) => {
    let finalValue = cellValue;
    
    // Check if current piece occupies this cell
    if (currentPiece) {
      const pieceX = currentPiece.x;
      const pieceY = currentPiece.y;
      
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x] !== 0) {
            const boardX = pieceX + x;
            const boardY = pieceY + y;
            
            if (boardX === col && boardY === row) {
              finalValue = currentPiece.type;
              break;
            }
          }
        }
      }
    }
    
    return (
      <View
        key={`${row}-${col}`}
        style={[
          styles.cell,
          {
            backgroundColor: TETROMINO_COLORS[finalValue],
            borderColor: finalValue === 0 ? '#333' : '#666',
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    width: BOARD_WIDTH * CELL_SIZE,
    height: BOARD_HEIGHT * CELL_SIZE,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#444',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 0.5,
  },
});