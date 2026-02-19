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
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased bg-deep-space text-pure-white`}
      >
        <SmoothScroll />
        <CursorTrail />
        <ShootingStars />
        <ScrollStreaks />
        <ScrollProgressTrail />
        <FilmGrain />
        <Header />
        <main>
          <ClientLayout>{children}</ClientLayout>
        </main>
        <Footer />
      </body>
    </html>
  );
}
