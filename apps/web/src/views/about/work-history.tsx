"use client"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Fragment, memo } from "react"
import { ArrowRightIcon } from "@/components/icons"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export type WorkGroup = {
  period: string
  count: number
  items: string[]
}

export const WorkHistoryList = memo(function WorkHistoryList() {
  const t = useTranslations("about.workHistory")
  const groups = t.raw("groups") as WorkGroup[]

  return (
    <Fragment>
      <Accordion className="mx-auto space-y-4 xl:max-w-[1200px]">
        {groups.map((group) => (
          <AccordionItem key={group.period} value={group.period}>
            <AccordionTrigger value={group.period}>
              <div className="text-subtitle flex-center gap-3">
                {group.period}
                <span className="text-body-2">{group.count}</span>
              </div>
            </AccordionTrigger>

            <AccordionContent
              value={group.period}
              className="rounded-b-[20px] bg-white py-5 pr-4 pl-6 md:rounded-b-lg md:py-4 md:pr-6 md:pl-8 lg:px-10 lg:py-7"
            >
              <ul className="flex flex-col gap-4">
                {group.items.map((item, idx) => (
                  <li key={idx} className="text-body-2 text-start">
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Link href="/work">
        <Button variant="outline" className="mx-auto mt-15">
          work <ArrowRightIcon className="size-4" />
        </Button>
      </Link>
    </Fragment>
  )
})
