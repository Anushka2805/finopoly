"use client";

import { useState } from "react";

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

/* 🔹 Descriptive message */
function getEventDescription(tile: BoardTile, name: string): string {
  switch (tile.type) {
    case "salary":
      return `${name} received salary`;
    case "bonus":
      return `${name} received a bonus`;
    case "investment":
      return `${name} invested money`;
    case "bank":
      return `${name} saved money in bank`;
    case "insurance":
      return `${name} bought insurance`;
    case "risk":
      return `${name} faced a financial risk`;
    case "bills":
      return `${name} paid a bill`;
    default:
      return `${name} encountered a financial event`;
  }
}

export default function GameClient({
  mode,
}: {
  mode: "single" | "multi";
}) {
  const [gameState, setGameState] = useState<GameState>(() => {
    const players = setupGame(mode);
    return {
      players,
      currentPlayerIndex: 0,
      turn: 1,
    };
  });

  const [diceValue, setDiceValue] = useState<number | null>(null);

  const [event, setEvent] = useState<{
    title: string;
    description: string;
    amount: number;
  } | null>(null);

  const [history, setHistory] = useState<string[]>([]);

  const currentPlayer = getCurrentPlayer(gameState);

  function handleRollDice() {
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
        description: getEventDescription(
          landedTile,
          currentPlayer.name
        ),
        amount: diff,
      });

      setHistory((h) => [
        `${currentPlayer.name}: ${landedTile.label} (${diff >= 0 ? "+" : ""}₹${diff})`,
        ...h.slice(0, 4),
      ]);

      return nextTurn({
        ...prev,
        players: updatedPlayers,
      });
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-slate-200 p-6">
      <BackgroundMusic />

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Turn {gameState.turn}
        </h2>
        <p className="text-gray-600 mt-1">
          Current Player:{" "}
          <span className="font-semibold text-gray-800">
            {currentPlayer.name}
          </span>
        </p>
      </div>

      {/* Game Area */}
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
        {/* Player 1 */}
        <div className="bg-white rounded-2xl shadow-md p-4 w-full lg:w-64">
          <PlayerPanel player={gameState.players[0]} />
        </div>

        {/* Board */}
        <div className="bg-white rounded-3xl shadow-lg p-4">
          <Board players={gameState.players} />
        </div>

        {/* Player 2 */}
        <div className="bg-white rounded-2xl shadow-md p-4 w-full lg:w-64">
          <PlayerPanel player={gameState.players[1]} />
        </div>
      </div>

      {/* Dice */}
      <div className="flex justify-center mt-8">
        <div className="bg-white rounded-2xl shadow-lg px-8 py-4">
          <Dice value={diceValue} onRoll={handleRollDice} />
        </div>
      </div>

      {/* Activity Log */}
      <div className="max-w-xl mx-auto mt-8 bg-white rounded-2xl p-5 shadow-md">
        <h4 className="font-semibold text-gray-900 mb-3">
          📜 Recent Activity
        </h4>
        <ul className="text-sm space-y-1 text-gray-700">
          {history.length === 0 && (
            <li className="text-gray-400">No actions yet</li>
          )}
          {history.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>

      {/* Event Modal */}
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
