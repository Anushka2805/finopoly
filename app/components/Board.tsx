import { board } from "../data/board";
import { Player } from "../types/player";
import Tile from "./Tile";
import PlayerToken from "./PlayerToken";

type Props = {
  players: Player[];
};

export default function Board({ players }: Props) {
  return (
    <div className="grid grid-cols-6 gap-2 bg-green-200 p-4 rounded-xl">
      {board.map((tile, index) => (
        <div key={tile.id} className="relative">
          <Tile tile={tile} />

          {players.map(
            (player) =>
              player.position === index && (
                <PlayerToken
                  key={player.id}
                  player={player}
                />
              )
          )}
        </div>
      ))}
    </div>
  );
}
