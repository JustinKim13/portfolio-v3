"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Music2 } from "lucide-react";
import { useNowPlaying } from "@/hooks/useNowPlaying";
import { EqualizerBars } from "@/components/ui/EqualizerBars";
import { cn } from "@/lib/utils";

/**
 * Hero showcase for the live Spotify integration — the one thing on the
 * page a visitor can watch update in real time.
 */
export function NowPlayingCard() {
  const { data, isLoading } = useNowPlaying();

  const isLive = data.isPlaying && !data.isRecentlyPlayed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative rounded-2xl bg-sp-card p-5 overflow-hidden",
        "border border-sp-card-hover/60"
      )}
    >
      {/* Soft green wash so the card reads as the "alive" element */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 0%, rgba(29, 185, 84, 0.12) 0%, transparent 65%)",
        }}
      />

      <div className="relative">
        {/* Status line */}
        <div className="flex items-center gap-2 mb-3">
          {isLive ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sp-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sp-green" />
              </span>
              <p className="text-sp-green text-[11px] font-bold uppercase tracking-[0.2em]">
                Live from my Spotify
              </p>
            </>
          ) : (
            <p className="text-sp-subdued text-[11px] font-bold uppercase tracking-[0.2em]">
              Last played on my Spotify
            </p>
          )}
        </div>

        {/* Album art */}
        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-sp-dark shadow-2xl mb-3">
          {data.albumArt ? (
            <Image
              src={data.albumArt}
              alt={data.title ? `${data.title} album art` : "Album art"}
              fill
              sizes="360px"
              priority
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Music2 size={48} className="text-sp-card-hover" />
            </div>
          )}
        </div>

        {/* Track info */}
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-sp-card-hover/60 rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-sp-card-hover/60 rounded animate-pulse" />
          </div>
        ) : data.title ? (
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sp-white font-bold text-lg leading-tight truncate">
                {data.title}
              </p>
              <p className="text-sp-subdued text-sm truncate">{data.artist}</p>
            </div>
            {isLive && <EqualizerBars isPlaying className="flex-shrink-0" />}
            {data.spotifyUrl && (
              <a
                href={data.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open in Spotify"
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
                  "bg-sp-dark hover:bg-sp-card-hover text-sp-subdued hover:text-sp-green",
                  "transition-colors"
                )}
                data-cursor="hover"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        ) : (
          <p className="text-sp-subdued text-sm">
            The Spotify API is quiet right now — check back in a bit.
          </p>
        )}

        {/* The engineering flex, stated plainly */}
        <p className="text-sp-subdued/80 text-xs leading-relaxed mt-3 pt-3 border-t border-sp-card-hover/50">
          Fetched live from the Spotify Web API by this site&apos;s own backend
          — with Redis-cached tokens and automatic refresh-token rotation.
        </p>
      </div>
    </motion.div>
  );
}
