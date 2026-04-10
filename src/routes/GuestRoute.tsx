import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

/**
 * Wraps auth pages (login/register).
 * Redirects already-authenticated users to /dashboard.
 */
export const GuestRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) return null

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
