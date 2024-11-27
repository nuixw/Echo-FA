import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    TEBEX_API_URL: z.string().url(),
    TEBEX_API_ID: z.string(),
    TEBEX_PUBLIC_API_KEY: z.string(),
    TEBEX_PRIVATE_API_TOKEN: z.string(),
    TEBEX_CATEGORY_COINS: z.string(),
    TEBEX_CATEGORY_VIP: z.string()
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_NODE_ENV: z.enum(["development", "production", "test"]),
    NEXT_PUBLIC_URL: z.string().url(),
    NEXT_PUBLIC_PACKAGE_VIP: z.string()
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    TEBEX_API_URL: process.env.TEBEX_API_URL,
    TEBEX_API_ID: process.env.TEBEX_API_ID,
    TEBEX_PUBLIC_API_KEY: process.env.TEBEX_PUBLIC_API_KEY,
    TEBEX_PRIVATE_API_TOKEN: process.env.TEBEX_PRIVATE_API_TOKEN,
    TEBEX_CATEGORY_COINS: process.env.TEBEX_CATEGORY_COINS,
    TEBEX_CATEGORY_VIP: process.env.TEBEX_CATEGORY_VIP,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_PACKAGE_VIP: process.env.NEXT_PUBLIC_PACKAGE_VIP
  }
})
