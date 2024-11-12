import { APP_NAME } from "@/config/app"
import Image from "./opengraph-image"

export const runtime = "edge"

// Image metadata
export const alt = APP_NAME
export const size = {
  width: 1200,
  height: 630
}

export const contentType = "image/png"

export default Image
