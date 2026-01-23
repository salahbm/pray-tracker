import Image from "next/image"
import { ArrowRightIcon } from "@/components/icons"
import { Marquee } from "@/components/shared/marquee"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

export function PartnersMarquee() {
  return (
    <section className="mt-60">
      <h2 className="typo-title-2 mb-20 text-center">Our clients</h2>

      <Marquee repeat={2} pauseOnHover className="flex h-60 items-center bg-gray-100 [&>div]:gap-20">
        {Array.from({ length: 32 }).map((_, i) => (
          <Image
            key={i}
            src={`/partners/logo_company_${i + 1}.png`}
            alt={`Client ${i + 1}`}
            className="h-13 w-auto object-contain last:mr-20"
            width={100}
            height={100}
          />
        ))}
      </Marquee>

      <Link href="/about">
        <Button variant="outline" className="mx-auto mt-15">
          about <ArrowRightIcon className="size-4" />
        </Button>
      </Link>
    </section>
  )
}
