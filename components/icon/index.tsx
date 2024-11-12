"use client"

import { IconName, ICONS } from "@/config/icons"
import { Icon as Iconify, IconProps as IconifyProps } from "@iconify/react"

interface IconProps extends IconifyProps {
  icon: IconName
}

export const Icon = ({ icon, ...props }: IconProps) => (
  <Iconify {...props} icon={ICONS[icon]} />
)
