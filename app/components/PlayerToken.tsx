import { Player } from "../types/player";

type Props = {
  player: Player;
};

export default function PlayerToken({ player }: Props) {
  return (
    <div
      className="absolute top-1 right-1 text-lg transition-transform duration-500 ease-in-out animate-bounce"
      title={player.name}
    >
      {player.isComputer ? "🤖" : "🧍"}
    </div>
  );
}
