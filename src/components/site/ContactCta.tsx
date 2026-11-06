import Link from "@/components/TransitionLink";
import { site } from "@/content/work";
import Reveal from "./Reveal";

/** The closing call to action: one line, one email. */
export default function ContactCta() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-ash-border section-padding">
      <div className="section-container">
        <Reveal>
          <h2 className="font-anton text-display-sm uppercase tracking-normal text-bone">
            Have something in mind?
            <br />
            <span className="text-fog-blue">Let&rsquo;s make it.</span>
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="mt-10 inline-block font-body text-[clamp(1.25rem,5.4vw,3.5rem)] font-normal leading-[1.15] text-bone transition-colors duration-500 ease-prism [overflow-wrap:anywhere] hover:text-fog-blue"
          >
            {site.email}
          </a>
          <p className="mt-8">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm font-normal uppercase tracking-[0.02em] text-fog-blue transition-colors duration-500 ease-prism hover:text-bone"
            >
              Or tell me about it here
              <span aria-hidden="true" className="transition-transform duration-500 ease-prism group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
