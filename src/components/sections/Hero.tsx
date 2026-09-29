"use client";

import { motion } from "framer-motion";
import { Briefcase, Code2, Cpu } from "lucide-react";
import { getGreeting } from "@/lib/utils";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { NowPlayingCard } from "@/components/ui/NowPlayingCard";

const featuredCards = [
  {
    id: "experience",
    title: "Experience",
    subtitle: "2023 – 2026",
    gradient: "linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)",
    icon: Briefcase,
    href: "#experience",
  },
  {
    id: "projects",
    title: "Top Projects",
    subtitle: "5 shipped, 2 live",
    gradient: "linear-gradient(135deg, #00b894 0%, #00cec9 100%)",
    icon: Code2,
    href: "#projects",
  },
  {
    id: "skills",
    title: "Top Genres",
    subtitle: "Skills & tools",
    gradient: "linear-gradient(135deg, #ff9f43 0%, #ee5a24 100%)",
    icon: Cpu,
    href: "#skills",
  },
];

export function Hero() {
  const greeting = getGreeting();

  const handleCardClick = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className={cn(
        "px-6 py-8 md:px-12 md:py-6",
        // Fill exactly one screen above the player bar so nothing sits cut
        // off at the fold; content is compact enough to fit at laptop sizes
        "min-h-screen md:min-h-[calc(100vh-var(--player-height))]",
        "flex flex-col justify-center"
      )}
      style={{
        background:
          "radial-gradient(ellipse at 20% 20%, rgba(29, 185, 84, 0.08) 0%, transparent 60%), var(--sp-dark)",
      }}
    >
      {/* Greeting header */}
      <motion.div
        className="mb-5"
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-sp-white font-black tracking-tight text-3xl md:text-4xl xl:text-5xl"
          variants={fadeInUp}
        >
          {greeting}, I&apos;m Justin
        </motion.h1>
        <motion.p className="text-sp-subdued mt-1.5" variants={fadeInUp}>
          CS / DS @ UW-Madison | Incoming MSCS @ Georgia Tech
        </motion.p>
      </motion.div>

      {/* Quick stats — same subdued metadata-line idiom used on the
          Projects header, instead of a generic number-over-label grid */}
      <motion.p
        className="text-sp-subdued text-sm mb-5"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
      >
        6 projects shipped • 3 internships • 3.76 GPA
      </motion.p>

      <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-8 xl:gap-12 items-start">
        {/* Left column: the recruiter path */}
        <div className="min-w-0">
          {/* Featured Playlist Cards */}
          <motion.div
            className="mb-5"
            variants={staggerContainer(0.05, 0.25)}
            initial="hidden"
            animate="show"
          >
            <motion.h2
              className="text-sp-white font-bold text-lg mb-2.5"
              variants={fadeInUp}
            >
              Jump in
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {featuredCards.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.button
                    key={card.id}
                    variants={scaleIn}
                    onClick={() => handleCardClick(card.href)}
                    className={cn(
                      "relative flex items-center gap-3 rounded-md overflow-hidden",
                      "bg-sp-card hover:bg-sp-card-hover transition-colors text-left",
                      "h-16 pr-3 group"
                    )}
                    data-cursor="hover"
                  >
                    {/* Colored slab on left */}
                    <div
                      className="w-16 h-full flex-shrink-0 flex items-center justify-center"
                      style={{ background: card.gradient }}
                    >
                      <Icon size={22} className="text-white" strokeWidth={2.25} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sp-white font-semibold text-sm truncate">
                        {card.title}
                      </p>
                      <p className="text-sp-subdued text-xs mt-0.5 truncate">
                        {card.subtitle}
                      </p>
                    </div>
                    {/* Play chip floats over the card so it never squeezes the text */}
                    <div
                      className={cn(
                        "absolute right-3 top-1/2 -translate-y-1/2",
                        "w-9 h-9 rounded-full bg-sp-green",
                        "flex items-center justify-center",
                        "opacity-0 group-hover:opacity-100 translate-y-[-40%] group-hover:translate-y-[-50%]",
                        "transition-all duration-200 shadow-lg"
                      )}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="black"
                        className="w-4 h-4 ml-0.5"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* About me card — label lives inside the card to save a heading row */}
          <motion.div
            variants={staggerContainer(0.08, 0.4)}
            initial="hidden"
            animate="show"
          >
            <motion.div
              className="bg-sp-card rounded-xl p-5"
              variants={fadeInUp}
            >
              <p className="text-sp-subdued text-[11px] font-bold uppercase tracking-[0.2em] mb-2.5">
                About me
              </p>
              <p className="text-sp-text text-sm leading-normal">
                Hey! I&apos;m Justin Kim — a Computer Science and Data Science
                student at UW&ndash;Madison who builds and deploys full-stack
                systems and production backend infrastructure. I care a lot
                about understanding how systems actually work under the hood,
                from distributed services to model training pipelines.
              </p>
              <p className="text-sp-text text-sm leading-normal mt-2.5">
                I&apos;m especially interested in machine learning,
                particularly <span className="text-sp-green font-medium">LLMs</span>{" "}
                and{" "}
                <span className="text-sp-green font-medium">
                  agentic systems
                </span>
                . I&apos;ve built language models from scratch to deeply
                understand their mechanics, and I&apos;m a member of the{" "}
                <span className="text-sp-green font-medium">
                  WAISI AI Safety Fundamentals
                </span>{" "}
                technical cohort, where I explore alignment and long-term
                safety in advanced AI systems.
              </p>
              <p className="text-sp-text text-sm leading-normal mt-2.5">
                I&apos;m starting my{" "}
                <span className="text-sp-green font-medium">
                  M.S. in Computer Science
                </span>{" "}
                (Machine Learning specialization) at{" "}
                <span className="text-sp-green font-medium">
                  Georgia Tech
                </span>{" "}
                in Spring 2027, part-time alongside full-time work.
              </p>
              <div className="mt-3.5 flex gap-3">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={cn(
                    "px-5 py-2 rounded-full bg-sp-green hover:bg-sp-green-hover",
                    "text-black text-sm font-bold transition-colors"
                  )}
                >
                  Get in touch
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "px-5 py-2 rounded-full border border-sp-card-hover",
                    "text-sp-white text-sm font-medium hover:border-sp-white transition-colors"
                  )}
                >
                  Resume
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Live Spotify showcase (the site's party trick) — stacks below the
            intro on mobile/tablet instead of disappearing, sits in its own
            column on desktop */}
        <div className="max-w-sm lg:max-w-none lg:-mt-[70px]">
          <NowPlayingCard />
        </div>
      </div>
    </section>
  );
}
