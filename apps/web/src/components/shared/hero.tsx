import Image from "next/image"
import React from "react"

import { heroDetails } from "@/data/hero"

import AppStoreButton from "../ui/app-store"
import PlayStoreButton from "../ui/play-store"

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative flex items-center justify-center px-5 pb-0 pt-32 md:pt-40">
      <div className="absolute bottom-0 left-0 top-0 -z-10 w-full">
        <div className="bg-hero-background absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-[rgba(233,238,255,0.5)] to-[rgba(202,208,230,0.5)] backdrop-blur-[2px]"></div>

      <div className="text-center">
        <h1 className="text-foreground mx-auto max-w-lg text-4xl font-bold md:max-w-2xl md:text-6xl md:leading-tight">
          {heroDetails.heading}
        </h1>
        <p className="text-foreground mx-auto mt-4 max-w-lg">{heroDetails.subheading}</p>
        <div className="mx-auto mt-6 flex w-fit flex-col items-center sm:flex-row sm:gap-4">
          <AppStoreButton dark />
          <PlayStoreButton dark />
        </div>
        <Image
          src={heroDetails.centerImageSrc}
          width={384}
          height={340}
          quality={100}
          sizes="(max-width: 768px) 100vw, 384px"
          priority={true}
          unoptimized={true}
          alt="app mockup"
          className="relative z-10 mx-auto my-12 md:mt-16"
        />
      </div>
    </section>
  )
}

export default Hero
