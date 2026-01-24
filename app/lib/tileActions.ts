import { BALANCE } from "../data/balanceConfig";
import { Player } from "../types/player";

export function salaryTile(player: Player) {
  return { ...player, cash: player.cash + BALANCE.SALARY.NORMAL };
}

export function billsTile(player: Player) {
  return { ...player, cash: player.cash - BALANCE.BILLS.MEDIUM };
}


export function bonusTile(player: Player) {
  return { ...player, cash: player.cash + 200 };
}

export function riskTile(player: Player) {
  let loss = 400;

  if (player.insurance.health) loss *= 0.4;

  return { ...player, cash: player.cash - loss };
}

export function insuranceTile(player: Player) {
  if (player.insurance.health) return player;

  return {
    ...player,
    cash: player.cash - 200,
    insurance: { ...player.insurance, health: true },
  };
}

export function bankTile(player: Player) {
  return {
    ...player,
    savings: player.savings + 200,
    cash: player.cash - 200,
  };
}
