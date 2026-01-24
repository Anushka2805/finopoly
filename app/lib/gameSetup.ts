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
