import { Player } from "../types/player";

export function aiDecision(player: Player, difficulty: "easy" | "medium" | "hard") {
  if (difficulty === "easy") return "random";

  if (difficulty === "medium") {
    if (player.cash > 600) return "invest";
    if (player.cash < 200) return "loan";
    return "save";
  }

  // HARD
  if (player.debt > 800) return "save";
  if (player.cash > 800) return "invest";
  return "skip";
}
