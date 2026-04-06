import { createBrowserRouter, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

import AuthLayout from '@/layouts/AuthLayout'
import AppLayout from '@/layouts/AppLayout'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

import LoginPage from '@/pages/auth/LoginPage'
import SignupPage from '@/pages/auth/SignupPage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import DashboardPage from '@/pages/DashboardPage'
import ChatPage from '@/pages/ChatPage'
import ReportPage from '@/pages/ReportPage'
import CounselorListPage from '@/pages/CounselorListPage'
import CounselorDetailPage from '@/pages/CounselorDetailPage'
import BookingPage from '@/pages/BookingPage'
import MyPage from '@/pages/MyPage'

function RootRedirect() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  return <Navigate to={isLoggedIn ? '/dashboard' : '/login'} replace />
}

export const router = createBrowserRouter([
  {
    index: true,
    element: <RootRedirect />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/signup', element: <SignupPage /> },
          { path: '/forgot-password', element: <ForgotPasswordPage /> },
        ],
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/chat', element: <ChatPage /> },
          { path: '/chat/:sessionId', element: <ChatPage /> },
          { path: '/report/:reportId', element: <ReportPage /> },
          { path: '/counselors', element: <CounselorListPage /> },
          { path: '/counselors/:id', element: <CounselorDetailPage /> },
          { path: '/booking/:counselorId', element: <BookingPage /> },
          { path: '/mypage', element: <MyPage /> },
        ],
      },
    ],
  },
])
