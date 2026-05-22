import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2",
  {
    variants: {
      variant: {
        success: "bg-secondary-100 text-secondary-700",
        critical: "bg-critical-100 text-critical-700",
        warning: "bg-warning-100 text-warning-700",
        neutral: "bg-neutral-100 text-neutral-700",
        primary: "bg-primary-100 text-primary-700",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
