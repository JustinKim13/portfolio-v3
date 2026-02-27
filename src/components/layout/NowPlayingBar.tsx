"use client";

import Image from "next/image";
import { useNowPlaying } from "@/hooks/useNowPlaying";
import { EqualizerBars } from "@/components/ui/EqualizerBars";
import { formatMs } from "@/lib/utils";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function NowPlayingBar() {
  const { data, isLoading } = useNowPlaying();

  const progressPercent =
    data.isPlaying && data.progress && data.duration
      ? (data.progress / data.duration) * 100
      : 0;

  return (
    <footer
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "h-player bg-sp-black border-t border-sp-card",
        "flex items-center px-4 gap-4"
      )}
    >
      {/* Left: Track info */}
      <div className="flex items-center gap-3 flex-1 md:flex-none md:w-[240px] min-w-0">
        {data.albumArt ? (
          <div className="relative w-14 h-14 flex-shrink-0">
            <Image
              src={data.albumArt}
              alt={`${data.title} album art`}
              fill
              sizes="56px"
              className="rounded object-cover"
            />
          </div>
        ) : (
          <div className="w-14 h-14 flex-shrink-0 rounded bg-sp-card flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-sp-card-hover" />
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col gap-1">
            <div className="h-3 w-24 bg-sp-card rounded animate-pulse" />
            <div className="h-2 w-16 bg-sp-card rounded animate-pulse" />
          </div>
        ) : data.title ? (
          <div className="flex flex-col min-w-0">
            {data.isRecentlyPlayed && (
              <span className="text-sp-subdued text-[10px] uppercase tracking-widest mb-0.5">
                Last played
              </span>
            )}
            <span className="text-sp-white text-sm font-medium truncate">
              {data.title}
            </span>
            <span className="text-sp-subdued text-xs truncate">
              {data.artist}
            </span>
          </div>
        ) : (
          <div className="flex flex-col min-w-0">
            <span className="text-sp-subdued text-sm">Nothing playing</span>
          </div>
        )}

        {data.title && !data.isRecentlyPlayed && (
          <EqualizerBars
            isPlaying={data.isPlaying}
            className="ml-1 flex-shrink-0 hidden md:flex"
          />
        )}
      </div>

      {/* Mobile: play button only */}
      <button
        className={cn(
          "flex md:hidden w-8 h-8 rounded-full items-center justify-center flex-shrink-0",
          "bg-sp-white text-sp-black"
        )}
        aria-label={data.isPlaying ? "Pause" : "Play"}
      >
        {data.isPlaying ? (
          <Pause size={14} fill="currentColor" />
        ) : (
          <Play size={14} fill="currentColor" className="ml-0.5" />
        )}
      </button>

      {/* Desktop center: Controls + progress */}
      <div className="hidden md:flex flex-col items-center gap-1 flex-1 min-w-0">
        <div className="flex items-center gap-4">
          <button
            className="text-sp-subdued hover:text-sp-white transition-colors"
            aria-label="Previous track"
          >
            <SkipBack size={16} />
          </button>
          <button
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              "bg-sp-white hover:scale-105 transition-transform text-sp-black"
            )}
            aria-label={data.isPlaying ? "Pause" : "Play"}
          >
            {data.isPlaying ? (
              <Pause size={14} fill="currentColor" />
            ) : (
              <Play size={14} fill="currentColor" className="ml-0.5" />
            )}
          </button>
          <button
            className="text-sp-subdued hover:text-sp-white transition-colors"
            aria-label="Next track"
          >
            <SkipForward size={16} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 w-full max-w-[400px]">
          <span className="text-sp-subdued text-[10px] w-8 text-right tabular-nums">
            {data.progress ? formatMs(data.progress) : "0:00"}
          </span>
          <div className="progress-bar flex-1 group">
            <div
              className="progress-bar-fill transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-sp-subdued text-[10px] w-8 tabular-nums">
            {data.duration ? formatMs(data.duration) : "0:00"}
          </span>
        </div>
      </div>

      {/* Desktop right: Volume + external link */}
      <div className="hidden md:flex items-center gap-3 w-[240px] justify-end">
        <Volume2 size={16} className="text-sp-subdued" />
        <div className="progress-bar w-24">
          <div className="progress-bar-fill" style={{ width: "70%" }} />
        </div>
        {data.spotifyUrl && (
          <a
            href={data.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sp-subdued hover:text-sp-green transition-colors ml-1"
            aria-label="Open in Spotify"
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </footer>
  );
}
