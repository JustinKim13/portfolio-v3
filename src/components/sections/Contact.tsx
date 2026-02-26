"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Mail, Github, Linkedin, Music2 } from "lucide-react";
import { useNowPlaying } from "@/hooks/useNowPlaying";
import { EqualizerBars } from "@/components/ui/EqualizerBars";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/JustinKim13",
    icon: Github,
    color: "#ffffff",
    description: "See my code",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/justin-kim13",
    icon: Linkedin,
    color: "#0077b5",
    description: "Connect professionally",
  },
  {
    label: "Email",
    href: "mailto:jtkimmn13@gmail.com",
    icon: Mail,
    color: "#1db954",
    description: "jtkimmn13@gmail.com",
  },
];

export function Contact() {
  const { data } = useNowPlaying();

  return (
    <section
      id="contact"
      className="px-6 py-20 md:px-12 md:py-32 min-h-[60vh] flex flex-col justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 80% 80%, rgba(29, 185, 84, 0.06) 0%, transparent 60%)",
      }}
    >
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-xl"
      >
        {/* Spotify follow concept */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          variants={fadeInUp}
        >
          <div className="w-24 h-24 rounded-full bg-sp-green flex items-center justify-center flex-shrink-0">
            <span className="text-3xl font-black text-black">JK</span>
          </div>
          <div>
            <p className="text-sp-subdued text-xs uppercase tracking-widest mb-1">
              Artist
            </p>
            <h2 className="text-sp-white font-black text-3xl md:text-4xl">
              Justin Kim
            </h2>
            <p className="text-sp-subdued text-sm mt-1">
              CS + DS @ UW-Madison · Incoming SWE @ Capital One
            </p>
          </div>
        </motion.div>

        {/* Follow buttons */}
        <motion.div className="flex gap-3 mb-10" variants={fadeInUp}>
          <a
            href="mailto:jtkimmn13@gmail.com"
            className={cn(
              "px-6 py-2.5 rounded-full font-bold text-sm",
              "bg-sp-green hover:bg-sp-green-hover text-black",
              "transition-colors"
            )}
          >
            Follow
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "px-6 py-2.5 rounded-full font-medium text-sm",
              "border border-sp-card-hover text-sp-white",
              "hover:border-sp-white transition-colors"
            )}
          >
            Resume
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="space-y-3 mb-10"
          variants={staggerContainer(0.08, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {socialLinks.map(({ label, href, icon: Icon, color, description }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              variants={fadeInUp}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl",
                "bg-sp-card hover:bg-sp-card-hover transition-colors group"
              )}
              data-cursor="hover"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${color}22` }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <div className="flex-1">
                <p className="text-sp-white font-medium text-sm">{label}</p>
                <p className="text-sp-subdued text-xs">{description}</p>
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4 text-sp-subdued group-hover:text-sp-white transition-colors"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.a>
          ))}
        </motion.div>

        {/* Now playing mini widget */}
        {data.isPlaying && data.title && (
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-3 p-3 rounded-xl bg-sp-card border border-sp-card-hover"
          >
            <Music2 size={16} className="text-sp-green flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sp-subdued text-xs">Now listening to</p>
              <p className="text-sp-white text-sm font-medium truncate">
                {data.title} — {data.artist}
              </p>
            </div>
            <EqualizerBars isPlaying={data.isPlaying} />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
