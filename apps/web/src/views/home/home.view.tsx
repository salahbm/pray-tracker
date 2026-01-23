import React from "react"
import { Intro } from "./intro"
import { PartnersMarquee } from "./partners-marquee"
import { ServicesShowcase } from "./services-showcase"
import { WorkShowcase } from "./work-showcase"

const HomeView: React.FC = () => {
  return (
    <div className="relative pb-[84px] md:pb-36 lg:pb-60">
      <Intro />
      <WorkShowcase />
      <ServicesShowcase />
      <PartnersMarquee />
    </div>
  )
}

export { HomeView }
