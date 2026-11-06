import type { Metadata } from "next";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import Script from "next/script";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import "./view-transitions.css";
import Header from "@/components/Header";
import MotionProvider from "@/components/MotionProvider";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { site } from "@/content/work";

const Analytics = dynamic(() => import("@/components/Analytics"), {
  ssr: false,
});

// Exclusive typeface: Switzer (Neue Montreal stand-in) carries every
// role. Body sits at 400; section headlines at 600.
// Self-hosted from Fontshare.
const switzer = localFont({
  src: [
    { path: "../fonts/Switzer-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Switzer-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Switzer-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

// Hero display face: Anton, the one heavy condensed voice reserved
// for the landing statement.
// Self-hosted (SIL OFL, see src/fonts/Anton-OFL.txt) so builds never depend
// on reaching Google Fonts.
const anton = localFont({
  src: [{ path: "../fonts/Anton-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-anton",
  display: "swap",
});

const description =
  "David Turk is a Miami creative director. Through David Turk Creative, he develops ideas and brings them to life through film, 3D, AI, and visual storytelling, for brands and original stories.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "David Turk Creative | Creative Direction, Film, 3D & AI in Miami",
    template: "%s | David Turk Creative",
  },
  description,
  keywords: [
    "creative director Miami",
    "David Turk",
    "David Turk Creative",
    "film production Miami",
    "3D animation",
    "VFX",
    "AI film",
    "AI video production",
    "brand campaigns",
    "commercial director",
    "documentary production",
    "virtual production",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "David Turk Creative | Cinematic worlds. Ideas in motion.",
    description,
    type: "website",
    url: site.url,
    siteName: site.studio,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "David Turk Creative | Cinematic worlds. Ideas in motion.",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
    <html lang="en" style={{ backgroundColor: "#101010" }}>
      <head>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.studio,
            legalName: site.legalName,
            alternateName: "DT+C",
            url: site.url,
            email: site.email,
            description,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Miami",
              addressRegion: "FL",
              addressCountry: "US",
            },
            founder: {
              "@type": "Person",
              name: site.person,
              jobTitle: "Creative Director",
              url: site.url,
              sameAs: [site.linkedin],
            },
            sameAs: [site.linkedin],
          }}
        />
        {/* Critical CSS - prevents flash before Tailwind loads */}
        <style dangerouslySetInnerHTML={{ __html: `html{background-color:#101010!important}body{background:transparent!important}` }} />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body
        className={`${switzer.variable} ${anton.variable} font-body antialiased text-bone`}
      >
        <MotionProvider>
          <Analytics />
          <Header />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
    </ViewTransitions>
  );
}
