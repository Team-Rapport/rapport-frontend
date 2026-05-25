import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/common/Divider'
import { springFetch } from '@/lib/springApi'
import { useAuthStore } from '@/store/authStore'

interface UserInfo {
  id: number
  email: string
  name: string
  role: string
  profileImageUrl?: string
}

interface MyStats {
  totalSessions?: number
  totalReports?: number
  completedSessions?: number
  reportsCount?: number
}

interface ApiResponse<T> {
  success?: boolean
  data?: T
}

export default function MyPage() {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const storeUser = useAuthStore((s) => s.user)

  const [user, setUser] = useState<UserInfo | null>(null)
  const [stats, setStats] = useState<MyStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      try {
        const [meRes, statsRes] = await Promise.all([
          springFetch('/api/v1/auth/me'),
          springFetch('/api/v1/users/me/stats'),
        ])

        if (meRes.ok) {
          const payload: ApiResponse<UserInfo> = await meRes.json()
          setUser(payload?.data ?? null)
        }
        if (statsRes.ok) {
          const payload: ApiResponse<MyStats> = await statsRes.json()
          setStats(payload?.data ?? null)
        }
        setError(null)
      } catch {
        setError('마이페이지 정보를 불러오지 못했어요.')
      } finally {
        setLoading(false)
      }
    }
    void run()
  }, [])

  const displayName = user?.name || storeUser?.name || '사용자'
  const displayEmail = user?.email || storeUser?.email || '-'
  const sessionCount = stats?.totalSessions ?? stats?.completedSessions ?? 0
  const reportCount = stats?.totalReports ?? stats?.reportsCount ?? 0

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await springFetch('/api/v1/auth/logout', { method: 'POST' })
    } catch {
      // ignore network errors and clear local auth regardless
    } finally {
      clearAuth()
      navigate('/login', { replace: true })
      setLoggingOut(false)
    }
  }

  return (
    <div className="px-5 py-5 flex flex-col gap-5">
      {/* Page title */}
      <h2 className="text-h2-mobile font-bold text-neutral-900">마이페이지</h2>

      {loading && <p className="text-caption text-neutral-400">불러오는 중...</p>}
      {error && <p className="text-caption text-semantic-error-text">{error}</p>}

      <div className="rounded-xl border border-neutral-100 bg-white px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-50 overflow-hidden flex items-center justify-center text-primary-600 font-bold">
            {user?.profileImageUrl ? (
              <img src={user.profileImageUrl} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <span>{displayName.charAt(0)}</span>
            )}
          </div>
          <div>
            <p className="text-body-lg font-medium text-neutral-900">{displayName}</p>
            <p className="text-caption text-neutral-500">{displayEmail}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-100 bg-white px-4 py-4">
        <p className="text-body-md font-medium text-neutral-900">내 활동</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-neutral-50 px-3 py-3">
            <p className="text-small text-neutral-500">상담 횟수</p>
            <p className="text-h3-mobile font-bold text-neutral-900 mt-1">{sessionCount}</p>
          </div>
          <div className="rounded-lg bg-neutral-50 px-3 py-3">
            <p className="text-small text-neutral-500">리포트 수</p>
            <p className="text-h3-mobile font-bold text-neutral-900 mt-1">{reportCount}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-100 bg-white">
        <button
          type="button"
          onClick={() => navigate('/my/reports')}
          className="w-full text-left px-4 py-4 text-body-md text-neutral-900"
        >
          나의 리포트 보기
        </button>
        <Divider />
        <button
          type="button"
          onClick={() => navigate('/mypage/profile')}
          className="w-full text-left px-4 py-4 text-body-md text-neutral-900"
        >
          프로필 정보 수정
        </button>
      </div>

      <Button
        variant="ghost"
        size="lg"
        className="w-full border border-neutral-200"
        onClick={() => void handleLogout()}
        disabled={loggingOut}
      >
        {loggingOut ? '로그아웃 중...' : '로그아웃'}
      </Button>
    </div>
  )
}
