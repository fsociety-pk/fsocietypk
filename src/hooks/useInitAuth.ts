import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { authService } from '../services/authService'

/**
 * Fetches the current session on mount.
 * Sets user in auth store if a valid cookie session exists.
 * Should be called once at the app root.
 */
export const useInitAuth = () => {
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true)
        const res = await authService.getMe()
        if (res.success) {
          setUser(res.data)
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      }
    }

    initAuth()
  }, [setUser, setLoading])
}
