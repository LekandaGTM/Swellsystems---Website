import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Swellsystems – Automatisierter Outbound für B2B";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ocean gradient background accent */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(14,165,233,0.08)",
            border: "1px solid rgba(14,165,233,0.2)",
            borderRadius: 100,
            padding: "8px 20px",
            marginBottom: 40,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0ea5e9" }} />
          <span style={{ color: "#0ea5e9", fontSize: 18, fontWeight: 600, letterSpacing: 2 }}>
            AUTOMATISIERTES OUTBOUND FÜR B2B
          </span>
        </div>

        {/* Logo / Headline */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 0, marginBottom: 24 }}>
          <span style={{ fontSize: 80, fontWeight: 800, color: "#0f172a", letterSpacing: -2 }}>
            Swell
          </span>
          <span style={{ fontSize: 80, fontWeight: 500, color: "#0ea5e9", letterSpacing: -2 }}>
            systems
          </span>
        </div>

        {/* Tagline */}
        <p style={{ fontSize: 28, color: "#475569", fontWeight: 400, margin: 0, textAlign: "center", maxWidth: 700 }}>
          Wir arbeiten mit wenigen. Dafür richtig.
        </p>

        {/* URL */}
        <div style={{ position: "absolute", bottom: 48, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20, color: "#94a3b8", fontWeight: 500 }}>swellsystems.ch</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
