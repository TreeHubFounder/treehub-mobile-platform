
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "input-field-enhanced focus-enhanced",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

// Enhanced search input component
const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="search"
        className={cn(
          "flex-1 bg-transparent border-none outline-none placeholder-gray-400 text-lovart-forest",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
SearchInput.displayName = "SearchInput"

// Enhanced textarea component
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "input-field-enhanced focus-enhanced min-h-[100px] resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

// Enhanced label component
export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={cn(
          "input-label-enhanced",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Input, SearchInput, Textarea, Label }
