import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import React, { Fragment } from "react"
import { CallIcon, DownloadIcon, LinkIcon, LocationIcon, MailIcon } from "@/components/icons"
import { appConfig } from "@/config/app.config"
import { cn } from "@/lib/utils"

const contactItemClass = "flex items-center gap-1.5"
const actionButtonClass =
  "flex-center typo-body-1 cursor-pointer gap-2 rounded-full bg-white py-2 pr-6 pl-5 text-black transition-all duration-200 ease-in-out hover:bg-yellow-100"

interface ContactInfoProps {
  address: string
  phone: string
  email: string
}

const ContactInfo: React.FC<ContactInfoProps> = ({ address, phone, email }) => (
  <Fragment>
    <div className={contactItemClass}>
      <LocationIcon className="size-5" />
      <p className="line-clamp-1 max-w-[250px] leading-relaxed">{address}</p>
    </div>

    <div className={contactItemClass}>
      <CallIcon className="size-5" />
      <p>{phone}</p>
    </div>

    <div className={contactItemClass}>
      <MailIcon className="size-5" />
      <a href={`mailto:${email}`} className="hover:underline">
        {email}
      </a>
    </div>
  </Fragment>
)

const RequestHeader: React.FC = () => {
  const t = useTranslations()
  const locale = useLocale()

  const address = t("common.address", {
    address: appConfig.app[locale === "ko" ? "address_ko" : "address_en"],
  })

  const phone = appConfig.app.phone[0]
  const email = appConfig.app.email

  return (
    <section
      className={cn(
        "bg-primary-100 relative flex min-h-[460px] flex-col overflow-hidden pb-5.5",
        "md:min-h-120",
        "lg:min-h-[600px] lg:pb-10 xl:px-95"
      )}
    >
      <div className={cn("z-10 flex h-full flex-1 flex-col px-10 text-white", "md:px-20")}>
        <div className="flex flex-1 translate-y-1/3 flex-col gap-5 lg:translate-y-2/5">
          <h1 className="typo-title-1">Be our partner, make a success.</h1>

          <p className="typo-body-1 hidden md:block">
            {t.rich("common.requestDescription", {
              br: (chunk) => (
                <span>
                  <br />
                  {chunk}
                </span>
              ),
            })}
          </p>

          <div className="flex flex-col gap-2 md:hidden">
            <ContactInfo address={address} phone={phone} email={email} />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="hidden md:flex md:flex-col md:gap-1.5 lg:flex-row lg:gap-10">
            <ContactInfo address={address} phone={phone} email={email} />
          </div>

          <div className={cn("flex flex-row gap-2", "md:flex-col md:items-center md:gap-3", "lg:flex-row lg:gap-4")}>
            <a href={`mailto:${email}`} className={actionButtonClass}>
              <LinkIcon className="size-5" />
              {t("common.portfolio")}
            </a>

            <a href={appConfig.app.company_profile} target="_blank" className={actionButtonClass}>
              <DownloadIcon className="size-5" />
              {t("common.companyProfile")}
            </a>
          </div>
        </div>
      </div>

      <Image
        src="/images/request-desktop.svg"
        alt="Request Desktop"
        fill
        className="hidden object-cover lg:block"
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      <Image
        src="/images/request-tablet.svg"
        alt="Request Tablet"
        fill
        className="hidden object-cover md:block lg:hidden"
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      <Image
        src="/images/request-mobile.svg"
        alt="Request Mobile"
        fill
        className="object-cover md:hidden"
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </section>
  )
}

export { RequestHeader }
