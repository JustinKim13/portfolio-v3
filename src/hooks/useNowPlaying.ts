"use client";

import { useSyncExternalStore } from "react";
import type { NowPlayingData } from "@/types/spotify";

const POLL_INTERVAL = 30_000; // 30 seconds

interface NowPlayingState {
  data: NowPlayingData;
  isLoading: boolean;
}

// Module-level store shared by every consumer (hero card, player bar, contact
// widget) so they poll once and always show the same track in the same render.
let state: NowPlayingState = { data: { isPlaying: false }, isLoading: true };
let lastKnown: NowPlayingData | null = null;
const listeners = new Set<() => void>();
let interval: ReturnType<typeof setInterval> | null = null;

function setState(next: NowPlayingState) {
  state = next;
  listeners.forEach((notify) => notify());
}

let inFlight = false;

async function fetchNowPlaying() {
  if (inFlight) return;
  inFlight = true;
  try {
    const res = await fetch("/api/spotify/now-playing");
    if (!res.ok) throw new Error("Failed to fetch");
    const json: NowPlayingData = await res.json();
    // Cache any response that has track info
    if (json.title) lastKnown = json;
    setState({ data: json, isLoading: false });
  } catch {
    // On failure, fall back to last known track shown as recently played
    setState({
      data: lastKnown
        ? { ...lastKnown, isPlaying: false, isRecentlyPlayed: true }
        : { isPlaying: false },
      isLoading: false,
    });
  } finally {
    inFlight = false;
  }
}

// Fire the first fetch as soon as the bundle loads, before React even
// hydrates, so the track is usually ready by first paint.
if (typeof window !== "undefined") {
  fetchNowPlaying();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!interval) {
    fetchNowPlaying();
    interval = setInterval(fetchNowPlaying, POLL_INTERVAL);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && interval) {
      clearInterval(interval);
      interval = null;
    }
  };
}

const getSnapshot = () => state;
const serverSnapshot: NowPlayingState = {
  data: { isPlaying: false },
  isLoading: true,
};
const getServerSnapshot = () => serverSnapshot;

export function useNowPlaying() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
