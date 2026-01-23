import { useMutation } from "@tanstack/react-query"

import { requestService } from "@/services/request.service"
import type { UploadFileResponse } from "@/types/request.types"

export const useUploadFile = () =>
  useMutation<UploadFileResponse, Error, FormData>({
    mutationFn: (formData: FormData) => requestService.uploadFile(formData),
  })
