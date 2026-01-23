"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { HTMLMotionProps } from "framer-motion"
import { MotionDiv } from "@/lib/motion"
import { cn } from "@/lib/utils"

const bentoCardVariants = cva(
  "relative overflow-hidden rounded-md lg:rounded-xl cursor-pointer transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        single: "col-span-1 row-span-1",
        double: "col-span-2 row-span-1",
      },
    },
    defaultVariants: {
      variant: "single",
    },
  }
)

const bentoAspect = cva("", {
  variants: {
    aspect: {
      none: "",
      square: "aspect-square",
      video: "aspect-video",
      portrait: "aspect-3/4",
    },
  },
  defaultVariants: {
    aspect: "none",
  },
})

type BentoCardProps = {
  className?: string
  children?: React.ReactNode
} & VariantProps<typeof bentoCardVariants> &
  VariantProps<typeof bentoAspect> &
  Omit<HTMLMotionProps<"div">, "ref">

export function BentoCard({ className, children, variant, aspect, ...motionProps }: BentoCardProps) {
  return (
    <MotionDiv className={cn(bentoCardVariants({ variant }), className)} {...motionProps}>
      <div className={cn("h-full w-full", bentoAspect({ aspect }))}>{children}</div>
    </MotionDiv>
  )
}
