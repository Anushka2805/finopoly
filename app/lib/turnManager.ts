import { Player } from "../types/player";

export type GameState = {
  players: Player[];
  currentPlayerIndex: number;
  turn: number;
};

export function nextTurn(state: GameState): GameState {
  const nextIndex =
    (state.currentPlayerIndex + 1) % state.players.length;

  return {
    ...state,
    currentPlayerIndex: nextIndex,
    turn: state.turn + (nextIndex === 0 ? 1 : 0),
  };
}
