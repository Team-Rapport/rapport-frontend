import { useState } from 'react'
import { Badge, Button, Card, CounselorCard, Input, Modal, ReportCard } from '../components/ui'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-h2 font-bold text-neutral-900 border-b border-neutral-100 pb-3">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Row({ children, wrap = true }: { children: React.ReactNode; wrap?: boolean }) {
  return (
    <div className={`flex ${wrap ? 'flex-wrap' : ''} gap-3 items-start`}>
      {children}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-caption text-neutral-400 mb-1">{children}</p>
  )
}

export default function DesignSystem() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  const [chipSelected, setChipSelected] = useState(false)
  const [textValue, setTextValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')

  const handlePrimary = () => {
    setModalLoading(true)
    setTimeout(() => {
      setModalLoading(false)
      setModalOpen(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto flex flex-col gap-16">
        <header>
          <h1 className="text-display font-bold text-neutral-900">Rapport Design System</h1>
          <p className="text-body-lg text-neutral-600 mt-2">UI 컴포넌트 쇼케이스 — 개발용 전용 페이지</p>
        </header>

        {/* ── BUTTON ── */}
        <Section title="Button">
          <div>
            <Label>Primary — sm / md / lg</Label>
            <Row>
              <Button variant="primary" size="sm">작은 버튼</Button>
              <Button variant="primary" size="md">중간 버튼</Button>
              <Button variant="primary" size="lg">큰 버튼</Button>
            </Row>
          </div>

          <div>
            <Label>Outline</Label>
            <Row>
              <Button variant="outline" size="sm">Outline sm</Button>
              <Button variant="outline" size="md">Outline md</Button>
              <Button variant="outline" size="lg">Outline lg</Button>
            </Row>
          </div>

          <div>
            <Label>Ghost</Label>
            <Row>
              <Button variant="ghost" size="sm">Ghost sm</Button>
              <Button variant="ghost" size="md">Ghost md</Button>
              <Button variant="ghost" size="lg">Ghost lg</Button>
            </Row>
          </div>

          <div>
            <Label>Chip — 선택 토글</Label>
            <Row>
              <Button
                variant="chip"
                selected={chipSelected}
                onClick={() => setChipSelected((v) => !v)}
              >
                불안
              </Button>
              <Button variant="chip" selected>우울 (selected)</Button>
              <Button variant="chip">스트레스</Button>
              <Button variant="chip">트라우마</Button>
            </Row>
          </div>

          <div>
            <Label>Loading state</Label>
            <Row>
              <Button variant="primary" loading>저장 중</Button>
              <Button variant="outline" loading>처리 중</Button>
            </Row>
          </div>

          <div>
            <Label>With icons</Label>
            <Row>
              <Button
                variant="primary"
                leftIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                }
              >
                저장
              </Button>
              <Button
                variant="outline"
                rightIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                }
              >
                다음
              </Button>
            </Row>
          </div>

          <div>
            <Label>Disabled</Label>
            <Row>
              <Button variant="primary" disabled>비활성화</Button>
              <Button variant="outline" disabled>비활성화</Button>
            </Row>
          </div>
        </Section>

        {/* ── INPUT ── */}
        <Section title="Input">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label>기본 텍스트 + 레이블</Label>
              <Input
                label="이름"
                placeholder="이름을 입력하세요"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
              />
            </div>

            <div>
              <Label>비밀번호</Label>
              <Input
                type="password"
                label="비밀번호"
                placeholder="비밀번호를 입력하세요"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
            </div>

            <div>
              <Label>에러 상태</Label>
              <Input
                label="이메일"
                placeholder="이메일을 입력하세요"
                error="유효하지 않은 이메일 형식입니다"
                defaultValue="invalid@"
              />
            </div>

            <div>
              <Label>Helper text</Label>
              <Input
                label="닉네임"
                placeholder="닉네임을 입력하세요"
                helperText="2~10자의 한글, 영문, 숫자를 사용할 수 있습니다"
              />
            </div>

            <div>
              <Label>Left icon</Label>
              <Input
                placeholder="이메일"
                leftIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                }
              />
            </div>

            <div>
              <Label>Disabled</Label>
              <Input
                label="비활성화"
                placeholder="입력 불가"
                disabled
                defaultValue="읽기 전용 값"
              />
            </div>
          </div>

          <div>
            <Label>Textarea + charCount</Label>
            <Input
              type="textarea"
              label="주요 고민"
              placeholder="상담을 원하는 내용을 자유롭게 적어주세요..."
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              charCount={{ current: textareaValue.length, max: 300 }}
              maxLength={300}
            />
          </div>
        </Section>

        {/* ── BADGE ── */}
        <Section title="Badge">
          <div>
            <Label>Specialty (전문분야 태그)</Label>
            <Row>
              <Badge variant="specialty">불안</Badge>
              <Badge variant="specialty">우울</Badge>
              <Badge variant="specialty">트라우마</Badge>
              <Badge variant="specialty">대인관계</Badge>
              <Badge variant="specialty">자존감</Badge>
            </Row>
          </div>

          <div>
            <Label>Status (예약 상태)</Label>
            <Row>
              <Badge variant="status" status="확정">확정</Badge>
              <Badge variant="status" status="예정">예정</Badge>
              <Badge variant="status" status="취소">취소</Badge>
              <Badge variant="status" status="대기">대기</Badge>
            </Row>
          </div>

          <div>
            <Label>Score (심각도 레이블)</Label>
            <Row>
              <Badge variant="score">중간 수준의 불안감</Badge>
              <Badge variant="score">경미한 스트레스</Badge>
              <Badge variant="score">심각한 우울감</Badge>
            </Row>
          </div>
        </Section>

        {/* ── CARD ── */}
        <Section title="Card">
          <div>
            <Label>Card (기본 wrapper)</Label>
            <Card className="p-6 max-w-sm">
              <p className="text-body-md text-neutral-800">범용 카드 컴포넌트입니다. 예약 카드, 마이페이지 섹션 등에서 사용합니다.</p>
            </Card>
          </div>

          <div>
            <Label>ReportCard — 낮음(≤40) / 중간(41–60) / 높음(61+)</Label>
            <Row wrap={false} >
              <ReportCard
                date="2024.03.15"
                overallLabel="경미한 수준"
                scores={[
                  { label: '우울', value: 25 },
                  { label: '불안', value: 32 },
                  { label: '스트레스', value: 38 },
                ]}
              />
              <ReportCard
                date="2024.03.22"
                overallLabel="중간 수준"
                scores={[
                  { label: '우울', value: 48 },
                  { label: '불안', value: 55 },
                  { label: '스트레스', value: 52 },
                ]}
              />
              <ReportCard
                date="2024.03.29"
                overallLabel="심각한 수준"
                scores={[
                  { label: '우울', value: 72 },
                  { label: '불안', value: 68 },
                  { label: '스트레스', value: 80 },
                ]}
              />
            </Row>
          </div>

          <div>
            <Label>CounselorCard</Label>
            <Row>
              <CounselorCard
                name="김지수"
                specialties={['불안', '우울']}
                rating={4.8}
                reviewCount={127}
                price="60,000원/회"
                avatarUrl="https://i.pravatar.cc/150?img=47"
              />
              <CounselorCard
                name="이민준"
                specialties={['트라우마', '대인관계']}
                rating={4.6}
                reviewCount={89}
                price="50,000원/회"
              />
              <CounselorCard
                name="박서연"
                specialties={['스트레스']}
                rating={4.9}
                reviewCount={203}
                price="70,000원/회"
              />
            </Row>
          </div>
        </Section>

        {/* ── MODAL ── */}
        <Section title="Modal">
          <div>
            <Label>2버튼 모달 (모바일: bottom sheet, 데스크탑: center)</Label>
            <Row>
              <Button variant="primary" onClick={() => setModalOpen(true)}>
                모달 열기
              </Button>
            </Row>
          </div>
        </Section>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="상담 예약 확인"
        primaryLabel="예약 확정"
        secondaryLabel="취소"
        onPrimary={handlePrimary}
        onSecondary={() => setModalOpen(false)}
        loading={modalLoading}
      >
        <p>2024년 4월 5일 오후 2시에 김지수 상담사와의 온라인 상담을 예약하시겠습니까?</p>
      </Modal>
    </div>
  )
}
