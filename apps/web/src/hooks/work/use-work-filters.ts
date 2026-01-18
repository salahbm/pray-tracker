import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "@/constants/query-keys"
import { workService } from "@/services/work.service"

export const useWorkFilters = () =>
  useQuery({
    queryKey: QueryKeys.work.filters,
    queryFn: () => workService.getFilters(),
    staleTime: 1000 * 60 * 10, // 10 minutes - filters don't change often
  })
