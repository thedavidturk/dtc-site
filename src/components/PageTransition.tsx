"use client";

import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {/* Content wrapper with fade + slide animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>

      {/* Cinematic wipe overlay — slides up from bottom, then continues off the top */}
      <motion.div
        className="fixed inset-0 z-[100] bg-deep-space origin-bottom pointer-events-none"
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Subtle electric-indigo glow line at the leading edge */}
        <div className="absolute top-0 left-0 right-0 h-px bg-electric-indigo shadow-[0_0_8px_rgba(99,102,241,0.6),0_0_20px_rgba(99,102,241,0.3)]" />
      </motion.div>
    </>
  );
}
