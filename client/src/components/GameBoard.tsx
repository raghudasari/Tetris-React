import { useEffect, useRef } from "react";
import { Board, Piece } from "@/lib/tetris/types";
import { TETROMINO_COLORS } from "@/lib/tetris/tetrominoes";

interface GameBoardProps {
  board: Board;
  currentPiece: Piece | null;
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 30;

export default function GameBoard({ board, currentPiece }: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    for (let x = 0; x <= BOARD_WIDTH; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, BOARD_HEIGHT * CELL_SIZE);
      ctx.stroke();
    }
    for (let y = 0; y <= BOARD_HEIGHT; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(BOARD_WIDTH * CELL_SIZE, y * CELL_SIZE);
      ctx.stroke();
    }

    // Draw placed pieces
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        if (board[y][x] !== 0) {
          const color = TETROMINO_COLORS[board[y][x]];
          ctx.fillStyle = color;
          ctx.fillRect(
            x * CELL_SIZE + 1,
            y * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2
          );
          
          // Add highlight for 3D effect
          ctx.fillStyle = `${color}CC`;
          ctx.fillRect(
            x * CELL_SIZE + 1,
            y * CELL_SIZE + 1,
            CELL_SIZE - 6,
            CELL_SIZE - 6
          );
        }
      }
    }

    // Draw current piece
    if (currentPiece) {
      const color = TETROMINO_COLORS[currentPiece.type];
      ctx.fillStyle = color;
      
      currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            const boardX = currentPiece.x + x;
            const boardY = currentPiece.y + y;
            
            if (boardX >= 0 && boardX < BOARD_WIDTH && boardY >= 0 && boardY < BOARD_HEIGHT) {
              ctx.fillRect(
                boardX * CELL_SIZE + 1,
                boardY * CELL_SIZE + 1,
                CELL_SIZE - 2,
                CELL_SIZE - 2
              );
              
              // Add highlight for 3D effect
              ctx.fillStyle = `${color}CC`;
              ctx.fillRect(
                boardX * CELL_SIZE + 1,
                boardY * CELL_SIZE + 1,
                CELL_SIZE - 6,
                CELL_SIZE - 6
              );
              ctx.fillStyle = color;
            }
          }
        });
      });
    }
  }, [board, currentPiece]);

  return (
    <div className="border-4 border-gray-600 rounded-lg overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        width={BOARD_WIDTH * CELL_SIZE}
        height={BOARD_HEIGHT * CELL_SIZE}
        className="block"
      />
    </div>
  );
}
