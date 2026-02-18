"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  mode?: "word" | "character";
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export default function TextReveal({
  text,
  as: Tag = "h2",
  className,
  mode = "word",
  delay = 0,
  staggerDelay = 0.04,
  once = true,
}: TextRevealProps) {
  const segments = useMemo(() => {
    if (mode === "character") {
      return text.split("");
    }
    return text.split(" ");
  }, [text, mode]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const segmentVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-100px" }}
      >
        {segments.map((segment, index) => (
          <span
            key={index}
            className="overflow-hidden inline-block"
          >
            <motion.span
              className="inline-block"
              variants={segmentVariants}
            >
              {segment}
            </motion.span>
            {mode === "word" && index < segments.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
