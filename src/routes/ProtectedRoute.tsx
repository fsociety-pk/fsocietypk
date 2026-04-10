import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

interface ProtectedRouteProps {
  allowedRoles?: Array<'user' | 'admin'>
  redirectTo?: string
}

/**
 * Wraps routes that require authentication.
 * Optionally restricts to specific roles (e.g. admin-only pages).
 * Redirects unauthenticated users to /login with a `from` state
 * so they can be sent back after successful login.
 */
export const ProtectedRoute = ({
  allowedRoles,
  redirectTo = '/login',
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuthStore()
  const location = useLocation()

  // Wait for session check before deciding
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full animate-spin" />
          <p className="text-text-muted text-sm font-mono">Verifying session...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
