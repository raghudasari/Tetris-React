import { Board, Piece, TetrominoType } from "./types";
import { TETROMINOES, getRandomTetromino } from "./tetrominoes";

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export function createEmptyBoard(): Board {
  return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0));
}

export function createPiece(type: TetrominoType): Piece {
  return {
    type,
    shape: TETROMINOES[type][0],
    x: Math.floor(BOARD_WIDTH / 2) - 2,
    y: 0,
  };
}

export function createRandomPiece(): Piece {
  return createPiece(getRandomTetromino());
}

export function isValidPosition(board: Board, piece: Piece, offsetX = 0, offsetY = 0): boolean {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0) {
        const newX = piece.x + x + offsetX;
        const newY = piece.y + y + offsetY;

        // Check boundaries
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return false;
        }

        // Check collision with existing pieces (but allow pieces above the board)
        if (newY >= 0 && board[newY][newX] !== 0) {
          return false;
        }
      }
    }
  }
  return true;
}

export function rotatePiece(piece: Piece): Piece {
  const currentRotation = TETROMINOES[piece.type].findIndex(
    (rotation) => JSON.stringify(rotation) === JSON.stringify(piece.shape)
  );
  const nextRotation = (currentRotation + 1) % TETROMINOES[piece.type].length;
  
  return {
    ...piece,
    shape: TETROMINOES[piece.type][nextRotation],
  };
}

export function placePiece(board: Board, piece: Piece): Board {
  const newBoard = board.map(row => [...row]);
  
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0) {
        const boardY = piece.y + y;
        const boardX = piece.x + x;
        
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = piece.type;
        }
      }
    }
  }
  
  return newBoard;
}

export function clearLines(board: Board): { board: Board; linesCleared: number } {
  const newBoard = [];
  let linesCleared = 0;
  
  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (board[y].every(cell => cell !== 0)) {
      linesCleared++;
    } else {
      newBoard.unshift([...board[y]]);
    }
  }
  
  // Add empty lines at the top
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(0));
  }
  
  return { board: newBoard, linesCleared };
}

export function calculateScore(linesCleared: number, level: number): number {
  const baseScores = [0, 100, 300, 500, 800]; // Points for 0, 1, 2, 3, 4 lines
  return baseScores[linesCleared] * (level + 1);
}

export function calculateLevel(totalLines: number): number {
  return Math.floor(totalLines / 10);
}

export function calculateDropTime(level: number): number {
  return Math.max(50, 1000 - level * 50); // Minimum 50ms, starts at 1000ms
}

export function getHardDropPosition(board: Board, piece: Piece): number {
  let dropY = piece.y;
  
  while (isValidPosition(board, piece, 0, dropY - piece.y + 1)) {
    dropY++;
  }
  
  return dropY;
}

export function isGameOver(board: Board): boolean {
  // Check if any blocks are in the top row (game over zone)
  return board[0].some(cell => cell !== 0);
}