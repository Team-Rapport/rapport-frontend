import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export default function PublicRoute() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const user = useAuthStore((s) => s.user)
  const location = useLocation()

  const isOAuthCallbackPath = location.pathname === '/oauth2/callback'
  const allowLoggedInPath =
    location.pathname === '/signup' &&
    user?.role === 'CLIENT'

  if (isLoggedIn && !allowLoggedInPath && !isOAuthCallbackPath) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
