import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Bricolage_Grotesque } from "next/font/google";
import dynamic from "next/dynamic";
import Script from "next/script";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import "./view-transitions.css";
import Header from "@/components/Header";
import MotionProvider from "@/components/MotionProvider";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import DesktopFX from "@/components/DesktopFX";

const ScrollProgressTrail = dynamic(
  () => import("@/components/ScrollProgressTrail"),
  { ssr: false }
);

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

const Analytics = dynamic(() => import("@/components/Analytics"), {
  ssr: false,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

// Expressive display face for oversized editorial headlines
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://davidturkcreative.com"),
  title: "DT+C | Future-Proof Creative for Forward-Thinking Brands",
  description:
    "AI-native creative studio delivering strategy-led content through 3D pipelines, AI workflows, VFX, video generation, and sound design. Future-proof creative for forward-thinking brands.",
  keywords: [
    "AI creative studio",
    "AI video generation",
    "AI VFX production",
    "3D animation studio",
    "AI brand identity",
    "creative technology",
    "AI content production",
    "generative AI for brands",
    "3D product visualization",
    "AI sound design",
    "short-form video production",
    "GEO optimization",
  ],
  openGraph: {
    title: "DT+C | Content That Moves at the Speed of Culture",
    description:
      "Strategy, content, VFX, and web, under one roof. A creative studio behind work for New Era, Ford, SeaWorld, Betterfly, and more.",
    type: "website",
    url: "https://davidturkcreative.com",
    siteName: "DT+C",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DT+C | Content That Moves at the Speed of Culture",
    description:
      "Strategy, content, VFX, and web, under one roof. A creative studio behind work for New Era, Ford, SeaWorld, Betterfly, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
    <html lang="en" className="dark" style={{ backgroundColor: "#120D1A" }}>
      <head>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "DT+C",
            url: "https://davidturkcreative.com",
            description:
              "Strategy-led creative studio specializing in AI workflows, 3D pipelines, VFX, video generation, and sound design for forward-thinking brands.",
            sameAs: [],
          }}
        />
        {/* Critical CSS - prevents white flash before Tailwind loads */}
        <style dangerouslySetInnerHTML={{ __html: `html,body,main,section,footer{background-color:#120D1A!important}` }} />
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
        className={`${spaceGrotesk.variable} ${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased bg-deep-space text-pure-white`}
        style={{ backgroundColor: "#120D1A" }}
      >
        <MotionProvider>
          <SmoothScroll />
          <Analytics />
          <DesktopFX>
            <ScrollProgressTrail />
          </DesktopFX>
          <Header />
          <main style={{ backgroundColor: "#120D1A" }}>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
    </ViewTransitions>
  );
}
