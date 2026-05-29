import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";

export const alt =
  "DT+C - Content that moves at the speed of culture";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Work posters featured in the share card's thumbnail strip.
const STRIP = [
  "new-era-cosmic.jpg",
  "ford-mustang.jpg",
  "brugal.jpg",
  "faena.jpg",
  "unplugged.jpg",
];

async function loadDataUri(file: string): Promise<string | null> {
  try {
    const buf = await readFile(join(process.cwd(), "public/motion", file));
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OgImage() {
  const thumbs = (await Promise.all(STRIP.map(loadDataUri))).filter(
    Boolean
  ) as string[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B0F19",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Gradient accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "linear-gradient(to right, #6366F1, #F97316)",
          }}
        />

        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 620,
            height: 620,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(249,115,22,0.16) 0%, transparent 70%)",
          }}
        />

        {/* Top: brand mark + studio label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "54px 64px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            DT+C
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              color: "#94A3B8",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            Creative Studio
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
            }}
          >
            Content that moves
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              marginTop: 4,
              background: "linear-gradient(to right, #818CF8, #F97316)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            at the speed of culture.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#94A3B8",
              marginTop: 22,
            }}
          >
            Strategy, content, VFX, and web. New Era, Ford, SeaWorld, Betterfly,
            and more.
          </div>
        </div>

        {/* Work thumbnail strip */}
        <div
          style={{
            display: "flex",
            gap: 14,
            padding: "0 64px 54px",
          }}
        >
          {thumbs.map((src, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                width: 198,
                height: 132,
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                width={198}
                height={132}
                style={{ objectFit: "cover" }}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
