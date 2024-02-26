import * as React from "react"
import { cn } from "@/utils/cn"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, label, error, ...props }, ref) => {
    const isError = !!error

    return (
      <div className={cn([isError && "text-red-500"])}>
        <label htmlFor={props.name} className="text-sm mb-1 block font-lora">
          {label}
        </label>
        <Input
          {...props}
          className={cn(className, [isError && "border-red-400"])}
          id={props.name}
          ref={ref}
        />
        <span className="text-xs italic">{error}&nbsp;</span>
      </div>
    )
  }
)

TextField.displayName = "TextField"

export { Input, TextField }
