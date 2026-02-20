"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

/**
 * Lazy3D — mounts children only when the container is near the viewport.
 * Unmounts when scrolled away to release WebGL contexts.
 *
 * This prevents the browser from exceeding its WebGL context limit
 * (~8-16 depending on browser/GPU), which causes tab crashes or
 * silent context loss (blank canvases).
 */
interface Lazy3DProps {
  children: ReactNode;
  /** Classes applied to the wrapper div (must preserve sizing) */
  className?: string;
  /** How far outside the viewport to pre-mount (default "500px") */
  rootMargin?: string;
  /** Inline styles for the wrapper */
  style?: React.CSSProperties;
}

export default function Lazy3D({
  children,
  className,
  rootMargin = "500px",
  style,
}: Lazy3DProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={style}>
      {visible ? children : null}
    </div>
  );
}
