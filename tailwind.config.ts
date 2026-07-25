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
        // Authored palette - Cabana (from David's beach photo):
        // sun-washed sand, marigold + regatta-navy towel stripes, ink text.
        'sand': '#F5F1E7',
        'marigold': '#E8A020',
        'regatta': '#26428B',
        'driftwood': '#7A7264',
        'ink': '#1E2433',
        'pure-white': '#FFFFFF',
      },
      fontFamily: {
        headline: ['var(--font-space-grotesk)', 'sans-serif'],
        display: ['var(--font-bricolage)', 'var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      fontSize: {
        // Fluid type scale - clamp() replaces per-component breakpoint ladders.
        display: ['clamp(4.25rem, 2.6rem + 8.25vw, 8.5rem)', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
        h1: ['clamp(2.5rem, 1.4rem + 4.2vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.025em' }],
        h2: ['clamp(2.125rem, 1.35rem + 3vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h3: ['clamp(1.75rem, 1.4rem + 1.3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        h4: ['clamp(1.25rem, 1.1rem + 0.55vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'body-lg': ['clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.75' }],
        caption: ['0.875rem', { lineHeight: '1.6' }],
      },
      backgroundImage: {
        'gradient-cta': 'linear-gradient(135deg, #E8A020, #F0B948)',
        'gradient-dark': 'linear-gradient(180deg, #F5F1E7 0%, #ECE4D2 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
