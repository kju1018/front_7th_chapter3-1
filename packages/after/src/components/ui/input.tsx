import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      size: {
        sm: "h-8 px-3 py-1 text-sm",
        md: "h-9 px-3 py-1.5 text-base md:text-sm",
        lg: "h-10 px-4 py-2 text-base",
      },
      invalid: {
        true: "border-destructive aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      invalid: false,
    },
  }
)

type InputProps = React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    invalid?: boolean
  }

function Input({ className, type, size, invalid, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      aria-invalid={invalid || undefined}
      className={cn(inputVariants({ size, invalid, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
