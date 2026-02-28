import type { Metadata } from "next";
import "./globals.css";
import { fontSans, fontMono } from "@/lib/fonts";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { SpotifyShell } from "@/components/layout/SpotifyShell";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Justin Kim — Portfolio",
  description:
    "CS / DS student at UW-Madison building full-stack systems, production ML infrastructure, and exploring LLMs and AI safety.",
  keywords: ["software engineer", "machine learning", "portfolio", "React", "TypeScript"],
  authors: [{ name: "Justin Kim" }],
  openGraph: {
    title: "Justin Kim — Portfolio",
    description:
      "CS / DS student at UW-Madison building full-stack systems, production ML infrastructure, and exploring LLMs and AI safety.",
    type: "website",
    url: "https://justinkim.vercel.app",
    images: [
      {
        url: "https://justinkim.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Justin Kim — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Justin Kim — Portfolio",
    description:
      "CS / DS student at UW-Madison building full-stack systems, production ML infrastructure, and exploring LLMs and AI safety.",
    images: ["https://justinkim.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          fontSans.variable,
          fontMono.variable,
          "font-sans antialiased bg-sp-black text-sp-white",
          "cursor-none" // hide default cursor — CustomCursor replaces it
        )}
      >
        <LenisProvider>
          <CustomCursor />
          <SpotifyShell>{children}</SpotifyShell>
          <Analytics />
        </LenisProvider>
      </body>
    </html>
  );
}
