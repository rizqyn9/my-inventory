import { cn } from "@/utils/cn"

type ContainerProps = React.ComponentProps<"div">

export function Container(props: ContainerProps) {
  const { className, ...rest } = props
  return (
    <div
      className={cn(["min-h-screen p-[2vw] relative", className])}
      {...rest}
    />
  )
}
