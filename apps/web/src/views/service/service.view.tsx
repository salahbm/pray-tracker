import { cookies } from "next/headers"
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import React, { Fragment } from "react"
import { Container } from "@/components/layouts"
import { COOKIE_KEYS } from "@/constants/cookies"
import { DevStack } from "./dev-stack"
import { ServiceCircle } from "./service-circle"
import { ServiceHeader } from "./service-header"
import { ServiceWork } from "./service-work"

const services = [
  {
    key: "analysis",
    image: "/service/analysis.png",
  },
  {
    key: "planning",
    image: "/service/planning.png",
  },
  {
    key: "ux",
    image: "/service/ux.png",
  },
  {
    key: "development",
    image: "/service/dev.png",
  },
]

const ServiceView: React.FC = async () => {
  const store = await cookies()
  const locale = store.get(COOKIE_KEYS.LANGUAGE)?.value || "en"
  const t = await getTranslations("service")

  return (
    <Fragment>
      <ServiceHeader />
      <Container>
        <h1 className="text-subtitle text-center">Momenti Process</h1>
        <h2 className="text-body-2 mt-6 text-center">
          {t.rich("title", { br: (chunk) => <span className="md:block">{chunk}</span> })}
        </h2>
        <figure className="relative mt-30 h-[786px] w-full md:h-[616px] lg:h-[368px]">
          <Image
            src={locale === "ko" ? "/service/service_info_pc.png" : "/service/service_info_pc_en.png"}
            alt="Momenti Process"
            height={368}
            width={2560}
            className="hidden h-full w-full object-contain lg:block"
          />
          <Image
            src={locale === "ko" ? "/service/service_info_tablet.png" : "/service/service_info_tablet_en.png"}
            alt="Momenti Process"
            fill
            sizes="100vw"
            className="hidden object-contain md:block lg:hidden"
          />
          <Image
            src={locale === "ko" ? "/service/service_info_mobile.png" : "/service/service_info_mobile_en.png"}
            alt="Momenti Process"
            fill
            sizes="100vw"
            className="block object-contain md:hidden"
          />
        </figure>
      </Container>

      <section className="flex-center flex-col overflow-hidden bg-gray-200 px-5 pt-15 pb-[84px] text-center md:px-8 md:pb-36 lg:px-15 lg:pt-[140px] lg:pb-[240px] xl:px-95">
        <h1 className="text-subtitle">What we can do for you</h1>
        <p className="text-body-2 mt-4 md:mt-5 lg:mt-6">
          {t.rich("subtitle", { br: (chunk) => <span className="md:block">{chunk}</span> })}
        </p>

        {/* Service Circles */}
        <section className="flex flex-col space-y-30 gap-y-30 pt-40">
          {services.map((s) => (
            <ServiceCircle key={s.key} title={t(`${s.key}.title`)} items={t.raw(`${s.key}.items`)} imageSrc={s.image} />
          ))}
        </section>

        {/* Service Work */}
        <ServiceWork />

        {/* Dev Stack Marquee */}
        <DevStack />
      </section>
    </Fragment>
  )
}

export { ServiceView }
