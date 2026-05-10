import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import logo from '@/assets/logo.svg'

type StepStatus = 'done' | 'active' | 'upcoming'

interface Step {
  label: string
  status: StepStatus
}

const STEPS: Step[] = [
  { label: '회원가입 완료', status: 'done' },
  { label: '자격 증명 제출', status: 'done' },
  { label: '심사 대기 중', status: 'active' },
]

function StepIndicator({ steps }: { steps: Step[] }) {
  return (
    <div className="flex flex-col">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-start gap-[16px]">
          {/* 아이콘 + 연결선 */}
          <div className="flex flex-col items-center">
            {/* 아이콘 */}
            <div
              className={
                step.status === 'done'
                  ? 'w-[22px] h-[22px] rounded-full bg-primary-600 flex items-center justify-center shrink-0'
                  : step.status === 'active'
                  ? 'w-[22px] h-[22px] rounded-full border-[3px] border-primary-600 bg-white flex items-center justify-center shrink-0'
                  : 'w-[22px] h-[22px] rounded-full border-2 border-neutral-200 bg-white shrink-0'
              }
            >
              {step.status === 'done' && (
                <Check size={12} strokeWidth={3} className="text-white" />
              )}
              {step.status === 'active' && (
                <div className="w-[8px] h-[8px] rounded-full bg-primary-600" />
              )}
            </div>

            {/* 연결선 */}
            {i < steps.length - 1 && (
              <div className="w-[2px] h-[36px] bg-primary-100 my-[2px]" />
            )}
          </div>

          {/* 라벨 */}
          <div className="pt-[1px] pb-[36px] last:pb-0">
            <span
              className={
                step.status === 'active'
                  ? 'text-[14px] font-bold text-primary-600'
                  : step.status === 'done'
                  ? 'text-[14px] font-medium text-primary-900'
                  : 'text-[14px] font-medium text-neutral-400'
              }
            >
              {step.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function CounselorPendingPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col w-full min-h-screen bg-white px-[36px]">
      {/* 상단 로고 영역 */}
      <div className="flex flex-col items-center pt-[80px]">
        <img
          src={logo}
          alt="rapport 로고"
          className="w-[120px] h-[120px] object-contain"
        />
        <p
          className="text-[28px] leading-none text-primary-900 mt-[12px]"
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
        >
          rapport
        </p>
      </div>

      {/* 진행 단계 */}
      <div className="flex justify-center mt-[64px]">
        <StepIndicator steps={STEPS} />
      </div>

      {/* 안내 카드 */}
      <div className="mt-[48px] bg-primary-50 rounded-[12px] px-[20px] py-[18px] flex flex-col gap-[6px]">
        <p className="text-[14px] font-bold text-primary-900">서류를 검토하고 있어요</p>
        <p className="text-[13px] text-primary-800 leading-[1.6]">
          보통 2~3 영업일이 소요돼요.{'\n'}
          심사가 완료되면 이메일로 알려드릴게요.
        </p>
      </div>

      {/* 하단 링크 */}
      <div className="flex justify-center mt-auto pb-[48px] pt-[32px]">
        <button
          type="button"
          onClick={() => navigate('/counselor-login')}
          className="text-[13px] text-neutral-400 hover:underline"
        >
          로그인 화면으로 돌아가기
        </button>
      </div>
    </div>
  )
}
