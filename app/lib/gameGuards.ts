import { Player } from "../types/player";
import { BALANCE } from "../data/balanceConfig";

/**
 * Enforces hard limits and safety rules on player state
 */
export function enforceLimits(player: Player): Player {
  const updated = { ...player };

  // Max debt limit
  if (updated.debt > BALANCE.LOAN.MAX_DEBT) {
    updated.debt = BALANCE.LOAN.MAX_DEBT;
    updated.cash -= BALANCE.PENALTIES.NEGATIVE_CASH;
  }

  // Bankruptcy handling
  if (updated.cash < BALANCE.PENALTIES.BANKRUPTCY_LIMIT) {
    updated.cash = 0;
    updated.debt = 0;
    updated.savings = 0;
    updated.investments = {
      fd: 0,
      stocks: 0,
      startup: 0,
    };
    updated.insurance = {
      health: false,
      market: false,
    };
  }

  return updated;
}
