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
        'deep-space': '#0B0F19',
        'electric-indigo': '#6366F1',
        'warm-coral': '#F97316',
        'cool-gray': '#94A3B8',
        'soft-white': '#F8FAFC',
        'pure-white': '#FFFFFF',
      },
      fontFamily: {
        headline: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-cta': 'linear-gradient(135deg, #6366F1, #F97316)',
        'gradient-dark': 'linear-gradient(180deg, #0B0F19 0%, #131A2B 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
