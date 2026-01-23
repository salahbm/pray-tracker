"use client"
import { motion, useInView } from "framer-motion"
import { usePathname } from "next/navigation"
import React, { Fragment, useRef } from "react"
import { ArrowRightIcon } from "@/components/icons"
import { BentoCard, BentoGrid, Container } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

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

const WorkShowcase: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const renderSkeleton = () => <div className="h-full w-full animate-pulse rounded-lg bg-gray-400" />

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
          <BentoCard variants={cardVariants} variant="double" aspect="video">
            {renderSkeleton()}
          </BentoCard>

          <BentoCard variants={cardVariants} variant="single" aspect="portrait">
            {renderSkeleton()}
          </BentoCard>

          {/* Empty cell in first row */}
          <div className="col-span-1 row-span-1 hidden lg:block" />

          {/* SECOND ROW */}

          {/* Empty cell at start of second row */}
          <div className="col-span-1 row-span-1 hidden lg:block" />

          <BentoCard variants={cardVariants} variant="single" aspect="portrait">
            {renderSkeleton()}
          </BentoCard>

          <BentoCard variants={cardVariants} variant="single" aspect="portrait">
            {renderSkeleton()}
          </BentoCard>

          <BentoCard variants={cardVariants} variant="single" aspect="portrait">
            {renderSkeleton()}
          </BentoCard>
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
