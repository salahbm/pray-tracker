import React from "react"
import type { MainWork } from "@/types/work.types"
import { Intro } from "./intro"
import { PartnersMarquee } from "./partners-marquee"
import { ServicesShowcase } from "./services-showcase"
import { WorkShowcase } from "./work-showcase"

type HomeViewProps = {
  works?: MainWork[]
}

const HomeView: React.FC<HomeViewProps> = ({ works }) => {
  return (
    <div className="relative pb-[84px] md:pb-36 lg:pb-60">
      <Intro />
      <WorkShowcase initialData={works} />
      <ServicesShowcase />
      <PartnersMarquee />
    </div>
  )
}

export { HomeView }
