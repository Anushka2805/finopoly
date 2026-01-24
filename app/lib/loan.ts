import { Player } from "../types/player";

export function takeLoan(player: Player, amount: number) {
  return {
    ...player,
    cash: player.cash + amount,
    debt: player.debt + amount,
  };
}

export function applyInterest(player: Player) {
  return {
    ...player,
    debt: Math.floor(player.debt * 1.05),
  };
}
