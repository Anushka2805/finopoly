import { Player } from "../types/player";

export function canInvest(player: Player) {
  return player.cash >= 300 && player.debt < 800;
}

export function canTakeLoan(player: Player) {
  return player.debt < 1500;
}

export function mustTakeLoan(player: Player) {
  return player.cash < 0;
}
