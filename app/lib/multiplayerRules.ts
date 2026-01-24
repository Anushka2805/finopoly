import { Player } from "../types/player";

export function canShareTile(players: Player[]) {
  const positions = players.map((p) => p.position);
  return new Set(positions).size === positions.length;
}

export function skipTurnPenalty(player: Player) {
  return { ...player, cash: player.cash - 100 };
}
