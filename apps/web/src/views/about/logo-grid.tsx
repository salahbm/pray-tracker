"use client"

import Image from "next/image"
import React, { useEffect, useState } from "react"
import { ChevronTopIcon } from "@/components/icons"

const LOGO_COUNT = 32
const mobileLogoCount = 18
const desktopLogoCount = 20
const lgLogoCount = 18

function getCount(w: number) {
  if (w >= 1280) return lgLogoCount
  if (w >= 768) return desktopLogoCount
  return mobileLogoCount
}

const LogoGrid: React.FC = () => {
  const [showTotal, setShowTotal] = useState(false)
  const [count, setCount] = useState(mobileLogoCount)

  useEffect(() => {
    const update = () => setCount(getCount(window.innerWidth))
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const visible = showTotal ? LOGO_COUNT : count

  return (
    <section className="mx-auto flex w-full flex-col items-center gap-5 md:gap-6 lg:gap-8 xl:max-w-[1200px]">
      <div className="shadow-2 grid w-full grid-cols-3 place-items-center gap-x-5 gap-y-5 rounded-[20px] bg-white p-4 md:grid-cols-4 md:gap-y-12 md:px-12 md:py-10 lg:grid-cols-6 lg:gap-y-15 lg:p-15">
        {Array.from({ length: visible }).map((_, i) => (
          <div key={i} className="flex-center min-h-10">
            <Image
              src={`/partners/logo_company_${i + 1}.png`}
              alt={`Partner logo ${i + 1}`}
              width={160}
              height={160}
              className="h-8 w-full object-contain md:h-10"
              priority={i < 6}
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowTotal((v) => !v)}
        data-state={showTotal ? "on" : "off"}
        className="rounded-full bg-white p-3 transition-transform data-[state=on]:rotate-180"
      >
        <ChevronTopIcon className="size-5" />
      </button>
    </section>
  )
}

export { LogoGrid }
