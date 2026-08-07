"use client";

import { useState } from "react";
import Link from "./TransitionLink";
import { m, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Perspectives", href: "#insights" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Past the top of the page the bar turns to frosted obsidian glass:
     the hero's transmission material, borrowed for the chrome. */
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-prism border-b ${
        scrolled || mobileOpen
          ? "bg-obsidian/60 backdrop-blur-xl border-bone/10"
          : "bg-obsidian/90 border-transparent"
      }`}
    >
      {/* Thin top bar: wordmark left, ghost links right, outlined Contact terminating the row */}
      <div className="section-container flex items-center h-16 md:h-20">
        <Link href="/" className="shrink-0">
          <span className="font-body text-[20px] font-normal leading-none tracking-[-0.01em] text-bone">
            DT+C
          </span>
        </Link>

        {/* Desktop ghost links: right-aligned row */}
        <nav
          className="hidden lg:flex flex-1 items-center justify-end gap-10 px-10"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="/#contact" className="btn-primary hidden lg:inline-flex shrink-0">
          Contact
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden ml-auto flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <m.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.5, ease: [0.52, 0.01, 0, 1] }}
            className="block w-6 h-px bg-bone"
          />
          <m.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.52, 0.01, 0, 1] }}
            className="block w-6 h-px bg-bone"
          />
          <m.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.5, ease: [0.52, 0.01, 0, 1] }}
            className="block w-6 h-px bg-bone"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <m.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.52, 0.01, 0, 1] }}
            className="lg:hidden overflow-hidden bg-obsidian border-t border-ash-border"
            aria-label="Primary mobile"
          >
            <div className="section-container py-8 flex flex-col">
              {navLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-4 font-body text-body-sm font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism hover:text-fog-blue ${
                    i > 0 ? "border-t border-ash-border" : ""
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary text-center mt-6"
              >
                Contact
              </a>
              <p className="mt-8 text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
                Future-proof creative
                <br />
                for forward-thinking brands
              </p>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
