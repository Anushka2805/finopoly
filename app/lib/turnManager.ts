import { Player } from "../types/player";

export type GameState = {
  players: Player[];
  currentPlayerIndex: number;
  turn: number;
};

/**
 * Move to next player's turn
 */
export function nextTurn(state: GameState): GameState {
  const nextIndex =
    (state.currentPlayerIndex + 1) % state.players.length;

  const nextTurnCount =
    nextIndex === 0 ? state.turn + 1 : state.turn;

  return {
    ...state,
    currentPlayerIndex: nextIndex,
    turn: nextTurnCount,
  };
}

/**
 * Get current player
 */
export function getCurrentPlayer(state: GameState): Player {
  return state.players[state.currentPlayerIndex];
}
