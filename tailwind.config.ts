import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Prism system - obsidian void, bone-white type, fog-blue
        // metadata, and RGB prism channels that exist ONLY inside the
        // prism artifact.
        'obsidian': '#101010',
        'bone': '#fffdf9',
        'graphite-veil': '#495764',
        'ash-border': '#403f3f',
        'fog-blue': '#6f879c',
        'prism-red': '#ff2a2a',
        'prism-cyan': '#2a7fff',
        'prism-lime': '#2aff2a',
        'prism-yellow': '#ffd52a',
        // Legacy names remapped by ROLE so unconverted code inherits
        // the dark system: bone-white was the page canvas (now
        // obsidian), ink-black was body text (now bone), voltage was
        // the accent (now bone: there is no UI accent).
        'bone-white': '#101010',
        'ink-black': '#fffdf9',
        'graphite': '#6f879c',
        'ash': '#403f3f',
        'charcoal-scale': '#495764',
        'voltage': '#fffdf9',
        'voltage-tint': '#6f879c',
        'voltage-deep': '#495764',
        'magenta-bloom': '#fffdf9',
        'forest-teal': '#495764',
        'powder-blue': '#6f879c',
        'candy-pink': '#6f879c',
        'mint-wash': '#6f879c',
        'navy-ink': '#495764',
        'signal-yellow': '#fffdf9',
        'warm-ink': '#101010',
        'sepia': '#6f879c',
        'espresso': '#101010',
        'terracotta': '#fffdf9',
        'sun-gold': '#fffdf9',
        'clay-gray': '#6f879c',
        'cream': '#fffdf9',
        'pure-white': '#fffdf9',
      },
      fontFamily: {
        // Exclusive typeface: Switzer (Neue Montreal stand-in) across
        // every role. Serif slots resolve to the same grotesk so no
        // straggler renders off-system.
        headline: ['var(--font-switzer)', 'sans-serif'],
        display: ['var(--font-switzer)', 'sans-serif'],
        body: ['var(--font-switzer)', 'sans-serif'],
        mono: ['var(--font-switzer)', 'sans-serif'],
        serif: ['var(--font-switzer)', 'sans-serif'],
        stamp: ['var(--font-switzer)', 'sans-serif'],
      },
      fontSize: {
        // Sculptural scale: hierarchy from size alone, weight 400
        // everywhere. Display sizes hold lh 1.00-1.01, -0.02em.
        display: ['clamp(3.5rem, 2rem + 7.5vw, 8.5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-serif': ['clamp(3.5rem, 2rem + 7.5vw, 8.5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(3rem, 1.8rem + 5.5vw, 6.5625rem)', { lineHeight: '1.01', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(4rem, 12vw, 12rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        h1: ['clamp(2.75rem, 2rem + 3.2vw, 6.5625rem)', { lineHeight: '1.01', letterSpacing: '-0.02em' }],
        h2: ['clamp(2.25rem, 1.8rem + 1.8vw, 3.5rem)', { lineHeight: '1.13', letterSpacing: '-0.01em' }],
        h3: ['clamp(1.75rem, 1.55rem + 0.8vw, 2.0625rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        h4: ['1.375rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-lg': ['clamp(2.25rem, 1.8rem + 1.8vw, 3.5rem)', { lineHeight: '1.13', letterSpacing: '-0.01em' }],
        'heading-sm': ['clamp(1.75rem, 1.55rem + 0.8vw, 2.0625rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-lg': ['1.375rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        body: ['1.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-sm': ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        caption: ['0.9375rem', { lineHeight: '1.2', letterSpacing: '0.01em' }],
      },
      borderRadius: {
        // nav/buttons 5px, cards 15px, tags pill. Most of the UI is
        // square-edged; the prism supplies the softness.
        nav: '5px',
        card: '15px',
        pill: '9999px',
      },
      transitionTimingFunction: {
        // The signature curve: slow start, decisive stop, like optical
        // focus pulling.
        prism: 'cubic-bezier(0.52, 0.01, 0, 1)',
      },
      maxWidth: {
        page: '1440px',
      },
      backgroundImage: {
        // Flat system: legacy gradient hooks resolve to solid ink.
        'gradient-cta': 'linear-gradient(#101010, #101010)',
        'gradient-dark': 'linear-gradient(#101010, #101010)',
      },
    },
  },
  plugins: [],
};
export default config;
