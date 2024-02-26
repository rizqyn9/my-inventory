import { cn } from "@/utils/cn"
import React from "react"

type SectionProps = React.ComponentProps<"section">

export function Section(props: SectionProps) {
  const { className, ...rest } = props
  return <section className={cn(className)} {...rest} />
}
