"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useLocale } from "next-intl"
import { useEffect } from "react"
import { toast } from "sonner"
import { ArrowRightIcon, ShareIcon } from "@/components/icons"
import { Loading } from "@/components/shared/loading"
import { Button } from "@/components/ui/button"
import { useWorkDetail } from "@/hooks/work"
import { cn, copyToClipboard, safeImage } from "@/lib/utils"
import { useHeaderStore } from "@/store/use-header.store"
import type { Work } from "@/types/work.types"

interface WorkDetailViewProps {
  workNo: number
  initialData?: Work
}

export const WorkDetailView = ({ workNo, initialData }: WorkDetailViewProps): React.JSX.Element => {
  const locale = useLocale()
  const { setIsWhite } = useHeaderStore()
  const { data: work, isLoading, error } = useWorkDetail(workNo, initialData, locale)
  const isWhite = work?.textColor === "01"

  useEffect(() => {
    setIsWhite(isWhite)
  }, [isWhite])

  if (isLoading) {
    return <Loading />
  }

  if (error || !work) return notFound()

  // Get device type from categories
  const deviceType = work.categoryList.map((cat) => cat.name).join(", ")

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Banner */}
      <div className="relative flex min-h-[416px] flex-col lg:min-h-[600px]">
        <Image src={safeImage(work.thumBackground)} alt={work.title} fill className="object-cover" priority />

        <div className="absolute inset-0 mx-auto flex max-w-5xl flex-col justify-center px-10 pb-9">
          <span className="flex-1" />
          {/*  Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={cn("flex-1", isWhite ? "text-white" : "text-black")}
          >
            <h1 className="text-title-1-kr">{work.title}</h1>
          </motion.div>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={cn("flex gap-7 lg:gap-14", isWhite ? "text-white" : "text-black")}
          >
            <div className="flex flex-wrap gap-14">
              {work.developDate && (
                <dl className="lg:flex-center gap-4 gap-y-2">
                  <dt className="text-body-1">Year</dt>
                  <dd className="text-body-2">{work.developDate}</dd>
                </dl>
              )}
              {work.client && (
                <dl className="lg:flex-center gap-4 gap-y-2">
                  <dt className="text-body-1">Client</dt>
                  <dd className="text-body-2">{work.client}</dd>
                </dl>
              )}
              {deviceType && (
                <dl className="lg:flex-center gap-4 gap-y-2">
                  <dt className="text-body-1">Device</dt>
                  <dd className="text-body-2">{deviceType}</dd>
                </dl>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="work-content"
        dangerouslySetInnerHTML={{ __html: work.content }}
      />

      <div className="mx-auto px-5 md:px-8 xl:px-32">
        {/* Share & Tags block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto flex items-start justify-between border-b-2 border-gray-400 pb-10 lg:max-w-5xl"
        >
          <div className="flex flex-wrap gap-4">
            {work.tag.split("#").map((tag) => (
              <span key={tag} className="text-subtitle bg-gray-200 px-4 py-2 text-gray-600 first:hidden">
                #{tag}
              </span>
            ))}
          </div>
          <Button
            variant="icon"
            onClick={() => {
              copyToClipboard(window.location.href)
              toast.success("Copied to clipboard")
            }}
          >
            <ShareIcon className="size-10 text-black" />
          </Button>
        </motion.div>

        <div className="pt-52 pb-80">
          {/* Related Works */}
          {work.relatedList.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-20"
            >
              <h2 className="text-subtitle mb-10 text-center md:mb-15 lg:mb-20">Related Works</h2>
              <ol className="flex-center gap-4 lg:gap-10">
                {work.relatedList.map((related) => (
                  <Link
                    key={related.code}
                    href={`/work/${related.code}`}
                    className="group aspect-portrait relative block min-w-1/2 overflow-hidden rounded-md border border-gray-300 transition-all duration-500 md:w-1/3 md:min-w-60 lg:w-90 lg:rounded-2xl"
                  >
                    <Image
                      src={safeImage(related.value)}
                      alt={related.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Content */}
                    <div
                      className={cn(
                        "absolute inset-0 hidden flex-col justify-between p-10 lg:flex",
                        isWhite ? "text-white" : "text-black"
                      )}
                    >
                      <div className="flex flex-col gap-2">
                        {/* Tags */}
                        <div className="text-body-1 flex flex-wrap gap-2">
                          {related.strList.map((str, idx) => (
                            <span key={idx}>{str}</span>
                          ))}
                        </div>
                        <h3 className="text-subtitle text-inherit">{related.name}</h3>
                      </div>

                      <span className="text-body-1 flex-center h-10 w-18 rounded-full border border-inherit text-inherit">
                        view
                      </span>
                    </div>
                  </Link>
                ))}
              </ol>
              {/* Back to Works Button */}
              <Link href="/work">
                <Button variant="outline" className="mx-auto mt-7 md:mt-13 lg:mt-20">
                  work <ArrowRightIcon className="size-4" />
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
