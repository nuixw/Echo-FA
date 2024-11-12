import { env } from "@/env"
import prisma from "@/libs/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

const githubId = env.GITHUB_ID as string
const githubSecret = env.GITHUB_SECRET as string
const googleId = env.GOOGLE_ID as string
const googleSecret = env.GOOGLE_SECRET as string

if (!githubId || !githubSecret || !googleId || !googleSecret) {
  throw new Error("Missing OAuth configuration")
}

export const providers = [
  GithubProvider({
    clientId: githubId,
    clientSecret: githubSecret
  }),
  GoogleProvider({
    clientId: googleId,
    clientSecret: googleSecret
  })
]

export const auth = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers,
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    }
  },
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "#346df1", // Hex color code
    logo: "/img/logo.png", // Absolute URL to image
    buttonText: "#346df1" // Hex color code
  }
} satisfies NextAuthOptions

export default auth
