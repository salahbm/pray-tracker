/**
 * API Agent for Expo / React Native
 * Provides a unified, type-safe way to make API requests
 */
import i18n from '@/i18n.config';
import Constants from 'expo-constants';

import { useAuthStore } from '@/store/auth/auth-session';

/**
 * Custom API error for unified handling
 */
export class ApiError extends Error {
  status: number;
  code?: string | number;
  data?: unknown;

  constructor(message: string, status: number, code?: string | number, data?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

// Supported HTTP methods
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Request options
interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
  cache?: 'no-store' | 'reload' | 'force-cache'; // simplified
}

// Expo agent implementation
class Agent {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl?: string) {
    this.baseUrl =
      baseUrl ||
      Constants.expoConfig?.extra?.apiUrl ||
      process.env.EXPO_PUBLIC_API_URL ||
      'http://localhost:4000'; // fallback for dev

    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  /** Dynamically set base URL (useful for environments) */
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  /** Set default headers */
  setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  /** Add Bearer token */
  setBearerToken(token: string): void {
    this.defaultHeaders.Authorization = `Bearer ${token}`;
  }

  /** Clear Bearer token */
  clearBearerToken(): void {
    delete this.defaultHeaders.Authorization;
  }

  /** Construct full URL with query params */
  private createUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>
  ): string {
    const normalized = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const url = `${this.baseUrl.replace(/\/$/, '')}/${normalized}`;
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) searchParams.append(k, String(v));
      });
      return `${url}?${searchParams.toString()}`;
    }
    return url;
  }

  /** Handle and parse response */
  private async processResponse<T>(response: Response): Promise<T> {
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      if (response.status === 401) {
        useAuthStore.getState().clearUserAndSession();
      }
      const message =
        isJson && (data.message || data.error)
          ? data.message || data.error
          : `HTTP ${response.status}`;
      throw new ApiError(message, response.status, (data as any)?.code, data);
    }

    return data as T;
  }

  /** Generic request */
  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const { headers = {}, params, signal, cache } = options;
    const url = this.createUrl(endpoint, params);

    // Get current language and add to headers
    const currentLanguage = i18n.language || 'en';

    const token = useAuthStore.getState().session?.token;

    const config: RequestInit = {
      method,
      headers: {
        ...this.defaultHeaders,
        'Accept-Language': currentLanguage,
        Locale: currentLanguage,
        'x-lang': currentLanguage,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      signal,
      cache,
    };

    if (body && method !== 'GET') {
      if (body instanceof FormData) {
        config.body = body;
        delete (config.headers as Record<string, string>)['Content-Type'];
      } else {
        config.body = JSON.stringify(body);
      }
    }

    try {
      // Create timeout controller (60 seconds)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      // Use the provided signal or the timeout signal
      const finalSignal = signal || controller.signal;

      const res = await fetch(url, { ...config, signal: finalSignal });
      clearTimeout(timeoutId);

      return await this.processResponse<T>(res);
    } catch (err) {
      if (err instanceof ApiError) throw err;

      // Handle timeout specifically
      if ((err as Error).name === 'AbortError') {
        throw new ApiError(
          'Request timeout - server took too long to respond',
          408,
          'TIMEOUT',
          err
        );
      }

      const fallbackMessage = (err as Error).message ?? 'Network error';
      throw new ApiError(
        `Network error while calling ${url}: ${fallbackMessage}`,
        0,
        undefined,
        err
      );
    }
  }

  get<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>('GET', endpoint, undefined, options);
  }

  post<T>(endpoint: string, data?: unknown, options?: RequestOptions) {
    return this.request<T>('POST', endpoint, data, options);
  }

  put<T>(endpoint: string, data?: unknown, options?: RequestOptions) {
    return this.request<T>('PUT', endpoint, data, options);
  }

  patch<T>(endpoint: string, data?: unknown, options?: RequestOptions) {
    return this.request<T>('PATCH', endpoint, data, options);
  }

  delete<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>('DELETE', endpoint, undefined, options);
  }
}

// Export singleton
const agent = new Agent();

export default agent;
