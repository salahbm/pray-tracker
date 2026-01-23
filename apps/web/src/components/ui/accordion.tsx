"use client"

import { cva, type VariantProps } from "class-variance-authority"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import React, { createContext, memo, useCallback, useContext, useState } from "react"
import { MotionDiv } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { ChevronTopIcon } from "../icons"

const accordionVariants = cva("cursor-pointer group transition-all duration-200 ease-in-out", {
  variants: {
    tone: {
      default:
        "bg-white flex w-full items-center justify-between rounded-md md:rounded-lg md:py-4 md:pl-8 md:pr-6 lg:rounded-[20px] py-3 pl-6 pr-4 lg:py-5 lg:pr-8 lg:pl-10 data-[expanded=true]:rounded-b-none",
      outline:
        "flex w-full items-center justify-between py-5 pr-8 pl-10 border-b border-gray-500 data-[expanded=true]:rounded-b-none",
      ghost: "bg-transparent",
    },
    icon: {
      default: "[&>span]:transition-transform data-[expanded=true]:[&>span]:rotate-0 [&>span]:rotate-180",
      ghost: "[&>span]:hidden",
    },
  },
  defaultVariants: {
    tone: "default",
    icon: "default",
  },
})

type AccordionContextValue = {
  openItem: string | null
  toggle: (id: string) => void
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

export type AccordionProps = {
  children: React.ReactNode
  defaultValue?: string | null
  value?: string | null
  onValueChange?: (value: string | null) => void
  className?: string
}

export const Accordion = memo(function Accordion({
  children,
  defaultValue = null,
  value,
  onValueChange,
  className,
}: AccordionProps) {
  const [internal, setInternal] = useState<string | null>(defaultValue)
  const openItem = value !== undefined ? value : internal

  const toggle = useCallback(
    (id: string) => {
      const next = openItem === id ? null : id
      onValueChange?.(next)
      if (value === undefined) setInternal(next)
    },
    [openItem, onValueChange, value]
  )

  return (
    <div className={className}>
      <AccordionContext.Provider value={{ openItem, toggle }} data-slot="accordion">
        {children}
      </AccordionContext.Provider>
    </div>
  )
})

export type AccordionItemProps = {
  value: string
  children: React.ReactNode
}

export const AccordionItem = memo(function AccordionItem({ children }: AccordionItemProps) {
  return <div>{children}</div>
})

export type AccordionTriggerProps = VariantProps<typeof accordionVariants> & {
  value: string
  children?: React.ReactNode
  className?: string
}

export const AccordionTrigger = memo(function AccordionTrigger({
  icon,
  tone,
  value,
  children,
  className,
}: AccordionTriggerProps) {
  const ctx = useContext(AccordionContext)
  if (!ctx) throw new Error("AccordionTrigger must be inside Accordion")

  const open = ctx.openItem === value

  return (
    <button
      type="button"
      onClick={() => ctx.toggle(value)}
      aria-expanded={open}
      data-expanded={open}
      className={cn(accordionVariants({ icon, tone }), className)}
    >
      {children}
      <span className="group-[data-expanded=true]:rotate-180">
        <ChevronTopIcon className="size-5 shrink-0 text-inherit lg:size-6" />
      </span>
    </button>
  )
})

export type AccordionContentProps = {
  value: string
  children: React.ReactNode
  className?: string
}

export const AccordionContent = memo(function AccordionContent({ value, children, className }: AccordionContentProps) {
  const ctx = useContext(AccordionContext)

  if (!ctx) throw new Error("AccordionContent must be inside Accordion")

  const open = ctx.openItem === value

  return (
    <AnimatePresence initial={false}>
      {open && (
        <MotionDiv
          layout
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className={clsx("overflow-hidden", className)}
        >
          {children}
        </MotionDiv>
      )}
    </AnimatePresence>
  )
})
