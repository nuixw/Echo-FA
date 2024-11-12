import { APP_COLOR_PRIMARY, APP_COLOR_SECONDARY, APP_NAME } from "@/config/app"
import { ImageResponse } from "next/og"

export const runtime = "edge"

// Image metadata
export const alt = APP_NAME
export const size = {
  width: 1200,
  height: 630
}

export const contentType = "image/png"

const getFont = async () => {
  const res = await fetch(
    new URL(
      "../public/fonts/brockmann/brockmann-regular.woff2",
      import.meta.url
    )
  )
  return await res.arrayBuffer()
}

// Image generation
export default async function Image() {
  // Font
  const mono = getFont()

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: APP_COLOR_PRIMARY,
          color: APP_COLOR_SECONDARY,
          alignItems: "center",
          justifyContent: "center",
          padding: "8px 48px",
          fontFamily: "brockmann",
          textTransform: "uppercase"
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontSize: 14,
            fontWeight: 400
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div>darkroom.engineering</div>
          </div>
          <div
            style={{
              justifySelf: "center",
              alignSelf: "center",
              textAlign: "center",
              fontSize: 32,
              fontWeight: 400
            }}
          >
            {APP_NAME}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div>where things get developed</div>
            <div>hi@darkroom.engineering</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "brockmann",
          data: await mono,
          style: "normal",
          weight: 400
        }
      ]
    }
  )
}
