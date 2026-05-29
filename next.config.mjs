/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve modern, smaller formats. Next negotiates per-browser:
    // AVIF first (smallest), then WebP, then the original.
    formats: ["image/avif", "image/webp"],
    // Whitelist the external hosts our work imagery is served from.
    // next/image fetches the full-res original once (server-side, cached),
    // then ships a right-sized AVIF/WebP to each visitor.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.myportfolio.com" },
      { protocol: "https", hostname: "**.giphy.com" },
    ],
  },
};

export default nextConfig;
