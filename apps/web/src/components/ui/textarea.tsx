import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:typo-body-2 typo-body-1 min-h-95 w-full rounded-2xl border-[0.5px] border-black bg-transparent px-7 py-6 text-black ring-0 outline-0 [scrollbar-color:transparent] [scrollbar-width:none] focus:border-b-[1.5px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
