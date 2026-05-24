import { SendHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatComposerProps {
  value: string
  placeholder?: string
  disabled?: boolean
  onChange: (value: string) => void
  onSend: () => void
}

export function ChatComposer({
  value,
  placeholder,
  disabled = false,
  onChange,
  onSend,
}: ChatComposerProps) {
  const canSend = !disabled && value.trim().length > 0

  return (
    <div className="flex items-center gap-2">
      <div className="h-12 flex-1 rounded-full bg-neutral-200 px-4 flex items-center">
        <input
          type="text"
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && canSend) onSend()
          }}
          className={cn(
            'w-full bg-transparent border-none outline-none text-body-md',
            disabled ? 'text-neutral-400' : 'text-neutral-900',
            'placeholder:text-neutral-400',
          )}
        />
      </div>

      <button
        type="button"
        onClick={onSend}
        disabled={!canSend}
        className={cn(
          'h-10 w-10 rounded-full flex items-center justify-center transition-colors',
          canSend
            ? 'bg-primary-100 text-primary-600'
            : 'bg-neutral-200 text-neutral-400',
        )}
        aria-label="메시지 전송"
      >
        <SendHorizontal size={20} />
      </button>
    </div>
  )
}

