import { cn } from "@/utils/cn"
import { cva, VariantProps } from "class-variance-authority"

const headingVariants = cva("font-lora", {
  variants: {
    variant: {
      h1: "text-3xl font-semibold",
      h2: "text-2xl font-semibold",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
})

interface HeadingProps
  extends React.ButtonHTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2"
}

export function Heading(props: HeadingProps) {
  const { as, className, ...rest } = props
  const Tag = as ?? "h1"

  return <Tag className={cn([headingVariants(), className])} {...rest} />
}
