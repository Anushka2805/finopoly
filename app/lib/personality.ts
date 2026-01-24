import { Player } from "../types/player";

export function getPersonality(player: Player) {
  if (player.debt === 0 && player.savings > 500) return "Saver 🏦";
  if (player.investments.startup > 0) return "Risk Taker 🎲";
  return "Balanced ⚖️";
}
