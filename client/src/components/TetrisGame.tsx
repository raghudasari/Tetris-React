import { useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import GameBoard from "./GameBoard";
import NextPiece from "./NextPiece";
import GameStats from "./GameStats";
import GameControls from "./GameControls";
import { useTetris } from "@/lib/stores/useTetris";
import { useAudio } from "@/lib/stores/useAudio";

export default function TetrisGame() {
  const {
    gameState,
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
  } = useTetris();

  const { playHit, playSuccess, toggleMute, isMuted, backgroundMusic } = useAudio();

  // Handle keyboard controls
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gamePhase !== "playing") return;

    event.preventDefault();
    
    switch (event.code) {
      case "ArrowLeft":
        movePiece(-1, 0);
        playHit();
        break;
      case "ArrowRight":
        movePiece(1, 0);
        playHit();
        break;
      case "ArrowDown":
        dropPiece();
        break;
      case "ArrowUp":
        rotatePiece();
        playHit();
        break;
      case "Space":
        hardDrop();
        playSuccess();
        break;
      case "KeyP":
        if (gamePhase === "playing") {
          pauseGame();
        } else if (gamePhase === "paused") {
          resumeGame();
        }
        break;
      case "KeyM":
        toggleMute();
        break;
    }
  }, [gamePhase, movePiece, rotatePiece, dropPiece, hardDrop, pauseGame, resumeGame, playHit, playSuccess, toggleMute]);

  // Set up keyboard event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  // Handle background music
  useEffect(() => {
    if (backgroundMusic) {
      if (gamePhase === "playing" && !isMuted) {
        backgroundMusic.play().catch(console.error);
      } else {
        backgroundMusic.pause();
      }
    }
  }, [gamePhase, isMuted, backgroundMusic]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-6xl w-full">
      {/* Main Game Area */}
      <Card className="flex-1 p-6 bg-black/20 backdrop-blur-sm border-gray-700">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">
            TETRIS
          </h1>
          
          {gamePhase === "ready" && (
            <div className="text-center mb-6">
              <p className="text-white mb-4">Ready to play?</p>
              <button
                onClick={startGame}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Start Game
              </button>
            </div>
          )}

          {gamePhase === "ended" && (
            <div className="text-center mb-6">
              <p className="text-red-400 text-xl mb-2">Game Over!</p>
              <p className="text-white mb-4">Final Score: {score}</p>
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                Play Again
              </button>
            </div>
          )}

          {gamePhase === "paused" && (
            <div className="text-center mb-6">
              <p className="text-yellow-400 text-xl mb-2">Game Paused</p>
              <button
                onClick={resumeGame}
                className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors"
              >
                Resume
              </button>
            </div>
          )}

          <GameBoard board={board} currentPiece={currentPiece} />
        </div>
      </Card>

      {/* Side Panel */}
      <div className="lg:w-80 flex flex-col gap-4">
        <NextPiece piece={nextPiece} />
        <GameStats score={score} level={level} lines={lines} />
        <GameControls 
          gamePhase={gamePhase}
          onStart={startGame}
          onPause={pauseGame}
          onResume={resumeGame}
          onReset={resetGame}
          onToggleMute={toggleMute}
          isMuted={isMuted}
        />
      </div>
    </div>
  );
}
