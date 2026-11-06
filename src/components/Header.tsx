"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "./TransitionLink";
import { site } from "@/content/work";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

/**
 * Wordmark left (the business, with the person's name leading), two
 * ghost links, and Contact always visible, including on phones.
 */
export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-prism ${
        scrolled || mobileOpen
          ? "border-bone/10 bg-obsidian/75 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="section-container flex h-16 items-center md:h-20">
        <Link href="/" className="shrink-0" aria-label={`${site.studio}, home`}>
          <span className="font-body text-[18px] font-normal leading-none tracking-[-0.01em] text-bone md:text-[20px]">
            David Turk <span className="text-fog-blue">Creative</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-10 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`font-body text-sm font-normal uppercase tracking-[0.02em] transition-colors duration-500 ease-prism hover:text-fog-blue ${
                isActive(link.href) ? "text-fog-blue" : "text-bone"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary">
            Contact
          </Link>
        </nav>

        {/* Phones: Contact stays visible next to the menu toggle */}
        <div className="ml-auto flex items-center gap-3 md:hidden">
          <Link href="/contact" className="btn-primary px-3 py-[7px]">
            Contact
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block h-px w-6 bg-bone transition-transform duration-500 ease-prism ${
                mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-bone transition-transform duration-500 ease-prism ${
                mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-menu" className="border-t border-ash-border bg-obsidian md:hidden" aria-label="Primary mobile">
          <div className="section-container flex flex-col py-6">
            {[...navLinks, { label: "Contact", href: "/contact" }].map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-4 font-body text-body-sm font-normal uppercase tracking-[0.02em] text-bone ${
                  i > 0 ? "border-t border-ash-border" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="mt-6 font-body text-body-sm font-normal text-fog-blue"
            >
              {site.email}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
