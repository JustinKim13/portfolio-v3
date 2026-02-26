"use client";

import { useEffect, useState } from "react";
import type { NowPlayingData } from "@/types/spotify";

const POLL_INTERVAL = 30_000; // 30 seconds

export function useNowPlaying() {
  const [data, setData] = useState<NowPlayingData>({ isPlaying: false });
  const [isLoading, setIsLoading] = useState(true);

  async function fetchNowPlaying() {
    try {
      const res = await fetch("/api/spotify/now-playing");
      if (!res.ok) throw new Error("Failed to fetch");
      const json: NowPlayingData = await res.json();
      setData(json);
    } catch {
      setData({ isPlaying: false });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { data, isLoading };
}
