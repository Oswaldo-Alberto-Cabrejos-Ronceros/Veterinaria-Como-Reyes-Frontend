import axios, { type AxiosInstance } from 'axios'
import { LogoutUser } from '@/services/Authentication/aplication/LogoutUser'
import { AuthenticationServiceImpl } from '@/services/Authentication/infrastructure/AuthenticationServiceImpl'
import type { HttpClient } from '../model/HttpClient'

export class AxiosHttpClient implements HttpClient {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
    //interceptor for response
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          if (!originalRequest.url.includes('/auth/refresh')) {
            try {
              //try refresh token
              await this.axiosInstance.post('/auth/refresh')
              return this.axiosInstance(originalRequest)
            } catch (refreshError) {
              //if resfresh fails, logout
              const logoutUser = new LogoutUser(new AuthenticationServiceImpl())
              logoutUser.execute()
              // redirige to login
              window.location.href = '/auth/login'
              return Promise.reject(refreshError)
            }
          }
        }
        return Promise.reject(error)
      },
    )
  }

  async get<T>(url: string, params?: Record<string, string | number|boolean>): Promise<{ data: T }> {
    try {
      const response = await this.axiosInstance.get<T>(url, {
        params,
      })
      return { data: response.data }
    } catch (e) {
      this.handleError(e as Error)
      throw e
    }
  }

  async post<T>(url: string, body: unknown): Promise<{ data: T }> {
    try {
      const response = await this.axiosInstance.post<T>(url, body)
      return { data: response.data }
    } catch (e) {
      this.handleError(e as Error)
      throw e
    }
  }
  async put<T>(url: string, body: unknown): Promise<{ data: T }> {
    try {
      const response = await this.axiosInstance.put(url, body)
      return { data: response.data }
    } catch (e) {
      this.handleError(e as Error)
      throw e
    }
  }
  async patch<T>(
    url: string,
    body?: unknown,
    params?: Record<string, string | number>,
  ): Promise<{ data: T }> {
    try {
      const response = await this.axiosInstance.patch(url, body, {
        params,
      })
      return { data: response.data }
    } catch (e) {
      this.handleError(e as Error)
      throw e
    }
  }
  async delete<T>(url: string): Promise<{ data: T }> {
    try {
      const response = await this.axiosInstance.delete(url)
      return { data: response.data }
    } catch (e) {
      this.handleError(e as Error)
      throw e
    }
  }

  private handleError(error: Error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'HTTP error:',
        error.response?.status,
        error.response?.statusText,
        error.response?.data,
      )
    } else {
      console.error('Unexpected error:', error)
    }
  }
}
