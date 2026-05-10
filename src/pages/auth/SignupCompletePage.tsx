import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

interface SignupCompletePageProps {
  message: string
  nextPath: string
}

export function SignupCompleteView({ message, nextPath }: SignupCompletePageProps) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center flex-1 px-[19px]">
        <DotLottieReact
          src="https://lottie.host/791f3c01-0156-4303-8685-1d473d82b589/sFMqgUv6Lb.json"
          autoplay
          loop={false}
          style={{ width: 148, height: 142 }}
        />
        <p className="mt-[31px] text-[14px] font-medium text-neutral-900 text-center leading-normal whitespace-pre-line">
          {message}
        </p>
      </div>

      <div className="px-[19px] pb-[34px] pt-[12px]">
        <Button
          size="lg"
          className="w-full"
          onClick={() => navigate(nextPath)}
        >
          다음
        </Button>
      </div>
    </div>
  )
}

export default function SignupCompletePage() {
  return (
    <SignupCompleteView
      message={'회원가입이 완료됐어요!\n라포와 이야기 나눠볼까요?'}
      nextPath="/dashboard"
    />
  )
}
