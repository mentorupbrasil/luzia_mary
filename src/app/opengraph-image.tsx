import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";
export const alt = `${siteConfig.candidate.ballotName} | ${siteConfig.candidate.office}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #eef4ff 0%, #faf9f7 55%, #fff5f1 100%)",
          color: "#1a2332",
          padding: "64px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "62%" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 20, letterSpacing: 3, textTransform: "uppercase", color: "#2f6fed", fontWeight: 700 }}>
              {siteConfig.candidate.office}
            </div>
            <div style={{ marginTop: 24, fontSize: 84, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3 }}>
              Luzia Mary
            </div>
            <div style={{ marginTop: 28, fontSize: 28, lineHeight: 1.35, color: "#5b6678", maxWidth: 560 }}>
              {siteConfig.candidate.slogan}
            </div>
          </div>
          <div style={{ fontSize: 20, letterSpacing: 2, textTransform: "uppercase", color: "#5b6678" }}>
            {siteConfig.candidate.cityBase} · {siteConfig.candidate.region} · {siteConfig.candidate.state}
          </div>
        </div>
        <div
          style={{
            width: "34%",
            marginLeft: "auto",
            borderRadius: 32,
            background: "linear-gradient(160deg, #c9ddf8 0%, #2f6fed 100%)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: 28,
            color: "rgba(255,255,255,0.7)",
            fontSize: 16,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Luzia Mary
        </div>
      </div>
    ),
    { ...size },
  );
}
