import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChatProgressBar } from '@/components/chat/ChatProgressBar'
import { ChatBubble } from '@/components/chat/ChatBubble'
import { ChatComposer } from '@/components/chat/ChatComposer'
import { ChatCompletionModal } from '@/components/chat/ChatCompletionModal'

type Message = {
  id: string
  role: 'bot' | 'user'
  text: string
}

const TOTAL_STEP = 10
const BOT_REPLIES = [
  '보통 어떤 생각을 하느라 잠을 설치게 되는 것 같아요?',
  '그럴 때 몸에서 느껴지는 변화도 있나요?',
  '요즘 일상에서 가장 버거운 순간은 언제인가요?',
]

const INITIAL_MESSAGES: Message[] = [
  { id: 'bot-0', role: 'bot', text: '안녕하세요, 서영님! 요즘 고민되는 일 있어요?' },
]

export default function ChatPage() {
  const navigate = useNavigate()
  const { sessionId } = useParams()

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [step, setStep] = useState(0)
  const [showCompletion, setShowCompletion] = useState(false)

  const title = useMemo(
    () => (step < 3 ? '지금 느끼는 감정을 편하게 알려주세요' : '지금 느끼는 마음을 편하게 알려주세요'),
    [step],
  )

  const disabledInput = showCompletion || step >= TOTAL_STEP

  function handleSend() {
    const trimmed = input.trim()
    if (!trimmed || disabledInput) return

    const nextStep = Math.min(step + 1, TOTAL_STEP)
    const nextMessages: Message[] = [
      ...messages,
      { id: `user-${Date.now()}`, role: 'user', text: trimmed },
    ]

    if (nextStep < TOTAL_STEP) {
      const reply = BOT_REPLIES[(nextStep - 1) % BOT_REPLIES.length]
      nextMessages.push({ id: `bot-${Date.now() + 1}`, role: 'bot', text: reply })
    }

    setMessages(nextMessages)
    setInput('')
    setStep(nextStep)

    if (nextStep === TOTAL_STEP) {
      setShowCompletion(true)
    }
  }

  return (
    <div className="relative flex flex-col min-h-full bg-neutral-50">
      <div className="sticky top-0 z-10 px-4 pt-4 pb-3 bg-neutral-50">
        <div className="mb-3">
          <ChatProgressBar current={step} total={TOTAL_STEP} />
        </div>
        {step <= 4 && (
          <p className="text-center text-primary-400 text-body-md font-medium">{title}</p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="flex flex-col gap-7">
          {messages.map((message) => (
            <ChatBubble key={message.id} role={message.role} message={message.text} />
          ))}
        </div>
      </div>

      <div className="px-4 pt-2 pb-4 bg-neutral-50">
        <ChatComposer
          value={input}
          disabled={disabledInput}
          placeholder={disabledInput ? '' : '마음 속 이야기를 들려주세요'}
          onChange={setInput}
          onSend={handleSend}
        />
        {sessionId && <p className="sr-only">세션: {sessionId}</p>}
      </div>

      <ChatCompletionModal
        open={showCompletion}
        onConfirm={() => navigate('/report/latest')}
      />
    </div>
  )
}
