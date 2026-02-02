/**
 * API Agent for Next.js Web App
 * Adapted from mobile agent with web-specific features
 */

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
  cache?: RequestCache;
  suppressUnauthorizedLogout?: boolean;
}

// Web agent implementation
class Agent {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  /** Dynamically set base URL */
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
  private async processResponse<T>(
    response: Response,
    suppressUnauthorizedLogout = false
  ): Promise<T> {
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      if (response.status === 401 && !suppressUnauthorizedLogout) {
        // Handle logout - redirect to login or clear session
        // Only redirect if we're not already on the login page
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          localStorage.removeItem('auth-token');
          window.location.href = '/login';
        }
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
    const { headers = {}, params, signal, cache, suppressUnauthorizedLogout } = options;
    const url = this.createUrl(endpoint, params);

    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;

    const config: RequestInit = {
      method,
      headers: {
        ...this.defaultHeaders,
        'Accept-Language': 'en',
        Locale: 'en',
        'x-lang': 'en',
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

      const result = await this.processResponse<T>(res, suppressUnauthorizedLogout);
      return result;
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
