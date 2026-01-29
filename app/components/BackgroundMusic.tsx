"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/bg.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Play music
    audioRef.current.play().catch(() => {
      // autoplay block ignore
    });

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return null;
}
