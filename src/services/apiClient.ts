import axios from 'axios'
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL, API_WITH_CREDENTIALS } from './apiConfig'

// ── Base instance ─────────────────────────────────────────────────
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: API_WITH_CREDENTIALS,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ── Request interceptor ───────────────────────────────────────────
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error) => Promise.reject(error),
)

// ── Response interceptor ─────────────────────────────────────────
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config

    // Auto refresh on 401 (token expired) — one retry
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/')
    ) {
      originalRequest._retry = true
      try {
        await apiClient.post('/auth/refresh')
        return apiClient(originalRequest)
      } catch {
        // Redirect to login if refresh also fails
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient
