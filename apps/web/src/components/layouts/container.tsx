import { cva, type VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "@/lib/utils"

const containerVariants = cva("w-full", {
  variants: {
    variant: {
      default: "px-5 pt-4 pb-7 md:px-8 md:pb-13 md:pt-6 lg:px-10 lg:pt-8 lg:pb-15 xl:pb-20",
      bottomless: "px-5 pt-4 md:px-8 md:pt-6 lg:px-10 lg:pt-8",
      topless: "px-5 pb-7 md:px-8 md:pb-13 lg:px-10 lg:pb-15 xl:pb-20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

type ContainerProps = {
  children?: React.ReactNode
  className?: string
  variant?: VariantProps<typeof containerVariants>["variant"]
  ref?: React.RefObject<HTMLDivElement | null>
}

const Container: React.FC<ContainerProps> = ({ variant = "default", children, className, ref }) => {
  return (
    <div className={cn(containerVariants({ variant }), className)} ref={ref}>
      {children}
    </div>
  )
}

export { Container }
