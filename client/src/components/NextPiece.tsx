import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Piece } from "@/lib/tetris/types";
import { TETROMINO_COLORS } from "@/lib/tetris/tetrominoes";

interface NextPieceProps {
  piece: Piece | null;
}

const CELL_SIZE = 20;

export default function NextPiece({ piece }: NextPieceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (piece) {
      const color = TETROMINO_COLORS[piece.type];
      ctx.fillStyle = color;

      // Center the piece in the canvas
      const pieceWidth = piece.shape[0].length;
      const pieceHeight = piece.shape.length;
      const offsetX = (canvas.width - pieceWidth * CELL_SIZE) / 2;
      const offsetY = (canvas.height - pieceHeight * CELL_SIZE) / 2;

      piece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            ctx.fillRect(
              offsetX + x * CELL_SIZE + 1,
              offsetY + y * CELL_SIZE + 1,
              CELL_SIZE - 2,
              CELL_SIZE - 2
            );

            // Add highlight for 3D effect
            ctx.fillStyle = `${color}CC`;
            ctx.fillRect(
              offsetX + x * CELL_SIZE + 1,
              offsetY + y * CELL_SIZE + 1,
              CELL_SIZE - 6,
              CELL_SIZE - 6
            );
            ctx.fillStyle = color;
          }
        });
      });
    }
  }, [piece]);

  return (
    <Card className="bg-black/20 backdrop-blur-sm border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-center">Next</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="border-2 border-gray-600 rounded bg-black">
          <canvas
            ref={canvasRef}
            width={100}
            height={80}
            className="block"
          />
        </div>
      </CardContent>
    </Card>
  );
}
