"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { staggerContainer, fadeInUp } from "@/lib/motion";

interface TrackRowProps {
  project: Project;
  index: number;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function TrackRow({ project, index }: TrackRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = `track-title-${project.id}`;

  // Modal a11y: move focus in on open, trap Tab inside, close on Escape,
  // and hand focus back to the row that opened it.
  useEffect(() => {
    if (!isExpanded) return;

    const trigger = rowRef.current;
    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [isExpanded]);

  return (
    <>
      <motion.div
        ref={rowRef}
        layoutId={`track-${project.id}`}
        role="button"
        tabIndex={0}
        aria-label={`View ${project.title} details`}
        className={cn(
          "grid items-center gap-4 px-4 py-3 rounded-md cursor-pointer",
          "hover:bg-sp-card/50 transition-colors group",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-sp-green focus-visible:ring-offset-2 focus-visible:ring-offset-sp-dark",
          "grid-cols-[24px_1fr_100px] sm:grid-cols-[24px_1fr_64px_100px]"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded(true);
          }
        }}
        data-cursor="hover"
      >
        {/* Track number / play icon */}
        <div className="w-6 text-center">
          <AnimatePresence mode="wait">
            {isHovered ? (
              <motion.div
                key="play"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.15 }}
              >
                <Play size={14} className="text-sp-white fill-sp-white" />
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

        {/* Art + title + description + stack */}
        <div className="flex items-center gap-4 min-w-0">
          {project.image && (
            <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-sp-card shadow-md">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sp-white text-[15px] font-semibold truncate group-hover:text-sp-green transition-colors">
              {project.title}
            </p>
            <p className="text-sp-text text-xs truncate mt-0.5">
              {project.description}
            </p>
            <p className="text-sp-subdued/80 text-[11px] font-mono truncate mt-1">
              {project.tags.map((t) => t.name).join(" · ")}
            </p>
          </div>
        </div>

        {/* Duration */}
        <span className="hidden sm:block text-sp-subdued text-sm font-mono text-right">
          {project.duration}
        </span>

        {/* Links — always visible; a recruiter should never have to hover */}
        <div
          className="flex items-center gap-1.5 justify-end"
          onClick={(e) => e.stopPropagation()}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center",
                "bg-sp-card text-sp-subdued",
                "hover:bg-sp-card-hover hover:text-sp-white transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-sp-green"
              )}
              data-cursor="hover"
            >
              <Github size={14} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center",
                "bg-sp-card text-sp-subdued",
                "hover:bg-sp-green hover:text-black transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-sp-green"
              )}
              data-cursor="hover"
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
              ref={modalRef}
              layoutId={`track-${project.id}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex={-1}
              className={cn(
                "fixed inset-4 md:inset-[10%] z-50 rounded-xl overflow-hidden",
                "bg-sp-dark border border-sp-card",
                "flex flex-col focus:outline-none"
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
                  <h3
                    id={titleId}
                    className="text-sp-white text-3xl font-bold mb-2"
                  >
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

                <motion.div className="flex gap-3" variants={fadeInUp}>
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
