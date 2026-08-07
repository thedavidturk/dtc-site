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
derivatives. Never on buttons, labels, links, borders, or any UI. Two text
colors exist: bone and fog-blue. Nothing else.

## Type (Switzer, all weights 400)

- ONE typeface, ONE weight: `font-body` (Switzer) at `font-normal` (400) for
  everything: display, headings, body, nav, buttons, footer. NO font-light,
  NO 500+, no serif anywhere. Delete `font-serif`/`font-display`/`font-light`
  usages in files you own.
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
rest. No springs, no bounces, no scale-pops, no constant ambient motion
(the prism's slow shimmer is the sole exception). Use `m.` from
framer-motion (LazyMotion domAnimation; no drag/layout). Honor
useReducedMotion.

## Hard bans

- No filled buttons, no gradients, no box-shadows, no glow, no
  backdrop-blur, no light bands. Every surface is obsidian (or rarely
  graphite-veil).
- No third text color. No prism colors on UI. No underlines on links.
- No bold except optionally 36px subheadings; when unsure, stay 400.
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
