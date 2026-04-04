import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

/* eslint-disable @next/next/no-img-element */

export const alt = "Patricians | AI Automation & Web Development Agency";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoData = await readFile(join(process.cwd(), "public/patricians-logo.png"));
  const logoSrc = Uint8Array.from(logoData).buffer;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, rgba(244,248,255,1) 0%, rgba(232,241,255,1) 40%, rgba(207,226,255,1) 100%)",
          color: "#092552",
          padding: "56px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            borderRadius: "36px",
            border: "1px solid rgba(17, 94, 212, 0.12)",
            background:
              "radial-gradient(circle at top left, rgba(95,160,255,0.18), transparent 35%), white",
            boxShadow: "0 30px 90px -55px rgba(15,23,42,0.35)",
            padding: "52px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "72%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                fontSize: "28px",
                fontWeight: 700,
                color: "#115ed4",
              }}
            >
              {/* @ts-expect-error Satori accepts ArrayBuffer for image src at runtime */}
              <img src={logoSrc} alt="" width={220} height={37} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "66px",
                  lineHeight: 1.02,
                  fontWeight: 700,
                  letterSpacing: "-0.05em",
                }}
              >
                Patricians
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "34px",
                  lineHeight: 1.2,
                  color: "#27446d",
                }}
              >
                AI Automation and Web Development Agency for modern business growth
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "22%",
            }}
          >
            {[
              "AI systems",
              "Premium websites",
              "Digital growth workflows",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "999px",
                  border: "1px solid rgba(17,94,212,0.12)",
                  background: "rgba(255,255,255,0.8)",
                  color: "#115ed4",
                  fontSize: "21px",
                  fontWeight: 600,
                  padding: "16px 18px",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
