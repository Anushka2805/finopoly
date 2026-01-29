import { Player } from "../types/player";
import { BALANCE } from "../data/balanceConfig";

/**
 * Applies effects that happen automatically at end of turn
 */
export function applyTurnEffects(
  player: Player,
  turn: number
): Player {
  const updated = { ...player };

  // Loan interest every 5 turns
  if (turn > 0 && turn % 5 === 0 && updated.debt > 0) {
    updated.debt = Math.floor(
      updated.debt * (1 + BALANCE.LOAN.INTEREST_RATE)
    );
  }

  // Penalty if cash is negative
  if (updated.cash < 0) {
    updated.cash -= BALANCE.PENALTIES.NEGATIVE_CASH;
  }

  return updated;
}
