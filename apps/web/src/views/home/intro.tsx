"use client"
import { useTranslations } from "next-intl"
import React from "react"
import { Container } from "@/components/layouts"
import { RevealUp } from "@/components/shared/reveal-up"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { MotionDiv } from "@/lib/motion"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

type IntroProps = {
  locale?: string
}

const Intro: React.FC<IntroProps> = () => {
  const t = useTranslations()
  return (
    <Container className="mt-10 flex w-full flex-col items-start justify-start gap-5 md:flex-row md:items-end lg:mt-[140px] lg:gap-10">
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="typo-header flex flex-col flex-wrap text-black"
      >
        <RevealUp>
          <h1>Focus on Every Moment</h1>
        </RevealUp>
        <RevealUp>
          <h1>: That’s the Noor Way.</h1>
        </RevealUp>
      </MotionDiv>

      <MotionDiv variants={containerVariants} initial="hidden" animate="visible">
        <RevealUp>
          <Link href="/request">
            <Button className="bg-primary-200 truncate md:mb-5">{t("common.contactUs")}</Button>
          </Link>
        </RevealUp>
      </MotionDiv>
    </Container>
  )
}

export { Intro }
