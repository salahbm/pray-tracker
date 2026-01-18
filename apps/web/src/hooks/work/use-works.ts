import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "@/constants/query-keys"
import { type GetWorksParams, workService } from "@/services/work.service"

export const useWorks = (params: GetWorksParams = {}) =>
  useQuery({
    queryKey: [...QueryKeys.work.list, { params }],
    queryFn: () => workService.getWorks(params),
    staleTime: 1000 * 60 * 15, // 15 minutes
  })
