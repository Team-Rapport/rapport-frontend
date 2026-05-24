import { cn } from '../../lib/utils'

interface TimeSlotPickerProps {
  slots: string[]
  value: string | null
  onChange: (slot: string) => void
}

export function TimeSlotPicker({ slots, value, onChange }: TimeSlotPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {slots.map((slot) => {
        const isSelected = slot === value
        return (
          <button
            key={slot}
            type="button"
            onClick={() => onChange(slot)}
            className={cn(
              'border rounded-full px-4 py-2 text-body-md transition-colors',
              isSelected
                ? 'border-primary-600 bg-primary-50 text-primary-600'
                : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50',
            )}
            aria-pressed={isSelected}
          >
            {slot}
          </button>
        )
      })}
    </div>
  )
}
