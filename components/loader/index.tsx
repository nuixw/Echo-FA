import clsx from "clsx"
import { Icon } from "../icon"
import s from "./loader.module.scss"

interface LoaderProps {
  className?: string
}

export const Loader = ({ className }: LoaderProps) => (
  <Icon icon="loader" className={clsx(s.loader, className)} />
)
