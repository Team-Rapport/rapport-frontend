import { useParams } from 'react-router-dom'

export default function ChatPage() {
  const { sessionId } = useParams()
  return (
    <div className="p-4">
      <h1 className="text-h1-mobile font-bold text-neutral-900">채팅</h1>
      {sessionId && <p className="text-body-md text-neutral-600 mt-1">세션: {sessionId}</p>}
    </div>
  )
}
