import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "typo-body-1 flex cursor-pointer items-center justify-center gap-2 transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-primary-200 hover:bg-primary-100 px-8 py-2 min-w-40 rounded-full text-white",
        outline:
          "px-8 min-w-40 py-2 text-black border border-black rounded-full bg-transparent hover:bg-black/70 hover:text-white hover:[&>svg]:text-white [&>svg]:transition-all [&>svg]:duration-300 [&>svg]:ease-in-out",
        link: "text-black hover:underline underline-offset-4 hover:[&>svg]:underline-none",
        icon: "size-10 gap-0 aspect-square p-3 rounded-full bg-white [&>svg]:text-black [&>svg]:size-5 data-[selected=true]:rotate-180 [&>svg]:transition-all [&>svg]:duration-300",
        send: "typo-title-2 gap-3 min-h-[280px] min-w-[280px] size-[280px] aspect-square rounded-full text-white bg-black/70 hover:bg-black hover:[&>svg]:translate-x-2 [&>svg]:transition-all [&>svg]:duration-300 [&>svg]:ease-in-out",
        file: "px-5 py-2 min-w-28 typo-body-2 text-black border border-black hover:bg-black/70 hover:text-white rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return <Comp ref={ref} data-slot="button" className={cn(buttonVariants({ variant }), className)} {...props} />
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
