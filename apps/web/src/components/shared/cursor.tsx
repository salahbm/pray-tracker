"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

type CursorState = "default" | "button" | "text"

export default function AppCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [cursorState, setCursorState] = useState<CursorState>("default")

  const springConfig = { damping: 30, stiffness: 250 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const detectState = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      if (target.closest("button, a, [role='button']")) {
        setCursorState("button")
      } else if (target.closest("h1, h2, h3, h4, h5, h6, p, span, label")) {
        setCursorState("text")
      } else {
        setCursorState("default")
      }
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", detectState)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", detectState)
    }
  }, [cursorX, cursorY])

  const getSize = () => {
    switch (cursorState) {
      case "button":
        return 50
      case "text":
        return 16
      default:
        return 28
    }
  }

  return (
    <motion.div
      animate={{
        width: getSize(),
        height: getSize(),
      }}
      className="pointer-events-none fixed z-50 hidden rounded-full border border-gray-800/30 bg-gray-800/5 md:block"
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
        x: "-50%",
        y: "-50%",
      }}
    />
  )
}
