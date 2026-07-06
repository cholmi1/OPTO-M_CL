import { useMemo } from 'react'
import { GlassCard } from '../components/ui/GlassCard'
import { IopGauge, iopStatus } from '../components/ui/IopGauge'
import { Bell, ChevronRight, Droplets, Footprints, Moon, HeartPulse, Sparkles, ClipboardList, Plus } from 'lucide-react'

/* 원형 프로그레스 링 (삼성헬스 스타일) */
function Ring({ percent, size = 52, stroke = 5, color = '#0c8b99', track = '#e4eaf0', children }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={color} strokeWidth={stroke} fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * Math.min(percent, 100)) / 100}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  )
}

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토']

export default function HomeScreen({ onNavigate, records, alarms, isBluetoothConnected }) {
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]
  const dateLabel = `${today.getMonth() + 1}월 ${today.getDate()}일 (${DAY_NAMES[today.getDay()]})`

  // 생체신호 데이터 (BioScreen과 동일 저장소 공유)
  const bio = useMemo(() => {
    try {
      const saved = localStorage.getItem('tono_i_bio_data')
      return saved ? JSON.parse(saved) : {}
    } catch { return {} }
  }, [])

  // 최근 측정 (전체 기준 최신 1건)
  const latest = records.length > 0 ? records[0] : null
  const latestStatus = iopStatus(latest?.value || 0)

  // 눈별 최근값
  const latestLeft = records.find(r => r.eye === 'left')
  const latestRight = records.find(r => r.eye === 'right')

  // 오늘 측정 횟수
  const todayCount = records.filter(r => r.date === todayStr).length

  // 최근 7일 평균 (인사이트용)
  const week = useMemo(() => {
    const limit = new Date(today)
    limit.setDate(limit.getDate() - 7)
    const rows = records.filter(r => new Date(r.date) >= limit)
    if (rows.length === 0) return null
    const avg = rows.reduce((s, r) => s + r.value, 0) / rows.length
    const over = rows.filter(r => r.value > 21).length
    return { avg: avg.toFixed(1), count: rows.length, over }
  }, [records])

  // 다음 활성 알람 계산
  const nextAlarm = useMemo(() => {
    const active = alarms.filter(a => a.active)
    if (active.length === 0) return null
    const nowMin = today.getHours() * 60 + today.getMinutes()
    const todayDow = today.getDay()
    let best = null
    active.forEach(a => {
      const [h, m] = a.time.split(':').map(Number)
      const t = h * 60 + m
      for (let d = 0; d < 7; d++) {
        const dow = (todayDow + d) % 7
        if (!a.days.includes(dow)) continue
        if (d === 0 && t <= nowMin) continue
        const dist = d * 1440 + t - nowMin
        if (!best || dist < best.dist) best = { dist, alarm: a, dayOffset: d }
        break
      }
    })
    return best
  }, [alarms])

  const formatTime12h = (timeStr) => {
    const [h, m] = timeStr.split(':')
    const hour = parseInt(h)
    const ampm = hour >= 12 ? '오후' : '오전'
    const dh = hour % 12 === 0 ? 12 : hour % 12
    return `${ampm} ${String(dh).padStart(2, '0')}:${m}`
  }

  // 규칙 기반 오늘의 인사이트
  const insight = useMemo(() => {
    if (!week) return '아직 이번 주 측정 기록이 없습니다. 오늘 첫 측정으로 관리 데이터를 쌓아 보세요.'
    if (week.over > 0) return `최근 7일 중 ${week.over}건이 정상 범위(21mmHg)를 초과했습니다. 측정 주기를 늘리고, 다음 진료 시 의료진과 상의해 보세요.`
    if (Number(week.avg) <= 18) return `최근 7일 평균 ${week.avg}mmHg로 안정적으로 관리되고 있습니다. 현재 생활 습관을 유지해 주세요.`
    return `최근 7일 평균 ${week.avg}mmHg입니다. 정상 범위이나 상단에 가까우니 수면 자세·점안 준수에 신경 써 주세요.`
  }, [week])

  // 점안 준수율 (IDROPM 모듈 연동 전 표준값)
  const dropAdherence = 85

  return (
    <div className="flex flex-col h-full text-ink">
      {/* 인사 헤더 */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-[11px] font-semibold text-ink-3">{dateLabel}</p>
          <h1 className="text-xl font-extrabold tracking-tight mt-0.5">
            안녕하세요! <span className="text-teal">오늘의 눈 건강</span>이에요
          </h1>
        </div>
        <button
          className="p-2 bg-surface rounded-full border border-line cursor-pointer hover:bg-teal-soft transition-colors relative"
          onClick={() => onNavigate('alarm')}
          title="알람"
        >
          <Bell size={18} className="text-ink-2" />
          {nextAlarm && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-high rounded-full"></span>}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3.5 pb-3">

        {/* ① 오늘의 안압 히어로 카드 */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-ink-2">오늘의 안압</span>
            <span className="text-[10px] font-semibold text-ink-3">
              오늘 측정 {todayCount}회 · {isBluetoothConnected ? '기기 연결됨' : '기기 미연결'}
            </span>
          </div>

          {latest ? (
            <>
              <div className="flex items-end justify-between mb-3">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[44px] leading-none font-black num">{latest.value}</span>
                  <span className="text-sm text-ink-3 font-semibold">mmHg</span>
                </div>
                <div className="text-right">
                  <span
                    className="text-[11px] font-extrabold px-2.5 py-1 rounded-full"
                    style={{ color: latestStatus.color, background: latestStatus.soft }}
                  >
                    {latestStatus.text}
                  </span>
                  <p className="text-[10px] text-ink-3 mt-1.5 num">
                    {latest.date} {latest.time.slice(0, 5)} · {latest.eye === 'right' ? '우안' : '좌안'}
                  </p>
                </div>
              </div>
              <IopGauge value={latest.value} height={7} />
            </>
          ) : (
            <p className="text-sm text-ink-3 py-4 text-center">아직 측정 기록이 없습니다</p>
          )}

          {/* 좌/우 최근값 칩 */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center justify-between px-3 py-2 bg-teal-soft rounded-xl">
              <span className="text-[10px] font-extrabold text-teal-deep">좌 OS</span>
              <span className="text-sm font-black text-ink num">
                {latestLeft ? `${latestLeft.value}` : '—'} <span className="text-[9px] font-semibold text-ink-3">mmHg</span>
              </span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-violet-soft rounded-xl">
              <span className="text-[10px] font-extrabold text-violet">우 OD</span>
              <span className="text-sm font-black text-ink num">
                {latestRight ? `${latestRight.value}` : '—'} <span className="text-[9px] font-semibold text-ink-3">mmHg</span>
              </span>
            </div>
          </div>

          <button
            className="w-full mt-3.5 flex items-center justify-center gap-1.5 py-3 bg-teal hover:bg-teal-deep rounded-xl font-bold text-xs text-white cursor-pointer transition-all active:scale-98 shadow-md shadow-teal/20"
            onClick={() => onNavigate('record')}
          >
            <Plus size={14} />
            지금 측정하기
          </button>
        </GlassCard>

        {/* ② 건강 타일 그리드 */}
        <div className="grid grid-cols-2 gap-3">
          <GlassCard className="p-3.5 cursor-pointer hover:border-teal transition-colors" onClick={() => onNavigate('idrop')}>
            <div className="flex items-center gap-1.5 mb-2">
              <Droplets size={13} className="text-teal-deep" />
              <span className="text-[11px] font-bold text-ink-2">점안 준수율</span>
            </div>
            <div className="flex items-center gap-3">
              <Ring percent={dropAdherence} color="#0c8b99">
                <span className="text-[11px] font-black text-ink num">{dropAdherence}%</span>
              </Ring>
              <span className="text-[10px] text-ink-3 font-medium leading-snug">이번 주<br />목표 달성 중</span>
            </div>
          </GlassCard>

          <GlassCard className="p-3.5 cursor-pointer hover:border-teal transition-colors" onClick={() => onNavigate('bio')}>
            <div className="flex items-center gap-1.5 mb-2">
              <Footprints size={13} className="text-ok" />
              <span className="text-[11px] font-bold text-ink-2">걸음 수</span>
            </div>
            <p className="text-2xl font-black text-ink num leading-none mt-3">
              {(bio.stepCount ?? 0).toLocaleString()}
            </p>
            <p className="text-[10px] text-ink-3 font-medium mt-1.5">목표 6,000걸음</p>
          </GlassCard>

          <GlassCard className="p-3.5 cursor-pointer hover:border-teal transition-colors" onClick={() => onNavigate('bio')}>
            <div className="flex items-center gap-1.5 mb-2">
              <Moon size={13} className="text-violet" />
              <span className="text-[11px] font-bold text-ink-2">수면</span>
            </div>
            <p className="text-2xl font-black text-ink num leading-none mt-3">
              {bio.sleepHours ?? 0}<span className="text-xs font-bold text-ink-3">시간</span> {bio.sleepMinutes ?? 0}<span className="text-xs font-bold text-ink-3">분</span>
            </p>
            <p className="text-[10px] text-ink-3 font-medium mt-1.5">머리 20~30° 올리기 권장</p>
          </GlassCard>

          <GlassCard className="p-3.5 cursor-pointer hover:border-teal transition-colors" onClick={() => onNavigate('bio')}>
            <div className="flex items-center gap-1.5 mb-2">
              <HeartPulse size={13} className="text-high" />
              <span className="text-[11px] font-bold text-ink-2">심박수</span>
            </div>
            <p className="text-2xl font-black text-ink num leading-none mt-3">
              {bio.heartRate ?? 0}<span className="text-xs font-bold text-ink-3"> bpm</span>
            </p>
            <p className="text-[10px] text-ink-3 font-medium mt-1.5">워치 연동 데이터</p>
          </GlassCard>
        </div>

        {/* ③ 오늘의 인사이트 */}
        <GlassCard className="p-4 border-teal/25 bg-gradient-to-br from-teal-soft/60 to-surface">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles size={13} className="text-teal-deep" />
            <span className="text-[11px] font-extrabold text-teal-deep">오늘의 인사이트</span>
          </div>
          <p className="text-xs text-ink-2 font-medium leading-relaxed">{insight}</p>
        </GlassCard>

        {/* ④ 다음 알람 */}
        {nextAlarm && (
          <GlassCard
            className="p-4 flex items-center justify-between cursor-pointer hover:border-teal transition-colors"
            onClick={() => onNavigate('alarm')}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-violet-soft rounded-xl flex items-center justify-center">
                <Bell size={16} className="text-violet" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-ink-3">다음 측정 알람</p>
                <p className="text-sm font-extrabold text-ink num">
                  {nextAlarm.dayOffset === 0 ? '오늘' : nextAlarm.dayOffset === 1 ? '내일' : `${nextAlarm.dayOffset}일 후`} {formatTime12h(nextAlarm.alarm.time)}
                  <span className="text-[10px] font-semibold text-ink-2 ml-1.5">{nextAlarm.alarm.title}</span>
                </p>
              </div>
            </div>
            <ChevronRight size={16} className="text-ink-3" />
          </GlassCard>
        )}

        {/* ⑤ 문진 배너 */}
        <button
          className="w-full flex items-center justify-between p-4 bg-warn-soft border border-warn/25 rounded-2xl cursor-pointer hover:border-warn transition-colors active:scale-[0.99]"
          onClick={() => onNavigate('survey')}
        >
          <div className="flex items-center gap-3 text-left">
            <ClipboardList size={18} className="text-warn shrink-0" />
            <div>
              <p className="text-xs font-extrabold text-ink">이달의 생활습관 문진</p>
              <p className="text-[10px] text-ink-2 font-medium mt-0.5">12개 문항 · 맞춤 피드백 제공</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-warn" />
        </button>
      </div>
    </div>
  )
}
