import { Player } from "../types/player";
import { board } from "../data/board";

export function resolveTile(player: Player) {
  const tile = board[player.position];

  switch (tile.type) {
    case "salary":
      return { ...player, cash: player.cash + 500 };

    case "bills":
      return { ...player, cash: player.cash - 300 };

    case "bonus":
      return { ...player, cash: player.cash + 200 };

    default:
      return player;
  }
}
