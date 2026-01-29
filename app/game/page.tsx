"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import Dice from "../components/Dice";
import Board from "../components/Board";
import EventModal from "../components/EventModal";
import PlayerPanel from "../components/PlayerPanel";
import BackgroundMusic from "../components/BackgroundMusic"; // 🔊 BG MUSIC

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

export default function GamePage() {
  const params = useSearchParams();
  const mode = (params.get("mode") as "single" | "multi") ?? "single";

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
      if (!prev) return prev;

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
    <div className="min-h-screen p-6 space-y-6 bg-gray-50">
      {/* 🔊 BACKGROUND MUSIC */}
      <BackgroundMusic />

      <h2 className="text-xl font-semibold text-center">
        Turn {gameState.turn} — {currentPlayer.name}
      </h2>

      <div className="flex gap-6 justify-center items-start">
        <PlayerPanel player={gameState.players[0]} />
        <Board players={gameState.players} />
        <PlayerPanel player={gameState.players[1]} />
      </div>

      <div className="flex justify-center">
        <Dice value={diceValue} onRoll={handleRollDice} />
      </div>

      <div className="max-w-xl mx-auto bg-white rounded-xl p-4 shadow">
        <h4 className="font-semibold mb-2">📜 Recent Activity</h4>
        <ul className="text-sm space-y-1">
          {history.length === 0 && (
            <li className="text-gray-400">No actions yet</li>
          )}
          {history.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
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
