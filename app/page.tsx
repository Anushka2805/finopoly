"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-green-100 to-blue-100">
      <h1 className="text-5xl font-bold tracking-wide">FINOPOLY 🎲</h1>

      <p className="text-lg text-gray-700 text-center max-w-md">
        Learn real-life financial decisions by playing a Monopoly-style game.
      </p>

      <div className="flex gap-6">
        <button
          onClick={() => router.push("/game?mode=single")}
          className="px-6 py-3 bg-black text-white rounded-xl text-lg hover:scale-105 transition"
        >
          Play vs Computer 🤖
        </button>

        <button
          onClick={() => router.push("/game?mode=multi")}
          className="px-6 py-3 bg-white border border-black rounded-xl text-lg hover:scale-105 transition"
        >
          Play with Friend 👥
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        Built for financial literacy through play
      </p>
    </div>
  );
}
