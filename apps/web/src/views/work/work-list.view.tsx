"use client"

import { motion } from "framer-motion"
import { useLocale } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { useInfiniteWorks, useWorkFilters } from "@/hooks/work"
import type { WorkListResponse, WorkTaskScope } from "@/types/work.types"
import { WorkCard } from "./work-card"
import { WorkFilter } from "./work-filter"

interface WorkListViewProps {
  initialData?: WorkListResponse
}

export const WorkListView = ({ initialData }: WorkListViewProps = {}): React.JSX.Element => {
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedTaskScopes, setSelectedTaskScopes] = useState<WorkTaskScope[]>([])

  const { data: filters, isLoading: filtersLoading } = useWorkFilters()
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: worksLoading,
  } = useInfiniteWorks(
    {
      category: selectedCategory,
      taskScope: selectedTaskScopes.map((scope) => scope.code),
      pageList: 12,
    },
    initialData,
    locale
  )

  const handleCategoryChange = (category: string): void => {
    setSelectedCategory(category === selectedCategory ? "" : category)
  }

  const handleTaskScopeChange = (taskScopes: WorkTaskScope[]): void => {
    setSelectedTaskScopes(taskScopes)
  }

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = loadMoreRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const allWorks = data?.pages.flatMap((page) => page.list) ?? []

  if (filtersLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">Our Works</h1>
        <p className="text-lg text-gray-600">Explore our portfolio of innovative projects and creative solutions</p>
      </motion.div>

      {/* Filters */}
      {filters && (
        <WorkFilter
          categories={filters.categoryList}
          taskScopes={filters.taskScopeList}
          selectedCategory={selectedCategory}
          selectedTaskScopes={selectedTaskScopes}
          onCategoryChange={handleCategoryChange}
          onTaskScopeChange={handleTaskScopeChange}
        />
      )}

      {/* Works Grid */}
      {worksLoading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allWorks.map((work, index) => (
              <WorkCard key={work.workNo} work={work} index={index} />
            ))}
          </div>

          {/* Load More Trigger */}
          <div ref={loadMoreRef} className="mt-12 flex justify-center">
            {isFetchingNextPage && (
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            )}
            {!hasNextPage && allWorks.length > 0 && <p className="text-gray-500">No more works to load</p>}
          </div>
        </>
      )}

      {/* Empty State */}
      {!worksLoading && allWorks.length === 0 && (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <p className="mb-2 text-xl font-semibold text-gray-700">No works found</p>
          <p className="text-gray-500">Try adjusting your filters</p>
        </div>
      )}
    </div>
  )
}
