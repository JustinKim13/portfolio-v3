"use client";

import { useEffect, useState, useRef } from "react";
import type { NowPlayingData } from "@/types/spotify";

const POLL_INTERVAL = 30_000; // 30 seconds

export function useNowPlaying() {
  const [data, setData] = useState<NowPlayingData>({ isPlaying: false });
  const [isLoading, setIsLoading] = useState(true);
  const lastKnown = useRef<NowPlayingData | null>(null);

  async function fetchNowPlaying() {
    try {
      const res = await fetch("/api/spotify/now-playing");
      if (!res.ok) throw new Error("Failed to fetch");
      const json: NowPlayingData = await res.json();
      // Cache any response that has track info
      if (json.title) lastKnown.current = json;
      setData(json);
    } catch {
      // On failure, fall back to last known track shown as recently played
      if (lastKnown.current) {
        setData({ ...lastKnown.current, isPlaying: false, isRecentlyPlayed: true });
      } else {
        setData({ isPlaying: false });
      }
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
