import { create } from "zustand";
import { 
  Board, 
  Piece, 
  GameState, 
  GamePhase,
} from "../lib/tetris/types";
import {
  createEmptyBoard,
  createRandomPiece,
  isValidPosition,
  rotatePiece as rotatePieceLogic,
  placePiece,
  clearLines,
  calculateScore,
  calculateLevel,
  calculateDropTime,
  getHardDropPosition,
  isGameOver,
} from "../lib/tetris/gameLogic";

interface TetrisStore extends GameState {
  // Game control actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;

  // Piece movement actions
  movePiece: (deltaX: number, deltaY: number) => void;
  rotatePiece: () => void;
  dropPiece: () => void;
  hardDrop: () => void;

  // Internal actions
  _spawnNewPiece: () => void;
  _placePiece: () => void;
  _updateGameTime: () => void;
}

const initialState: GameState = {
  board: createEmptyBoard(),
  currentPiece: null,
  nextPiece: null,
  score: 0,
  level: 0,
  lines: 0,
  gamePhase: "ready",
  dropTime: 1000,
  lastDropTime: 0,
};

export const useTetris = create<TetrisStore>((set, get) => ({
  ...initialState,

  startGame: () => {
    const nextPiece = createRandomPiece();
    const currentPiece = createRandomPiece();
    
    set({
      board: createEmptyBoard(),
      currentPiece,
      nextPiece,
      score: 0,
      level: 0,
      lines: 0,
      gamePhase: "playing",
      dropTime: 1000,
      lastDropTime: Date.now(),
    });
  },

  pauseGame: () => {
    set((state) => 
      state.gamePhase === "playing" 
        ? { gamePhase: "paused" } 
        : {}
    );
  },

  resumeGame: () => {
    set((state) => 
      state.gamePhase === "paused" 
        ? { gamePhase: "playing", lastDropTime: Date.now() } 
        : {}
    );
  },

  resetGame: () => {
    set(initialState);
  },

  movePiece: (deltaX: number, deltaY: number) => {
    const { board, currentPiece, gamePhase } = get();
    
    if (gamePhase !== "playing" || !currentPiece) return;

    if (isValidPosition(board, currentPiece, deltaX, deltaY)) {
      set({
        currentPiece: {
          ...currentPiece,
          x: currentPiece.x + deltaX,
          y: currentPiece.y + deltaY,
        },
      });
    } else if (deltaY > 0) {
      // Piece hit something while moving down, place it
      get()._placePiece();
    }
  },

  rotatePiece: () => {
    const { board, currentPiece, gamePhase } = get();
    
    if (gamePhase !== "playing" || !currentPiece) return;

    const rotatedPiece = rotatePieceLogic(currentPiece);
    
    if (isValidPosition(board, rotatedPiece)) {
      set({ currentPiece: rotatedPiece });
    } else {
      // Try wall kicks (simple implementation)
      for (const kick of [-1, 1, -2, 2]) {
        if (isValidPosition(board, rotatedPiece, kick, 0)) {
          set({
            currentPiece: {
              ...rotatedPiece,
              x: rotatedPiece.x + kick,
            },
          });
          return;
        }
      }
    }
  },

  dropPiece: () => {
    get().movePiece(0, 1);
    set({ lastDropTime: Date.now() });
  },

  hardDrop: () => {
    const { board, currentPiece } = get();
    
    if (!currentPiece) return;

    const dropY = getHardDropPosition(board, currentPiece);
    const droppedDistance = dropY - currentPiece.y;
    
    set((state) => ({
      currentPiece: {
        ...currentPiece,
        y: dropY,
      },
      score: state.score + droppedDistance * 2, // Bonus points for hard drop
    }));
    
    // Place the piece immediately
    setTimeout(() => get()._placePiece(), 50);
  },

  _spawnNewPiece: () => {
    const { nextPiece, board } = get();
    
    if (!nextPiece) return;

    const newNextPiece = createRandomPiece();
    
    // Check if the new piece can be placed
    if (!isValidPosition(board, nextPiece)) {
      set({ gamePhase: "ended" });
      return;
    }

    set({
      currentPiece: nextPiece,
      nextPiece: newNextPiece,
    });
  },

  _placePiece: () => {
    const { board, currentPiece, score, lines, level } = get();
    
    if (!currentPiece) return;

    const newBoard = placePiece(board, currentPiece);
    const { board: clearedBoard, linesCleared } = clearLines(newBoard);
    
    const newLines = lines + linesCleared;
    const newLevel = calculateLevel(newLines);
    const newScore = score + calculateScore(linesCleared, level);
    const newDropTime = calculateDropTime(newLevel);

    set({
      board: clearedBoard,
      currentPiece: null,
      score: newScore,
      lines: newLines,
      level: newLevel,
      dropTime: newDropTime,
    });

    if (isGameOver(clearedBoard)) {
      set({ gamePhase: "ended" });
    } else {
      get()._spawnNewPiece();
    }
  },

  _updateGameTime: () => {
    const { gamePhase, dropTime, lastDropTime } = get();
    
    if (gamePhase !== "playing") return;

    const now = Date.now();
    if (now - lastDropTime >= dropTime) {
      get().dropPiece();
    }
  },
}));