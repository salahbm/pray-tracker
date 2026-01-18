"use client"

import { motion } from "framer-motion"
import React from "react"
import { Container } from "@/components/layouts"
import { RevealUp } from "@/components/shared/reveal-up"
import { Button } from "@/components/ui/button"

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
  return (
    <Container className="mt-10 flex w-full flex-col items-start justify-start gap-5 md:flex-row md:items-end lg:mt-[140px] lg:gap-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-header flex flex-col flex-wrap text-black"
      >
        <RevealUp>
          <h1>Focus on Every Moment</h1>
        </RevealUp>
        <RevealUp>
          <h1>: That’s the Momenti Way.</h1>
        </RevealUp>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <RevealUp>
          <Button className="bg-primary-200 truncate md:mb-5">프로젝트 문의하기</Button>
        </RevealUp>
      </motion.div>
    </Container>
  )
}

export { Intro }
