import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { QueryKeys } from "@/constants/query-keys"
import { menuService } from "@/services/menu.service"
import { MenuData } from "@/types/menu.types"

export const useMenu = (initialData?: MenuData) =>
  useQuery({
    queryKey: QueryKeys.menu,
    queryFn: () => menuService.getMenu(),
    initialData,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 30, // 30 minutes - menu counts don't change often
  })
