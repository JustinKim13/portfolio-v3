"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { scaleIn, staggerContainer, fadeInUp } from "@/lib/motion";

interface TrackRowProps {
  project: Project;
  index: number;
}

export function TrackRow({ project, index }: TrackRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <motion.div
        layoutId={`track-${project.id}`}
        className={cn(
          "grid items-center gap-4 px-4 py-2 rounded-md cursor-pointer",
          "hover:bg-sp-card/50 transition-colors group",
          "grid-cols-[32px_1fr_72px_48px]"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(true)}
        data-cursor="hover"
      >
        {/* Track number / play icon */}
        <div className="w-8 text-center">
          <AnimatePresence mode="wait">
            {isHovered ? (
              <motion.div
                key="play"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.15 }}
              >
                <Play
                  size={14}
                  className="text-sp-white fill-sp-white"
                />
              </motion.div>
            ) : (
              <motion.span
                key="number"
                className="text-sp-subdued text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {index + 1}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Title + tags */}
        <div className="flex items-center gap-3 min-w-0">
          {project.image && (
            <div className="relative w-10 h-10 flex-shrink-0 rounded overflow-hidden bg-sp-card">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="40px"
                className="object-cover"
                onError={() => {}} // silently fail for missing images
              />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sp-white text-sm font-medium truncate group-hover:text-sp-green transition-colors">
              {project.title}
            </p>
            <p className="text-sp-subdued text-xs truncate">
              {project.tags.map((t) => t.name).join(" · ")}
            </p>
          </div>
        </div>

        {/* Duration */}
        <span className="text-sp-subdued text-sm font-mono text-right">
          {project.duration}
        </span>

        {/* External links */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity w-12">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-sp-subdued hover:text-sp-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={14} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-sp-subdued hover:text-sp-white transition-colors"
              aria-label="Live demo"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </motion.div>

      {/* Expanded album view modal */}
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />
            <motion.div
              layoutId={`track-${project.id}`}
              className={cn(
                "fixed inset-4 md:inset-[10%] z-50 rounded-xl overflow-hidden",
                "bg-sp-dark border border-sp-card",
                "flex flex-col"
              )}
            >
              {/* Album cover — always a top banner so landscape screenshots look great */}
              <div className="h-64 md:h-80 w-full flex-shrink-0 relative overflow-hidden">
                {(project.modalImage ?? project.image) ? (
                  <Image
                    src={project.modalImage ?? project.image}
                    alt={project.title}
                    fill
                    sizes="100vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${project.tags[0]?.color}33, ${project.tags[1]?.color ?? project.tags[0]?.color}66)`,
                    }}
                  >
                    <span className="text-6xl font-black text-white/20">
                      {project.title[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Content side */}
              <motion.div
                className="flex-1 p-6 md:p-8 overflow-y-auto"
                variants={staggerContainer(0.08, 0.15)}
                initial="hidden"
                animate="show"
              >
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-4 right-4 text-sp-subdued hover:text-sp-white transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                <motion.div variants={fadeInUp}>
                  <p className="text-sp-subdued text-xs uppercase tracking-widest mb-1">
                    Project
                  </p>
                  <h3 className="text-sp-white text-3xl font-bold mb-2">
                    {project.title}
                  </h3>
                </motion.div>

                <motion.div
                  className="flex flex-wrap gap-2 mb-4"
                  variants={fadeInUp}
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag.name}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${tag.color}22`,
                        color: tag.color,
                        border: `1px solid ${tag.color}44`,
                      }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </motion.div>

                <motion.p
                  className="text-sp-text text-sm leading-relaxed mb-6"
                  variants={fadeInUp}
                >
                  {project.longDescription}
                </motion.p>

                <motion.div
                  className="flex gap-3"
                  variants={fadeInUp}
                >
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full",
                        "bg-sp-card hover:bg-sp-card-hover text-sp-white text-sm",
                        "transition-colors"
                      )}
                    >
                      <Github size={14} />
                      View Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full",
                        "bg-sp-green hover:bg-sp-green-hover text-black text-sm font-medium",
                        "transition-colors"
                      )}
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
