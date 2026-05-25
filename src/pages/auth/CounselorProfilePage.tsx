import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera } from 'lucide-react'
import { TopNavBar } from '@/components/ui/TopNavBar'
import { Button } from '@/components/ui/Button'
import { springFetch } from '@/lib/springApi'
import { useAuthStore } from '@/store/authStore'

type Gender = 'FEMALE' | 'MALE'
type Approach = 'MEETING' | 'CALL'
type GenderLabel = '여성' | '남성'
type ApproachLabel = '오프라인' | '전화 상담'

const SITUATIONS = [
  '대인관계', '자아/성격', '취업/진로', '가족', '정신건강',
  '연애', '육아/출산', '따돌림', '직장', '부부관계',
] as const

type ApiResponse<T> = {
  data?: T
}

interface CounselorProfileResponse {
  counselorGender?: Gender
  bio?: string
  specializations?: string[]
  approaches?: Approach[]
  experienceYears?: number
  officeAddress?: string
  licenseType?: string
  licenseNumber?: string
  profileCompleted?: boolean
  requiredMissingFields?: string[]
}

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

const REQUIRED_FIELD_LABELS: Record<string, string> = {
  counselorGender: '성별',
  bio: '자기소개',
  specializations: '전문 분야',
  approaches: '상담 방식',
  experienceYears: '경력 연수',
  officeAddress: '상담실 주소',
}

export default function CounselorProfilePage() {
  const navigate = useNavigate()
  const imageRef = useRef<HTMLInputElement>(null)
  const user = useAuthStore((s) => s.user)

  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [gender, setGender] = useState<GenderLabel[]>([])
  const [approaches, setApproaches] = useState<ApproachLabel[]>([])
  const [specializations, setSpecializations] = useState<string[]>([])
  const [bio, setBio] = useState('')
  const [experienceYears, setExperienceYears] = useState('')
  const [officeAddress, setOfficeAddress] = useState('')
  const [licenseType, setLicenseType] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')

  const [profileCompleted, setProfileCompleted] = useState<boolean | null>(null)
  const [requiredMissingFields, setRequiredMissingFields] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | undefined>()

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      try {
        const res = await springFetch('/api/v1/counselor/profile')
        if (!res.ok) throw new Error('profile fetch failed')
        const payload: ApiResponse<CounselorProfileResponse> = await res.json()
        const profile = payload?.data
        if (!profile) return

        setGender(
          profile.counselorGender
            ? [profile.counselorGender === 'FEMALE' ? '여성' : '남성']
            : [],
        )
        setApproaches((profile.approaches ?? []).map((v) => (v === 'MEETING' ? '오프라인' : '전화 상담')))
        setSpecializations(profile.specializations ?? [])
        setBio(profile.bio ?? '')
        setExperienceYears(profile.experienceYears != null ? String(profile.experienceYears) : '')
        setOfficeAddress(profile.officeAddress ?? '')
        setLicenseType(profile.licenseType ?? '')
        setLicenseNumber(profile.licenseNumber ?? '')
        setProfileCompleted(profile.profileCompleted ?? null)
        setRequiredMissingFields(profile.requiredMissingFields ?? [])
      } catch {
        // Keep empty form as fallback when initial profile is unavailable.
      } finally {
        setLoading(false)
      }
    }
    void run()
  }, [])

  const missingFieldText = useMemo(() => {
    if (requiredMissingFields.length === 0) return null
    return requiredMissingFields
      .map((field) => REQUIRED_FIELD_LABELS[field] ?? field)
      .join(', ')
  }, [requiredMissingFields])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setProfileImage(url)
    e.target.value = ''
  }

  const isValid =
    gender.length > 0 &&
    approaches.length > 0 &&
    specializations.length > 0 &&
    bio.trim().length > 0 &&
    experienceYears.trim().length > 0 &&
    officeAddress.trim().length > 0

  const handleSubmit = async () => {
    if (!isValid || submitting) return
    setSubmitting(true)
    setSubmitError(undefined)
    try {
      const years = Number(experienceYears)
      const payload = {
        counselorGender: gender[0] === '여성' ? 'FEMALE' : 'MALE',
        bio: bio.trim(),
        specializations,
        approaches: approaches.map((v) => (v === '오프라인' ? 'MEETING' : 'CALL')),
        experienceYears: Number.isFinite(years) ? years : 0,
        officeAddress: officeAddress.trim(),
        licenseType: licenseType.trim() || undefined,
        licenseNumber: licenseNumber.trim() || undefined,
      }

      const res = await springFetch('/api/v1/counselor/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('profile update failed')

      const updated: ApiResponse<CounselorProfileResponse> = await res.json().catch(() => ({}))
      setProfileCompleted(updated?.data?.profileCompleted ?? null)
      setRequiredMissingFields(updated?.data?.requiredMissingFields ?? [])
      navigate('/counselor/dashboard')
    } catch {
      setSubmitError('프로필 저장에 실패했어요.')
    } finally {
      setSubmitting(false)
    }
  }

  const name = user?.name ? `${user.name} 상담사` : '상담사'

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex justify-center">
        <div className="w-full max-w-[402px] p-6 text-sm text-neutral-500">프로필 정보를 불러오는 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="flex flex-col w-full max-w-[402px] min-h-screen">
        <div className="px-[16px] pt-[8px]">
          <TopNavBar title="프로필 등록" />
        </div>

        <div className="flex flex-col flex-1 pb-[140px]">
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

        <div className="px-[24px] pt-[12px] pb-[20px]">
          <InfoCard>
            사용자들에게 보여질 프로필 이미지를 첨부해주세요. 깔끔하고 단정한 프로필을 권장드려요.
          </InfoCard>
          {profileCompleted === false && missingFieldText && (
            <p className="mt-2 text-caption text-semantic-warning-text">미완료 항목: {missingFieldText}</p>
          )}
        </div>

        <div className="h-[4px] bg-neutral-100 w-full" />

        <div className="flex flex-col gap-[20px] px-[24px] py-[20px]">
          <div className="flex flex-col gap-[10px]">
            <p className="text-[14px] font-bold text-neutral-900">성별</p>
            <ChipGroup<GenderLabel>
              options={['여성', '남성']}
              selected={gender}
              onChange={(v) => setGender(v as GenderLabel[])}
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            <p className="text-[14px] font-bold text-neutral-900">상담 방식</p>
            <ChipGroup<ApproachLabel>
              options={['오프라인', '전화 상담']}
              selected={approaches}
              multi
              onChange={(v) => setApproaches(v as ApproachLabel[])}
            />
          </div>
        </div>

        <div className="h-[4px] bg-neutral-100 w-full" />

        <div className="flex flex-col gap-[20px] px-[24px] py-[20px]">
          <InfoCard>상담사님의 전문 상담 분야를 모두 선택해주세요.</InfoCard>

          <div className="flex flex-col gap-[10px]">
            <p className="text-[14px] font-bold text-neutral-900">전문 분야</p>
            <ChipGroup<string>
              options={SITUATIONS}
              selected={specializations}
              multi
              onChange={setSpecializations}
            />
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-bold text-neutral-900">자기소개</span>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full rounded-[8px] border border-neutral-200 p-3 text-body-md focus:outline-none focus:border-primary-400"
              placeholder="상담 철학과 강점을 작성해 주세요."
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-bold text-neutral-900">경력 연수</span>
            <input
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value.replace(/\D/g, '').slice(0, 2))}
              className="w-full h-12 rounded-[8px] border border-neutral-200 px-3 text-body-md focus:outline-none focus:border-primary-400"
              placeholder="예: 7"
              inputMode="numeric"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-bold text-neutral-900">상담실 주소</span>
            <input
              value={officeAddress}
              onChange={(e) => setOfficeAddress(e.target.value)}
              className="w-full h-12 rounded-[8px] border border-neutral-200 px-3 text-body-md focus:outline-none focus:border-primary-400"
              placeholder="예: 서울시 강남구 ..."
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-bold text-neutral-900">자격증 종류 (선택)</span>
            <input
              value={licenseType}
              onChange={(e) => setLicenseType(e.target.value)}
              className="w-full h-12 rounded-[8px] border border-neutral-200 px-3 text-body-md focus:outline-none focus:border-primary-400"
              placeholder="예: 임상심리사"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-bold text-neutral-900">자격증 번호 (선택)</span>
            <input
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              className="w-full h-12 rounded-[8px] border border-neutral-200 px-3 text-body-md focus:outline-none focus:border-primary-400"
              placeholder="예: 2026-12345"
            />
          </label>
        </div>

        {submitError && <p className="px-[24px] text-caption text-semantic-error-text">{submitError}</p>}
        </div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[402px] px-[19px] pb-[34px] pt-[12px] bg-white border-t border-neutral-100">
          <Button
            type="button"
            size="lg"
            className="w-full"
            disabled={!isValid || submitting}
            onClick={handleSubmit}
          >
            {submitting ? '저장 중...' : '확인'}
          </Button>
        </div>
      </div>
    </div>
  )
}
