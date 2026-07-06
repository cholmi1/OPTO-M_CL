import { useMemo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts'
import { GlassCard } from '../components/ui/GlassCard'
import { ArrowUpRight, ArrowDownRight, FileDown, CalendarRange } from 'lucide-react'

export default function ReportScreen({ onNavigate, records }) {
  const [range, setRange] = useState('week') // week | month

  const data = useMemo(() => {
    const days = range === 'week' ? 7 : 30
    const limit = new Date()
    limit.setDate(limit.getDate() - days)

    const rows = records.filter(r => new Date(r.date) >= limit)

    // 일자별 평균
    const map = {}
    rows.forEach(r => {
      if (!map[r.date]) map[r.date] = { sum: 0, count: 0 }
      map[r.date].sum += r.value
      map[r.date].count += 1
    })
    const chart = Object.keys(map).sort().map(d => ({
      name: d.split('-')[2] + '일',
      value: Number((map[d].sum / map[d].count).toFixed(1)),
    }))

    if (rows.length === 0) return { chart, avg: 0, max: 0, min: 0, count: 0, eff: 0, avgL: null, avgR: null, prevAvg: null }

    const values = rows.map(r => r.value)
    const avg = values.reduce((s, v) => s + v, 0) / values.length
    const left = rows.filter(r => r.eye === 'left')
    const right = rows.filter(r => r.eye === 'right')
    const eff = Math.round((rows.filter(r => r.value >= 10 && r.value <= 21).length / rows.length) * 100)

    // 직전 동일 기간 평균 (추세 비교)
    const prevLimit = new Date(limit)
    prevLimit.setDate(prevLimit.getDate() - days)
    const prevRows = records.filter(r => {
      const d = new Date(r.date)
      return d >= prevLimit && d < limit
    })
    const prevAvg = prevRows.length ? prevRows.reduce((s, r) => s + r.value, 0) / prevRows.length : null

    return {
      chart,
      avg: avg.toFixed(1),
      max: Math.max(...values),
      min: Math.min(...values),
      count: rows.length,
      eff,
      avgL: left.length ? (left.reduce((s, r) => s + r.value, 0) / left.length).toFixed(1) : null,
      avgR: right.length ? (right.reduce((s, r) => s + r.value, 0) / right.length).toFixed(1) : null,
      prevAvg,
    }
  }, [records, range])

  const trend = data.prevAvg != null ? Number(data.avg) - data.prevAvg : null

  const Stat = ({ label, value, unit, color = 'text-ink' }) => (
    <div className="flex flex-col items-center py-1">
      <span className="text-[10px] font-bold text-ink-3">{label}</span>
      <span className={`text-lg font-black num mt-0.5 ${color}`}>
        {value}<span className="text-[10px] font-semibold text-ink-3 ml-0.5">{unit}</span>
      </span>
    </div>
  )

  return (
    <div className="flex flex-col h-full text-ink">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold tracking-tight">건강 리포트</h2>
        {/* 기간 토글 */}
        <div className="flex bg-surface p-0.5 rounded-lg border border-line text-[10px]">
          <button
            className={`px-3.5 py-1.5 rounded-md font-bold cursor-pointer transition-colors ${range === 'week' ? 'bg-teal text-white' : 'text-ink-3'}`}
            onClick={() => setRange('week')}
          >
            주간
          </button>
          <button
            className={`px-3.5 py-1.5 rounded-md font-bold cursor-pointer transition-colors ${range === 'month' ? 'bg-teal text-white' : 'text-ink-3'}`}
            onClick={() => setRange('month')}
          >
            월간
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3.5 pb-3">

        {/* 평균 + 추세 */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-ink-2">{range === 'week' ? '최근 7일' : '최근 30일'} 평균 안압</p>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-4xl font-black num">{data.avg}</span>
                <span className="text-sm text-ink-3 font-semibold">mmHg</span>
              </div>
            </div>
            {trend != null && (
              <div className={`flex items-center gap-1 text-xs font-extrabold px-2.5 py-1.5 rounded-full ${
                trend > 0 ? 'bg-high-soft text-high' : 'bg-ok-soft text-ok'
              }`}>
                {trend > 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                {Math.abs(trend).toFixed(1)}
                <span className="font-semibold text-[10px]">지난 기간 대비</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 divide-x divide-line border-t border-line mt-4 pt-2">
            <Stat label="측정 횟수" value={data.count} unit="회" />
            <Stat label="최고" value={data.max} unit="" color="text-high" />
            <Stat label="최저" value={data.min} unit="" color="text-teal-deep" />
            <Stat label="관리효율" value={data.eff} unit="%" color="text-ok" />
          </div>
        </GlassCard>

        {/* 추이 차트 */}
        <GlassCard className="p-3 h-46">
          {data.chart.length === 0 ? (
            <div className="h-full flex items-center justify-center text-xs text-ink-3">해당 기간 데이터가 없습니다.</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.chart} margin={{ top: 12, right: 10, left: -28, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4eaf0" />
                <XAxis dataKey="name" stroke="#90a0b0" fontSize={9} tickLine={false} />
                <YAxis domain={[0, 40]} ticks={[0, 10, 21, 30, 40]} stroke="#90a0b0" fontSize={9} tickLine={false} />
                <ReferenceLine y={21} stroke="#d9463e" strokeDasharray="3 3"
                  label={{ value: '정상 상한 21', fill: '#d9463e', fontSize: 8, position: 'insideTopRight' }} />
                <Line type="monotone" dataKey="value" stroke="#0c8b99" strokeWidth={2.5}
                  dot={{ stroke: '#0c8b99', strokeWidth: 2, r: 3, fill: '#ffffff' }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </GlassCard>

        {/* 좌/우안 비교 */}
        <div className="grid grid-cols-2 gap-3">
          <GlassCard className="p-4 border-teal/30">
            <span className="text-[10px] font-extrabold text-teal-deep">좌안 OS 평균</span>
            <p className="text-2xl font-black num mt-1.5">
              {data.avgL ?? '—'}<span className="text-[10px] font-semibold text-ink-3 ml-1">mmHg</span>
            </p>
          </GlassCard>
          <GlassCard className="p-4 border-violet/30">
            <span className="text-[10px] font-extrabold text-violet">우안 OD 평균</span>
            <p className="text-2xl font-black num mt-1.5">
              {data.avgR ?? '—'}<span className="text-[10px] font-semibold text-ink-3 ml-1">mmHg</span>
            </p>
          </GlassCard>
        </div>

        {/* 바로가기 */}
        <div className="grid grid-cols-2 gap-3">
          <button
            className="flex items-center justify-center gap-1.5 py-3.5 bg-surface border border-line hover:border-teal rounded-xl font-bold text-xs text-ink-2 cursor-pointer transition-colors active:scale-98"
            onClick={() => onNavigate('analysis')}
          >
            <CalendarRange size={14} className="text-teal-deep" />
            기간 직접 설정
          </button>
          <button
            className="flex items-center justify-center gap-1.5 py-3.5 bg-teal hover:bg-teal-deep rounded-xl font-bold text-xs text-white cursor-pointer transition-all active:scale-98 shadow-md shadow-teal/20"
            onClick={() => onNavigate('send')}
          >
            <FileDown size={14} />
            CSV 내보내기
          </button>
        </div>
      </div>
    </div>
  )
}
