import { Button } from '@/components/ui/Button'
import { EmotionScoreCard } from '@/components/report/EmotionScoreCard'
import { CounselorRecommendCard } from '@/components/report/CounselorRecommendCard'

const EMOTIONS = [
  {
    label: '우울감',
    score: 73,
    levelText: '다소 높은 편',
    levelColorClass: 'text-semantic-info-text',
    barColorClass: 'bg-semantic-info-text',
  },
  {
    label: '불안감',
    score: 54,
    levelText: '보통 수준',
    levelColorClass: 'text-accent-800',
    barColorClass: 'bg-accent-800',
  },
  {
    label: '스트레스',
    score: 25,
    levelText: '낮은 편',
    levelColorClass: 'text-semantic-error-text',
    barColorClass: 'bg-semantic-error-text',
  },
]

const MAIN_TOPICS = ['수면', '일상 피로', '대인관계']

const RECOMMENDED_COUNSELORS = [
  {
    name: '김서연',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
    specialties: ['수면장애', '불안'],
  },
  {
    name: '박준혁',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    specialties: ['불안', '우울'],
  },
  {
    name: '이도윤',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop',
    specialties: ['대인관계', '스트레스'],
  },
]

export default function ReportPage() {
  return (
    <div className="min-h-full bg-neutral-50 pb-10">
      <div className="px-5 pt-4">
        <div className="rounded-sm border border-primary-200 bg-primary-50 px-4 py-4">
          <p className="text-h4-mobile font-bold text-neutral-900">오늘 대화를 마쳤어요</p>
          <p className="text-body-md text-neutral-800 mt-1">
            대화를 바탕으로 정리한 마음 상태 요약 리포트예요!
          </p>
        </div>
      </div>

      <section className="px-5 mt-6">
        <h2 className="text-h2-mobile font-bold text-neutral-900">지금 내가 느끼고 있는 감정들</h2>
        <div className="mt-3 flex flex-col gap-3">
          {EMOTIONS.map((emotion) => (
            <EmotionScoreCard key={emotion.label} {...emotion} />
          ))}
        </div>
      </section>

      <section className="px-5 mt-6">
        <h2 className="text-h2-mobile font-bold text-neutral-900">주로 이야기한 주제</h2>
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {MAIN_TOPICS.map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center rounded-full bg-primary-100 text-primary-600 text-small px-3 py-1"
            >
              {topic}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="px-5 text-h2-mobile font-bold text-neutral-900">
          함께하면 좋을 전문 분야의 상담사
        </h2>
        <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2">
          {RECOMMENDED_COUNSELORS.map((counselor) => (
            <CounselorRecommendCard key={counselor.name} {...counselor} />
          ))}
        </div>
      </section>

      <div className="px-5 mt-8">
        <Button size="lg" className="w-full rounded-sm">
          상담사 둘러보기
        </Button>
      </div>
    </div>
  )
}
