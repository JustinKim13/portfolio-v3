"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { WrappedYear } from "@/types";
import { staggerContainer, fadeInUp, wrappedSlideIn } from "@/lib/motion";

interface WrappedSlideProps {
  data: WrappedYear;
  isActive: boolean;
}

export function WrappedSlide({ data, isActive }: WrappedSlideProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key={data.year}
          className="wrapped-slide text-center px-8"
          style={{ background: data.gradient }}
          variants={wrappedSlideIn}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {/* Year */}
          <motion.p
            className="text-white/40 text-lg font-bold uppercase tracking-[0.4em] mb-2"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
          >
            Spotify Wrapped
          </motion.p>

          <motion.h2
            className="font-black text-white leading-none mb-6"
            style={{ fontSize: "clamp(80px, 18vw, 160px)" }}
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.15 }}
          >
            {data.year}
          </motion.h2>

          {/* Headline */}
          <motion.div
            className="mb-8"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.25 }}
          >
            <p className="text-white/70 text-sm uppercase tracking-widest mb-1">
              Your #1 role
            </p>
            <p className="text-white font-bold text-2xl md:text-3xl">
              {data.headline}
            </p>
          </motion.div>

          {/* Track list (accomplishments) */}
          <motion.ul
            className="space-y-2 mb-8 max-w-lg mx-auto"
            variants={staggerContainer(0.08, 0.35)}
            initial="hidden"
            animate="show"
          >
            {data.points.map((point, i) => (
              <motion.li
                key={i}
                className="flex items-center gap-4 text-left bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3"
                variants={fadeInUp}
              >
                <span
                  className="text-white/50 text-sm font-mono w-5 text-right flex-shrink-0"
                >
                  {i + 1}
                </span>
                <span className="text-white text-sm font-medium leading-snug">
                  {point}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Bottom stat */}
          <motion.div
            className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-3"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.7 }}
          >
            <p className="text-white font-bold text-sm">{data.stat}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
