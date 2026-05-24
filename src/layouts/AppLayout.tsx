import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Home, CalendarCheck, Users, User, Bell } from 'lucide-react'
import logo from '@/assets/logo.svg'

const NAV_ITEMS = [
  { label: '홈', icon: Home, path: '/dashboard' },
  { label: '내 상담', icon: CalendarCheck, path: '/sessions' },
  { label: '상담사 탐색', icon: Users, path: '/counselors' },
  { label: '마이페이지', icon: User, path: '/mypage' },
]

export default function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-neutral-50 flex justify-center">
      <div className="w-full max-w-[402px] min-h-screen flex flex-col bg-white relative">
        {/* 헤더 */}
        <header className="sticky top-0 z-50 h-14 bg-white border-b border-neutral-100 flex items-center justify-between px-4">
          <div className="flex items-center gap-1">
            <img src={logo} alt="rapport 로고" className="w-8 h-8 object-contain" />
            <span
              className="text-[22px] leading-none text-primary-900"
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
            >
              rapport
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="text-neutral-600 hover:text-neutral-900" aria-label="알림">
              <Bell size={22} />
            </button>
            <div className="w-8 h-8 rounded-full bg-neutral-200" aria-label="프로필" />
          </div>
        </header>

        {/* 콘텐츠 */}
        <main className="flex-1 overflow-y-auto flex flex-col">
          <Outlet />
        </main>

        {/* 하단 네비게이션 */}
        <nav className="sticky bottom-0 z-50 h-16 bg-white border-t border-neutral-100 flex">
          {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
            const isActive =
              location.pathname === path || location.pathname.startsWith(path + '/')
            return (
              <button
                key={path}
                type="button"
                onClick={() => navigate(path)}
                className="flex-1 flex flex-col items-center justify-center gap-0.5"
              >
                <Icon
                  size={22}
                  className={isActive ? 'text-primary-600' : 'text-neutral-400'}
                />
                <span
                  className={`text-small font-medium ${isActive ? 'text-primary-600' : 'text-neutral-400'}`}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
