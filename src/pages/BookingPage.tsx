import { useParams } from 'react-router-dom'

export default function BookingPage() {
  const { counselorId } = useParams()
  return (
    <div className="p-4">
      <h1 className="text-h1-mobile font-bold text-neutral-900">예약</h1>
      {counselorId && <p className="text-body-md text-neutral-600 mt-1">상담사 ID: {counselorId}</p>}
    </div>
  )
}
