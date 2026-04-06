import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export default function PublicRoute() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
