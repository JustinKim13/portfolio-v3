"use client";

import { cn } from "@/lib/utils";

interface EqualizerBarsProps {
  isPlaying: boolean;
  className?: string;
}

export function EqualizerBars({ isPlaying, className }: EqualizerBarsProps) {
  return (
    <div
      className={cn("flex items-end gap-[2px]", className)}
      aria-hidden="true"
    >
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={cn("eq-bar", isPlaying && "playing")}
          style={{ animationDelay: `${(i - 1) * 150}ms` }}
        />
      ))}
    </div>
  );
}
