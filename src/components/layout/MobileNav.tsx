"use client";

import { useEffect, useState } from "react";
import { Home, Briefcase, Code2, Cpu, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#hero", label: "Home", icon: Home },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#projects", label: "Projects", icon: Code2 },
  { href: "#skills", label: "Skills", icon: Cpu },
  { href: "#contact", label: "Contact", icon: Mail },
];

/**
 * Spotify-style bottom tab bar — mobile has no sidebar, so without this
 * there is no way to jump between sections on a phone.
 */
export function MobileNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActiveSection(mostVisible.target.id);
      },
      { threshold: 0.3 }
    );

    navItems.forEach(({ href }) => {
      const el = document.getElementById(href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    document
      .getElementById(href.replace("#", ""))
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden",
        "h-[52px] bg-sp-black border-t border-sp-card",
        "flex items-stretch justify-around"
      )}
      aria-label="Section navigation"
    >
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = activeSection === href.replace("#", "");
        return (
          <button
            key={href}
            onClick={() => handleNavClick(href)}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 flex-1",
              "transition-colors",
              isActive ? "text-sp-white" : "text-sp-subdued"
            )}
            aria-label={label}
            aria-current={isActive ? "true" : undefined}
          >
            <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[9px] font-medium">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
