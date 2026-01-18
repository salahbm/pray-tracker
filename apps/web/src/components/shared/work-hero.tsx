"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons"
import { cn, safeImage } from "@/lib/utils"

interface WorkHeroProps {
  title: string
  backgroundImage: string
  textColor?: "01" | "00"
  year?: string
  client?: string
  device?: string
  service?: string
  overlay?: boolean
  onPrevious?: () => void
  onNext?: () => void
  showNavigation?: boolean
}

export const WorkHero: React.FC<WorkHeroProps> = ({
  title,
  backgroundImage,
  textColor = "01",
  year,
  client,
  device,
  service,
  overlay = false,
  onPrevious,
  onNext,
  showNavigation = false,
}) => {
  const isWhiteText = textColor === "01"

  return (
    <div className="relative min-h-[600px]">
      {/* Background Image */}
      <Image src={safeImage(backgroundImage)} alt={title} fill className="object-cover" priority />

      {/* Overlay */}
      {overlay && <div className="absolute inset-0 bg-black/30" />}

      {/* Navigation Arrows */}
      {showNavigation && (
        <>
          {onPrevious && (
            <button
              onClick={onPrevious}
              className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20 md:left-8"
              aria-label="Previous work"
            >
              <ChevronLeftIcon className="size-6 text-white" />
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20 md:right-8"
              aria-label="Next work"
            >
              <ChevronRightIcon className="size-6 text-white" />
            </button>
          )}
        </>
      )}

      {/* Content */}
      <div className="absolute inset-0 top-1/2 flex w-full flex-col justify-between pb-9">
        {/*  Title */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={cn(isWhiteText ? "text-white" : "text-black")}
        >
          <h1 className="text-title-1-kr">{title}</h1>
        </motion.div>

        {/* Metadata */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={cn("flex gap-14", isWhiteText ? "text-white" : "text-black")}
        >
          <div className="flex flex-wrap gap-14">
            {year && (
              <dl className="flex-center gap-4">
                <dt className="text-body-1">Year</dt>
                <dd className="text-body-2">{year}</dd>
              </dl>
            )}
            {client && (
              <dl className="flex-center gap-4">
                <dt className="text-body-1">Client</dt>
                <dd className="text-body-2">{client}</dd>
              </dl>
            )}
            {device && (
              <dl className="flex-center gap-4">
                <dt className="text-body-1">Device</dt>
                <dd className="text-body-2">{device}</dd>
              </dl>
            )}
            {service && (
              <dl className="flex-center gap-4">
                <dt className="text-body-1">Service</dt>
                <dd className="text-body-2">{service}</dd>
              </dl>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
