"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useLayoutEffect, useRef, useState } from "react"

export function RouteOverlay() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const isFirstRender = useRef(true)

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    setVisible(true)
    const t = setTimeout(() => setVisible(false), 900)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="overlay"
          initial={{ height: "0vh" }}
          animate={{ height: "100vh" }}
          exit={{ height: "100vh", y: "-100vh" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="bg-primary-100 z-transition pointer-events-none fixed bottom-0 left-0 w-screen"
        />
      )}
    </AnimatePresence>
  )
}
