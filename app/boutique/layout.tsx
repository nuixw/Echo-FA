"use client"

import { useBasketStore } from "@/stores/basket"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Aside } from "./(components)/aside"
import { ModalComplete } from "./(components)/modal/complete"
import s from "./layout.module.scss"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
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
      {searchParams.get("complete")}
      {isOpen ? "true" : "false"}
      <Aside />
      {isOpen && <ModalComplete isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  )
}
