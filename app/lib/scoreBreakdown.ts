import { Player } from "../types/player";

export function calculateScore(player: Player) {
  return (
    player.cash +
    player.savings +
    player.investments.fd +
    player.investments.stocks +
    player.investments.startup -
    player.debt
  );
}
