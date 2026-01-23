import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:typo-body-2 typo-body-1 w-full min-w-0 border-b-[0.5px] border-black bg-transparent px-3 pb-4 text-black transition-[color,box-shadow] outline-none placeholder:text-black/20 hover:border-b focus:border-b-[1.5px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
