"use client"

import { Social } from "@/config/socials"
import { Icon } from "@iconify/react"
import clsx from "clsx"
import { HTMLAttributes } from "react"
import { Link } from "../link"
import s from "./socials.module.scss"

export const SocialLink = ({ name, icon, url }: Social) => {
  return (
    <Link href={url} className={s.social}>
      <Icon icon={icon} />
    </Link>
  )
}

interface Socials extends HTMLAttributes<HTMLUListElement> {
  socials: Social[]
}

export const Socials = ({ socials, ...props }: Socials) => {
  const classNames = clsx(s.socials, props.className)

  return (
    <ul {...props} className={classNames}>
      {socials.map((social, index) => (
        <li key={index}>
          <SocialLink {...social} />
        </li>
      ))}
    </ul>
  )
}
