import { useQuery } from "@tanstack/react-query"

import { QueryKeys } from "@/constants/query-keys"
import { requestService } from "@/services/request.service"
import type { RequestFilters } from "@/types/request.types"

export const useRequestFilters = (initialData?: RequestFilters) =>
  useQuery({
    queryKey: QueryKeys.request.filters,
    queryFn: () => requestService.getFilters(),
    initialData,
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
  })
