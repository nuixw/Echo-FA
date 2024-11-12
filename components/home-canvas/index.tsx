"use client"

import Spline from "@splinetool/react-spline"
import s from "./home-canvas.module.scss"

export const HomeCanvas = () => {
  return (
    <div className={s.scene}>
      <Spline scene="https://draft.spline.design/PzlKRzgxEQHfLs7N/scene.splinecode" />
    </div>
  )
}
