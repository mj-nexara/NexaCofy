import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const title = searchParams.get("title") || "The Nexara Way"
    const subtitle = searchParams.get("subtitle") || "One Cup NexaCofy for Every Student"
    const description = searchParams.get("description") || "A systematic, humanitarian, and technology-driven pathway"

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1E293B 0%, #7C3AED 50%, #0F172A 100%)",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 25% 25%, rgba(245, 158, 11, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)",
          }}
        />

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            maxWidth: "900px",
            textAlign: "center",
          }}
        >
          {/* Coffee Icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "#F59E0B",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
              fontSize: "40px",
            }}
          >
            ☕
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#FFFFFF",
              marginBottom: "10px",
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "32px",
              fontWeight: "600",
              color: "#F59E0B",
              marginBottom: "20px",
            }}
          >
            {subtitle}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "20px",
              color: "#E2E8F0",
              marginBottom: "30px",
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>

          {/* Crypto Icons */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "#F7931A",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              ₿
            </div>
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "#627EEA",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Ξ
            </div>
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "#10B981",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              $
            </div>
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "#00D4AA",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              XRP
            </div>
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: "18px",
              color: "#94A3B8",
            }}
          >
            onecupnexacofy.vercel.app
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
