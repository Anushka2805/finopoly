import { Player } from "../types/player";

export default function PlayerPanel({ player }: { player: Player }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-60 space-y-2">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <span className="text-2xl">{player.token}</span>
        {player.name}
      </h3>

      <div className="text-sm">💵 Cash: ₹{player.cash}</div>
      <div className="text-sm">🏦 Savings: ₹{player.savings}</div>
      <div className="text-sm">📉 Debt: ₹{player.debt}</div>
      <div className="text-sm">
        📈 Investment: ₹
        {player.investments.fd +
          player.investments.stocks +
          player.investments.startup}
      </div>
    </div>
  );
}
