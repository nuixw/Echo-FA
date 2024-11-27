"use client"

import { useBasketStore } from "@/stores/basket"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { Aside } from "./(components)/aside"
import { ModalComplete } from "./(components)/modal/complete"
import s from "./layout.module.scss"

interface LayoutProps {
  children: React.ReactNode
}

const LayoutContent = ({ children }: LayoutProps) => {
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const { complete } = useBasketStore()

  useEffect(() => {
    if (searchParams.get("complete") && complete) {
      setIsOpen(true)
    }
  }, [searchParams, complete])

  return (
    <div className={s.layout}>
      {children}
      <Aside />
      {isOpen && <ModalComplete isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  )
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Suspense>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  )
}
