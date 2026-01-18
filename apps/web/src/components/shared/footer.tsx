"use client"
import { useLocale, useTranslations } from "next-intl"
import { appConfig } from "@/config/app.config"
import { ArrowTopIcon, BlogIcon, FacebookIcon, InstagramIcon } from "../icons"

const sns = [
  { url: appConfig.app.social.blog, icon: <BlogIcon className="size-5 text-black" /> },
  { url: appConfig.app.social.facebook, icon: <FacebookIcon className="size-5 fill-black stroke-1" /> },
  { url: appConfig.app.social.instagram, icon: <InstagramIcon className="size-5 text-black" /> },
]

function Footer() {
  const locale = useLocale()
  const t = useTranslations()
  return (
    <footer className="text-body-2 w-full bg-white text-black">
      <div className="relative px-5 py-6 md:p-8 md:pb-16 lg:pt-10 lg:pb-25 lg:pl-16 xl:px-95">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
          {/* Address */}
          <div className="flex flex-col gap-2 md:gap-3">
            <span className="text-gray-500">address</span>
            <p className="line-clamp-3 max-w-[250px] leading-relaxed">
              {t("common.address", { address: appConfig.app[locale === "ko" ? "address_ko" : "address_en"] })}
            </p>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 md:gap-3">
            <span className="text-gray-500">email</span>
            <a href={`mailto:${appConfig.app.email}`} className="hover:underline">
              {appConfig.app.email}
            </a>
          </div>

          {/* Contacts */}
          <div>
            <span className="mb-2 text-gray-500 md:mb-3">contacts</span>
            {appConfig.app.phone.map((contact, index) => (
              <p key={index}>{contact}</p>
            ))}
          </div>

          {/* SNS */}
          <div className="flex flex-col gap-2 md:gap-3">
            <span className="text-gray-500">sns</span>
            <div className="flex items-center gap-4">
              {sns.map((sns, index) => (
                <a key={index} href={sns.url} target="_blank" rel="noopener noreferrer">
                  {sns.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Arrow — part of grid only at md+ */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-7 hidden cursor-pointer md:flex md:items-start"
            aria-label="Back to top"
            data-cursor-expand
          >
            <ArrowTopIcon className="text-primary-100 size-6" />
          </button>
        </div>

        {/* Arrow on mobile (keeps previous behavior) */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute top-12 right-5 cursor-pointer md:hidden"
          aria-label="Back to top"
          data-cursor-expand
        >
          <ArrowTopIcon className="text-primary-100 size-6" />
        </button>
      </div>
    </footer>
  )
}

export { Footer }
