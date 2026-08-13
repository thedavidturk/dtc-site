# DT+C "Prism" Design Spec (binding contract)

Prismatic light through obsidian. A cinematic dark void: near-black canvas,
one near-white for nearly all type and UI chrome, and a single chromatic
voice: the RGB-split prism artifact. Authority comes from sheer scale
(105 to 136px display at weight 400), never from weight. Differentiation
happens through spacing, scale, and the rainbow artifact. Confidence reads
through stillness.

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

HARD RULE: prism red/cyan/lime exist ONLY inside the prism artifact and its
derivatives, with exactly two named exceptions, both automatic/instrumented
rather than decorative choices: (1) velocity-chroma, where ScrollChroma
drives a text-shadow RGB-split on `.chroma-text`/`.headline-*` elements in
proportion to live scroll speed (see "Velocity-chroma" below), and (2) the
PinnedApproach progress rail's single prism-cyan fill, used only as a
wayfinding gauge (see "PinnedApproach" below). Outside those two named,
documented mechanisms: never on buttons, labels, links, borders, or any
other UI. Two static text colors exist: bone and fog-blue. Nothing else.

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
  section wants the hero's own authority ("What We Do," "Frequently Asked
  Questions," and similar section openers). Anton never sets body copy and
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

### Velocity-chroma (ScrollChroma.tsx)

The one mechanism by which prism colors ever touch text, and it is
automatic, scroll-driven, never a static color choice:

- `ScrollChroma.tsx` (mounted once, site-wide, in `layout.tsx`) drives a
  document-level `--chroma` CSS custom property from scroll velocity,
  spring-smoothed: 0 at rest, rising toward 1 as the visitor scrolls fast,
  decaying back to 0 as the page settles.
- Any element carrying `.chroma-text` or one of the four `.headline-red /
  -cyan / -lime / -yellow` classes reads `--chroma` to drive a text-shadow
  RGB-split (red/cyan/lime channels) proportional to scroll speed. At rest
  every one of these renders identical plain bone text: the channel name is
  a latent assignment, not a persistent color. `HEADLINE_CHANNELS` arrays
  (Services, Process, ValuePropositions) assign a channel in rotation
  across a section's repeated sub-headlines so each has its own latent
  identity.
- This is canon, not legacy debt: it is how "the dispersion IS the depth"
  reaches past the artifact itself into the page's own headlines under
  motion. Homepage hero h1 and case-study h1's carry `.chroma-text` for the
  same reason.

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

## The Prism Artifact (signature - render via src/components/PrismArtifact.tsx)

The brand's only chromatic element: a staggered cluster of glass cubes with
RGB-split chromatic-aberration edges (red #ff2a2a, cyan #2a7fff, lime
#2aff2a) bleeding through an otherwise monochrome surface. Black cores,
bone specular highlights, no shadows: the dispersion IS the depth. It anchors
the hero at ~40% width with the display headline wrapping/crossing it. A slow
~6.5s shimmer is its only motion. Never dilute it: no colored badges, no
rainbow borders elsewhere.

## Layout

- Full-bleed obsidian canvas; content constrained by `.section-container`
  (max-width 1440px, centered, comfortable edge padding).
- Section rhythm ~108px (`.section-padding`). Hero panels may run
  full-viewport height; content bands are narrower.
- Asymmetric composition: artifact or media anchors, type wraps around.
  Single-column text (max ~440-640px). No card matrices, no multi-column
  text grids.
- Footer: 1px ash-border hairline divider, then two columns of metadata at
  14-18px bone.

## Motion

Default 0.5s ease; meaningful state changes use
`cubic-bezier(0.52, 0.01, 0, 1)`: slow start, decisive stop, like optical
focus pulling. Transform and opacity carry 90% of transitions; color the
rest. No springs, no bounces, no scale-pops. Constant ambient motion is
reserved for two things: the prism artifact's slow shimmer, and the live
Three.js wireframe scenes in `ServiceScene.tsx` (rendered inside Services),
which carry a slow `AmbientSpin` rotation (~0.045 rad/s, full turn in
roughly two minutes) plus mouse parallax, so they read as live renders
rather than static geometry. Both stay slow and quiet by design; do not add
a third. Use `m.` from framer-motion (LazyMotion domAnimation; no
drag/layout). Honor useReducedMotion.

## Hard bans

- No filled buttons, no gradients, no box-shadows, no glow, no
  backdrop-blur, no light bands. Every surface is obsidian (or rarely
  graphite-veil).
- No third text color. No prism colors on UI beyond the two named
  exceptions above (velocity-chroma, PinnedApproach's rail fill). No
  underlines on links.
- No bold except Switzer 600 in the narrow repeated-sub-headline pattern
  described under Type, or Anton's own single weight; when unsure, stay 400.
- No serif type anywhere. No letter-spacing looser than -0.01em above 22px.
- No line-height above 1.5; display sizes stay at 1.00-1.01.
- No em dashes in any copy. Use commas, periods, or colons.

## Content rules

- Keep all existing messaging and copy. Light label rewrites fine.
- David's work stays central: project stills and videos as rounded-[15px]
  media cards on the void, captioned in bone/fog-blue.
- Media URLs verbatim: cdn.myportfolio.com renditions carry size-specific
  ?h= hashes; never alter any media URL.
- Keep anchors (#projects #services #process #about #insights #contact),
  routes, SEO metadata, JsonLd, aria labels, alt text.
- Videos through AutoplayVideo or existing gated patterns; never raw
  autoPlay.
