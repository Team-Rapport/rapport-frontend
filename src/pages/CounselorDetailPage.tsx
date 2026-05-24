import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/layout/PageHeader'
import { LabelBadge } from '@/components/common/LabelBadge'
import { Divider } from '@/components/common/Divider'

interface Counselor {
  id: string
  name: string
  tagline: string
  specialties: string[]
  sessionTypes: string[]
  career: { year: string; description: string }[]
  price: string
  availableTimes: string[]
  education: string
  avatarUrl?: string
}

const MOCK_COUNSELORS: Counselor[] = [
  {
    id: 'c001',
    name: '김수연',
    tagline: '불안과 우울, 함께 걸어가겠습니다',
    specialties: ['불안', '우울', '공황', '스트레스'],
    sessionTypes: ['대면', '비대면'],
    career: [
      { year: '2018~현재', description: '마음채움 상담센터 수석 상담사' },
      { year: '2015~2018', description: '서울 대학교 상담센터 인턴' },
    ],
    price: '60,000원 / 50분',
    availableTimes: ['월 10:00~18:00', '수 10:00~18:00', '금 10:00~16:00'],
    education: '한국상담심리학회 상담심리사 1급',
    avatarUrl: 'https://i.pravatar.cc/400?img=47',
  },
  {
    id: 'c002',
    name: '박지훈',
    tagline: '관계와 직장 스트레스 전문 상담사',
    specialties: ['관계', '직장 스트레스', '번아웃'],
    sessionTypes: ['비대면'],
    career: [
      { year: '2019~현재', description: '온라인 심리상담 플랫폼 전문 상담사' },
    ],
    price: '55,000원 / 50분',
    availableTimes: ['화 14:00~20:00', '목 14:00~20:00', '토 10:00~14:00'],
    education: '임상심리사 2급',
    avatarUrl: 'https://i.pravatar.cc/400?img=53',
  },
  {
    id: 'c003',
    name: '이미래',
    tagline: '자존감 회복과 트라우마 치유',
    specialties: ['자존감', '트라우마', 'PTSD'],
    sessionTypes: ['대면', '비대면'],
    career: [
      { year: '2017~현재', description: '트라우마 전문 상담센터 상담사' },
    ],
    price: '65,000원 / 50분',
    availableTimes: ['월 13:00~19:00', '수 13:00~19:00'],
    education: '정신건강 임상심리사 2급',
    avatarUrl: 'https://i.pravatar.cc/400?img=48',
  },
  {
    id: 'c004',
    name: '최현우',
    tagline: '청소년·성인 모두 환영합니다',
    specialties: ['청소년', '진로', '가족'],
    sessionTypes: ['대면'],
    career: [
      { year: '2016~현재', description: '청소년 상담 복지센터 전문 상담사' },
    ],
    price: '50,000원 / 50분',
    availableTimes: ['화 15:00~19:00', '금 15:00~19:00'],
    education: '청소년 상담사 2급',
    avatarUrl: 'https://i.pravatar.cc/400?img=52',
  },
  {
    id: 'c005',
    name: '정소희',
    tagline: '마음의 무게를 함께 내려놓아요',
    specialties: ['불안', '수면', '번아웃'],
    sessionTypes: ['비대면'],
    career: [
      { year: '2020~현재', description: '비대면 심리상담 서비스 상담사' },
    ],
    price: '58,000원 / 50분',
    availableTimes: ['월 20:00~22:00', '수 20:00~22:00', '토 14:00~18:00'],
    education: '상담심리사 2급',
    avatarUrl: 'https://i.pravatar.cc/400?img=44',
  },
]

export default function CounselorDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const counselor = MOCK_COUNSELORS.find((c) => c.id === id) ?? MOCK_COUNSELORS[0]

  return (
    <div className="flex flex-col min-h-full">
      <PageHeader title="" />

      {/* Hero image */}
      <div className="w-full h-56 bg-primary-50 overflow-hidden shrink-0">
        {counselor.avatarUrl ? (
          <img
            src={counselor.avatarUrl}
            alt={counselor.name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[80px] font-bold text-primary-200">
            {counselor.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Hero text */}
      <div className="px-5 py-4">
        <h1 className="text-h1-mobile font-bold text-neutral-900">{counselor.name}</h1>
        <p className="text-body-md text-neutral-600 mt-1">{counselor.tagline}</p>
      </div>

      {/* 전문 분야 */}
      <Divider />
      <section className="px-5 py-4">
        <h3 className="text-[16px] font-bold text-neutral-900 mb-3">전문 분야</h3>
        <div className="flex flex-wrap gap-2">
          {counselor.specialties.map((s) => (
            <LabelBadge key={s}>{s}</LabelBadge>
          ))}
        </div>
      </section>

      {/* 상담 방식 */}
      <Divider />
      <section className="px-5 py-4">
        <h3 className="text-[16px] font-bold text-neutral-900 mb-3">상담 방식</h3>
        <div className="flex flex-wrap gap-2">
          {counselor.sessionTypes.map((t) => (
            <LabelBadge key={t}>{t}</LabelBadge>
          ))}
        </div>
      </section>

      {/* 경력 */}
      <Divider />
      <section className="px-5 py-4">
        <h3 className="text-[16px] font-bold text-neutral-900 mb-3">경력 및 학력</h3>
        <div className="flex flex-col gap-2">
          <p className="text-body-md text-neutral-800">{counselor.education}</p>
          {counselor.career.map((c, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-caption text-neutral-400 shrink-0">{c.year}</span>
              <span className="text-caption text-neutral-600">{c.description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 가격 */}
      <Divider />
      <section className="px-5 py-4">
        <h3 className="text-[16px] font-bold text-neutral-900 mb-2">상담 비용</h3>
        <p className="text-body-lg font-medium text-neutral-900">{counselor.price}</p>
        <p className="text-caption text-neutral-400 mt-1">
          첫 상담은 10% 할인이 적용됩니다
        </p>
      </section>

      {/* 가능 시간 */}
      <Divider />
      <section className="px-5 py-4">
        <h3 className="text-[16px] font-bold text-neutral-900 mb-3">상담 가능 시간</h3>
        <div className="flex flex-col gap-1.5">
          {counselor.availableTimes.map((t) => (
            <p key={t} className="text-body-md text-neutral-600">{t}</p>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="mt-auto px-5 pb-3 pt-3 bg-white border-t border-neutral-100">
        <Button
          variant="primary"
          size="lg"
          className="w-full rounded-lg"
          onClick={() => navigate(`/booking/${counselor.id}`)}
        >
          예약하기
        </Button>
      </div>
    </div>
  )
}
