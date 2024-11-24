import clsx from "clsx"
import { Icon } from "../icon"
import s from "./mdx.module.scss"

interface RuleProps extends React.HTMLAttributes<HTMLDetailsElement> {
  title: string
  emoji?: string
  children: React.ReactNode
}

export const Rule = ({ title, emoji, children, ...props }: RuleProps) => {
  return (
    <details {...props} className={s.rule}>
      <summary>
        {emoji && emoji}
        <h2>{title}</h2>
        <Icon icon="arrowDown" className={s.arrow} />
      </summary>
      <div className={s.list}>{children}</div>
    </details>
  )
}

interface RuleSubtitleProps {
  emoji?: string
  children: React.ReactNode
}

export const RuleSubtitle = ({ emoji, children }: RuleSubtitleProps) => {
  return (
    <div className={s.subtitle}>
      {emoji && emoji}
      <h3>{children}</h3>
    </div>
  )
}

interface ItemProps {
  title?: string
  emoji?: string
  state?: "interdit" | "autorise"
  children: React.ReactNode
  inline?: boolean
}

export const Item = ({ title, emoji, state, children, inline }: ItemProps) => {
  return (
    <div className={s.item} data-state={state} data-inline={inline}>
      {emoji && (
        <div className={s.left}>
          <div className={s.emoji}>{emoji}</div>
        </div>
      )}
      <div className={s.right}>
        {title && (
          <h3>
            {title}
            {/* {state === "interdit" && <span className={s.state}>interdit</span>} */}
          </h3>
        )}
        <div className={s.content}>{children}</div>
      </div>
    </div>
  )
}

interface SubitemProps {
  title?: string
  state?: "interdit" | "autorise"
  children: React.ReactNode
  inline?: boolean
}

export const Subitem = ({ title, state, children, inline }: SubitemProps) => {
  return (
    <div
      className={clsx(s.item, s.subitem)}
      data-state={state}
      data-inline={inline}
    >
      <div className={s.right}>
        {title && <h4>{title}</h4>}
        <div className={s.content}>{children}</div>
      </div>
    </div>
  )
}
