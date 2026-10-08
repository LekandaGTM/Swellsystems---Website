import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/blog";

/*
 * Vorschaubild pro Beitrag, aus dem Titel erzeugt. Ohne dieses Bild erschienen
 * geteilte Artikel auf LinkedIn ohne Vorschau: generateMetadata setzt ein
 * eigenes openGraph-Objekt, und das ersetzt das Bild aus dem Layout komplett.
 *
 * Laeuft in Node und nicht im Edge, weil lib/blog die Markdown-Dateien mit fs
 * liest.
 */

export const alt = "Swellsystems Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ locale: "de", slug: p.slug }));
}

export default function Bild({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  const titel = post?.title ?? "Swellsystems Blog";
  const rubrik = post?.cluster ?? "Prozessautomatisierung";

  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -180,
            width: 720,
            height: 720,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14,165,233,0.14) 0%, transparent 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#0ea5e9" }} />
          <span style={{ color: "#0369a1", fontSize: 22, fontWeight: 600, letterSpacing: 2 }}>
            {rubrik.toUpperCase()}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: titel.length > 70 ? 54 : 64,
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.15,
            letterSpacing: -1,
            maxWidth: 1000,
          }}
        >
          {titel}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontSize: 36, fontWeight: 800, color: "#0f172a" }}>Swell</span>
            <span style={{ fontSize: 36, fontWeight: 500, color: "#0ea5e9" }}>systems</span>
          </div>
          <span style={{ fontSize: 22, color: "#64748b" }}>Calvin Heim · swellsystems.ch</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
