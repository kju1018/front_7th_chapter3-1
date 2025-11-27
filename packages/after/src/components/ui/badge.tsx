import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
      tone: {
        default: "",
        slate: "border-slate-200 bg-slate-100 text-slate-700",
        gray: "border-gray-300 bg-gray-100 text-gray-800",
        green: "border-green-200 bg-green-50 text-green-700",
        amber: "border-amber-200 bg-amber-50 text-amber-700",
        rose: "border-rose-200 bg-rose-50 text-rose-700",
        blue: "border-blue-200 bg-blue-50 text-blue-700",
        purple: "border-purple-200 bg-purple-50 text-purple-700",
        emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
      },
    },
    defaultVariants: {
      variant: "default",
      tone: "default",
    },
  }
)

function Badge({
  className,
  variant,
  tone,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, tone }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
