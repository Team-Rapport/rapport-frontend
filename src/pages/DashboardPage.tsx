import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { CounselorCard } from '@/components/ui/Card'
import { Divider } from '@/components/common/Divider'

const MOCK_REPORT = {
  date: '2025년 5월 19일',
  id: 'r001',
}

const MOCK_BOOKING = {
  dateTime: '2025년 6월 10일 화요일 14:00',
  counselorName: '김수연 상담사',
  id: 'b001',
}

const MOCK_COUNSELORS = [
  {
    id: 'c001',
    name: '김수연',
    specialties: ['불안', '우울'],
    rating: 4.9,
    reviewCount: 128,
    price: '60,000원',
    avatarUrl: 'https://i.pravatar.cc/300?img=47',
  },
  {
    id: 'c002',
    name: '박지훈',
    specialties: ['관계', '직장'],
    rating: 4.8,
    reviewCount: 95,
    price: '55,000원',
    avatarUrl: 'https://i.pravatar.cc/300?img=53',
  },
  {
    id: 'c003',
    name: '이미래',
    specialties: ['자존감', '트라우마'],
    rating: 4.7,
    reviewCount: 63,
    price: '65,000원',
    avatarUrl: 'https://i.pravatar.cc/300?img=48',
  },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const name = user?.name ?? '사용자'

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })

  return (
    <div className="px-5 py-5 flex flex-col gap-6">
      {/* Greeting */}
      <div>
        <h2 className="text-h2-mobile font-bold text-neutral-900">
          안녕하세요, {name}님
        </h2>
        <p className="text-caption text-neutral-400 mt-0.5">{today}</p>
      </div>

      {/* Chatbot CTA */}
      <button
        type="button"
        onClick={() => navigate('/chat')}
        className="w-full border border-primary-200 rounded-xl px-5 py-4 bg-primary-50 text-left"
      >
        <p className="text-body-lg font-medium text-primary-900">
          사전 점검 시작하기 →
        </p>
        <p className="text-caption text-primary-800 mt-1">
          AI와 대화로 나의 상태를 파악해요
        </p>
      </button>

      {/* Recent Report */}
      <div>
        <Divider />
        <div className="pt-4 flex items-center justify-between">
          <span className="text-body-md text-neutral-600">
            최근 리포트 · {MOCK_REPORT.date}
          </span>
          <button
            type="button"
            onClick={() => navigate(`/report/${MOCK_REPORT.id}`)}
            className="text-body-md text-primary-600"
          >
            리포트 보기
          </button>
        </div>
      </div>

      {/* Next Booking */}
      <div>
        <Divider />
        <div className="pt-4">
          {MOCK_BOOKING ? (
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-caption text-neutral-400 mb-0.5">다음 예약</p>
                <p className="text-body-md font-medium text-neutral-900">
                  {MOCK_BOOKING.dateTime}
                </p>
                <p className="text-body-md text-neutral-600">
                  {MOCK_BOOKING.counselorName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/sessions`)}
                className="text-body-md text-primary-600 shrink-0"
              >
                예약 상세
              </button>
            </div>
          ) : (
            <p className="text-caption text-neutral-400">예약된 상담이 없어요</p>
          )}
        </div>
      </div>

      {/* Recommended Counselors */}
      <div>
        <Divider />
        <div className="pt-4">
          <h3 className="text-[16px] font-bold text-neutral-900 mb-3">추천 상담사</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 no-scrollbar">
            {MOCK_COUNSELORS.map((c) => (
              <CounselorCard
                key={c.id}
                name={c.name}
                specialties={c.specialties}
                rating={c.rating}
                reviewCount={c.reviewCount}
                price={c.price}
                avatarUrl={c.avatarUrl}
                onBook={() => navigate(`/counselors/${c.id}`)}
                className="shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
