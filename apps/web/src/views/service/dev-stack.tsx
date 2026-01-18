"use client"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useCallback, useState } from "react"
import { ChevronBottomIcon, ChevronTopIcon } from "@/components/icons"
import { Marquee } from "@/components/shared/marquee"

const frontend: string[] = [
  "react.js",
  "vue.js",
  "flutter",
  "react native",
  "next.js",
  "javascript",
  "html / css",
  "angularjs",
  "bootstrap",
  "ios",
  "android (java/kotlin)",
]

const backend: string[] = [
  "java / spring boot",
  "python / django",
  "php",
  "spring",
  "laravel",
  "flask",
  "codeigniter",
  "node.js",
  "express.js",
  "nest.js",
  "apache",
  "nginx",
  "linux / centos",
]

const db_dba: string[] = ["data modeling", "mysql / mariadb", "oracledb", "postgresql", "mongodb"]

const devops: string[] = [
  "aws / gcp / ncp",
  "github / gitlab",
  "scalable infra design",
  "ci / cd",
  "swagger / postman",
  "jenkins",
  "logging / monitoring",
  "container",
  "docker / kubernetes",
]

export function DevStack() {
  const [expanded, setExpanded] = useState(false)

  const toggle = useCallback(() => setExpanded((v) => !v), [])
  return (
    <section className="mt-60 md:mt-[140px] lg:mt-80">
      <h2 className="text-title-2 mb-20 text-center">Dev Stack</h2>
      <Marquee repeat={2} pauseOnHover className="flex h-60 items-center bg-gray-100 [&>div]:gap-20">
        {Array.from({ length: 16 }).map((_, i) => (
          <Image
            key={i}
            src={`/partners/logo_program_${i + 1}.png`}
            alt={`Client ${i + 1}`}
            className="h-13 w-auto object-contain last:mr-20"
            width={100}
            height={100}
          />
        ))}
      </Marquee>

      <motion.button
        type="button"
        onClick={toggle}
        aria-expanded={expanded}
        animate={expanded ? { opacity: 0, display: "none" } : { opacity: 1, display: "block" }}
        transition={{ duration: 0.25 }}
        className="flex-center mx-auto mt-5 rounded-full bg-white p-3"
      >
        <ChevronBottomIcon className="h-5 w-5" />
      </motion.button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-auto max-w-md overflow-hidden"
          >
            <div className="mt-8 text-center">
              <div className="text-body-2 px-2.5 py-1.5">Front-end</div>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {frontend.map((f) => (
                  <p
                    key={f}
                    className="flex-center text-body-2 rounded-md bg-white px-2.5 py-1.5 whitespace-nowrap text-gray-600"
                  >
                    {f}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="text-body-2 px-2.5 py-1.5">Back-end</div>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {backend.map((i) => (
                  <p
                    key={i}
                    className="flex-center text-body-2 rounded-md bg-white px-2.5 py-1.5 whitespace-nowrap text-gray-600"
                  >
                    {i}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="text-body-2 px-2.5 py-1.5">DB / DBA</div>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {db_dba.map((i) => (
                  <p
                    key={i}
                    className="flex-center text-body-2 rounded-md bg-white px-2.5 py-1.5 whitespace-nowrap text-gray-600"
                  >
                    {i}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="text-body-2 px-2.5 py-1.5">Devops / TA</div>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {devops.map((i) => (
                  <p
                    key={i}
                    className="flex-center text-body-2 rounded-md bg-white px-2.5 py-1.5 whitespace-nowrap text-gray-600"
                  >
                    {i}
                  </p>
                ))}
              </div>
            </div>

            <motion.button
              type="button"
              onClick={toggle}
              className="flex-center mx-auto mt-5 rounded-full bg-white p-3"
            >
              <ChevronTopIcon className="h-5 w-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
