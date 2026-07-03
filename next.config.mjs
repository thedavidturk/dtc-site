// Content-Security-Policy is deployed as Report-Only on purpose: it logs
// would-be violations without blocking anything while the policy is validated
// against real production traffic. Once it's proven quiet, rename the header
// to "Content-Security-Policy" to start enforcing.
//
// Origins in the policy are pinned to what the site actually uses:
// - googletagmanager.com: GA4 gtag.js loader + inline bootstrap in layout.tsx
// - *.google-analytics.com / *.analytics.google.com: GA4 beacons (incl. region hosts)
// - formspree.io: contact + newsletter form POSTs (Contact.tsx, EmailCapture.tsx)
// - cdn.myportfolio.com: work imagery and video files
// - www-ccv.adobe.io: Adobe CCV video player iframes (project pages)
// - www.youtube-nocookie.com: YouTube embeds (el-secreto, hospitality-mentor)
// Fonts are self-hosted via next/font, so font-src stays 'self'.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "connect-src 'self' https://formspree.io https://*.google-analytics.com https://*.analytics.google.com",
  "img-src 'self' data: blob: https://cdn.myportfolio.com https://www.googletagmanager.com https://*.google-analytics.com",
  "media-src 'self' https://cdn.myportfolio.com",
  "frame-src https://www-ccv.adobe.io https://www.youtube-nocookie.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
].join("; ");

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
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Report-only pending validation in production; see note above.
          { key: "Content-Security-Policy-Report-Only", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
