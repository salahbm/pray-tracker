import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query"

import { QueryKeys } from "@/constants/query-keys"
import { type GetWorksParams, workService } from "@/services/work.service"
import type { WorkListResponse } from "@/types/work.types"

interface UseInfiniteWorksParams extends Omit<GetWorksParams, "curPage"> {
  pageList?: number
}

export const useInfiniteWorks = (
  params: UseInfiniteWorksParams = {},
  initialData?: WorkListResponse,
  locale?: string
) => {
  const { pageList = 10, ...restParams } = params

  return useInfiniteQuery<WorkListResponse, Error, InfiniteData<WorkListResponse>, unknown[], number>({
    queryKey: [...QueryKeys.work.list, { params: restParams, pageList, locale }],
    queryFn: ({ pageParam }) =>
      workService.getWorks({
        ...restParams,
        curPage: pageParam,
        pageList,
      }),
    getNextPageParam: (lastPage) => {
      const { curPage, totalPage } = lastPage.paging
      return curPage < totalPage ? curPage + 1 : undefined
    },
    initialPageParam: 1,
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [1],
        }
      : undefined,
    staleTime: 1000 * 60 * 15, // 15 minutes
  })
}
