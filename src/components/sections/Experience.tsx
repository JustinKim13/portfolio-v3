"use client";

import { motion } from "framer-motion";
import { wrappedYears } from "@/constants";
import type { WrappedYear } from "@/types";
import { staggerContainer, fadeInUp } from "@/lib/motion";

function WrappedCard({ data, index }: { data: WrappedYear; index: number }) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden flex flex-col p-8 cursor-default"
      style={{ background: data.gradient, minHeight: "580px" }}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.12,
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Label + Year */}
        <div className="mb-4">
          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.4em] mb-1">
            Spotify Wrapped
          </p>
          <h2
            className="font-black text-white leading-none"
            style={{ fontSize: "clamp(72px, 9vw, 108px)" }}
          >
            {data.year}
          </h2>
        </div>

        {/* Role */}
        <div className="mb-6">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
            Your #1 Role
          </p>
          <p className="text-white font-bold text-xl leading-snug">
            {data.headline}
          </p>
        </div>

        {/* Tracks — push to fill remaining space */}
        <ul className="space-y-2 flex-1">
          {data.points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3"
            >
              <span className="text-white/40 text-xs font-mono w-4 flex-shrink-0 pt-0.5">
                {i + 1}
              </span>
              <span className="text-white text-sm leading-snug font-medium">
                {point}
              </span>
            </li>
          ))}
        </ul>

        {/* Bottom stat badge */}
        <div className="mt-6 self-start bg-white/20 backdrop-blur-sm rounded-full px-5 py-2">
          <p className="text-white text-xs font-bold">{data.stat}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section header */}
        <motion.div
          className="mb-10"
          variants={staggerContainer(0.1, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.p
            className="text-sp-subdued text-xs uppercase tracking-widest mb-2"
            variants={fadeInUp}
          >
            Spotify Wrapped
          </motion.p>
          <motion.h2
            className="text-white text-4xl md:text-5xl font-black"
            variants={fadeInUp}
          >
            Year in Review
          </motion.h2>
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wrappedYears.map((yearData, i) => (
            <WrappedCard key={yearData.year} data={yearData} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
