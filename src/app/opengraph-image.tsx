import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { content } from "@/config/site";

export const alt = `${content.candidate.ballotName} | ${content.candidate.office}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#001a3f";
const NAVY_MID = "#00275a";
const YELLOW = "#ffd31a";
const GREEN = "#08a64b";
const WHITE = "#ffffff";

export default async function OpenGraphImage() {
  const [logoData, photoData] = await Promise.all([
    readFile(join(process.cwd(), "public/images/luzia-mary-logo.png")),
    readFile(join(process.cwd(), "public/images/luzia-mary-about-portrait.jpg")),
  ]);

  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;
  const photoSrc = `data:image/jpeg;base64,${photoData.toString("base64")}`;

  const placeLine = [content.candidate.city, content.candidate.region, content.candidate.state]
    .filter(Boolean)
    .join(" · ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_MID} 48%, #063b86 100%)`,
          color: WHITE,
          fontFamily: "sans-serif",
        }}
      >
        {/* Atmosphere */}
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: "50%",
            right: -80,
            top: -160,
            background: "radial-gradient(circle, rgba(8,166,75,0.22) 0%, transparent 68%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            left: -120,
            bottom: -180,
            background: "radial-gradient(circle, rgba(255,211,26,0.16) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 14,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1, background: YELLOW, display: "flex" }} />
          <div style={{ flex: 1, background: GREEN, display: "flex" }} />
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "52px 56px 52px 64px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: 680,
              height: "100%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img
                src={logoSrc}
                width={220}
                height={48}
                alt=""
                style={{ objectFit: "contain", objectPosition: "left center" }}
              />
              <div
                style={{
                  display: "flex",
                  marginTop: 36,
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 4,
                    borderRadius: 999,
                    background: YELLOW,
                    display: "flex",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: 2.4,
                    textTransform: "uppercase",
                    color: YELLOW,
                  }}
                >
                  {content.candidate.office}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 22,
                  fontSize: 92,
                  fontWeight: 900,
                  lineHeight: 0.92,
                  letterSpacing: -3.5,
                  color: WHITE,
                }}
              >
                {content.candidate.ballotName}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 28,
                  fontSize: 26,
                  lineHeight: 1.35,
                  color: "rgba(255,255,255,0.86)",
                  maxWidth: 560,
                  fontWeight: 500,
                }}
              >
                {content.candidate.homeLead}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.78)",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: GREEN,
                  display: "flex",
                }}
              />
              {placeLine}
            </div>
          </div>

          {/* Portrait */}
          <div
            style={{
              marginLeft: "auto",
              width: 380,
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 340,
                height: 340,
                borderRadius: "50%",
                bottom: 40,
                background: `radial-gradient(circle, rgba(255,211,26,0.2) 0%, rgba(8,166,75,0.12) 45%, transparent 70%)`,
                display: "flex",
              }}
            />
            <img
              src={photoSrc}
              width={360}
              height={520}
              alt=""
              style={{
                objectFit: "cover",
                objectPosition: "center top",
                borderRadius: 28,
                border: `3px solid rgba(255,211,26,0.35)`,
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
