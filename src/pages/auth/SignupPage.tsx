import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

// 이름: 한글/영문만 허용, 특수문자·초성 금지
const NAME_REGEX = /^[가-힣a-zA-Z\s]+$/
// 전화번호: 010-XXXX-XXXX 형태
const PHONE_REGEX = /^01[0-9]-\d{3,4}-\d{4}$/

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

interface TopNavBarProps {
  title: string
  onBack: () => void
}

function TopNavBar({ title, onBack }: TopNavBarProps) {
  return (
    <div className="w-full h-[42px] flex items-center relative">
      <button
        type="button"
        onClick={onBack}
        className="absolute left-0 flex items-center gap-1 h-full px-2 text-neutral-900 hover:text-neutral-600 transition-colors"
        aria-label="뒤로가기"
      >
        <ChevronLeft size={20} strokeWidth={2} />
      </button>
      <span className="w-full text-center text-[17px] font-bold text-neutral-900 tracking-[-0.408px]">
        {title}
      </span>
    </div>
  )
}

export default function SignupPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [nameTouched, setNameTouched] = useState(false)
  const [phoneTouched, setPhoneTouched] = useState(false)

  const nameError = nameTouched && name.length > 0 && !NAME_REGEX.test(name)
    ? '이름에 특수문자나 초성은 입력할 수 없어요.'
    : undefined

  const phoneError = phoneTouched && phone.length > 0 && !PHONE_REGEX.test(phone)
    ? '올바른 전화번호 형식으로 입력해 주세요. (예: 010-1234-5678)'
    : undefined

  const isValid =
    name.trim().length > 0 &&
    NAME_REGEX.test(name) &&
    PHONE_REGEX.test(phone)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    // TODO: API 연동 후 실제 회원가입 처리
    navigate('/signup-complete')
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* 네비게이션 바 */}
      <div className="px-[16px] pt-[8px]">
        <TopNavBar title="회원가입" onBack={() => navigate(-1)} />
      </div>

      {/* 폼 */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-1 px-[29px] pt-[90px] pb-[100px] gap-[48px]"
        noValidate
      >
        {/* 이름 */}
        <Input
          id="name"
          label="이름"
          type="text"
          placeholder="이름"
          value={name}
          onChange={handleNameChange}
          onBlur={() => setNameTouched(true)}
          error={nameError}
          autoComplete="name"
          inputMode="text"
        />

        {/* 전화번호 */}
        <Input
          id="phone"
          label="전화번호"
          type="text"
          placeholder="전화번호"
          value={phone}
          onChange={handlePhoneChange}
          onBlur={() => setPhoneTouched(true)}
          error={phoneError}
          autoComplete="tel"
          inputMode="tel"
        />
      </form>

      {/* 하단 고정 완료 버튼 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[402px] px-[19px] pb-[34px] pt-[12px] bg-white">
        <Button
          type="submit"
          size="lg"
          className={cn('w-full', !isValid && 'opacity-40 pointer-events-none')}
          disabled={!isValid}
          onClick={handleSubmit}
        >
          완료
        </Button>
      </div>
    </div>
  )
}
