
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-lovart-primary text-white hover:bg-lovart-primary-dark",
        secondary:
          "border-transparent bg-lovart-orange text-white hover:bg-lovart-orange-dark",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900",
        success: "border-transparent bg-emerald-500 text-white hover:bg-emerald-600",
        warning: "border-transparent bg-amber-500 text-white hover:bg-amber-600",
        neutral: "border-transparent bg-gray-100 text-lovart-neutral hover:bg-gray-200",
        skill: "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Enhanced skill badge variants
const skillBadgeVariants = cva(
  "skill-badge-enhanced",
  {
    variants: {
      skill: {
        climber: "skill-climber-enhanced",
        groundwork: "skill-groundwork-enhanced",
        crane: "skill-crane-enhanced",
        phc: "skill-phc-enhanced",
        storm: "skill-storm-enhanced",
      },
    },
  }
)

// Status badge variants
const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold",
  {
    variants: {
      status: {
        open: "status-open-enhanced",
        urgent: "status-urgent-enhanced",
        storm: "status-storm-enhanced",
        completed: "bg-gray-500 text-white",
        inProgress: "bg-blue-500 text-white",
        cancelled: "bg-gray-400 text-white",
      },
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export interface SkillBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skillBadgeVariants> {}

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

function SkillBadge({ className, skill, children, ...props }: SkillBadgeProps) {
  return (
    <div className={cn(skillBadgeVariants({ skill }), className)} {...props}>
      {children}
    </div>
  )
}

function StatusBadge({ className, status, children, ...props }: StatusBadgeProps) {
  return (
    <div className={cn(statusBadgeVariants({ status }), className)} {...props}>
      {children}
    </div>
  )
}

// Price badge component
function PriceBadge({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("price-tag-enhanced", className)} {...props}>
      {children}
    </div>
  )
}

export { Badge, SkillBadge, StatusBadge, PriceBadge, badgeVariants }
