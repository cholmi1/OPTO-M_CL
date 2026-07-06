import { useState } from 'react'
import { GlassCard } from '../components/ui/GlassCard'
import { iopStatus } from '../components/ui/IopGauge'
import { ArrowLeft, TrendingUp } from 'lucide-react'

export default function HistoryScreen({ onNavigate, records, onSelectRecord }) {
  const [selectedEye, setSelectedEye] = useState('right')

  const filteredRecords = records.filter(r => r.eye === selectedEye)

  const averageValue = filteredRecords.length > 0
    ? (filteredRecords.reduce((sum, r) => sum + r.value, 0) / filteredRecords.length).toFixed(1)
    : '0.0'

  return (
    <div className="flex flex-col h-full text-ink">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <button
          className="p-2 bg-surface hover:bg-teal-soft rounded-full border border-line cursor-pointer"
          onClick={() => onNavigate('menu')}
        >
          <ArrowLeft size={18} className="text-ink-2" />
        </button>
        <h2 className="text-lg font-extrabold tracking-tight">안압 기록</h2>

        <div className="flex bg-surface p-0.5 rounded-lg border border-line text-[10px]">
          <button
            className={`px-3 py-1 rounded-md font-bold cursor-pointer transition-colors ${
              selectedEye === 'left' ? 'bg-teal text-white' : 'text-ink-3'
            }`}
            onClick={() => setSelectedEye('left')}
          >
            좌 OS
          </button>
          <button
            className={`px-3 py-1 rounded-md font-bold cursor-pointer transition-colors ${
              selectedEye === 'right' ? 'bg-violet text-white' : 'text-ink-3'
            }`}
            onClick={() => setSelectedEye('right')}
          >
            우 OD
          </button>
        </div>
      </div>

      {/* 리스트 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2.5 mb-4 pr-0.5">
        <p className="text-[10px] text-ink-3 mb-1 px-1">* 항목을 터치하면 수정·삭제 팝업이 열립니다.</p>
        {filteredRecords.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-16 text-ink-3 gap-2">
            <span className="text-sm font-medium">아직 측정 기록이 없습니다</span>
            <span className="text-xs">기기연결 화면에서 첫 측정을 시작해 보세요</span>
          </div>
        ) : (
          filteredRecords.map(r => {
            const st = iopStatus(r.value)
            return (
              <GlassCard
                key={r.id}
                className="flex justify-between items-center py-3.5 px-4 cursor-pointer hover:border-teal active:scale-[0.99] transition-all"
                onClick={() => onSelectRecord(r)}
              >
                <div className="flex items-center gap-3">
                  {/* 상태 인디케이터 */}
                  <span className="w-1.5 h-9 rounded-full" style={{ background: st.color }}></span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-bold text-ink num">{r.date}</span>
                    <span className="text-[11px] text-ink-3 num">{r.time.slice(0, 5)} · {r.dayOfWeek}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-ink num">{r.value}</span>
                    <span className="text-[10px] text-ink-3 font-semibold">mmHg</span>
                  </div>
                  <span
                    className="text-[9px] font-extrabold px-2 py-0.5 rounded-full"
                    style={{ color: st.color, background: st.soft }}
                  >
                    {st.text}
                  </span>
                </div>
              </GlassCard>
            )
          })
        )}
      </div>

      {/* 일 평균 카드 */}
      <GlassCard className="w-full py-4 px-5 flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-teal-soft rounded-xl flex items-center justify-center">
            <TrendingUp size={18} className="text-teal-deep" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-ink-3 font-bold uppercase tracking-wider">Daily Average</span>
            <span className="text-sm font-bold text-ink">일 평균</span>
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-teal-deep num">{averageValue}</span>
          <span className="text-xs text-ink-3 font-semibold">mmHg</span>
        </div>
      </GlassCard>

      {/* 하단 버튼 */}
      <div className="w-full grid grid-cols-2 gap-3 mt-auto mb-4 flex-shrink-0">
        <button
          className="flex items-center justify-center py-3.5 bg-surface hover:border-teal border border-line rounded-xl font-semibold text-sm text-ink-2 cursor-pointer transition-colors active:scale-98"
          onClick={() => onNavigate('analysis')}
        >
          기간별 분석
        </button>
        <button
          className="flex items-center justify-center py-3.5 bg-teal hover:bg-teal-deep rounded-xl font-semibold text-sm text-white cursor-pointer transition-all active:scale-98 shadow-md shadow-teal/20"
          onClick={() => onNavigate('menu')}
        >
          메뉴
        </button>
      </div>
    </div>
  )
}
