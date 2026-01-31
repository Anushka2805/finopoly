"use client";

import { useEffect, useState } from "react";

import Dice from "../components/Dice";
import Board from "../components/Board";
import EventModal from "../components/EventModal";
import PlayerPanel from "../components/PlayerPanel";
import BackgroundMusic from "../components/BackgroundMusic";

import { rollDice } from "../lib/dice";
import {
  movePlayer,
  applyTileEffect,
  applyEndOfTurn,
} from "../lib/gameEngine";
import { setupGame } from "../lib/gameSetup";
import {
  GameState,
  getCurrentPlayer,
  nextTurn,
} from "../lib/turnManager";
import { board, BoardTile } from "../data/board";


/* ---------- TYPES ---------- */

type GameEvent = {
  title: string;
  description: string;
  amount: number;
} | null;


/* ---------- HELPERS ---------- */

function getEventDescription(tile: BoardTile, name: string): string {
  switch (tile.type) {
    case "salary": return `${name} received salary`;
    case "bonus": return `${name} received a bonus`;
    case "investment": return `${name} invested money`;
    case "bank": return `${name} saved money in bank`;
    case "insurance": return `${name} bought insurance`;
    case "risk": return `${name} faced a financial risk`;
    case "bills": return `${name} paid a bill`;
    default: return `${name} encountered a financial event`;
  }
}


/* ===================================================== */

export default function GameClient({
  mode,
}: {
  mode: "single" | "multi";
}) {

  /* ✅ State only created ONCE (key handles remount) */
  const [gameState, setGameState] = useState<GameState>(() => ({
    players: setupGame(mode),
    currentPlayerIndex: 0,
    turn: 1,
  }));

  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [event, setEvent] = useState<GameEvent>(null);

  const currentPlayer = getCurrentPlayer(gameState);


  /* ===================================================== */
  /* TURN LOGIC */
  /* ===================================================== */

  function playTurn() {
    const dice = rollDice();
    setDiceValue(dice);

    setGameState((prev) => {
      const index = prev.currentPlayerIndex;
      const player = prev.players[index];
      const cashBefore = player.cash;

      let updatedPlayer = movePlayer(player, dice);
      const landedTile = board[updatedPlayer.position];

      updatedPlayer = applyTileEffect(updatedPlayer);
      updatedPlayer = applyEndOfTurn(updatedPlayer, prev.turn);

      const diff = updatedPlayer.cash - cashBefore;

      const updatedPlayers = [...prev.players];
      updatedPlayers[index] = updatedPlayer;

      setEvent({
        title: landedTile.label,
        description: getEventDescription(landedTile, player.name),
        amount: diff,
      });

      return nextTurn({
        ...prev,
        players: updatedPlayers,
      });
    });
  }


  /* ===================================================== */
  /* HUMAN CLICK */
  /* ===================================================== */

  function handleRollDice() {
    if (currentPlayer.isComputer) return;
    playTurn();
  }


  /* ===================================================== */
  /* COMPUTER AUTO PLAY (ONLY single mode) */
  /* ===================================================== */

  useEffect(() => {
    if (mode === "single" && currentPlayer.isComputer) {
      const timer = setTimeout(playTurn, 900);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, mode]);


  /* ===================================================== */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-slate-200 p-6">
      <BackgroundMusic />

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          Turn {gameState.turn} — {currentPlayer.name}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">

        <div className="bg-white rounded-2xl shadow-xl p-4 w-64">
          <PlayerPanel player={gameState.players[0]} />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6">
          <Board players={gameState.players} />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-4 w-64">
          <PlayerPanel player={gameState.players[1]} />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="bg-white rounded-2xl shadow-xl px-8 py-4">
          <Dice value={diceValue} onRoll={handleRollDice} />
        </div>
      </div>

      {event && (
        <EventModal
          title={event.title}
          description={event.description}
          amount={event.amount}
          onClose={() => setEvent(null)}
        />
      )}
    </div>
  );
}
