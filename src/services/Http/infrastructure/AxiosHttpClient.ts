import axios from 'axios'
import { LogoutUser } from '@/services/Authentication/aplication/LogoutUser'
import { AuthenticationServiceImpl } from '@/services/Authentication/infrastructure/AuthenticationServiceImpl'
import type { HttpClient } from '../model/HttpClient'
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

//interceptor for response
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      if (!originalRequest.url.includes('/auth/refresh')) {
        try {
          //try refresh token
          await axiosInstance.post('/auth/refresh')
          return axiosInstance(originalRequest)
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
//export default httpClient implement
const axiosHttpClient: HttpClient = {
  get: (url) => axiosInstance.get(url),
  post: (url, body) => axiosInstance.post(url, body),
  put: (url, body) => axiosInstance.put(url, body),
  patch:(url,body?)=>axiosInstance.patch(url,body?),
  delete: (url) => axiosInstance.delete(url),
}

export default axiosHttpClient
