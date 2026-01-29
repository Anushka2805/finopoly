import { Player } from "../types/player";

export function createPlayer(
  id: number,
  name: string,
  isComputer = false
): Player {
  return {
    id,
    name,
    position: 0,
    cash: 1000,
    savings: 300,
    debt: 0,
    insurance: { health: false, market: false },
    investments: { fd: 0, stocks: 0, startup: 0 },
    isComputer,
  };
}
export function setupGame(mode: "single" | "multi"): Player[] {
  if (mode === "single") {
    return [
      createPlayer(1, "Player 1"),
      createPlayer(2, "Computer", true),
    ];
  }

  return [
    createPlayer(1, "Player 1"),
    createPlayer(2, "Player 2"),
  ];
}
