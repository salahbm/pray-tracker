import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { appConfig } from "@/config/app.config"
import { cn } from "@/lib/utils"
import { ArrowRightIcon, DownloadIcon, MailIcon } from "../icons"

async function RequestBanner() {
  const t = await getTranslations()

  return (
    <section className="bg-primary-100 w-full">
      <div
        className={cn(
          "flex flex-col items-start gap-10 gap-y-12 px-5 py-7",
          "md:flex-row md:px-8 md:py-15",
          "lg:p-[80px_60px_80px_380px] xl:p-[80px_380px_80px_380px]"
        )}
      >
        {/* Left */}
        <div className="flex flex-col gap-6 text-white md:flex-1">
          <h3 className="text-title-2">Be our partner, make success.</h3>

          <div className="text-body-1 hidden flex-col gap-4 md:flex md:flex-row md:gap-6">
            <a href={appConfig.app.company_profile} target="_blank" className="flex items-center gap-3">
              <DownloadIcon />
              Co. Brief
            </a>

            <a href={`mailto:${appConfig.app.email}`} target="_blank" className="flex items-center gap-3">
              <MailIcon />
              {appConfig.app.email}
            </a>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/request"
          className="text-title-2 inline-flex items-center gap-5 text-white md:justify-end"
          data-cursor-yellow
        >
          <span className="text-primary-100 flex-center aspect-square size-10 rounded-full bg-white">
            <ArrowRightIcon className="size-6" />
          </span>
          {t("common.request")}
        </Link>

        <div className="text-body-1 flex flex-col gap-4 text-white md:hidden md:flex-row md:gap-6">
          <a href={appConfig.app.company_profile} target="_blank" className="flex items-center gap-3">
            <DownloadIcon />
            Co. Brief
          </a>

          <a href={`mailto:${appConfig.app.email}`} target="_blank" className="flex items-center gap-3">
            <MailIcon />
            {appConfig.app.email}
          </a>
        </div>
      </div>
    </section>
  )
}

export { RequestBanner }
