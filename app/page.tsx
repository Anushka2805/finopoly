"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 
      bg-gradient-to-br from-emerald-100 via-teal-100 to-blue-100 px-4">

      {/* Brand */}
      <h1 className="text-6xl font-extrabold tracking-wide text-gray-900">
        FINOPOLY <span className="inline-block">🎲</span>
      </h1>

      {/* Tagline */}
      <p className="text-xl text-gray-700 text-center max-w-xl leading-relaxed">
        Learn money decisions the fun way — earn, spend, save & invest through
        real-life scenarios.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-5 mt-2">
        <button
          onClick={() => router.push("/game?mode=single")}
          className="px-8 py-4 bg-gray-900 text-white rounded-2xl text-lg 
          font-semibold shadow-lg hover:scale-105 hover:bg-gray-800 transition"
        >
          Play vs Computer 🤖
        </button>

        <button
          className="px-8 py-4 bg-white border-2 border-gray-900 rounded-2xl 
          text-lg font-semibold text-gray-900 opacity-60 cursor-not-allowed"
          title="Multiplayer coming soon"
        >
          Play with Friend 👥
          <span className="block text-xs text-gray-500 mt-1">
            Coming Soon
          </span>
        </button>
      </div>

      {/* Footer line */}
      <p className="text-sm text-gray-600 mt-8 tracking-wide">
        No lectures. Just smart money moves.
      </p>
    </div>
  );
}
