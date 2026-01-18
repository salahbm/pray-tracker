import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { workService } from "@/services/work.service"
import { WorkDetailView } from "@/views/work"

interface WorkDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const workNo = parseInt(id, 10)

  try {
    const work = await workService.getWorkById(workNo)

    return {
      title: `${work.title} | Momenti`,
      description: work.seoMetaDescription || work.client,
      keywords: work.seoMetaKeyword,
      openGraph: {
        title: work.seoOgTitle || work.title,
        description: work.seoOgDescription || work.client,
        images: work.seoOgImage
          ? [{ url: work.seoOgImage.startsWith("http") ? work.seoOgImage : `https://${work.seoOgImage}` }]
          : undefined,
        type: "website",
      },
    }
  } catch {
    return {
      title: "Work Not Found | Momenti",
      description: "The requested work could not be found.",
    }
  }
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps): Promise<React.JSX.Element> {
  const { id } = await params
  const workNo = parseInt(id, 10)

  if (isNaN(workNo)) {
    notFound()
  }

  try {
    const work = await workService.getWorkById(workNo)
    return <WorkDetailView workNo={workNo} initialData={work} />
  } catch {
    notFound()
  }
}
