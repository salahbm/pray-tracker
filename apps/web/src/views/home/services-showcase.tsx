"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import React, { Fragment, useRef } from "react"
import { ArrowRightIcon, ArrowTopRightIcon } from "@/components/icons"
import { BentoCard, BentoGrid, Container } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const rowVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const MotionBentoGrid = motion(BentoGrid)

type RowItem = {
  id: "pm" | "service" | "ux" | "dev"
  image: string
  href?: string
  alignEmpty: "left" | "right"
}

const rows: RowItem[] = [
  { id: "pm", image: "/home/pm.png", alignEmpty: "left" },
  { id: "service", image: "/home/service.png", alignEmpty: "right" },
  { id: "ux", image: "/home/ux.png", alignEmpty: "left" },
  { id: "dev", image: "/home/dev.png", alignEmpty: "right" },
]

// Cubic easing used across all transitions
const cubicEase = [0.22, 1, 0.36, 1] as const

export const ServicesShowcase: React.FC = () => {
  const router = useRouter()
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const t = useTranslations("home.services")

  return (
    <Fragment>
      <h1 className="typo-title-2 mt-48 mb-15 text-center">{t("headline")}</h1>

      <Container variant="topless" className="space-y-4 overflow-x-hidden" ref={ref}>
        <MotionBentoGrid
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {rows.map((row) => {
            const title = t(`${row.id}.title`)
            const bullets = t.raw(`${row.id}.bullets`) as string[]

            const titleCell = (
              <BentoCard
                key={`${row.id}-title`}
                variant="single"
                aspect="square"
                variants={rowVariants}
                transition={{ duration: 0.5, ease: cubicEase }}
              >
                <div className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-md p-4 text-white md:p-6 lg:rounded-xl lg:p-10">
                  {/* Base color */}
                  <div className="bg-primary-300 absolute inset-0" />

                  {/* Animated circle layer */}
                  <div className="bg-primary-100 ease-circle absolute inset-0 origin-center scale-0 rounded-full transition-transform duration-700 group-hover:scale-150" />

                  {/* Content (always on top) */}
                  <h1 className="text-title-3 relative z-10">{title}</h1>
                  <ArrowTopRightIcon className="relative z-10 size-6 lg:size-8" />
                </div>
              </BentoCard>
            )

            const bulletsCell = (
              <BentoCard
                key={`${row.id}-bullets`}
                variant="single"
                aspect="square"
                variants={rowVariants}
                transition={{ duration: 0.5, ease: cubicEase }}
                className="hidden md:block"
              >
                <div className="h-full w-full rounded-md bg-gray-600 p-4 text-white md:p-6 lg:rounded-xl lg:p-10">
                  <ul className="leading-5">
                    {bullets.map((b, i) => (
                      <li key={i} className="flex gap-1.5">
                        <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-white/90" />
                        <span className="typo-body-1">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BentoCard>
            )

            const imageCell = (
              <BentoCard
                key={`${row.id}-img`}
                variant="single"
                aspect="square"
                variants={rowVariants}
                transition={{ duration: 0.5, ease: cubicEase }}
              >
                <div className="ease-circle relative h-full w-full overflow-hidden rounded-md grayscale transition-all duration-500 group-hover:grayscale-0 lg:rounded-xl">
                  <Image src={row.image} alt={title} fill className="object-cover" />
                </div>
              </BentoCard>
            )

            return (
              <div key={row.id} className="group contents" onClick={() => router.push("/service")}>
                {row.alignEmpty === "left" ? (
                  <>
                    <BentoCard key={`${row.id}-empty`} variant="single" aspect="square" className="hidden lg:block" />
                    {titleCell}
                    {bulletsCell}
                    {imageCell}
                  </>
                ) : (
                  <>
                    {titleCell}
                    {bulletsCell}
                    {imageCell}
                    <BentoCard key={`${row.id}-empty`} variant="single" aspect="square" className="hidden lg:block" />
                  </>
                )}
              </div>
            )
          })}
        </MotionBentoGrid>
      </Container>
      <Link href="/service" className="flex-center">
        <Button variant="outline">
          {t("cta")} <ArrowRightIcon className="size-4" />
        </Button>
      </Link>
    </Fragment>
  )
}
