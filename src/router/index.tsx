import { createBrowserRouter, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

import AuthLayout from '@/layouts/AuthLayout'
import AppLayout from '@/layouts/AppLayout'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

import LoginPage from '@/pages/auth/LoginPage'
import SignupPage from '@/pages/auth/SignupPage'
import SignupCompletePage from '@/pages/auth/SignupCompletePage'
import CounselorLoginPage from '@/pages/auth/CounselorLoginPage'
import CounselorSignupPage from '@/pages/auth/CounselorSignupPage'
import CounselorSignupCompletePage from '@/pages/auth/CounselorSignupCompletePage'
import CounselorCredentialPage from '@/pages/auth/CounselorCredentialPage'
import CounselorCredentialCompletePage from '@/pages/auth/CounselorCredentialCompletePage'
import CounselorPendingPage from '@/pages/auth/CounselorPendingPage'
import CounselorProfilePage from '@/pages/auth/CounselorProfilePage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import OAuthCallbackPage from '@/pages/auth/OAuthCallbackPage'
import DashboardPage from '@/pages/DashboardPage'
import ChatPage from '@/pages/ChatPage'
import ReportPage from '@/pages/ReportPage'
import CounselorListPage from '@/pages/CounselorListPage'
import CounselorDetailPage from '@/pages/CounselorDetailPage'
import BookingPage from '@/pages/BookingPage'
import MyPage from '@/pages/MyPage'
import IntakeFormPage from '@/pages/IntakeFormPage'
import MySessionsPage from '@/pages/MySessionsPage'
import ReviewPage from '@/pages/ReviewPage'
import MyReportsPage from '@/pages/MyReportsPage'
import EditProfilePage from '@/pages/EditProfilePage'

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
          { path: '/signup-complete', element: <SignupCompletePage /> },
          { path: '/counselor-login', element: <CounselorLoginPage /> },
          { path: '/counselor-signup', element: <CounselorSignupPage /> },
          { path: '/counselor-signup-complete', element: <CounselorSignupCompletePage /> },
          { path: '/counselor-credential', element: <CounselorCredentialPage /> },
          { path: '/counselor-credential-complete', element: <CounselorCredentialCompletePage /> },
          { path: '/counselor-pending', element: <CounselorPendingPage /> },
          { path: '/counselor-profile', element: <CounselorProfilePage /> },
          { path: '/forgot-password', element: <ForgotPasswordPage /> },
          { path: '/oauth2/callback', element: <OAuthCallbackPage /> },
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
          { path: '/mypage/profile', element: <EditProfilePage /> },
          { path: '/my/reports', element: <MyReportsPage /> },
          { path: '/intake-form', element: <IntakeFormPage /> },
          { path: '/sessions', element: <MySessionsPage /> },
          { path: '/review/:sessionId', element: <ReviewPage /> },
        ],
      },
    ],
  },
])
