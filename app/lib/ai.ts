import { Player } from "../types/player";

/**
 * Decide what action AI should take on its turn
 */
export function getAIDecision(
  player: Player,
  difficulty: "easy" | "medium" | "hard"
): "invest" | "save" | "loan" | "skip" {
  if (difficulty === "easy") {
    const actions = ["invest", "save", "skip"] as const;
    return actions[Math.floor(Math.random() * actions.length)];
  }

  if (difficulty === "medium") {
    if (player.cash > 700) return "invest";
    if (player.cash < 200) return "loan";
    return "save";
  }

  // hard difficulty
  if (player.debt > 600) return "save";
  if (player.cash > 800) return "invest";
  return "skip";
}
