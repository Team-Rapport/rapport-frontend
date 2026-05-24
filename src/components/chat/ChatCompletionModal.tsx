import { Button } from '@/components/ui/Button'

interface ChatCompletionModalProps {
  open: boolean
  onConfirm: () => void
}

export function ChatCompletionModal({ open, onConfirm }: ChatCompletionModalProps) {
  if (!open) return null

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-neutral-900/35 backdrop-blur-[1px] px-6">
      <div className="w-full max-w-[322px] rounded-md bg-white p-5 shadow-lg">
        <p className="text-center text-h3-mobile font-medium text-neutral-900">
          지금 나의 마음 상태를 확인해볼까요?
        </p>
        <Button
          size="lg"
          className="w-full mt-5 rounded-sm"
          onClick={onConfirm}
        >
          리포트 확인하기
        </Button>
      </div>
    </div>
  )
}

