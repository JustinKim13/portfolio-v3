"use client";

import { motion } from "framer-motion";
import { getGreeting } from "@/lib/utils";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

const featuredCards = [
  {
    id: "experience",
    title: "Experience",
    subtitle: "Career timeline",
    gradient: "linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)",
    tracks: "4 years",
    href: "#experience",
  },
  {
    id: "projects",
    title: "Top Projects",
    subtitle: "Featured work",
    gradient: "linear-gradient(135deg, #00b894 0%, #00cec9 100%)",
    tracks: "4 projects",
    href: "#projects",
  },
  {
    id: "skills",
    title: "Tech Stack",
    subtitle: "Skills & tools",
    gradient: "linear-gradient(135deg, #ff9f43 0%, #ee5a24 100%)",
    tracks: "20+ skills",
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
      className="min-h-screen px-6 py-10 md:px-12"
      style={{
        background:
          "radial-gradient(ellipse at 20% 20%, rgba(29, 185, 84, 0.08) 0%, transparent 60%), var(--sp-dark)",
      }}
    >
      {/* Greeting header */}
      <motion.div
        className="mb-8"
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-sp-white font-bold text-3xl md:text-4xl"
          variants={fadeInUp}
        >
          {greeting}, I&apos;m Justin
        </motion.h1>
        <motion.p className="text-sp-subdued mt-1" variants={fadeInUp}>
          CS + DS @ UW-Madison | Incoming SWE Intern @ Capital One 
        </motion.p>
      </motion.div>

      {/* Quick stats bar */}
      <motion.div
        className="flex gap-6 mb-10 text-sm"
        variants={staggerContainer(0.08, 0.2)}
        initial="hidden"
        animate="show"
      >
        {[
          { label: "Projects Shipped", value: "4+" },
          { label: "Internships", value: "3+" },
          { label: "GPA", value: "3.8" },
          { label: "Open to Work", value: "Yes" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            className="flex flex-col"
            variants={fadeInUp}
          >
            <span className="text-sp-white font-bold text-xl">
              {stat.value}
            </span>
            <span className="text-sp-subdued text-xs">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Featured Playlist Cards */}
      <motion.div
        className="mb-10"
        variants={staggerContainer(0.05, 0.3)}
        initial="hidden"
        animate="show"
      >
        <motion.h2
          className="text-sp-white font-bold text-xl mb-4"
          variants={fadeInUp}
        >
          Jump in
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {featuredCards.map((card) => (
            <motion.button
              key={card.id}
              variants={scaleIn}
              onClick={() => handleCardClick(card.href)}
              className={cn(
                "relative flex items-center gap-4 rounded-md overflow-hidden",
                "bg-sp-card hover:bg-sp-card-hover transition-colors text-left",
                "h-16 pr-4 group"
              )}
              data-cursor="hover"
            >
              {/* Colored slab on left */}
              <div
                className="w-16 h-full flex-shrink-0 flex items-center justify-center"
                style={{ background: card.gradient }}
              >
                <span className="text-white text-xl font-black">
                  {card.title[0]}
                </span>
              </div>
              <span className="text-sp-white font-semibold text-sm">
                {card.title}
              </span>
              <div
                className={cn(
                  "ml-auto w-10 h-10 rounded-full bg-sp-green",
                  "flex items-center justify-center",
                  "opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0",
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
          ))}
        </div>
      </motion.div>

      {/* Recently Played / About me card */}
      <motion.div
        variants={staggerContainer(0.08, 0.5)}
        initial="hidden"
        animate="show"
      >
        <motion.h2
          className="text-sp-white font-bold text-xl mb-4"
          variants={fadeInUp}
        >
          About me
        </motion.h2>
        <motion.div
          className="bg-sp-card rounded-xl p-6 max-w-2xl"
          variants={fadeInUp}
        >
          <p className="text-sp-text leading-relaxed">
            Hey! I&apos;m Justin Kim — a CS student passionate about building
            products at the intersection of{" "}
            <span className="text-sp-green font-medium">
              software engineering
            </span>{" "}
            and{" "}
            <span className="text-sp-green font-medium">
              machine learning
            </span>
            . I love crafting polished UIs, designing efficient systems, and
            training models that solve real problems.
          </p>
          <p className="text-sp-text leading-relaxed mt-3">
            When I&apos;m not coding, you&apos;ll find me discovering new music
            (check the player below), playing chess, or thinking about how AI
            will reshape software development.
          </p>
          <div className="mt-4 flex gap-3">
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
    </section>
  );
}
