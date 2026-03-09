import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Your Brand in the Age of AI Search: Why GEO Is the New SEO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px",
          background: "linear-gradient(135deg, #0B0F19 0%, #2a0a18 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background:
              "linear-gradient(to right, #F43F5E, rgba(244,63,94,0.3))",
          }}
        />

        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <span
            style={{
              color: "#F43F5E",
              fontSize: "18px",
              letterSpacing: "3px",
              textTransform: "uppercase" as const,
              fontWeight: 600,
            }}
          >
            AI Strategy
          </span>
          <span
            style={{
              color: "white",
              fontSize: "48px",
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: "900px",
            }}
          >
            Your Brand in the Age of AI Search: Why GEO Is the New SEO
          </span>
        </div>

        {/* Brand mark */}
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "60px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "28px",
              fontWeight: 700,
              opacity: 0.8,
            }}
          >
            DT+C
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
