"use client";

import { Sidebar } from "./Sidebar";
import { NowPlayingBar } from "./NowPlayingBar";
import { MobileNav } from "./MobileNav";

interface SpotifyShellProps {
  children: React.ReactNode;
}

export function SpotifyShell({ children }: SpotifyShellProps) {
  return (
    <>
      {/* Sidebar: fixed left on md+, handled internally */}
      <Sidebar />

      {/* Main content: offset by sidebar on md+; pad bottom for player bar
          (+ tab bar on mobile) */}
      <main
        id="main-scroll"
        className="md:ml-[240px] pb-[142px] md:pb-[90px] min-h-screen bg-sp-dark"
      >
        {children}
      </main>

      {/* Now Playing Bar: fixed bottom (above the tab bar on mobile) */}
      <NowPlayingBar />

      {/* Mobile-only bottom tab navigation */}
      <MobileNav />
    </>
  );
}
