"use client";

import { useState, useEffect } from "react";
import Link from "./TransitionLink";
import { m, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Perspectives", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-bone-white transition-[border-color] duration-300 border-b ${
        scrolled ? "border-black/10" : "border-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        {/* Lockup: circular mark + two-line eyebrow */}
        <Link href="/" className="flex items-center gap-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-black text-bone-white text-[10px] font-normal tracking-tight">
            DT+C
          </span>
          <span className="hidden sm:block text-[10px] leading-[1.5] uppercase tracking-[0.08em] text-ink-black">
            Future-proof creative
            <br />
            for forward-thinking brands
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-caption uppercase tracking-[0.08em] text-graphite hover:text-ink-black transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            className="inline-flex items-center justify-center rounded-pill bg-ink-black px-6 py-2.5 text-sm font-normal text-bone-white transition-opacity duration-300 hover:opacity-75"
          >
            Book a Call
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <m.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-ink-black"
          />
          <m.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-ink-black"
          />
          <m.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-ink-black"
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
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-bone-white border-b border-black/10"
          >
            <div className="section-container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-light text-ink-black hover:text-graphite transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary text-center mt-2"
              >
                Book a Call
              </a>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
