import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";

export const alt = "From 13 Days to 27 Minutes: Rebuilding the Content Pipeline";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const POSTER = "ford-mustang.jpg";
const CATEGORY = "PRODUCTION STRATEGY";
const TITLE = "From 13 Days to 27 Minutes: Rebuilding the Content Pipeline";

async function loadDataUri(file: string): Promise<string | null> {
  try {
    const buf = await readFile(join(process.cwd(), "public/motion", file));
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OgImage() {
  const poster = await loadDataUri(POSTER);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#0B0F19",
          fontFamily: "sans-serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 64,
        }}
      >
        {poster ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={poster}
            width={1200}
            height={630}
            alt=""
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: 1200,
              height: 630,
              objectFit: "cover",
            }}
          />
        ) : null}

        {/* Readability gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to top, rgba(11,15,25,0.95) 0%, rgba(11,15,25,0.7) 45%, rgba(11,15,25,0.35) 100%)",
          }}
        />

        {/* Top gradient accent bar */}
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

        {/* DT+C mark */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 64,
            display: "flex",
            fontSize: 32,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}
        >
          DT+C
        </div>
        <div
          style={{
            position: "absolute",
            top: 54,
            right: 64,
            display: "flex",
            fontSize: 18,
            color: "#94A3B8",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          Perspectives
        </div>

        {/* Bottom content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#F97316",
            }}
          >
            {CATEGORY}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginTop: 16,
              maxWidth: 1000,
            }}
          >
            {TITLE}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
