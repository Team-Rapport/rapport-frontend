import { useParams } from 'react-router-dom'

export default function CounselorDetailPage() {
  const { id } = useParams()
  return (
    <div className="p-4">
      <h1 className="text-h1-mobile font-bold text-neutral-900">상담사 상세</h1>
      {id && <p className="text-body-md text-neutral-600 mt-1">ID: {id}</p>}
    </div>
  )
}
