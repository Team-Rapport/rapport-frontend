import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

type SessionTab = 'upcoming' | 'completed'

interface Session {
  id: string
  counselorName: string
  dateTime: string
  status: '확정' | '예정' | '취소'
  isCompleted: boolean
  hasReview?: boolean
}

const MOCK_SESSIONS: Session[] = [
  {
    id: 's001',
    counselorName: '김수연',
    dateTime: '2025.06.10 화 14:00',
    status: '확정',
    isCompleted: false,
  },
  {
    id: 's002',
    counselorName: '박지훈',
    dateTime: '2025.06.17 화 15:00',
    status: '예정',
    isCompleted: false,
  },
  {
    id: 's003',
    counselorName: '이미래',
    dateTime: '2025.06.24 화 13:00',
    status: '예정',
    isCompleted: false,
  },
  {
    id: 's004',
    counselorName: '김수연',
    dateTime: '2025.05.13 화 14:00',
    status: '확정',
    isCompleted: true,
    hasReview: true,
  },
  {
    id: 's005',
    counselorName: '박지훈',
    dateTime: '2025.05.06 화 15:00',
    status: '확정',
    isCompleted: true,
    hasReview: false,
  },
]

export default function MySessionsPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<SessionTab>('upcoming')

  const filtered = MOCK_SESSIONS.filter((s) =>
    activeTab === 'upcoming' ? !s.isCompleted : s.isCompleted,
  )

  return (
    <div className="flex flex-col">
      {/* Page title */}
      <div className="px-5 pt-5 pb-3">
        <h2 className="text-h2-mobile font-bold text-neutral-900">내 상담</h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-100">
        {(['upcoming', 'completed'] as SessionTab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            className={cn(
              'flex-1 py-3 text-body-md font-medium transition-colors',
              activeTab === tab
                ? 'text-primary-600 border-b-2 border-primary-600 -mb-px'
                : 'text-neutral-400',
            )}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'upcoming' ? '예정된 상담' : '완료된 상담'}
          </button>
        ))}
      </div>

      {/* Session list */}
      <div className="flex flex-col">
        {filtered.length === 0 ? (
          <p className="text-center text-caption text-neutral-400 py-12">
            {activeTab === 'upcoming'
              ? '예정된 상담이 없어요'
              : '완료된 상담이 없어요'}
          </p>
        ) : (
          filtered.map((session) => (
            <div
              key={session.id}
              className="px-5 py-4 border-b border-neutral-100"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-body-md font-bold text-neutral-900">
                    {session.dateTime}
                  </span>
                  <span className="text-[16px] font-medium text-neutral-900">
                    {session.counselorName} 상담사
                  </span>
                </div>
                <Badge variant="status" status={session.status}>
                  {session.status}
                </Badge>
              </div>
              {session.isCompleted && !session.hasReview && (
                <button
                  type="button"
                  className="mt-2 text-body-md text-primary-600"
                  onClick={() => navigate(`/review/${session.id}`)}
                >
                  리뷰 작성
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
