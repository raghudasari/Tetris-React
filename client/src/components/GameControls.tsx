import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { GamePhase } from "@/lib/tetris/types";

interface GameControlsProps {
  gamePhase: GamePhase;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onToggleMute: () => void;
  isMuted: boolean;
}

export default function GameControls({
  gamePhase,
  onStart,
  onPause,
  onResume,
  onReset,
  onToggleMute,
  isMuted,
}: GameControlsProps) {
  return (
    <>
      <Card className="bg-black/20 backdrop-blur-sm border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-center">Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {gamePhase === "ready" && (
            <Button onClick={onStart} className="w-full" size="sm">
              <Play className="mr-2 h-4 w-4" />
              Start Game
            </Button>
          )}
          
          {gamePhase === "playing" && (
            <Button onClick={onPause} className="w-full" size="sm" variant="secondary">
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </Button>
          )}
          
          {gamePhase === "paused" && (
            <Button onClick={onResume} className="w-full" size="sm">
              <Play className="mr-2 h-4 w-4" />
              Resume
            </Button>
          )}

          {(gamePhase === "playing" || gamePhase === "paused" || gamePhase === "ended") && (
            <Button onClick={onReset} className="w-full" size="sm" variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              New Game
            </Button>
          )}

          <Button onClick={onToggleMute} className="w-full" size="sm" variant="outline">
            {isMuted ? (
              <>
                <VolumeX className="mr-2 h-4 w-4" />
                Unmute
              </>
            ) : (
              <>
                <Volume2 className="mr-2 h-4 w-4" />
                Mute
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-black/20 backdrop-blur-sm border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-center text-sm">Keys</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs text-gray-300">
          <div className="flex justify-between">
            <span>Move:</span>
            <span>← →</span>
          </div>
          <div className="flex justify-between">
            <span>Rotate:</span>
            <span>↑</span>
          </div>
          <div className="flex justify-between">
            <span>Soft Drop:</span>
            <span>↓</span>
          </div>
          <div className="flex justify-between">
            <span>Hard Drop:</span>
            <span>Space</span>
          </div>
          <div className="flex justify-between">
            <span>Pause:</span>
            <span>P</span>
          </div>
          <div className="flex justify-between">
            <span>Mute:</span>
            <span>M</span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
