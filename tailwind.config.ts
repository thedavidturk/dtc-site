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
        // Creative Giants palette - warm paper canvas, ink type,
        // rationed chromatic accents.
        'bone-white': '#fffef7',
        'ink-black': '#000000',
        'graphite': '#666666',
        'ash': '#aaaaaa',
        'charcoal-scale': '#4d4c4a',
        'magenta-bloom': '#8a0467',
        'forest-teal': '#03624c',
        'powder-blue': '#a5c8eb',
        'candy-pink': '#ffacea',
        'mint-wash': '#a5ebd6',
        'navy-ink': '#101731',
        'signal-yellow': '#ffd001',
        // Broadside inversion surfaces (Henry layer): warm near-black
        // ink for full-bleed inverted bands, sepia for secondary text
        // on paper.
        'warm-ink': '#2a2722',
        'sepia': '#3e3b36',
        // Legacy token names remapped into the new system so every
        // existing page inherits the light editorial palette.
        // espresso was the dark base -> now the paper canvas;
        // cream/pure-white were text-on-dark -> now ink.
        'espresso': '#fffef7',
        'terracotta': '#8a0467',
        'sun-gold': '#03624c',
        'clay-gray': '#666666',
        'cream': '#000000',
        'pure-white': '#000000',
      },
      fontFamily: {
        // Single-family system: Switzer carries display, headline,
        // body, and meta. Weight does the differentiation (300/400).
        headline: ['var(--font-switzer)', 'sans-serif'],
        // Display headlines are serif broadside type (Henry layer);
        // Switzer stays on headline/body/mono for UI and prose.
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-switzer)', 'sans-serif'],
        mono: ['var(--font-switzer)', 'sans-serif'],
        // Henry layer: editorial serif for broadside headlines,
        // condensed stamp for section mastheads.
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        stamp: ['var(--font-antonio)', 'var(--font-switzer)', 'sans-serif'],
      },
      fontSize: {
        // Fluid scale tuned to the poster system: 84px display,
        // 54px heading, 34px heading-sm at desktop.
        display: ['clamp(3rem, 1.9rem + 5.5vw, 5.25rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
        // Serif broadside headline: bigger than the sans poster scale,
        // gentle tracking (serifs carve their own edges).
        'display-serif': ['clamp(3.25rem, 2rem + 6.5vw, 7.75rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        // Edge-to-edge stamped masthead. Scales with viewport so the
        // slab always spans the page.
        'display-xl': ['clamp(4.5rem, 15.5vw, 19rem)', { lineHeight: '0.78', letterSpacing: '-0.01em' }],
        h1: ['clamp(2.5rem, 1.9rem + 3vw, 4.25rem)', { lineHeight: '1', letterSpacing: '-0.027em' }],
        h2: ['clamp(2rem, 1.6rem + 1.9vw, 3.375rem)', { lineHeight: '1.05', letterSpacing: '-0.023em' }],
        h3: ['clamp(1.625rem, 1.4rem + 1vw, 2.125rem)', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        h4: ['clamp(1.125rem, 1.05rem + 0.4vw, 1.25rem)', { lineHeight: '1.4', letterSpacing: '-0.018em' }],
        'body-lg': ['clamp(1.0625rem, 1rem + 0.3vw, 1.125rem)', { lineHeight: '1.5', letterSpacing: '-0.018em' }],
        body: ['1rem', { lineHeight: '1.4', letterSpacing: '-0.018em' }],
        caption: ['0.75rem', { lineHeight: '1.43', letterSpacing: '-0.018em' }],
      },
      borderRadius: {
        // Interactive elements only - cards and images stay sharp.
        pill: '1440px',
      },
      backgroundImage: {
        // Legacy gradient hooks flattened: all interactive surfaces
        // are black; the charcoal-to-black track is the one dark band.
        'gradient-cta': 'linear-gradient(#000000, #000000)',
        'gradient-dark': 'linear-gradient(180deg, #4d4c4a 0%, #000000 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
