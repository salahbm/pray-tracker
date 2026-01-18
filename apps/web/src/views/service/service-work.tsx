"use client"

import Image from "next/image"
import Link from "next/link"
import React from "react"
import { ArrowRightIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"

export interface FeaturedWork {
  id: string
  title: string
  image: string
  href: string
}

export const FEATURED_WORKS: FeaturedWork[] = [
  {
    id: "bonus",
    title: "BONUS GROUP",
    image: "/service/dev.png",
    href: "/work/bonus",
  },
  {
    id: "probe",
    title: "PROBE",
    image: "/service/dev.png",
    href: "/work/probe",
  },
  {
    id: "desktop",
    title: "DESKTOP",
    image: "/service/dev.png",
    href: "/work/desktop",
  },
]

const ServiceWork: React.FC = () => {
  return (
    <section className="mt-60 md:mt-[140px] lg:mt-80">
      <h2 className="text-title-2 mb-20 text-center">Featured Works</h2>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-3">
        {FEATURED_WORKS.map((work) => (
          <Link
            key={work.id}
            href={work.href}
            className="group relative aspect-3/4 min-h-[360px] overflow-hidden rounded-3xl bg-neutral-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <Image
              src={work.image}
              alt={work.title}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* subtle gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />

            {/* view pill */}
            <div className="absolute bottom-5 left-5">
              <span className="rounded-full border border-white/40 bg-white/10 px-4 py-1 text-xs text-white backdrop-blur">
                view
              </span>
            </div>

            {/* arrow */}
            <div className="absolute top-4 right-4 text-white opacity-80 transition group-hover:opacity-100">
              <ArrowRightIcon className="size-5" />
            </div>
          </Link>
        ))}
      </div>

      <Button variant="outline" className="mx-auto mt-20 flex items-center gap-2">
        work <ArrowRightIcon className="size-4" />
      </Button>
    </section>
  )
}

export { ServiceWork }
