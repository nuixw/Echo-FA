"use client"

import clsx from "clsx"
import { ReactNode } from "react"
import ReactDOM from "react-dom"
import { Icon } from "../icon"
import s from "./modal.module.scss"

interface ModalProps {
  onClose: () => void
  children: ReactNode
  className?: string
  title?: string
  full?: boolean
}

export const Modal = ({
  onClose,
  children,
  className,
  title,
  full
}: ModalProps) => {
  const handleClose = () => {
    onClose()
  }

  const CloseButton = () => {
    return (
      <button className={s.close} onClick={handleClose} type="button">
        <Icon icon="x" />
      </button>
    )
  }

  const modalContent = (
    <div className={clsx(s.overlay, full && s.overlayFull)}>
      <div className={clsx(s.modal, className, full && s.full)}>
        <CloseButton />
        {title && <h2 className={s.title}>{title}</h2>}
        {children}
      </div>
      <div className={s.overlayClose} onClick={handleClose}></div>
    </div>
  )

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")!
  )
}
