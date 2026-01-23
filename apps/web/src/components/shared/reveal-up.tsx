import React from "react"
import { MotionDiv } from "@/lib/motion"
import { cn } from "@/lib/utils"

type RevealUpProps = {
  children: React.ReactNode
  className?: string
  index?: number
}

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 1 },
}

const innerVariants = {
  hidden: { y: "120%" }, // start below, slide UP into view
  visible: { y: "0%" },
  exit: { y: "-120%" }, // slide UP out on exit
}

export function RevealUp({ children, className }: RevealUpProps) {
  return (
    <MotionDiv variants={itemVariants} className={cn("overflow-hidden", className)}>
      <MotionDiv
        variants={innerVariants}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="will-change-transform"
      >
        {children}
      </MotionDiv>
    </MotionDiv>
  )
}
