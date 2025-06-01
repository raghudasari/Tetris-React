export type TetrominoType = 1 | 2 | 3 | 4 | 5 | 6 | 7; // I, O, T, S, Z, J, L

export type Board = number[][];

export interface Piece {
  type: TetrominoType;
  shape: number[][];
  x: number;
  y: number;
}

export type GamePhase = "ready" | "playing" | "paused" | "ended";

export interface GameState {
  board: Board;
  currentPiece: Piece | null;
  nextPiece: Piece | null;
  score: number;
  level: number;
  lines: number;
  gamePhase: GamePhase;
  dropTime: number;
  lastDropTime: number;
}