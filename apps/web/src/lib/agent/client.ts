/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios"

import { appConfig } from "@/config/app.config"
import { COOKIE_KEYS } from "@/constants/cookies"
import { defaultLocale } from "@/i18n/config"
import { ApiError, ApiPaginatedApiResponse } from "./types"

export interface AgentConfig {
  token?: string
}

/**
 * Get current locale from cookies
 */
function getCurrentLocale(): string {
  if (typeof window === "undefined") {
    return defaultLocale
  }

  const cookies = document.cookie.split("; ")
  const localeCookie = cookies.find((cookie) => cookie.startsWith(`${COOKIE_KEYS.LANGUAGE}=`))

  if (localeCookie) {
    const locale = localeCookie.split("=")[1]
    return locale || defaultLocale
  }

  return defaultLocale
}

/**
 * Agent class for making API requests with automatic language handling
 */
export class Agent {
  private client: AxiosInstance

  constructor(config?: AgentConfig) {
    this.client = this.createClient(config)
  }

  /**
   * Create axios client instance
   */
  private createClient(config?: AgentConfig): AxiosInstance {
    const client = axios.create({
      baseURL: appConfig.api.baseURL,
      timeout: appConfig.api.timeout,
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Request interceptor
    client.interceptors.request.use(async (requestConfig) => {
      if (config?.token) {
        requestConfig.headers.Authorization = config.token
      }

      // Add language to headers - dynamically get current locale
      const currentLocale = getCurrentLocale()
      requestConfig.headers["Accept-Language"] = currentLocale
      requestConfig.headers["locale"] = currentLocale

      return requestConfig
    })

    // Response interceptor
    client.interceptors.response.use(
      (res) => res,
      (error: AxiosError<any>) => {
        if (error instanceof ApiError) {
          throw error
        }

        const response = error.response
        const data = response?.data

        if (response) {
          throw new ApiError({
            error: {
              code: data?.code ?? response.status,
              message: data?.message ?? response.statusText ?? "Request failed",
              status: response.status,
              timestamp: data?.timestamp ?? new Date().toISOString(),
            },
            status: response.status,
            url: error.config?.url ?? "",
          })
        }

        throw new ApiError({
          error: {
            code: 0,
            message: "Network error - Please check your connection",
            status: 0,
            timestamp: new Date().toISOString(),
          },
          status: 0,
          url: error.config?.url ?? "",
        })
      }
    )

    return client
  }

  /**
   * GET request
   */
  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }

  /**
   * GET request with pagination
   */
  async getPaginated<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiPaginatedApiResponse<T>> {
    const response = await this.client.get<ApiPaginatedApiResponse<T>>(url, config)
    return response.data
  }

  /**
   * POST request
   */
  async post<T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  /**
   * PUT request
   */
  async put<T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config)
    return response.data
  }

  /**
   * PATCH request
   */
  async patch<T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config)
    return response.data
  }

  /**
   * DELETE request
   */
  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }
}

// Export default agent instance
export const agent = new Agent()
