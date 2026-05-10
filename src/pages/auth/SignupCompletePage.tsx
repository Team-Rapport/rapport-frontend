import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export default function SignupCompletePage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* 중앙 콘텐츠 */}
      <div className="flex flex-col items-center justify-center flex-1 px-[19px]">
        {/* 로띠 애니메이션 */}
        <DotLottieReact
          src="https://lottie.host/791f3c01-0156-4303-8685-1d473d82b589/sFMqgUv6Lb.json"
          autoplay
          loop={false}
          style={{ width: 148, height: 142 }}
        />

        {/* 안내 문구 */}
        <p className="mt-[31px] text-[14px] font-medium text-neutral-900 text-center leading-normal">
          회원가입이 완료됐어요!<br />
          라포와 이야기 나눠볼까요?
        </p>
      </div>

      {/* 하단 고정 다음 버튼 */}
      <div className="px-[19px] pb-[34px] pt-[12px]">
        <Button
          size="lg"
          className="w-full"
          onClick={() => navigate('/dashboard')}
        >
          다음
        </Button>
      </div>
    </div>
  )
}
