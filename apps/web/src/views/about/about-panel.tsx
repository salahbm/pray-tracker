"use client"

import { AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { memo, useCallback, useMemo, useState } from "react"
import { ChevronTopIcon } from "@/components/icons"
import { MotionButton, MotionDiv } from "@/lib/motion"

type Category = {
  key: string
  iconSrc: string
}

type Props = {
  categories?: Category[]
  defaultExpanded?: boolean
}

const DEFAULT_CATEGORIES: Category[] = [
  { key: "marketing", iconSrc: "/source/megaphone.png" },
  { key: "brand", iconSrc: "/source/building.png" },
  { key: "ecommerce", iconSrc: "/source/ecommerce.png" },
  { key: "community", iconSrc: "/source/chat.png" },
  { key: "realestate", iconSrc: "/source/contract.png" },
  { key: "factory", iconSrc: "/source/industry.png" },
  { key: "recruit", iconSrc: "/source/approved.png" },
  { key: "ml", iconSrc: "/source/machine-learning.png" },
]

export const SolutionCategoriesPanel = memo(function SolutionCategoriesPanel({
  categories = DEFAULT_CATEGORIES,
  defaultExpanded = false,
}: Props) {
  const t = useTranslations("about.solution")
  const [expanded, setExpanded] = useState(defaultExpanded)

  const toggle = useCallback(() => setExpanded((v) => !v), [])
  const topGrid = useMemo(() => categories.slice(0, 8), [categories])

  const features = t.raw("features") as string[]
  const industries = t.raw("industries") as string[]

  return (
    <section className="mx-auto w-full xl:max-w-[1200px]">
      <div className="shadow-2 w-full rounded-md bg-white px-9 py-7.5 md:rounded-lg">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
          {topGrid.map((c) => (
            <div key={c.key} className="group flex flex-col items-center justify-center gap-4 py-1 md:px-5 md:py-3">
              <div className="relative h-10 w-10">
                <Image src={c.iconSrc} alt="" fill sizes="40px" className="object-contain" />
              </div>
              <span className="typo-body-2 tracking-tight">{t(`categories.${c.key}`)}</span>
            </div>
          ))}
        </div>
      </div>

      <MotionButton
        type="button"
        onClick={toggle}
        aria-expanded={expanded}
        animate={expanded ? { opacity: 0, display: "none" } : { opacity: 1, display: "block" }}
        transition={{ duration: 0.25 }}
        className="flex-center mx-auto mt-5 rounded-full bg-white p-3"
      >
        <ChevronTopIcon className="h-5 w-5" />
      </MotionButton>

      <AnimatePresence initial={false}>
        {expanded && (
          <MotionDiv
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-auto max-w-md overflow-hidden"
          >
            <div className="mt-8 text-center">
              <div className="typo-body-2 px-2.5 py-1.5">{t("sections.features")}</div>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {features.map((f) => (
                  <p
                    key={f}
                    className="flex-center typo-body-2 rounded-md bg-white px-2.5 py-1.5 whitespace-nowrap text-gray-600"
                  >
                    {f}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="typo-body-2 px-2.5 py-1.5">{t("sections.industries")}</div>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {industries.map((i) => (
                  <p
                    key={i}
                    className="flex-center typo-body-2 rounded-md bg-white px-2.5 py-1.5 whitespace-nowrap text-gray-600"
                  >
                    {i}
                  </p>
                ))}
              </div>
            </div>

            <MotionButton type="button" onClick={toggle} className="flex-center mx-auto mt-5 rounded-full bg-white p-3">
              <ChevronTopIcon className="h-5 w-5" />
            </MotionButton>
          </MotionDiv>
        )}
      </AnimatePresence>
    </section>
  )
})
