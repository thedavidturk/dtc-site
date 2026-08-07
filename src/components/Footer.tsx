"use client";

import Link from "./TransitionLink";

const footerLinks = [
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Perspectives", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ash-border">
      {/* Two-column metadata band: wordmark + tagline left, ghost links + glyphs right */}
      <div className="section-container py-14 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-4">
            <Link href="/" className="shrink-0">
              <span className="font-body text-[20px] font-normal leading-none tracking-[-0.01em] text-bone">
                DT+C
              </span>
            </Link>
            <p className="max-w-[440px] font-body text-body-sm font-normal text-fog-blue">
              Future-proof creative for forward-thinking brands.
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:items-end">
            <nav
              className="flex flex-wrap gap-x-8 gap-y-4"
              aria-label="Footer"
            >
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:david@davidturkcreative.com"
                className="text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-14 font-body text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
          &copy; 2026 DT+C. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
