import { Player } from "../types/player";
import { calculateFinalScore } from "../lib/gameEnd";

type Props = {
  players: Player[];
  onRestart: () => void;
};

export default function EndScreen({ players, onRestart }: Props) {
  const scored = players.map((p) => ({
    ...p,
    score: calculateFinalScore(p),
  }));

  const winner = scored.reduce((best, curr) =>
    curr.score > best.score ? curr : best
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4 text-center">
        <h2 className="text-2xl font-bold">🏆 Game Over</h2>

        <p className="text-lg">
          Winner: <span className="font-semibold">{winner.name}</span>
        </p>

        <div className="space-y-2">
          {scored.map((p) => (
            <div
              key={p.id}
              className="flex justify-between border-b pb-1 text-sm"
            >
              <span>{p.name}</span>
              <span>₹ {p.score}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onRestart}
          className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:scale-105 transition"
        >
          Play Again 🔄
        </button>
      </div>
    </div>
  );
}
