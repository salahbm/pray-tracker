import { Agent, agent } from "@/lib/agent"
import type { MenuData } from "@/types/menu.types"
import { ApiResponse } from "@/types/response.types"

export class MenuService {
  private readonly agent: Agent

  constructor(agentInstance: Agent = agent) {
    this.agent = agentInstance
  }

  /**
   * Get menu counts
   */
  async getMenu(): Promise<MenuData> {
    const response = await this.agent.get<ApiResponse<MenuData>>("/web/menu")
    return response.result
  }
}

export const menuService = new MenuService()
