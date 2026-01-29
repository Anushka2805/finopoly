import { Player } from "../types/player";
import { board } from "../data/board";
import { BALANCE } from "../data/balanceConfig";

/**
 * Decides what happens when a player lands on a tile
 */
export function resolveTile(player: Player): Player {
  const tile = board[player.position];

  switch (tile.type) {
    case "salary":
      return {
        ...player,
        cash: player.cash + BALANCE.SALARY.NORMAL,
      };

    case "bonus":
      return {
        ...player,
        cash: player.cash + 200,
      };

    case "bills":
      return {
        ...player,
        cash: player.cash - BALANCE.BILLS.MEDIUM,
      };

    case "bank":
      // Auto-save a small amount
      if (player.cash >= 200) {
        return {
          ...player,
          cash: player.cash - 200,
          savings: player.savings + 200,
        };
      }
      return player;

    case "investment":
      // Default behaviour: auto FD investment
      if (player.cash >= 300) {
        return {
          ...player,
          cash: player.cash - 300,
          investments: {
            ...player.investments,
            fd: player.investments.fd + 300,
          },
        };
      }
      return player;

    case "insurance":
      if (!player.insurance.health && player.cash >= 200) {
        return {
          ...player,
          cash: player.cash - 200,
          insurance: {
            ...player.insurance,
            health: true,
          },
        };
      }
      return player;

    case "risk":
      let loss = BALANCE.BILLS.HEAVY;

      if (player.insurance.health) {
        loss = Math.floor(loss * (1 - BALANCE.INSURANCE.HEALTH_REDUCTION));
      }

      return {
        ...player,
        cash: player.cash - loss,
      };

    default:
      return player;
  }
}
