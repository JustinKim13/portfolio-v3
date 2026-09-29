"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TrackRow } from "@/components/ui/TrackRow";
import { projects } from "@/constants";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { Clock } from "lucide-react";

export function Projects() {
  const liveCount = projects.filter((p) => p.live).length;
  const collage = projects.filter((p) => p.image).slice(0, 4);

  return (
    <section id="projects" className="px-6 py-20 md:px-12 md:py-32">
      {/* Header — Playlist style */}
      <motion.div
        className="flex items-end gap-6 mb-8"
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {/* Cover art — 2x2 collage of real project screenshots */}
        <motion.div
          className="w-40 h-40 rounded-lg flex-shrink-0 shadow-2xl hidden md:grid grid-cols-2 grid-rows-2 overflow-hidden"
          variants={fadeInUp}
        >
          {collage.map((project) => (
            <div key={project.id} className="relative">
              <Image
                src={project.image}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>

        {/* Playlist info */}
        <motion.div variants={fadeInUp}>
          <p className="text-sp-subdued text-xs uppercase tracking-widest mb-1">
            Playlist
          </p>
          <h2 className="text-sp-white font-black text-4xl md:text-6xl mb-2">
            Top Projects
          </h2>
          <p className="text-sp-subdued text-sm">
            Justin Kim • {projects.length} projects • {liveCount} live to try
            • tap a track for the full story
          </p>
        </motion.div>
      </motion.div>

      {/* Table header */}
      <div className="grid grid-cols-[24px_1fr_100px] sm:grid-cols-[24px_1fr_64px_100px] gap-4 px-4 pb-2 mb-2 border-b border-sp-card">
        <span className="text-sp-subdued text-xs text-center">#</span>
        <span className="text-sp-subdued text-xs uppercase tracking-widest">
          Title
        </span>
        <span className="hidden sm:flex text-sp-subdued text-xs items-center gap-1 justify-end">
          <Clock size={12} /> Dur.
        </span>
        <span className="text-sp-subdued text-xs uppercase tracking-widest text-right">
          Links
        </span>
      </div>

      {/* Track list */}
      <motion.div
        variants={staggerContainer(0.05, 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {projects.map((project, i) => (
          <motion.div key={project.id} variants={fadeInUp}>
            <TrackRow project={project} index={i} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
