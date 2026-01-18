import { useQuery } from "@tanstack/react-query"

import { QueryKeys } from "@/constants/query-keys"
import { workService } from "@/services/work.service"
import type { Work } from "@/types/work.types"

export const useWorkDetail = (number: number, initialData?: Work, locale?: string) =>
  useQuery({
    queryKey: [...QueryKeys.work.detail, { number, locale }],
    queryFn: () => workService.getWorkById(number),
    enabled: !!number && number > 0,
    initialData,
    staleTime: 1000 * 60 * 15, // 15 minutes
  })
