import { useMutation } from "@tanstack/react-query"

import { type RequestMailParams, requestService } from "@/services/request.service"

export const useSendMail = () =>
  useMutation<void, Error, RequestMailParams>({
    mutationFn: (params: RequestMailParams) => requestService.sendMail(params),
  })
