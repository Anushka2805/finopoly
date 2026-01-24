import { Player } from "../types/player";

export function applyTurnEffects(player: Player, turn: number) {
  let updated = { ...player };

  if (turn % 5 === 0 && player.debt > 0) {
    updated.debt = Math.floor(player.debt * 1.05);
  }

  return updated;
}
