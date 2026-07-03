import { Figtree, JetBrains_Mono } from "next/font/google";

// Figtree is the closest open font to Spotify's proprietary Circular —
// geometric and friendly, so the shell reads as "Spotify" without the license.
export const fontSans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
