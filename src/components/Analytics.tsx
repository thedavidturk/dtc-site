"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;
const TIME_THRESHOLDS = [30, 60, 180, 300] as const;

export default function Analytics() {
  const pathname = usePathname();
  const scrollFired = useRef<Set<number>>(new Set());
  const timeFired = useRef<Set<number>>(new Set());
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Reset tracking on route change
    scrollFired.current = new Set();
    timeFired.current = new Set();
    timers.current.forEach(clearTimeout);
    timers.current = [];

    // --- Scroll depth tracking ---
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      for (const threshold of SCROLL_THRESHOLDS) {
        if (scrollPercent >= threshold && !scrollFired.current.has(threshold)) {
          scrollFired.current.add(threshold);
          trackEvent("scroll_depth", {
            depth_threshold: String(threshold),
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // --- Time on page tracking ---
    for (const seconds of TIME_THRESHOLDS) {
      const timer = setTimeout(() => {
        if (!timeFired.current.has(seconds)) {
          timeFired.current.add(seconds);
          trackEvent("time_on_page", { seconds });
        }
      }, seconds * 1000);
      timers.current.push(timer);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [pathname]);

  return null;
}
