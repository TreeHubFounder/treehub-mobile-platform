
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation min-h-[48px]",
  {
    variants: {
      variant: {
        default: "bg-lovart-primary text-white shadow-lg hover:bg-lovart-primary-dark hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md",
        destructive:
          "bg-red-500 text-white shadow-lg hover:bg-red-600 hover:shadow-xl hover:-translate-y-0.5",
        outline:
          "border-2 border-lovart-primary text-lovart-primary bg-white hover:bg-lovart-primary hover:text-white shadow-sm hover:shadow-md",
        secondary:
          "bg-lovart-orange text-white shadow-lg hover:bg-lovart-orange-dark hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md",
        ghost: "text-lovart-neutral hover:bg-gray-50 hover:text-lovart-forest",
        link: "text-lovart-primary underline-offset-4 hover:underline p-0 h-auto min-h-0",
        success: "bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 hover:shadow-xl hover:-translate-y-0.5",
        warning: "bg-amber-500 text-white shadow-lg hover:bg-amber-600 hover:shadow-xl hover:-translate-y-0.5",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-xl px-8 text-base",
        xl: "h-16 rounded-xl px-10 text-lg",
        icon: "h-12 w-12 rounded-xl",
        "icon-sm": "h-10 w-10 rounded-lg",
        "icon-lg": "h-14 w-14 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
