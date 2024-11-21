import { Sub, Wrapper } from "../kit"
import s from "./heading.module.scss"

export interface HeadingProps {
  children?: React.ReactNode
  sub: string
}

export const Heading = ({ children, sub }: HeadingProps) => {
  return (
    <div className={s.heading}>
      <Wrapper>
        <Sub className={s.sub}>{sub}</Sub>
        <h1 className={s.title}>{children}</h1>
      </Wrapper>
      <div className={s.bg}>
        <div />
      </div>
    </div>
  )
}
