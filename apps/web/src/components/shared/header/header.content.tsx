"use client"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import React from "react"
import { Container } from "@/components/layouts"
import { appConfig } from "@/config/app.config"
import { useMenu } from "@/hooks/menu"
import { MotionDiv } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { useHeaderStore } from "@/store/use-header.store"
import { useMenuStore } from "@/store/use-menu.store"
import { MenuData } from "@/types/menu.types"
import { menu, menuVariants, overlayVariants, social, whiteHeader } from "./header-data"
import { Logo } from "./logo"
import { ArrowRightIcon, CloseIcon, DownloadIcon, MailIcon, MenuIcon } from "../../icons"
import { LanguageToggle } from "../language-toggle"
import { RevealUp } from "../reveal-up"

const Header: React.FC<{ initialMenuData?: MenuData }> = ({ initialMenuData }) => {
  const t = useTranslations()
  const pathname = usePathname()
  const { isWhite: isWhiteStore } = useHeaderStore()
  const { opened, toggleMenu } = useMenuStore()
  const { data: menuData } = useMenu(initialMenuData)
  const isWhite = isWhiteStore || whiteHeader.includes(pathname)

  return (
    <nav className="absolute top-0 z-50 w-full overflow-hidden">
      <Container variant="bottomless">
        <header className="flex w-full items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Logo isWhite={isWhite} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <button
              type="button"
              className={cn("cursor-pointer", isWhite ? "text-white" : "text-black")}
              onClick={toggleMenu}
              data-cursor-yellow
            >
              <MenuIcon className="size-6 text-inherit" />
            </button>
          </motion.div>
        </header>
      </Container>

      <div className="relative">
        <AnimatePresence mode="wait">
          {opened && (
            <MotionDiv
              exit="exit"
              initial="hidden"
              animate="visible"
              variants={menuVariants}
              key="menu-overlay"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="z-header fixed inset-0 flex h-screen w-screen flex-col bg-gray-200 px-5 pt-4 pb-8 md:px-8 md:pt-6 lg:px-10 lg:pt-8"
            >
              <header className="flex items-center justify-between">
                <Logo onClick={toggleMenu} dynamic />

                <div className="flex items-center gap-7 md:gap-20">
                  <LanguageToggle />
                  <button type="button" className="cursor-pointer" onClick={toggleMenu} data-cursor-yellow>
                    <CloseIcon className="size-6 text-inherit" />
                  </button>
                </div>
              </header>

              {/* Menu List */}
              <MotionDiv
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex h-full flex-col justify-center gap-20 md:flex-row md:items-center md:gap-0 xl:px-95"
              >
                <ul className="flex flex-col items-start gap-8 px-12 md:px-0">
                  {menu.map((item: { id: string; name: string; key?: string }, idx: number) => {
                    const count = item.key && menuData ? menuData[item.key as keyof typeof menuData] : null
                    return (
                      <RevealUp key={item.id} index={idx}>
                        <Link
                          href={item.id}
                          onClick={toggleMenu}
                          className="flex items-center gap-5 bg-gray-200 text-start transition-all duration-300 ease-in-out"
                        >
                          <li className="text-title-1 group relative pb-0.5">
                            {item.name}
                            <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100" />
                          </li>

                          {count && <span className="text-body-1">{count}</span>}
                        </Link>
                      </RevealUp>
                    )
                  })}
                  <RevealUp key="request" index={4} className="md:hidden">
                    <Link
                      href="/request"
                      onClick={toggleMenu}
                      className="flex items-center bg-gray-200 text-start transition-all duration-300 ease-in-out"
                    >
                      <li className="text-title-1 group relative pb-0.5">
                        {t("common.request")}
                        <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100" />
                      </li>
                    </Link>
                  </RevealUp>
                </ul>

                <div className="hidden md:block md:flex-1" />
                {/* Request Button */}
                <RevealUp key="request" index={0} className="hidden md:block">
                  <button
                    type="button"
                    className="group flex-center relative aspect-square min-w-fit cursor-pointer gap-6 overflow-hidden rounded-full p-10 md:w-[360px]"
                  >
                    {/* radial background */}
                    <span className="bg-primary-100 ease-circle pointer-events-none absolute inset-0 scale-0 rounded-full transition-transform duration-500 group-hover:scale-100" />

                    {/* content */}
                    <span className="flex-center bg-primary-100 group-hover:text-primary-100 relative aspect-square w-12 rounded-full text-white transition-colors duration-500 group-hover:bg-white">
                      <ArrowRightIcon className="size-6 text-inherit" />
                    </span>

                    <p className="text-title-1 text-primary-100 relative whitespace-nowrap transition-colors duration-500 group-hover:text-white">
                      {t("common.request")}
                    </p>
                  </button>
                </RevealUp>
              </MotionDiv>

              {/* Menu Footer */}
              <MotionDiv
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex-between items-end md:items-center"
              >
                {/* Contact */}
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-7 lg:gap-10">
                  <RevealUp key="company-profile" index={0}>
                    <a
                      href={appConfig.app.company_profile}
                      target="_blank"
                      className="flex-center text-body-1 cursor-pointer gap-3"
                    >
                      <DownloadIcon className="size-6" />
                      Co. Brief
                    </a>
                  </RevealUp>

                  <RevealUp key="email" index={1}>
                    <a href={`mailto:${appConfig.app.email}`} className="flex-center text-body-1 cursor-pointer gap-3">
                      <MailIcon className="size-6" />
                      {appConfig.app.email}
                    </a>
                  </RevealUp>
                </div>

                {/* Social */}
                <div className="flex items-center gap-6">
                  {social.map((item, idx) => (
                    <RevealUp key={item.id} index={idx}>
                      <button type="button" className="cursor-pointer">
                        {item.icon}
                      </button>
                    </RevealUp>
                  ))}
                </div>
              </MotionDiv>
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export { Header }
