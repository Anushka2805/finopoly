import { Player } from "../types/player";

export function isGameOver(turn: number) {
  return turn >= 30;
}

export function calculateScore(player: Player) {
  return (
    player.cash +
    player.savings +
    player.investments.fd +
    player.investments.stocks -
    player.debt
  );
}
