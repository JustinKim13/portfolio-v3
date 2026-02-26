"use client";

import { Sidebar } from "./Sidebar";
import { NowPlayingBar } from "./NowPlayingBar";

interface SpotifyShellProps {
  children: React.ReactNode;
}

export function SpotifyShell({ children }: SpotifyShellProps) {
  return (
    <>
      {/* Sidebar: fixed left, handled internally */}
      <Sidebar />

      {/* Main content: offset by sidebar on md+, pad bottom for player bar */}
      <main
        id="main-scroll"
        className="md:ml-[240px] pb-[90px] min-h-screen bg-sp-dark"
      >
        {children}
      </main>

      {/* Now Playing Bar: fixed bottom, handled internally */}
      <NowPlayingBar />
    </>
  );
}
