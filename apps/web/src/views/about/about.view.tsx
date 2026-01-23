import { getTranslations } from "next-intl/server"
import React, { Fragment } from "react"
import { AboutHeader } from "./about-header"
import { SolutionCategoriesPanel } from "./about-panel"
import { AboutSection } from "./about-section"
import { LogoGrid } from "./logo-grid"
import { WorkHistoryList } from "./work-history"

const AboutView: React.FC = async () => {
  const t = await getTranslations()
  return (
    <Fragment>
      <AboutHeader />
      {/* we are noor */}
      <section className="flex-center pt-15 lg:px-15 xl:px-95 flex-col bg-white px-5 pb-[84px] text-center md:px-8 md:pb-36 lg:h-[90vh] lg:pb-[240px] lg:pt-[140px]">
        <h1 className="typo-subtitle">We are Noor</h1>
        <p className="typo-body-2 mt-4 md:mt-5 lg:mt-6">
          {t.rich("about.subtitle", {
            br: (chunk) => <span className="md:block">{chunk}</span>,
          })}
        </p>

        <div className="mt-15 relative flex h-40 w-full items-center justify-center md:mt-28 md:h-[360px] lg:mt-40 lg:h-[560px]">
          {/* LEFT CIRCLE */}
          <div className="circle left bg-gray-300/60 [--size:160px] md:[--size:360px] lg:[--size:560px]">
            <span className="circle-text typo-title-2">company</span>
          </div>

          {/* RIGHT CIRCLE (CLIPPING CONTAINER) */}
          <div className="circle right bg-gray-300/60 [--size:160px] md:[--size:360px] lg:[--size:560px]">
            <span className="circle-text typo-title-2">customer</span>

            {/* MIX — CLIPPED BY RIGHT */}
            <div className="circle-mix [--size:160px] md:[--size:360px] lg:[--size:560px]">
              <span className="mix-text typo-title-2">noor service</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-30 lg:px-15 xl:px-95 overflow-hidden bg-gray-200 px-5 pb-72 md:px-8">
        {/* Section 1 */}
        <AboutSection
          header="Why Noor?"
          number="01"
          overlapText="Trust"
          title={t("about.section1.title")}
          subtitle={t.rich("about.section1.subtitle", {
            br: (chunk) => <span className="md:block">{chunk}</span>,
          })}
        />
        <LogoGrid />

        {/* Section 2 */}
        <AboutSection
          number="02"
          overlapText="Experience"
          className="mt-30 md:mt-40 lg:mt-60"
          subtitle={t.rich("about.section2.subtitle", {
            br: (chunk) => <span className="md:block">{chunk}</span>,
          })}
        />
        <SolutionCategoriesPanel />

        {/* Section 3 */}
        <AboutSection
          className="mt-30 md:mt-40 lg:mt-60"
          number="03"
          overlapText="Success"
          title={t("about.section3.title")}
          subtitle={t.rich("about.section3.subtitle", {
            br: (chunk) => <span className="md:block">{chunk}</span>,
          })}
        />

        <WorkHistoryList />
      </section>
    </Fragment>
  )
}

export { AboutView }
