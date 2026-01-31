import { board } from "../data/board";
import { Player } from "../types/player";

export default function Board({ players }: { players: Player[] }) {
  return (
    <div className="grid grid-cols-6 gap-3 bg-green-200 p-4 rounded-2xl">
      {board.map((tile, index) => (
        <div
          key={index}
          className="relative bg-white rounded-lg h-20 flex items-center justify-center text-sm"
        >
          {tile.label}

          {/* TOKENS */}
          <div className="absolute bottom-1 right-1 flex gap-1">
            {players
              .filter((p) => p.position === index)
              .map((p) => (
                <span key={p.id} className="text-lg">
                  {p.token}
                </span>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
