import { Player } from "../types/player";
import { board } from "../data/board";

export const TOTAL_TURNS = 30;

export function movePlayer(player: Player, dice: number) {
  const newPos = (player.position + dice) % board.length;
  return { ...player, position: newPos };
}

export function applySalary(player: Player, amount = 500) {
  return { ...player, cash: player.cash + amount };
}

export function applyBills(player: Player, amount = 300) {
  return { ...player, cash: player.cash - amount };
}
