# David Turk Creative: design spec (binding contract)

A homepage led by the work. David Turk is the person; David Turk Creative is
the business people hire. A near-black canvas, one near-white for type, and
the projects doing most of the talking. Authority comes from scale and
space, never from effects. Confidence reads through stillness.

## Tokens (wired in tailwind.config.ts - USE THESE CLASS NAMES)

| Role | Tailwind class | Value |
|---|---|---|
| Page canvas, all bands | `bg-obsidian` | #101010 |
| Optional deep slate surface | `bg-graphite-veil` | #495764 |
| Primary text, nav, links, headings | `text-bone` | #fffdf9 |
| De-emphasized metadata, labels | `text-fog-blue` | #6f879c |
| Hairline dividers, card outlines | `border-ash-border` (1px) | #403f3f |
| Prism channels (ARTIFACT ONLY) | `prism-red / prism-cyan / prism-lime` | #ff2a2a / #2a7fff / #2aff2a |

Legacy names remap: `bone-white`=#101010 (old canvas role), `ink-black`=#fffdf9
(old text role), `graphite`/`voltage-tint`=#6f879c, `ash`=#403f3f,
`voltage`=#fffdf9. Prefer the new names in rewritten code.

HARD RULE: prism red/cyan/lime are retired from the UI. The one surviving
use is the PinnedApproach progress rail's single prism-cyan fill, a
wayfinding gauge on case studies (see "PinnedApproach" below). Two static
text colors exist: bone and fog-blue. Nothing else.

## Type (Switzer + Anton: a two-voice system)

Two typefaces carry the whole site, each with one exact, narrow job. This is
not a "pick a font per component" system: which voice a piece of type gets
is determined by its role, not by taste.

- **Switzer 400** (`font-body`/`font-headline`, same face, `font-normal`) is
  the workhorse and the default: body copy, nav, buttons, footer, metadata,
  and most headings. When unsure, this is the answer. NO font-light, no
  serif anywhere. Delete `font-serif`/`font-display`/`font-light` usages in
  files you own.
- **Switzer 600** (`font-semibold`) is the one sanctioned second weight. It
  is reserved for repeated in-section sub-headlines, always paired with
  `uppercase` and a `headline-*` channel class: each Service's headline,
  each Insight's title, each Process step, each Value Proposition (see
  Services.tsx, Process.tsx, Insights.tsx, ValuePropositions.tsx, About.tsx).
  It marks "this repeats N times in this listing," never body copy and
  never a one-off heading. Do not reach for it outside that pattern.
- **Anton** (`font-anton`, one weight, always `uppercase tracking-normal`)
  is the display/hero voice: sculptural, condensed, load-bearing scale
  rather than a text style. Reserved for the homepage hero h1, every
  project case-study h1 (`src/app/projects/*/page.tsx`), the oversized step
  numeral inside PinnedApproach, and a section's own top-level h2 when that
  section wants the hero's own authority ("Have something in mind?",
  "Questions," and similar section openers). Anton never sets body copy and
  never appears below `text-heading-sm`. Case-study h1's use `text-display-sm`
  (not the full `text-display`): big enough to carry the hero's voice,
  scaled down from the homepage's singular full-bleed statement.
- Scale carries hierarchy: `text-display` (~136px clamp, lh 1.0, -0.02em),
  `text-display-sm` (~105px clamp, lh 1.01), `text-heading-lg` (56px, lh 1.13),
  `text-heading-sm` (33px, lh 1.2, -0.01em), `text-body-lg` (22px, lh 1.2),
  `text-body` (20px, lh 1.2), `text-body-sm` (18px, lh 1.5),
  `text-caption` (15px, lh 1.2, +0.01em).
- Uppercase labels: 14-17px, `uppercase tracking-[0.02em] text-bone` (nav) or
  `text-fog-blue` (metadata). Never bold.
- Display headlines stack across multiple lines, lh 1.00-1.01, occupying
  ~50% of viewport height in heroes. Sculptural, not typographic.

## Components (the canon)

- **Ghost nav/link**: transparent, `text-bone`, uppercase 14-15px, no
  underline, no border, no padding. Hover = color shift to fog-blue only,
  `duration-500` with `ease-[cubic-bezier(0.52,0.01,0,1)]`.
- **Outlined button** (Contact / CTAs, the ONLY bordered element class):
  transparent fill, `border border-bone rounded-[5px] px-[15px] py-[9px]
  uppercase text-sm text-bone`, hover inverts to `hover:bg-bone
  hover:text-obsidian` or shifts to fog. Use `.btn-primary`. NO filled
  buttons, no pill buttons.
- **Case-study title link**: `text-heading-sm text-bone` (33px), no
  underline; below it a fog-blue service label at 20px (`text-fog-blue`),
  pt-[20px] pb-[30px]. Hover shifts title to fog-blue.
- **Eyebrow label**: uppercase 17px or 32px, weight 400, `tracking-[0.02em]`,
  bone or fog-blue.
- **Hairline divider**: `border-t border-ash-border` (1px, NOT 1.5px),
  full-width. The only border color besides the button's bone outline.
- **Media card**: image/video with `rounded-[15px] overflow-hidden` (cards
  are 15px radius; buttons are 0-5px; nothing else is rounded). Optional 1px
  ash-border outline. Captions below or beside in bone + fog-blue. No
  gradient scrims over media; no text overlaid on images.
- **Lead paragraph**: `text-body-sm` or `text-body-lg`, `text-bone`,
  `max-w-[440px]`, left-aligned. Body columns never exceed ~640px.

### PinnedApproach (director's viewport)

`src/components/PinnedApproach.tsx` is the case-study Approach section's one
earned scroll moment, wired into every project page that has an Approach
list (16 of 17; new-era-cap has no Approach section and is left alone).

- **Mechanics**: a `steps.length * 90vh` scroll runway with a `sticky
  top-0 h-screen` inner stage. One scroll-progress value drives every step:
  each crossfades in on its own slice via `useTransform` (transform/opacity
  only), with the oversized step numeral (Anton, `text-display`) parallaxing
  slightly faster than the title/body text for a one-continuous-scrub feel.
- **Voice**: the numeral is Anton, matching the hero/case-study display
  voice at case-study scale. The "Step 01 / 05" readout is Switzer,
  uppercase, tracked, fog-blue, matching every other metadata caption on
  the site.
- **The one narrow, permanent exception**: the progress rail's fill (right
  edge, scrubs with scroll) is `bg-prism-cyan`, used purely as a wayfinding
  gauge, never decoration. This is the single named exception to "prism
  colors exist ONLY inside the artifact": one channel, one place, always
  paired with scroll position so it reads as instrumentation, not paint.
  The rail's track and boundary ticks stay on neutral tokens
  (`ash-border`, `bone/40`) so the cyan reads as signal against them.
  Nowhere else gets this exception; do not extend it by analogy.
- **Fallback**: below `lg` width or under `prefers-reduced-motion`, it
  renders the exact static numbered list the pages shipped with originally,
  same content and tokens, no pinning. Chosen via the house matchMedia
  pattern so SSR/hydration match before the swap.

## Homepage structure (keep it to these five bands)

1. **Hero** (`src/components/site/HomeHero.tsx`): near-full-screen, led by
   one project (2062). Name in Anton, the tagline, one positioning line,
   the project label, "Explore the work". Desktop plays a short muted loop;
   phones and reduced-motion visitors get the still. Never autoplay sound.
   A Pause control is always offered while the loop plays.
2. **Selected work**: the flagship (New Era Cap) full width, then five
   more in alternating wide/narrow rows whose aspect ratios are paired so
   both cards share a height; a leftover single closes full width.
3. **Selected clients**: one quiet row of names.
4. **Intro + capabilities**: a few sentences and one line.
5. **Contact**: "Have something in mind? Let's make it." and the email.

Long service explanations, the process, articles, and the FAQ stay off the
homepage. Navigation is Work, About, Contact, with Contact always visible
(including on phones). Perspectives lives in the footer and on About.

## Layout

- Full-bleed obsidian canvas; content constrained by `.section-container`
  (max-width 1440px, centered, comfortable edge padding).
- Section rhythm ~108px (`.section-padding`). The hero runs ~92% of the
  viewport height.
- Oversized imagery, generous space. Captions sit below media, never over
  it, with one exception: the homepage hero, where the name sits over the
  video on a bottom-up obsidian fade for legibility.
- Single-column text (max ~440-680px).
- Footer: 1px ash-border hairline divider, then two columns of metadata.

## Motion

Subtle. Default 0.5-0.6s with `cubic-bezier(0.52, 0.01, 0, 1)`: slow start,
decisive stop. The only entrance motion is `Reveal` (a short fade-up, once).
Cards zoom 3% on hover. No custom cursor, no smooth-scroll hijacking, no
film grain, no scroll-velocity effects, no 3D scenes, no ambient spin; the
work provides the motion. Use `m.` from framer-motion (LazyMotion
domAnimation). Honor reduced motion everywhere.

## Hard bans

- No filled buttons, no gradients, no box-shadows, no glow, no light
  bands. Every surface is obsidian (or rarely graphite-veil). Named
  exceptions: the hero's legibility fades, and the header's frosted
  backdrop once the page scrolls.
- No third text color. No prism colors on UI beyond PinnedApproach's
  rail fill. No underlines on links.
- No bold except Switzer 600 in the narrow repeated-sub-headline pattern
  described under Type, or Anton's own single weight; when unsure, stay 400.
- No serif type anywhere. No letter-spacing looser than -0.01em above 22px.
- No line-height above 1.5; display sizes stay at 1.00-1.01.
- No em dashes in any copy. Use commas, periods, or colons.

## Content rules

- **Names**: "David Turk" is the person; "David Turk Creative" is the
  business (header lockup: "David Turk" in bone, "Creative" in fog-blue).
  "DT+C" is retired from visible copy; it survives only as the JSON-LD
  `alternateName` and the favicon.
- **Voice**: first person singular. "I", never "we", in site copy.
- **Content model**: every project lives in `src/content/work.ts`
  (homepage selection, flagship, hero project, client list, capabilities,
  shared copy). Pages read from there; don't hard-code project lists.
- **Media for newer projects**: drop files into `public/work/<slug>/`
  (`hero.mp4`, `hero.jpg`, `card.jpg`, `card.mp4`, `gallery/01.jpg ...`);
  they appear on the next build. See `public/work/README.md`.
- **AI labeling**: work made with AI says so plainly where it's shown
  (card label and case-study notice).
- **Case studies** answer four questions: What was the idea? What was my
  role? What did I make? What happened? Credit collaborators. Include
  outcomes only when verified.
- **Drafts and preview notes**: `draft: true` hides a project on the live
  site (Netlify CONTEXT=production) while previews still show it. Dashed
  "Preview only" notes mark missing media or unverified copy and never
  render on the live site.
- Media URLs verbatim: cdn.myportfolio.com renditions carry size-specific
  ?h= hashes; never alter any media URL.
- Routes: `/`, `/work`, `/about`, `/contact`, `/projects/*`, `/insights/*`.
  Old anchors `/#projects` and `/#contact` still resolve on the homepage.
- Videos through AutoplayVideo, CoverMedia, or HomeHero's gated loop.
