import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

const CursorTrail = dynamic(() => import("@/components/CursorTrail"), {
  ssr: false,
});

const ShootingStars = dynamic(
  () => import("@/components/ShootingStars"),
  { ssr: false }
);

const ScrollStreaks = dynamic(
  () => import("@/components/ScrollStreaks"),
  { ssr: false }
);

const ScrollProgressTrail = dynamic(
  () => import("@/components/ScrollProgressTrail"),
  { ssr: false }
);

const FilmGrain = dynamic(() => import("@/components/FilmGrain"), {
  ssr: false,
});

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "DT+C | Future-Proof Creative for Forward-Thinking Brands",
  description:
    "Strategy-led content development with fast production pipelines. We research your audience, develop the creative, and deliver results — at the speed your brand needs.",
  keywords: [
    "creative strategy",
    "content development",
    "4K cinematics",
    "3D animation",
    "creative studio",
    "videography",
    "photography",
  ],
  openGraph: {
    title: "DT+C | Future-Proof Creative",
    description:
      "Strategy-led content development with fast production pipelines for forward-thinking brands.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ backgroundColor: "#0B0F19" }}>
      <head>
        {/* Critical CSS — prevents white flash before Tailwind loads */}
        <style dangerouslySetInnerHTML={{ __html: `html,body,main,section,footer{background-color:#0B0F19!important}` }} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased bg-deep-space text-pure-white`}
        style={{ backgroundColor: "#0B0F19" }}
      >
        <SmoothScroll />
        <CursorTrail />
        <ShootingStars />
        <ScrollStreaks />
        <ScrollProgressTrail />
        <FilmGrain />
        <Header />
        <main style={{ backgroundColor: "#0B0F19" }}>
          <ClientLayout>{children}</ClientLayout>
        </main>
        <Footer />
      </body>
    </html>
  );
}
