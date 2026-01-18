import { useQuery } from "@tanstack/react-query"

import { QueryKeys } from "@/constants/query-keys"
import { workService } from "@/services/work.service"
import type { MainWork } from "@/types/work.types"

export const useMainWorks = (initialData?: MainWork[], locale?: string) =>
  useQuery({
    queryKey: [...QueryKeys.work.main, { locale }],
    queryFn: () => workService.getMainWorks(),
    initialData,
    staleTime: 1000 * 60 * 60 * 12, // 12 hours - main works don't change often
  })
