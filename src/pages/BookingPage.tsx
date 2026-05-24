import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/layout/PageHeader'
import { Divider } from '@/components/common/Divider'
import { DatePicker } from '@/components/booking/DatePicker'
import { TimeSlotPicker } from '@/components/booking/TimeSlotPicker'

type BookingStep = 'date' | 'time' | 'confirm'

const MOCK_COUNSELORS: Record<string, { name: string }> = {
  c001: { name: '김수연' },
  c002: { name: '박지훈' },
  c003: { name: '이미래' },
  c004: { name: '최현우' },
  c005: { name: '정소희' },
}

const AVAILABLE_SLOTS = [
  '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00',
]

function formatDate(date: Date) {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })
}

const STEP_LABELS: { id: BookingStep; label: string }[] = [
  { id: 'date', label: '날짜 선택' },
  { id: 'time', label: '시간 선택' },
  { id: 'confirm', label: '확인' },
]

export default function BookingPage() {
  const navigate = useNavigate()
  const { counselorId } = useParams<{ counselorId: string }>()
  const counselor = MOCK_COUNSELORS[counselorId ?? ''] ?? { name: '상담사' }

  const [step, setStep] = useState<BookingStep>('date')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  function handleNext() {
    if (step === 'date') setStep('time')
    else if (step === 'time') setStep('confirm')
    else {
      navigate('/sessions')
    }
  }

  function handleBack() {
    if (step === 'time') setStep('date')
    else if (step === 'confirm') setStep('time')
    else navigate(-1)
  }

  const canProceed =
    (step === 'date' && selectedDate !== null) ||
    (step === 'time' && selectedTime !== null) ||
    step === 'confirm'

  return (
    <div className="flex flex-col min-h-full">
      <PageHeader title="예약하기" onBack={handleBack} />

      {/* Step indicator */}
      <div className="px-5 py-3 flex items-center gap-2">
        {STEP_LABELS.map((s, i) => (
          <span key={s.id} className="flex items-center gap-2">
            {i > 0 && (
              <span className="text-neutral-200 text-body-md">→</span>
            )}
            <span
              className={cn(
                'text-body-md',
                step === s.id
                  ? 'text-primary-600 font-medium'
                  : STEP_LABELS.findIndex((x) => x.id === step) > i
                  ? 'text-neutral-400 line-through'
                  : 'text-neutral-400',
              )}
            >
              {s.label}
            </span>
          </span>
        ))}
      </div>

      <Divider />

      {/* Step content */}
      <div className="px-5 py-5">
        {step === 'date' && (
          <DatePicker value={selectedDate} onChange={setSelectedDate} />
        )}

        {step === 'time' && (
          <div className="flex flex-col gap-4">
            {selectedDate && (
              <p className="text-body-md font-medium text-neutral-900">
                {formatDate(selectedDate)}
              </p>
            )}
            <TimeSlotPicker
              slots={AVAILABLE_SLOTS}
              value={selectedTime}
              onChange={setSelectedTime}
            />
          </div>
        )}

        {step === 'confirm' && selectedDate && selectedTime && (
          <div className="flex flex-col gap-5">
            {/* Summary */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-body-md text-neutral-600">상담사</span>
                <span className="text-body-md font-medium text-neutral-900">
                  {counselor.name} 상담사
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center">
                <span className="text-body-md text-neutral-600">날짜</span>
                <span className="text-body-md font-medium text-neutral-900">
                  {formatDate(selectedDate)}
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center">
                <span className="text-body-md text-neutral-600">시간</span>
                <span className="text-body-md font-medium text-neutral-900">
                  {selectedTime}
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center">
                <span className="text-body-md text-neutral-600">상담 방식</span>
                <span className="text-body-md font-medium text-neutral-900">비대면</span>
              </div>
            </div>

            {/* Report attachment — always attached, no toggle */}
            <div className="border border-neutral-100 rounded-xl p-4 flex flex-col gap-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-body-md font-medium text-neutral-900">
                  사전 점검 리포트
                </span>
                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-small bg-semantic-success-bg text-semantic-success-text">
                  첨부됨
                </span>
              </div>
              <span className="text-caption text-neutral-400">2025년 5월 19일</span>
              <p className="text-caption text-neutral-400">
                라포 서비스는 리포트를 기반으로 상담사와 연결됩니다.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="mt-auto px-5 pb-3 pt-3 bg-white border-t border-neutral-100">
        <Button
          variant="primary"
          size="lg"
          className="w-full rounded-lg"
          disabled={!canProceed}
          onClick={handleNext}
        >
          {step === 'confirm' ? '예약 확정' : '다음'}
        </Button>
      </div>
    </div>
  )
}
