"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale } from "next-intl"
import React, { Fragment, useRef } from "react"
import { ArrowRightIcon, ArrowTopRightIcon } from "@/components/icons"
import { BentoCard, BentoGrid, Container } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { useMainWorks } from "@/hooks/work"
import { safeImage } from "@/lib/utils"
import type { MainWork } from "@/types/work.types"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 12,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
}

const MotionBentoGrid = motion(BentoGrid)

interface WorkShowcaseProps {
  initialData?: MainWork[]
}

const WorkShowcase: React.FC<WorkShowcaseProps> = ({ initialData }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()
  const locale = useLocale()
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { data: works } = useMainWorks(initialData, locale)

  if (!works || works.length === 0) {
    return null
  }

  const renderWork = (work: MainWork) => {
    return (
      <Link href={`/work/${work.workNo}`} className="group relative block h-full w-full overflow-hidden">
        <Image
          src={safeImage(work.thumPageMain)}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        <ArrowTopRightIcon className="absolute top-6 right-6 size-6 text-white" />
      </Link>
    )
  }

  return (
    <Fragment>
      <Container className="space-y-4" variant="topless" ref={ref}>
        <MotionBentoGrid
          key={pathname}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{
            staggerChildren: 0.05,
            delayChildren: 0.1,
          }}
        >
          {/* FIRST ROW */}

          {works[0] && (
            <BentoCard variants={cardVariants} variant="double" aspect="video">
              {renderWork(works[0])}
            </BentoCard>
          )}

          {works[1] && (
            <BentoCard variants={cardVariants} variant="single" aspect="portrait">
              {renderWork(works[1])}
            </BentoCard>
          )}

          {/* Empty cell in first row */}
          <div className="col-span-1 row-span-1 hidden lg:block" />

          {/* SECOND ROW */}

          {/* Empty cell at start of second row */}
          <div className="col-span-1 row-span-1 hidden lg:block" />

          {works[2] && (
            <BentoCard variants={cardVariants} variant="single" aspect="portrait">
              {renderWork(works[2])}
            </BentoCard>
          )}

          {works[3] && (
            <BentoCard variants={cardVariants} variant="single" aspect="portrait">
              {renderWork(works[3])}
            </BentoCard>
          )}

          {works[4] && (
            <BentoCard variants={cardVariants} variant="single" aspect="portrait">
              {renderWork(works[4])}
            </BentoCard>
          )}
        </MotionBentoGrid>
      </Container>

      <Link href="/work">
        <Button variant="outline" className="mx-auto">
          work <ArrowRightIcon className="size-4" />
        </Button>
      </Link>
    </Fragment>
  )
}

export { WorkShowcase }
