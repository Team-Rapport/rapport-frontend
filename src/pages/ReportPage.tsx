import { useParams } from 'react-router-dom'

export default function ReportPage() {
  const { reportId } = useParams()
  return (
    <div className="p-4">
      <h1 className="text-h1-mobile font-bold text-neutral-900">리포트</h1>
      {reportId && <p className="text-body-md text-neutral-600 mt-1">ID: {reportId}</p>}
    </div>
  )
}
