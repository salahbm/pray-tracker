import { Agent, agent } from "@/lib/agent"
import { ApiResponse } from "@/types/response.types"
import type { MainWork, Work, WorkFilterData, WorkListResponse } from "@/types/work.types"

export interface GetWorksParams {
  curPage?: number
  category?: string
  taskScope?: string[]
  pageList?: number
}

export class WorkService {
  private readonly agent: Agent

  constructor(agentInstance: Agent = agent) {
    this.agent = agentInstance
  }

  /**
   * Get work filters (categories and task scopes)
   */
  async getFilters(): Promise<WorkFilterData> {
    const response = await this.agent.get<ApiResponse<WorkFilterData>>("/web/works/filter")
    return response.result
  }

  /**
   * Get paginated list of works with optional filters
   */
  async getWorks(params: GetWorksParams = {}): Promise<WorkListResponse> {
    const { curPage = 1, category = "", taskScope = [], pageList = 10 } = params

    const queryParams = new URLSearchParams({
      curPage: curPage.toString(),
      pageList: pageList.toString(),
    })

    if (category) {
      queryParams.append("category", category)
    }

    if (taskScope) {
      queryParams.append("taskScope", taskScope.join(","))
    }

    const response = await this.agent.get<ApiResponse<WorkListResponse>>(`/web/works?${queryParams.toString()}`)
    return response.result
  }

  /**
   * Get work detail by ID
   */
  async getWorkById(workNo: number): Promise<Work> {
    const response = await this.agent.get<ApiResponse<Work>>(`/web/works/${workNo}`)
    return response.result
  }

  /**
   * Get main page works
   */
  async getMainWorks(): Promise<MainWork[]> {
    const response = await this.agent.get<ApiResponse<MainWork[]>>("/web/main")
    return response.result
  }
}

export const workService = new WorkService()
