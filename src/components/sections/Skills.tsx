"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillGenres } from "@/constants";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

const pillVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 320,
      damping: 22,
      delay: i * 0.07,
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 24,
      delay: i * 0.1,
    },
  }),
};

export function Skills() {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const activeData = skillGenres.find((g) => g.name === activeGenre);

  return (
    <section id="skills" className="px-6 py-20 md:px-12 md:py-32">
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-10"
      >
        <motion.p
          className="text-sp-subdued text-xs uppercase tracking-widest mb-2"
          variants={fadeInUp}
        >
          Wrapped — Tech Edition
        </motion.p>
        <motion.h2
          className="text-sp-white font-black text-4xl md:text-5xl"
          variants={fadeInUp}
        >
          Your Top Genres
        </motion.h2>
        <motion.p className="text-sp-subdued mt-2" variants={fadeInUp}>
          Click a genre to see the full breakdown
        </motion.p>
      </motion.div>

      {/* Genre pills — spring pop-in */}
      <motion.div
        className="flex flex-wrap gap-3 mb-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {skillGenres.map((genre, i) => (
          <motion.button
            key={genre.name}
            custom={i}
            variants={pillVariants}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() =>
              setActiveGenre(activeGenre === genre.name ? null : genre.name)
            }
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-semibold",
              "border transition-colors duration-200"
            )}
            style={{
              backgroundColor:
                activeGenre === genre.name ? genre.color : genre.bgColor,
              color: activeGenre === genre.name ? "#000" : genre.color,
              borderColor: genre.color,
            }}
            data-cursor="hover"
          >
            {genre.name}
            <span className="ml-2 opacity-60 text-xs">
              {genre.skills.length}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Expanded skill list */}
      <AnimatePresence mode="wait">
        {activeData && (
          <motion.div
            key={activeData.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-sp-card rounded-xl p-6"
          >
            <h3
              className="font-bold text-xl mb-4"
              style={{ color: activeData.color }}
            >
              {activeData.name}
            </h3>
            <motion.div
              className="flex flex-wrap gap-2"
              variants={staggerContainer(0.05)}
              initial="hidden"
              animate="show"
            >
              {activeData.skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={scaleIn}
                  className="px-3 py-1.5 rounded-md text-sm text-sp-white font-medium"
                  style={{ backgroundColor: `${activeData.color}22` }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All skills grid */}
      <AnimatePresence>
        {!activeGenre && (
          <motion.div
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {skillGenres.map((genre, i) => (
              <motion.div
                key={genre.name}
                custom={i}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  boxShadow: `0 8px 32px ${genre.color}33`,
                  borderColor: genre.color,
                }}
                onClick={() => setActiveGenre(genre.name)}
                className="bg-sp-card rounded-xl p-4 cursor-pointer border border-transparent transition-colors"
                data-cursor="hover"
              >
                <div
                  className="w-10 h-10 rounded-full mb-3 flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: genre.bgColor,
                    color: genre.color,
                  }}
                >
                  {genre.skills.length}
                </div>
                <h4
                  className="font-semibold text-sm mb-1"
                  style={{ color: genre.color }}
                >
                  {genre.name}
                </h4>
                <p className="text-sp-subdued text-xs">
                  {genre.skills.slice(0, 3).join(", ")}
                  {genre.skills.length > 3
                    ? ` +${genre.skills.length - 3} more`
                    : ""}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
