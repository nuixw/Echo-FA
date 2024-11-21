import type { MDXComponents } from "mdx/types"
import Image, { ImageProps } from "next/image"

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

// Définissez vos composants personnalisés
const Tab = ({ children }: { children: React.ReactNode }) => {
  return <div className={`alert alert p-4 rounded-lg`}>{children}</div>
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 style={{ color: "blue", fontSize: "48px" }}>test: {children}</h1>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
      />
    ),
    Tab,
    ...components
  }
}
