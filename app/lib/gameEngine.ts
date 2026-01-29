import { Player } from "../types/player";
import { board } from "../data/board";
import { BALANCE } from "../data/balanceConfig";
import { resolveTile } from "./tileResolver";
import { applyTurnEffects } from "./turnEffects";
import { enforceLimits } from "./gameGuards";

export const TOTAL_TURNS = 30;

/**
 * Move player on board based on dice roll
 */
export function movePlayer(player: Player, dice: number): Player {
  const newPosition = (player.position + dice) % board.length;
  return { ...player, position: newPosition };
}

/**
 * Apply tile effect after player lands
 */
export function applyTileEffect(player: Player): Player {
  return resolveTile(player);
}

/**
 * Apply end-of-turn effects (interest, penalties, etc.)
 */
export function applyEndOfTurn(player: Player, turn: number): Player {
  let updated = applyTurnEffects(player, turn);
  updated = enforceLimits(updated);
  return updated;
}

/**
 * Check if game should end
 */
export function isGameOver(turn: number): boolean {
  return turn >= TOTAL_TURNS;
}

/**
 * Calculate final net worth score
 */
export function calculateNetWorth(player: Player): number {
  return (
    player.cash +
    player.savings +
    player.investments.fd +
    player.investments.stocks +
    player.investments.startup -
    player.debt
  );
}
