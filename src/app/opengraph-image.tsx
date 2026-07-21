import { ImageResponse } from "next/og";
import { content } from "@/config/site";

export const runtime = "edge";
export const alt = `${content.candidate.ballotName} | ${content.candidate.office}`;
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
          background: "linear-gradient(125deg, #e9f7fc 0%, #fffdf9 50%, #ffe9e1 100%)",
          color: "#152033",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "65%" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 20, letterSpacing: 3, textTransform: "uppercase", color: "#0b6f99", fontWeight: 800 }}>
              {content.candidate.office}
            </div>
            <div style={{ marginTop: 20, fontSize: 84, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3 }}>
              Luzia Mary
            </div>
            <div style={{ marginTop: 24, fontSize: 28, lineHeight: 1.35, color: "#5a667a", maxWidth: 540 }}>
              {content.candidate.slogan}
            </div>
          </div>
          <div style={{ fontSize: 18, letterSpacing: 2, textTransform: "uppercase", color: "#5a667a", fontWeight: 700 }}>
            {content.candidate.city} · {content.candidate.region} · {content.candidate.state}
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            width: "30%",
            borderRadius: 28,
            background: "linear-gradient(160deg, #1aa6d6, #1564c8)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: 24,
            color: "white",
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          Luzia Mary
        </div>
      </div>
    ),
    { ...size },
  );
}
