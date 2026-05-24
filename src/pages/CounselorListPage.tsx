import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { CounselorListCard } from '@/components/counselor/CounselorCard'

const MOCK_COUNSELORS = [
  {
    id: 'c001',
    name: '김수연',
    tagline: '불안과 우울, 함께 걸어가겠습니다',
    specialties: ['불안', '우울', '공황'],
    sessionTypes: ['대면', '비대면'],
    price: '60,000원 / 50분',
    rating: 4.9,
    reviewCount: 128,
    avatarUrl: 'https://i.pravatar.cc/300?img=47',
  },
  {
    id: 'c002',
    name: '박지훈',
    tagline: '관계와 직장 스트레스 전문 상담사',
    specialties: ['관계', '직장 스트레스'],
    sessionTypes: ['비대면'],
    price: '55,000원 / 50분',
    rating: 4.8,
    reviewCount: 95,
    avatarUrl: 'https://i.pravatar.cc/300?img=53',
  },
  {
    id: 'c003',
    name: '이미래',
    tagline: '자존감 회복과 트라우마 치유',
    specialties: ['자존감', '트라우마', 'PTSD'],
    sessionTypes: ['대면', '비대면'],
    price: '65,000원 / 50분',
    rating: 4.7,
    reviewCount: 63,
    avatarUrl: 'https://i.pravatar.cc/300?img=48',
  },
  {
    id: 'c004',
    name: '최현우',
    tagline: '청소년·성인 모두 환영합니다',
    specialties: ['청소년', '진로', '가족'],
    sessionTypes: ['대면'],
    price: '50,000원 / 50분',
    rating: 4.6,
    reviewCount: 41,
    avatarUrl: 'https://i.pravatar.cc/300?img=52',
  },
  {
    id: 'c005',
    name: '정소희',
    tagline: '마음의 무게를 함께 내려놓아요',
    specialties: ['불안', '수면', '번아웃'],
    sessionTypes: ['비대면'],
    price: '58,000원 / 50분',
    rating: 4.9,
    reviewCount: 87,
    avatarUrl: 'https://i.pravatar.cc/300?img=44',
  },
]

const SPECIALTY_FILTERS = ['불안/우울', '관계/가족', '직장 스트레스', '트라우마', '청소년']
const SESSION_TYPE_FILTERS = ['대면', '비대면']
const PRICE_FILTERS = ['5만원 이하', '5~6만원', '6만원 이상']

export default function CounselorListPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeSpecialty, setActiveSpecialty] = useState<string | null>(null)
  const [activeSessionType, setActiveSessionType] = useState<string | null>(null)
  const [activePrice, setActivePrice] = useState<string | null>(null)

  const filtered = MOCK_COUNSELORS.filter((c) => {
    if (search && !c.name.includes(search) && !c.specialties.some((s) => s.includes(search))) {
      return false
    }
    if (activeSessionType && !c.sessionTypes.includes(activeSessionType)) return false
    return true
  })

  // suppress unused variable warnings for filters not yet wired to data
  void activeSpecialty
  void activePrice

  return (
    <div className="flex flex-col">
      {/* Search */}
      <div className="px-5 py-3 bg-white border-b border-neutral-100">
        <Input
          leftIcon={<Search size={16} />}
          placeholder="이름 또는 전문 분야 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="px-5 py-3 flex items-center gap-2 overflow-x-auto border-b border-neutral-100 no-scrollbar">
        {SPECIALTY_FILTERS.map((f) => (
          <Button
            key={f}
            variant="chip"
            selected={activeSpecialty === f}
            onClick={() => setActiveSpecialty(activeSpecialty === f ? null : f)}
            className="shrink-0 whitespace-nowrap"
          >
            {f}
          </Button>
        ))}
        <div className="w-px h-6 bg-neutral-100 shrink-0" />
        {SESSION_TYPE_FILTERS.map((f) => (
          <Button
            key={f}
            variant="chip"
            selected={activeSessionType === f}
            onClick={() => setActiveSessionType(activeSessionType === f ? null : f)}
            className="shrink-0 whitespace-nowrap"
          >
            {f}
          </Button>
        ))}
        <div className="w-px h-6 bg-neutral-100 shrink-0" />
        {PRICE_FILTERS.map((f) => (
          <Button
            key={f}
            variant="chip"
            selected={activePrice === f}
            onClick={() => setActivePrice(activePrice === f ? null : f)}
            className="shrink-0 whitespace-nowrap"
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Counselor list */}
      <div className="flex flex-col gap-3 px-5 py-4">
        {filtered.length === 0 ? (
          <p className="text-center text-caption text-neutral-400 py-12">
            검색 결과가 없어요
          </p>
        ) : (
          filtered.map((c) => (
            <CounselorListCard
              key={c.id}
              {...c}
              onViewProfile={() => navigate(`/counselors/${c.id}`)}
            />
          ))
        )}
      </div>
    </div>
  )
}
