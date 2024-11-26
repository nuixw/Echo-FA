"use client"

import { LENIS } from "@/config/constants"
import { useRealViewport } from "@/hooks/useRealViewport"
import { useReveal } from "@/hooks/useReveal"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import { Toaster } from "sonner"
import { Footer } from "../footer"
import { GSAP } from "../gsap"
import { Header } from "../header"
import { Lenis } from "../lenis"
import s from "./wrapper.module.scss"

interface WrapperProps {
  children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
  useReveal()
  useRealViewport()
  const pathname = usePathname()

  return (
    <>
      <GSAP scrollTrigger={true} />
      <Lenis root options={LENIS} />
      <Header />
      <div className={clsx(s.main, pathname === "/" && s.home)}>
        <main>{children}</main>
        {!pathname.includes("/boutique") && <Footer />}
      </div>
      <Toaster
        position="bottom-right"
        visibleToasts={3}
        toastOptions={{
          className: s.toast
        }}
      />
      <div id="modal-root" />
    </>
  )
}
