"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    // Batch DOM writes into one per animation frame instead of once per
    // mousemove — mousemove can fire far faster than 60fps on some devices.
    let rafId: number | null = null;
    let latestX = 0;
    let latestY = 0;

    const applyPosition = () => {
      rafId = null;
      document.documentElement.style.setProperty("--cx", `${latestX}px`);
      document.documentElement.style.setProperty("--cy", `${latestY}px`);
      if (cursorRef.current) {
        cursorRef.current.style.left = `${latestX}px`;
        cursorRef.current.style.top = `${latestY}px`;
      }
    };

    const handleMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      latestX = e.clientX;
      latestY = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(applyPosition);
      }
    };

    const handleEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "hover"
      ) {
        setIsHovering(true);
      }
    };

    const handleLeave = () => setIsHovering(false);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          backgroundColor: "var(--sp-green)",
          mixBlendMode: "difference",
        }}
        animate={{
          width: isHovering ? 40 : 12,
          height: isHovering ? 40 : 12,
          opacity: isVisible ? 1 : 0,
          x: "-50%",
          y: "-50%",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      <motion.div
        ref={ringRef}
        className="custom-cursor-ring pointer-events-none"
        animate={{
          opacity: isVisible ? (isHovering ? 0 : 0.5) : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
