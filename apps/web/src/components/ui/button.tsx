import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "text-body-1 flex cursor-pointer items-center justify-center gap-2 transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/90 px-8 py-2 min-w-40 rounded-full text-primary-forground",
        outline:
          "px-8 min-w-40 py-2 text-foreground border border-foreground rounded-full bg-transparent hover:bg-foreground hover:text-primary-forground hover:[&>svg]:text-primary-forground [&>svg]:transition-all [&>svg]:duration-300 [&>svg]:ease-in-out",
        link: "text-foreground hover:underline underline-offset-4 hover:[&>svg]:underline-none",
        icon: "size-10 gap-0 aspect-square p-3 rounded-full bg-white [&>svg]:text-foreground [&>svg]:size-5 data-[selected=true]:rotate-180 [&>svg]:transition-all [&>svg]:duration-300",
        send: "text-title-2 gap-3 min-h-[280px] min-w-[280px] size-[280px] aspect-square rounded-full text-primary-forground bg-foreground/80 hover:bg-foreground hover:[&>svg]:translate-x-2 [&>svg]:transition-all [&>svg]:duration-300 [&>svg]:ease-in-out",
        chip:
          "px-2.5 min-w-40 py-2 border border-foreground rounded-xl bg-transparent hover:text-primary-forground hover:bg-foreground/80 disabled:border-[0.5px] disabled:bg-transparent disabled:text-muted-forground disabled:border-muted disabled:text-body-2 data-[selected=true]:bg-foreground data-[selected=true]:text-primary-forground",
        file: "px-5 py-2 min-w-28 text-body-2 text-foreground border border-foreground hover:bg-foreground/80 hover:text-primary-forground hover:border-none rounded-full",
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
