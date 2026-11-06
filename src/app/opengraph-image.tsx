import { ImageResponse } from "next/og";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";

export const alt = "David Turk Creative: cinematic worlds, ideas in motion";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Share-card strip: the 2062 still leads once it exists, then selected work.
const STRIP = [
  "work/2062/hero.jpg",
  "motion/new-era-cosmic.jpg",
  "motion/seaworld-hero.jpg",
  "motion/crespo.jpg",
  "motion/new-era-elements.jpg",
  "motion/hospitality.jpg",
];

async function loadDataUri(file: string): Promise<string | null> {
  const path = join(process.cwd(), "public", file);
  if (!existsSync(path)) return null;
  try {
    const buf = await readFile(path);
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OgImage() {
  const thumbs = (await Promise.all(STRIP.map(loadDataUri)))
    .filter((src): src is string => Boolean(src))
    .slice(0, 5);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#101010",
          fontFamily: "sans-serif",
          padding: "54px 64px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#fffdf9" }}>
            David Turk&nbsp;<span style={{ color: "#6f879c" }}>Creative</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              color: "#6f879c",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Miami
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 800,
              color: "#fffdf9",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            David Turk
          </div>
          <div style={{ display: "flex", fontSize: 38, color: "#fffdf9", marginTop: 18 }}>
            Cinematic worlds. Ideas in motion.
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#6f879c", marginTop: 12 }}>
            Creative direction, film, 3D &amp; AI for brands and original stories.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {thumbs.map((src, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                width: 202,
                height: 120,
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} width={202} height={120} style={{ objectFit: "cover" }} alt="" />
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
