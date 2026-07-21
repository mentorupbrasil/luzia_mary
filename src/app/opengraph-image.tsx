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
          background: "#071833",
          color: "white",
          padding: "64px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "38%",
            background: "linear-gradient(160deg, #12305a 0%, #0a2858 55%, #071833 100%)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "40px",
            color: "rgba(255,255,255,0.35)",
            fontSize: 18,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Espaço para retrato
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "58%" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 18, letterSpacing: 4, textTransform: "uppercase", color: "#c24f38", fontWeight: 700 }}>
              {siteConfig.candidate.office}
            </div>
            <div style={{ marginTop: 28, fontSize: 84, fontWeight: 700, lineHeight: 0.95, letterSpacing: -3 }}>
              Luzia Mary
            </div>
            <div style={{ marginTop: 28, fontSize: 30, lineHeight: 1.35, color: "rgba(255,255,255,0.72)", maxWidth: 560 }}>
              {siteConfig.candidate.slogan}
            </div>
          </div>
          <div style={{ fontSize: 20, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
            {siteConfig.candidate.cityBase} · {siteConfig.candidate.region} · {siteConfig.candidate.state}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
