import createMDX from "@next/mdx"
import createNextIntlPlugin from "next-intl/plugin"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Optionally, add any other Next.js config below
  images: {
    formats: ["image/webp"]
  }
}

const withNextIntl = createNextIntlPlugin("./config/i18n.ts")
const withMDX = createMDX({
  options: {
    rehypePlugins: [
      // rehypeSlug,
      // [
      //   toc,
      //   {
      //     headings: ["h2", "h3"], // Only include <h1> and <h2> headings in the TOC
      //     cssClasses: {
      //       toc: "page-outline", // Change the CSS class for the TOC
      //       link: "page-link" // Change the CSS class for links in the TOC
      //     }
      //   }
      // ]
    ]
  }
})

export default withNextIntl(withMDX(nextConfig))
