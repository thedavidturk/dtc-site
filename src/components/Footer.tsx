import Link from "./TransitionLink";
import { site } from "@/content/work";

const footerLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Perspectives", href: "/insights" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ash-border">
      <div className="section-container py-14 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-4">
            <Link href="/" className="shrink-0">
              <span className="font-body text-[20px] font-normal leading-none tracking-[-0.01em] text-bone">
                David Turk <span className="text-fog-blue">Creative</span>
              </span>
            </Link>
            <p className="max-w-[440px] font-body text-body-sm font-normal text-fog-blue">
              Creative direction, film, 3D &amp; AI. Miami.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="font-body text-body-sm font-normal text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
            >
              {site.email}
            </a>
          </div>

          <div className="flex flex-col gap-8 lg:items-end">
            <nav className="flex flex-wrap gap-x-8 gap-y-4" aria-label="Footer">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
            >
              LinkedIn &#8599;
            </a>
          </div>
        </div>

        <p className="mt-14 font-body text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
          &copy; {new Date().getFullYear()} {site.legalName}
        </p>
      </div>
    </footer>
  );
}
