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
        // Authored palette - grounded in the reel's Miami light:
        // violet-charcoal night base, neon blue-violet, sunset coral.
        'deep-space': '#120D1A',
        'electric-indigo': '#7C5CFF',
        'warm-coral': '#FF8A5C',
        'cool-gray': '#ABA3B4',
        'soft-white': '#F8FAFC',
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
        'gradient-cta': 'linear-gradient(135deg, #7C5CFF, #FF8A5C)',
        'gradient-dark': 'linear-gradient(180deg, #120D1A 0%, #1E152E 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
