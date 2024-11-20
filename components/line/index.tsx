import { Colors } from "@/types/Colors"
import { DirectionHorizontal } from "@/types/Direction"
import clsx from "clsx"
import { Sprite } from "../sprite"
import s from "./line.module.scss"

interface LineProps {
  direction: DirectionHorizontal
  color: Colors
  className?: string
  zIndex?: number
  top?: number
  width?: number
  right?: number
  left?: number
}

export const Line = ({
  direction,
  className,
  color,
  zIndex,
  top,
  width,
  right,
  left
}: LineProps) => {
  const styles = {
    ...(zIndex !== undefined && { zIndex }),
    ...(top !== undefined && { top: `${top}%` }),
    ...(width !== undefined && { width: `${width}%` }),
    ...(right !== undefined && { right: `${right}%` }),
    ...(left !== undefined && { left: `${left}%` })
  }

  return (
    <Sprite
      id={`line-${direction}`}
      viewBox="0 0 460 189"
      className={clsx(s.line, className, s[color], s[direction])}
      style={styles}
    />
  )
}
