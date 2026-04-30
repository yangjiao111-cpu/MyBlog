/**
 * HTTP 通用请求工具
 * 基于 fetch 封装，提供超时、错误处理等功能
 */

interface RequestConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
}

interface HttpResponse<T = unknown> {
  code: number
  data: T
  message: string
}

const defaultConfig: RequestConfig = {
  baseURL: '',
  timeout: 10000,
  headers: {}
}

class HttpClient {
  private config: RequestConfig

  constructor(config: RequestConfig = {}) {
    this.config = { ...defaultConfig, ...config }
  }

  /**
   * 通用请求方法
   */
  private async request<T = unknown>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout)

    try {
      const response = await fetch(`${this.config.baseURL}${url}`, {
        ...options,
        signal: controller.signal,
        headers: {
          ...this.config.headers,
          ...options.headers
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return data as T
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new Error(`请求超时 (${this.config.timeout}ms)`)
      }
      throw error
    } finally {
      clearTimeout(timeoutId)
    }
  }

  /**
   * GET 请求
   */
  async get<T = unknown>(
    url: string,
    params?: Record<string, string>
  ): Promise<T> {
    let finalUrl = url
    if (params) {
      const query = new URLSearchParams(params).toString()
      finalUrl = `${url}?${query}`
    }
    return this.request<T>(finalUrl, { method: 'GET' })
  }

  /**
   * POST 请求
   */
  async post<T = unknown>(
    url: string,
    data?: unknown
  ): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : undefined
    })
  }
}

// 导出单例
export const http = new HttpClient({ baseURL: '', timeout: 8000 })

export type { RequestConfig, HttpResponse }
