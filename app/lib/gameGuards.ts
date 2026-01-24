import { Player } from "../types/player";

export function enforceLimits(player: Player) {
  let updated = { ...player };

  if (updated.debt > 2000) {
    updated.cash -= 300;
  }

  if (updated.cash < -500) {
    updated.cash = 0;
    updated.debt = 0;
  }

  return updated;
}
