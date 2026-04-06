import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[400px] flex flex-col items-center gap-6">
        {/* 로고 */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl">🌿</span>
          <span className="text-h2-mobile font-bold text-primary-600">라포</span>
        </div>

        {/* 카드 */}
        <div className="w-full bg-white rounded-2xl shadow-sm p-8">
          <Outlet />
        </div>

        {/* 저작권 */}
        <p className="text-small text-neutral-400">
          © 2025 Team Rapport. All rights reserved.
        </p>
      </div>
    </div>
  )
}
