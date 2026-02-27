"use client";

import { useNowPlaying } from "@/hooks/useNowPlaying";
import { EqualizerBars } from "@/components/ui/EqualizerBars";
import { cn } from "@/lib/utils";
import {
  Home,
  Briefcase,
  Code2,
  Cpu,
  Mail,
  Music2,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { href: "#hero", label: "Home", icon: Home },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#projects", label: "Projects", icon: Code2 },
  { href: "#skills", label: "Skills", icon: Cpu },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function Sidebar() {
  const { data } = useNowPlaying();
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navItems.forEach(({ href }) => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40",
        "w-sidebar h-[calc(100vh-var(--player-height))]",
        "bg-sp-black flex flex-col",
        "hidden md:flex"
      )}
    >
      {/* Logo / Name */}
      <div className="px-6 py-6 border-b border-sp-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sp-green flex items-center justify-center flex-shrink-0">
            <span className="text-sp-black font-bold text-sm">JK</span>
          </div>
          <div className="min-w-0">
            <p className="text-sp-white font-semibold text-sm truncate">
              Justin Kim
            </p>
            <p className="text-sp-subdued text-xs truncate">
              SWE / MLE
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-sp-subdued text-[10px] font-bold uppercase tracking-widest px-3 mb-2">
          Navigation
        </p>
        <ul className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const id = href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={href}>
                <button
                  onClick={() => handleNavClick(href)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md",
                    "text-sm font-medium transition-colors text-left",
                    isActive
                      ? "bg-sp-card text-sp-white"
                      : "text-sp-subdued hover:text-sp-white hover:bg-sp-card/50"
                  )}
                >
                  <Icon size={18} />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 pt-4 border-t border-sp-card">
          <p className="text-sp-subdued text-[10px] font-bold uppercase tracking-widest px-3 mb-2">
            Links
          </p>
          <ul className="space-y-1">
            <li>
              <a
                href="https://github.com/JustinKim13"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sp-subdued hover:text-sp-white hover:bg-sp-card/50 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/justin-kim13"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sp-subdued hover:text-sp-white hover:bg-sp-card/50 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mini now playing at bottom of sidebar */}
      {data.title && (
        <div className="px-3 py-3 border-t border-sp-card">
          {data.isRecentlyPlayed && (
            <p className="text-sp-subdued text-[9px] uppercase tracking-widest mb-1 px-1">
              Last played
            </p>
          )}
          <div className="flex items-center gap-2">
            {data.isRecentlyPlayed ? (
              <Clock size={14} className="text-sp-subdued flex-shrink-0" />
            ) : (
              <Music2 size={14} className="text-sp-green flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sp-white text-xs font-medium truncate">
                {data.title}
              </p>
              <p className="text-sp-subdued text-[10px] truncate">
                {data.artist}
              </p>
            </div>
            {!data.isRecentlyPlayed && <EqualizerBars isPlaying={data.isPlaying} />}
          </div>
        </div>
      )}
    </aside>
  );
}
