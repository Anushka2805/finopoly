import { Player } from "../types/player";

/**
 * Checks if the game should end
 */
export function isGameOver(turn: number, totalTurns: number): boolean {
  return turn >= totalTurns;
}

/**
 * Calculates final net worth score of a player
 */
export function calculateFinalScore(player: Player): number {
  return (
    player.cash +
    player.savings +
    player.investments.fd +
    player.investments.stocks +
    player.investments.startup -
    player.debt
  );
}

/**
 * Determines winner based on highest score
 */
export function getWinner(players: Player[]): Player {
  return players.reduce((best, current) =>
    calculateFinalScore(current) >
    calculateFinalScore(best)
      ? current
      : best
  );
}
