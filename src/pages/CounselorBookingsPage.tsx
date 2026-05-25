import { useEffect, useMemo, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { springFetch } from '@/lib/springApi'

type BookingStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED' | string

interface CounselorBookingItem {
  bookingId: number
  clientName?: string
  status?: BookingStatus
  bookedDate?: string
  bookedStartTime?: string
  sessionTypeName?: string
  requestNote?: string
}

interface PageResponse<T> {
  content?: T[]
}

interface ApiResponse<T> {
  data?: T
}

function statusToBadge(status?: BookingStatus): '확정' | '예정' | '취소' | '대기' {
  if (status === 'PENDING') return '대기'
  if (status === 'ACCEPTED' || status === 'COMPLETED') return '확정'
  if (status === 'REJECTED' || status === 'CANCELLED') return '취소'
  return '예정'
}

function formatDateTime(bookedDate?: string, bookedStartTime?: string) {
  if (!bookedDate) return '-'
  const date = new Date(`${bookedDate}T00:00:00`)
  const weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' })
  const [year, month, day] = bookedDate.split('-')
  const datePart = `${year}.${month}.${day} ${weekday}`
  return bookedStartTime ? `${datePart} ${bookedStartTime.slice(0, 5)}` : datePart
}

export default function CounselorBookingsPage() {
  const [bookings, setBookings] = useState<CounselorBookingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [processingId, setProcessingId] = useState<number | null>(null)

  const pendingBookings = useMemo(
    () => bookings.filter((booking) => booking.status === 'PENDING'),
    [bookings],
  )

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const res = await springFetch('/api/v1/counselor/bookings?page=0&size=50')
      if (!res.ok) throw new Error('bookings fetch failed')
      const payload: ApiResponse<PageResponse<CounselorBookingItem>> = await res.json()
      setBookings(payload?.data?.content ?? [])
      setError(null)
    } catch {
      setError('예약 요청 목록을 불러오지 못했어요.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchBookings()
  }, [])

  const handleAction = async (bookingId: number, action: 'accept' | 'reject') => {
    if (processingId != null) return
    setProcessingId(bookingId)
    try {
      const res = await springFetch(`/api/v1/counselor/bookings/${bookingId}/${action}`, {
        method: 'POST',
      })
      if (!res.ok) throw new Error('action failed')
      await fetchBookings()
    } catch {
      setError(action === 'accept' ? '예약 수락에 실패했어요.' : '예약 거절에 실패했어요.')
    } finally {
      setProcessingId(null)
    }
  }

  return (
    <div className="min-h-full bg-neutral-50 p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">예약 요청 관리</h1>
            <p className="text-sm text-neutral-500 mt-1">대기 중인 예약을 우선 처리해 주세요.</p>
          </div>
          <span className="text-sm px-3 py-1 rounded-full bg-semantic-warning-bg text-semantic-warning-text">
            대기 {pendingBookings.length}건
          </span>
        </div>

        {loading && <p className="text-sm text-neutral-500">불러오는 중...</p>}
        {error && <p className="text-sm text-semantic-error-text">{error}</p>}

        <div className="rounded-xl bg-white border border-neutral-100 divide-y divide-neutral-100">
          {!loading && bookings.length === 0 ? (
            <p className="py-12 text-center text-sm text-neutral-500">예약 요청이 없어요.</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking.bookingId} className="p-4 md:p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-neutral-900">{booking.clientName ?? '내담자'}</p>
                    <p className="text-sm text-neutral-600 mt-1">{formatDateTime(booking.bookedDate, booking.bookedStartTime)}</p>
                    {booking.sessionTypeName && (
                      <p className="text-xs text-neutral-500 mt-1">세션: {booking.sessionTypeName}</p>
                    )}
                  </div>
                  <Badge variant="status" status={statusToBadge(booking.status)}>
                    {statusToBadge(booking.status)}
                  </Badge>
                </div>

                {booking.requestNote && (
                  <div className="rounded-lg bg-neutral-50 p-3 text-sm text-neutral-700">
                    요청 메모: {booking.requestNote}
                  </div>
                )}

                {booking.status === 'PENDING' && (
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => handleAction(booking.bookingId, 'reject')}
                      disabled={processingId === booking.bookingId}
                      className="h-9 px-4 rounded-lg border border-semantic-error-text text-semantic-error-text text-sm disabled:opacity-50"
                    >
                      거절
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(booking.bookingId, 'accept')}
                      disabled={processingId === booking.bookingId}
                      className="h-9 px-4 rounded-lg bg-primary-600 text-white text-sm disabled:opacity-50"
                    >
                      수락
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
