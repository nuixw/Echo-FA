import createMDX from "@next/mdx"
import createNextIntlPlugin from "next-intl/plugin"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"]
  // Optionally, add any other Next.js config below
}

const withNextIntl = createNextIntlPlugin("./config/i18n.ts")
const withMDX = createMDX({})

export default withNextIntl(withMDX(nextConfig))
