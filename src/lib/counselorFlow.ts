import { useAuthStore } from '@/store/authStore'
import { springFetch } from '@/lib/springApi'

export type CounselorApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

interface ApiResponse<T> {
  data?: T
}

interface CounselorStatusResponse {
  approvalStatus?: CounselorApprovalStatus
}

interface CounselorProfileResponse {
  approvalStatus?: CounselorApprovalStatus
  profileCompleted?: boolean
  requiredMissingFields?: string[]
}

export async function routeCounselorAfterLogin(navigate: (path: string, opts?: { replace?: boolean }) => void) {
  const statusRes = await springFetch('/api/v1/counselor/status')
  if (!statusRes.ok) {
    navigate('/counselor-pending', { replace: true })
    return
  }

  const statusPayload: ApiResponse<CounselorStatusResponse> = await statusRes.json().catch(() => ({}))
  const status = statusPayload?.data?.approvalStatus

  if (status === 'PENDING' || status === 'REJECTED') {
    navigate('/counselor-pending', { replace: true })
    return
  }

  if (status === 'APPROVED') {
    const profileRes = await springFetch('/api/v1/counselor/profile')
    if (profileRes.ok) {
      const profilePayload: ApiResponse<CounselorProfileResponse> = await profileRes.json().catch(() => ({}))
      const profile = profilePayload?.data
      const profileCompleted = profile?.profileCompleted === true
      if (!profileCompleted) {
        navigate('/counselor-profile', { replace: true })
        return
      }
    }
    navigate('/counselor/dashboard', { replace: true })
    return
  }

  navigate('/counselor-pending', { replace: true })
}

export function applyCounselorAuthFromTokenResponse(payload: any) {
  const tokenData = payload?.data ?? payload
  const accessToken = tokenData?.accessToken
  const refreshToken = tokenData?.refreshToken
  const user = tokenData?.user

  if (!accessToken || !user) {
    throw new Error('invalid auth response')
  }

  useAuthStore.getState().setAuth({
    accessToken,
    refreshToken: refreshToken ?? null,
    user: {
      id: String(user.id),
      email: user.email,
      name: user.name,
      role: user.role,
    },
  })
}
