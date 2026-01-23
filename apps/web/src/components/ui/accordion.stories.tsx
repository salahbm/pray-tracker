import type { Meta, StoryObj } from "@storybook/react"
import { WorkGroup } from "@/views/about/work-history"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"

const meta: Meta<typeof Accordion> = {
  title: "ui/Accordion",
  component: Accordion,
}

export default meta

const groups: WorkGroup[] = [
  {
    period: "2023",
    count: 0,
    items: [],
  },
  {
    period: "2016–2019",
    count: 38,
    items: [
      "고객사 이름 프로젝트 내용",
      "고객사 이름 프로젝트 내용 ↗",
      "고객사 이름 프로젝트 내용 ↗",
      "고객사 이름 프로젝트 내용",
      "고객사 이름 프로젝트 내용",
      "고객사 이름 프로젝트 내용 ↗",
      "고객사 이름 프로젝트 내용",
      "고객사 이름 프로젝트 내용",
    ],
  },
]

export const Default: StoryObj = {
  render: () => {
    return (
      <div className="flex-center h-screen w-full bg-gray-100">
        <Accordion className="w-[400px] space-y-4">
          {groups.map((group) => (
            <AccordionItem key={group.period} value={group.period}>
              <AccordionTrigger value={group.period}>
                <div className="typo-subtitle flex-center gap-3">
                  {group.period}
                  <span className="typo-body-2">{group.count}</span>
                </div>
              </AccordionTrigger>

              <AccordionContent value={group.period} className="rounded-b-[20px] bg-white px-10 py-7">
                <ul className="flex flex-col gap-4">
                  {group.items.map((item, idx) => (
                    <li key={idx} className="typo-body-2 text-start">
                      {item}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    )
  },
}

export const Ghost: StoryObj = {
  render: () => {
    return (
      <div className="flex-center h-screen w-full bg-gray-100">
        <Accordion className="w-[400px] space-y-4">
          {groups.map((group) => (
            <AccordionItem key={group.period} value={group.period}>
              <AccordionTrigger value={group.period} tone="ghost" icon="ghost">
                <div className="typo-subtitle flex-center gap-3">
                  {group.period}
                  <span className="typo-body-2">{group.count}</span>
                </div>
              </AccordionTrigger>

              <AccordionContent value={group.period} className="py-7">
                <ul className="flex flex-col gap-4">
                  {group.items.map((item, idx) => (
                    <li key={idx} className="typo-body-2 text-start">
                      {item}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    )
  },
}

export const Outline: StoryObj = {
  render: () => {
    return (
      <div className="flex-center h-screen w-full bg-gray-100">
        <Accordion className="w-[400px] space-y-4">
          {groups.map((group) => (
            <AccordionItem key={group.period} value={group.period}>
              <AccordionTrigger value={group.period} tone="outline">
                <div className="typo-subtitle flex-center gap-3">
                  {group.period}
                  <span className="typo-body-2">{group.count}</span>
                </div>
              </AccordionTrigger>

              <AccordionContent value={group.period} className="py-7">
                <ul className="flex flex-col gap-4">
                  {group.items.map((item, idx) => (
                    <li key={idx} className="typo-body-2 text-start">
                      {item}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    )
  },
}
