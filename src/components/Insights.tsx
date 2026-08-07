"use client";

import Link from "./TransitionLink";
import { m } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface BlogPost {
  title: string;
  subtitle: string;
  category: string;
  slug: string;
  month: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const posts: BlogPost[] = [
  {
    title: "The Campaign You Can Walk Through: World Models Turn Brand Films Into Places",
    subtitle:
      "Real-time world models like Genie 3 just turned brand worlds from something audiences watch into somewhere they can go. What that means for campaigns.",
    category: "AI + WORLDS",
    slug: "playable-brand-worlds",
    month: "AUG 2026",
  },
  {
    title: "One Brief, a Thousand Variants: Creative Ops in the Agent Era",
    subtitle:
      "The platforms just industrialized creative variation. Orchestration and governance, not generation, are the new job.",
    category: "AI + OPERATIONS",
    slug: "agentic-creative-ops",
    month: "AUG 2026",
  },
  {
    title: "Taste Is the Bottleneck: Creative Direction in the Slop Flood",
    subtitle:
      "Audiences got fluent at spotting machine-made sameness this year. The answer is more direction, not less AI.",
    category: "CRAFT + AI",
    slug: "taste-is-the-bottleneck",
    month: "AUG 2026",
  },
  {
    title: "After Sora: Why the Best Brand Video Now Comes From a Stack, Not a Single Tool",
    subtitle:
      "OpenAI shut Sora down in March 2026. The studios making the best brand video now run a stack of tools, not one. Here is how we orchestrate it.",
    category: "AI + VIDEO",
    slug: "ai-video-stack",
    month: "JUN 2026",
  },
  {
    title: "Native Audio Changes Everything: The Year AI Learned to Score Its Own Footage",
    subtitle:
      "AI video models now generate matching sound in the same pass as the picture, collapsing a whole post stage. Where it wins, and where human sound direction still does.",
    category: "AI + PRODUCTION",
    slug: "ai-native-audio",
    month: "JUN 2026",
  },
  {
    title: "Zero-Click Is Here: How Brands Get Found When Nobody Visits Your Website",
    subtitle:
      "Discovery has moved from ranking on Google to being the source an AI cites. How brands stay found in a zero-click world.",
    category: "AI + DISCOVERY",
    slug: "zero-click-visibility",
    month: "JUN 2026",
  },
];

// ---------------------------------------------------------------------------
// Publication date for the current batch of Perspectives
// ---------------------------------------------------------------------------
const liveDate = "AUGUST 2026";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const prismEase = [0.52, 0.01, 0, 1] as const;

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: prismEase },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: prismEase },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Insights() {
  return (
    <section id="insights" className="section-padding">
      <div className="section-container">
        {/* Section opener: eyebrow and statement, hierarchy from size alone */}
        <m.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20 md:mb-28"
        >
          <p className="text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue">
            Perspectives
          </p>
          <h2 className="mt-8 max-w-[900px] font-headline text-heading-lg font-normal headline-red">
            Thoughts on AI-driven production, creative technology, and the future of brand content.
          </h2>
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between md:gap-8">
            <p className="text-body-sm font-normal text-fog-blue">
              New perspectives every month.
            </p>
            <div className="flex items-baseline gap-8">
              <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue whitespace-nowrap">
                {liveDate}
              </p>
              <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue whitespace-nowrap">
                {posts.length} Articles
              </p>
            </div>
          </div>
        </m.div>

        {/* The index: one listing row per article, hairline-ruled */}
        <div className="border-b border-ash-border">
          {posts.map((post) => (
            <m.article
              key={post.slug}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="border-t border-ash-border"
            >
              <Link
                href={`/insights/${post.slug}`}
                className="group grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:gap-8 md:py-12"
              >
                {/* Title link, category and date, one-line deck */}
                <div className="md:col-span-10">
                  <h3 className="max-w-[900px] text-heading-sm font-normal text-bone transition-colors duration-500 ease-prism group-hover:text-fog-blue">
                    {post.title}
                  </h3>
                  <p className="pt-[20px] text-body font-normal uppercase tracking-[0.02em] text-fog-blue">
                    {post.category}, {post.month}
                  </p>
                  <p className="mt-4 max-w-[640px] text-body-sm font-normal text-fog-blue">
                    {post.subtitle}
                  </p>
                </div>

                {/* Ghost read link at the row end */}
                <div className="md:col-span-2 flex items-start md:justify-end">
                  <span className="inline-flex items-center gap-2 text-caption font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism group-hover:text-fog-blue">
                    Read
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
