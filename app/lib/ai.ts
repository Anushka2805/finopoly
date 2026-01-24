import { Player } from "../types/player";

export function aiTurnDecision(player: Player) {
  if (player.cash > 700) return "invest";
  if (player.debt > 500) return "skip";
  return "save";
}
