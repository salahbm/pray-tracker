"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

const cursorVariant = cva(
  "hidden md:block pointer-events-none fixed z-cursor -translate-x-1/2 -translate-y-1/2 rounded-full",
  {
    variants: {
      variant: {
        default: "size-10 bg-black/20",
        expand: "size-24 bg-black/20",
        yellow: "size-24 bg-yellow-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type CursorVariant = VariantProps<typeof cursorVariant>["variant"]

const MotionDiv = motion.create("div")

export default function CursorFollow() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [variant, setVariant] = useState<CursorVariant>("default")

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const detectVariant = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      if (target.closest("[data-cursor-yellow]")) {
        setVariant("yellow")
      } else if (target.closest("[data-cursor-expand]")) {
        setVariant("expand")
      } else {
        setVariant("default")
      }
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", detectVariant)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", detectVariant)
    }
  }, [cursorX, cursorY])

  return (
    <MotionDiv
      key={variant}
      className={cursorVariant({ variant })}
      animate={{ scale: [0.7, 0.9, 1, 1.1, 1.12, 1.1, 1, 0.95, 1] }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
      }}
    />
  )
}
