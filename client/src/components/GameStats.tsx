import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GameStatsProps {
  score: number;
  level: number;
  lines: number;
}

export default function GameStats({ score, level, lines }: GameStatsProps) {
  return (
    <Card className="bg-black/20 backdrop-blur-sm border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-center">Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-sm text-gray-300">Score</div>
          <div className="text-2xl font-bold text-white">{score.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-300">Level</div>
          <div className="text-xl font-bold text-yellow-400">{level}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-300">Lines</div>
          <div className="text-xl font-bold text-blue-400">{lines}</div>
        </div>
      </CardContent>
    </Card>
  );
}
