import type { Metadata } from "next"
import { workService } from "@/services/work.service"
import { WorkListView } from "@/views/work"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Our Works | Momenti",
    description:
      "Explore Momenti's portfolio of innovative projects and creative solutions. From web and mobile applications to comprehensive digital services.",
    openGraph: {
      title: "Our Works | Momenti",
      description:
        "Explore Momenti's portfolio of innovative projects and creative solutions. From web and mobile applications to comprehensive digital services.",
      type: "website",
    },
  }
}

export default async function WorkPage(): Promise<React.JSX.Element> {
  // Fetch initial data for SSR
  const initialData = await workService.getWorks({
    curPage: 1,
    pageList: 12,
  })

  return <WorkListView initialData={initialData} />
}
