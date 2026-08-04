"use client";

import { m } from "framer-motion";

/**
 * LineReveal -- masked slide-up reveal for a full headline line.
 *
 * The broadside treatment: each line rises out of an overflow-hidden
 * mask like type coming off a press. The viewport observer sits on the
 * mask (which is always visible); the translated child animates via
 * variant propagation. Observing the child directly would never fire:
 * translated 110% inside an overflow-hidden parent, it has zero
 * intersection with the viewport.
 */
export default function LineReveal({
  children,
  delay = 0,
  className = "",
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <m.span
      className={`block overflow-hidden pt-[0.1em] pb-[0.16em] -mt-[0.1em] -mb-[0.16em] pr-[0.1em] -mr-[0.1em] ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
    >
      <m.span
        className="block"
        variants={{
          hidden: { y: "110%" },
          visible: {
            y: 0,
            transition: {
              duration: 0.9,
              delay,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }}
      >
        {children}
      </m.span>
    </m.span>
  );
}
