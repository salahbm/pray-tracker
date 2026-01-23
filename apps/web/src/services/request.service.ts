import { Agent, agent } from "@/lib/agent"
import { RequestFilters, UploadFileResponse } from "@/types/request.types"
import { ApiResponse } from "@/types/response.types"

export interface RequestMailParams {
  category: string[]
  form: string[]
  taskScope: string[]
  developType: string[]
  county: string[]
  budget: string
  period: string
  periodStartDate?: string
  choiceType: string
  title: string
  logline: string
  detailContent: string
  fileUrl: string
  company: string
  nameplate: string
  email: string
  tel: string
}

export class RequestService {
  private readonly agent: Agent

  constructor(agentInstance: Agent = agent) {
    this.agent = agentInstance
  }

  /**
   * Get request category filters
   */
  async getFilters(): Promise<RequestFilters> {
    const response = await this.agent.get<ApiResponse<RequestFilters>>("/web/request/filter")
    return response.result
  }

  /**
   * Upload file for request
   */
  async uploadFile(formData: FormData): Promise<UploadFileResponse> {
    const response = await this.agent.post<ApiResponse<UploadFileResponse>>("/web/request/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.result
  }

  /**
   * Send request email
   */
  async sendMail(params: RequestMailParams): Promise<void> {
    await this.agent.post<ApiResponse<void>>("/web/request/mail", params)
  }
}

export const requestService = new RequestService()
