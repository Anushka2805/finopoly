"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onRoll: () => void;
  value: number | null;
};

export default function Dice({ onRoll, value }: Props) {
  const [rolling, setRolling] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load dice sound once
  useEffect(() => {
    audioRef.current = new Audio("/sounds/dice.mp3");
  }, []);

  function handleClick() {
    if (rolling) return;

    setRolling(true);

    // Play dice sound
    audioRef.current?.play();

    // Animation duration
    setTimeout(() => {
      onRoll(); // actual dice logic
      setRolling(false);
    }, 700);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Dice Animation */}
      <div
        className={`text-5xl transition-transform duration-700 ${
          rolling ? "animate-spin" : ""
        }`}
      >
        🎲 {value ?? ""}
      </div>

      {/* Roll Button */}
      <button
        onClick={handleClick}
        disabled={rolling}
        className={`px-5 py-2 rounded-lg text-white transition ${
          rolling
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:scale-105"
        }`}
      >
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>
    </div>
  );
}
