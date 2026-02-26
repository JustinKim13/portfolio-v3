import type { Metadata } from "next";
import "./globals.css";
import { fontSans, fontMono } from "@/lib/fonts";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { SpotifyShell } from "@/components/layout/SpotifyShell";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Justin Kim — Portfolio",
  description:
    "CS student and aspiring SWE/MLE. Building at the intersection of software engineering and machine learning.",
  keywords: ["software engineer", "machine learning", "portfolio", "React", "TypeScript"],
  authors: [{ name: "Justin Kim" }],
  openGraph: {
    title: "Justin Kim — Portfolio",
    description: "CS student and aspiring SWE/MLE",
    type: "website",
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
        </LenisProvider>
      </body>
    </html>
  );
}
