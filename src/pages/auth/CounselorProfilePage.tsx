import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera } from 'lucide-react'
import { TopNavBar } from '@/components/ui/TopNavBar'
import { Button } from '@/components/ui/Button'

type Gender = '여성' | '남성'
type ConsultType = '오프라인' | '전화 상담'

const SITUATIONS = [
  '대인관계', '자아/성격', '취업/진로', '가족', '정신건강',
  '연애', '육아/출산', '따돌림', '직장', '부부관계',
] as const
type Situation = (typeof SITUATIONS)[number]

const SYMPTOMS = [
  '우울', '스트레스', '불안', '불면', '공황', 'PTSD', '콤플렉스',
  '자해', '분노조절', '조현병', '조울증', '중독', 'ADHD', '대인기피',
  '가스라이팅', '번아웃', '외로움',
] as const
type Symptom = (typeof SYMPTOMS)[number]

function ChipGroup<T extends string>({
  options,
  selected,
  multi = false,
  onChange,
}: {
  options: readonly T[]
  selected: T[]
  multi?: boolean
  onChange: (next: T[]) => void
}) {
  const toggle = (item: T) => {
    if (multi) {
      onChange(selected.includes(item) ? selected.filter((s) => s !== item) : [...selected, item])
    } else {
      onChange(selected[0] === item ? [] : [item])
    }
  }

  return (
    <div className="flex flex-wrap gap-[8px]">
      {options.map((opt) => {
        const active = selected.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={
              active
                ? 'h-9 px-4 rounded-full border text-[13px] font-medium bg-[#e6f4ea] border-primary-600 text-primary-600 transition-colors'
                : 'h-9 px-4 rounded-full border text-[13px] font-medium bg-neutral-100 border-neutral-100 text-neutral-600 transition-colors'
            }
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-50 rounded-[8px] px-[16px] py-[12px]">
      <p className="text-[13px] leading-[1.6] text-semantic-info-text">{children}</p>
    </div>
  )
}

export default function CounselorProfilePage() {
  const navigate = useNavigate()
  const imageRef = useRef<HTMLInputElement>(null)

  const [profileImage, setProfileImage] = useState<string | null>(null)
  // 실제로는 회원가입 시 입력한 이름 + "상담사"로 서버에서 받아와야 함
  const name = '김라포 상담사'
  const [gender, setGender] = useState<Gender[]>([])
  const [consultTypes, setConsultTypes] = useState<ConsultType[]>([])
  const [situations, setSituations] = useState<Situation[]>([])
  const [symptoms, setSymptoms] = useState<Symptom[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setProfileImage(url)
    e.target.value = ''
  }

  const isValid =
    gender.length > 0 &&
    consultTypes.length > 0 &&
    situations.length > 0 &&
    symptoms.length > 0

  const handleSubmit = () => {
    if (!isValid) return
    // TODO: API 연동 — 프로필 저장
    navigate('/dashboard')
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <div className="px-[16px] pt-[8px]">
        <TopNavBar title="프로필 등록" />
      </div>

      <div className="flex flex-col flex-1 pb-[120px]">
        {/* 프로필 이미지 + 이름 */}
        <div className="flex gap-[16px] px-[24px] pt-[20px]">
          <button
            type="button"
            onClick={() => imageRef.current?.click()}
            className="relative w-[107px] h-[143px] rounded-[8px] bg-neutral-100 flex items-center justify-center overflow-hidden shrink-0"
            aria-label="프로필 이미지 선택"
          >
            {profileImage ? (
              <img src={profileImage} alt="프로필" className="w-full h-full object-cover" />
            ) : (
              <Camera size={28} className="text-neutral-400" />
            )}
          </button>
          <input
            ref={imageRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            className="hidden"
            onChange={handleImageChange}
          />

          <div className="flex flex-col gap-[6px] flex-1 pt-[2px]">
            <label className="text-[13px] font-medium text-neutral-700">이름</label>
            <input
              type="text"
              value={name}
              readOnly
              className="w-full h-12 px-[15px] bg-neutral-50 border border-neutral-100 rounded-[6px] text-[13px] text-neutral-400 cursor-default focus:outline-none"
            />
          </div>
        </div>

        {/* 안내 카드 — 전체 너비 */}
        <div className="px-[24px] pt-[12px] pb-[20px]">
          <InfoCard>
            사용자들에게 보여질 프로필 이미지를 첨부해주세요. 깔끔하고 단정한 프로필을 권장드려요.
          </InfoCard>
        </div>

        <div className="h-[4px] bg-neutral-100 w-full" />

        {/* 성별 + 상담 방식 */}
        <div className="flex flex-col gap-[20px] px-[24px] py-[20px]">
          <div className="flex flex-col gap-[10px]">
            <p className="text-[14px] font-bold text-neutral-900">성별</p>
            <ChipGroup<Gender>
              options={['여성', '남성']}
              selected={gender}
              onChange={(v) => setGender(v as Gender[])}
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            <p className="text-[14px] font-bold text-neutral-900">상담 방식</p>
            <ChipGroup<ConsultType>
              options={['오프라인', '전화 상담']}
              selected={consultTypes}
              multi
              onChange={(v) => setConsultTypes(v as ConsultType[])}
            />
          </div>
        </div>

        <div className="h-[4px] bg-neutral-100 w-full" />

        {/* 상담 분야 */}
        <div className="flex flex-col gap-[20px] px-[24px] py-[20px]">
          <InfoCard>상담사님의 전문 상담 분야를 모두 선택해주세요.</InfoCard>

          <div className="flex flex-col gap-[10px]">
            <p className="text-[14px] font-bold text-neutral-900">상황</p>
            <ChipGroup<Situation>
              options={SITUATIONS}
              selected={situations}
              multi
              onChange={(v) => setSituations(v as Situation[])}
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            <p className="text-[14px] font-bold text-neutral-900">증상</p>
            <ChipGroup<Symptom>
              options={SYMPTOMS}
              selected={symptoms}
              multi
              onChange={(v) => setSymptoms(v as Symptom[])}
            />
          </div>
        </div>
      </div>

      {/* 하단 고정 확인 버튼 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[402px] px-[19px] pb-[34px] pt-[12px] bg-white">
        <Button
          type="button"
          size="lg"
          className="w-full"
          disabled={!isValid}
          onClick={handleSubmit}
        >
          확인
        </Button>
      </div>
    </div>
  )
}
