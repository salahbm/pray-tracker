export interface RequestCategory {
  code: string
  name: string
}

export interface RequestFilters {
  category: RequestCategory[]
  form: RequestCategory[]
  taskScope: RequestCategory[]
  developType: RequestCategory[]
  county: RequestCategory[]
  budget: RequestCategory[]
  period: RequestCategory[]
  choiceType: RequestCategory[]
}

export interface UploadFileResponse {
  fileUrl: string
  fileName: string
}
