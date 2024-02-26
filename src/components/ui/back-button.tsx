import { cn } from "@/utils/cn"
import { ArrowIcon } from "../icons/arrow"
import { Link } from "react-router-dom"

type BackButton = React.ComponentProps<"button"> & {
  to?: string
}

export function BackButton(props: BackButton) {
  const { className, children, to, ...rest } = props

  if (to) {
    return (
      <Link to={to}>
        <BackButton {...{ className, children, ...rest }} />
      </Link>
    )
  }

  return (
    <button
      className={cn([
        "flex items-center gap-2 font-semibold hover:underline underline-offset-2 hover:opacity-70 transition-colors duration-300",
        className,
      ])}
      {...rest}
    >
      {children ?? (
        <>
          <ArrowIcon />
          <span>Back</span>
        </>
      )}
    </button>
  )
}
