import { useState, useEffect, useRef } from 'react'
import { GlassCard } from '../components/ui/GlassCard'
import { IopGauge, iopStatus } from '../components/ui/IopGauge'
import { Bluetooth, BluetoothOff, ToggleLeft, ToggleRight, Edit2, Save, X } from 'lucide-react'

export default function RecordScreen({ onNavigate, isBluetoothConnected, onConnectToggle, onAddRecord }) {
  const [selectedEye, setSelectedEye] = useState('right') // left, right
  const [isAutoMeasuring, setIsAutoMeasuring] = useState(false)

  const [measuredValue, setMeasuredValue] = useState(0)
  const [measuredDate, setMeasuredDate] = useState('')
  const [measuredTime, setMeasuredTime] = useState('')

  const [isMeasuring, setIsMeasuring] = useState(false)
  const autoMeasureTimer = useRef(null)

  useEffect(() => {
    const now = new Date()
    const dateStr = now.toISOString().split('T')[0]

    let hours = now.getHours()
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const ampm = hours >= 12 ? '오후' : '오전'
    hours = hours % 12
    hours = hours ? hours : 12
    const timeStr = `${ampm} ${String(hours).padStart(2, '0')}:${minutes}:${seconds}`

    setMeasuredDate(dateStr)
    setMeasuredTime(timeStr)
  }, [])

  // 자동측정 로직 (화면 수치만 업데이트, 저장은 별도)
  useEffect(() => {
    if (isAutoMeasuring && isBluetoothConnected) {
      const measure = () => {
        setIsMeasuring(true)

        setTimeout(() => {
          const randomVal = Math.floor(Math.random() * 8) + 12
          const now = new Date()
          let hours = now.getHours()
          const minutes = String(now.getMinutes()).padStart(2, '0')
          const seconds = String(now.getSeconds()).padStart(2, '0')
          const ampm = hours >= 12 ? '오후' : '오전'
          hours = hours % 12
          hours = hours ? hours : 12
          const timeStr = `${ampm} ${String(hours).padStart(2, '0')}:${minutes}:${seconds}`

          setMeasuredValue(randomVal)
          setMeasuredTime(timeStr)
          setMeasuredDate(now.toISOString().split('T')[0])
          setIsMeasuring(false)
        }, 1500)
      }

      measure()
      autoMeasureTimer.current = setInterval(measure, 5000)
    } else {
      if (autoMeasureTimer.current) clearInterval(autoMeasureTimer.current)
    }

    return () => {
      if (autoMeasureTimer.current) clearInterval(autoMeasureTimer.current)
    }
  }, [isAutoMeasuring, isBluetoothConnected])

  useEffect(() => {
    if (!isBluetoothConnected) setIsAutoMeasuring(false)
  }, [isBluetoothConnected])

  const handleAutoMeasureToggle = () => {
    if (!isBluetoothConnected) {
      alert('자동측정을 시작하려면 먼저 블루투스 기기를 연결해주세요.')
      return
    }
    setIsAutoMeasuring(!isAutoMeasuring)
  }

  const handleSave = () => {
    if (measuredValue <= 0) {
      alert('저장할 안압 수치를 입력하거나 측정해주세요. (0보다 커야 합니다.)')
      return
    }
    onAddRecord(measuredValue, selectedEye, measuredTime, measuredDate)
    alert('기록이 성공적으로 저장되었습니다.')
    setMeasuredValue(0)
    setIsAutoMeasuring(false)
  }

  const handleCancel = () => {
    setMeasuredValue(0)
    setIsAutoMeasuring(false)

    const now = new Date()
    const dateStr = now.toISOString().split('T')[0]
    let hours = now.getHours()
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const ampm = hours >= 12 ? '오후' : '오전'
    hours = hours % 12
    hours = hours ? hours : 12
    const timeStr = `${ampm} ${String(hours).padStart(2, '0')}:${minutes}:${seconds}`

    setMeasuredDate(dateStr)
    setMeasuredTime(timeStr)
  }

  const status = iopStatus(measuredValue)

  return (
    <div className="flex flex-col h-full text-ink">
      {/* 헤더: 블루투스 + 타이틀 + 좌/우안 토글 */}
      <div className="flex items-center justify-between mb-5">
        <button
          className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full border cursor-pointer transition-colors ${
            isBluetoothConnected
              ? 'bg-teal-soft border-teal/30 text-teal-deep'
              : 'bg-surface border-line text-ink-2 hover:border-teal'
          }`}
          onClick={onConnectToggle}
        >
          {isBluetoothConnected ? <Bluetooth size={12} /> : <BluetoothOff size={12} />}
          {isBluetoothConnected ? '연결됨' : '블루투스 설정'}
        </button>

        <h2 className="text-lg font-extrabold tracking-tight">측정 기록</h2>

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

      {/* 날짜/시간 입력 카드 */}
      <GlassCard className="w-full mb-4 p-4 space-y-2.5 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-ink-2 font-semibold">측정일</span>
          <input
            type="date"
            value={measuredDate}
            onChange={(e) => setMeasuredDate(e.target.value)}
            className="bg-app-bg border border-line rounded-lg px-2 py-1.5 text-right text-ink font-semibold outline-none w-34 focus:border-teal"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-ink-2 font-semibold">측정시간</span>
          <input
            type="text"
            value={measuredTime}
            onChange={(e) => setMeasuredTime(e.target.value)}
            placeholder="오후 02:00:00"
            className="bg-app-bg border border-line rounded-lg px-2 py-1.5 text-right text-ink font-semibold outline-none w-36 focus:border-teal num"
          />
        </div>
      </GlassCard>

      {/* 자동측정 토글 */}
      <div className="flex justify-end items-center gap-2 mb-3 px-1">
        <span className="text-xs text-ink-2 font-semibold">자동측정</span>
        <button
          className="cursor-pointer transition-colors"
          onClick={handleAutoMeasureToggle}
        >
          {isAutoMeasuring ? (
            <ToggleRight size={30} className="text-teal" />
          ) : (
            <ToggleLeft size={30} className="text-ink-3" />
          )}
        </button>
      </div>

      {/* 메인 측정 디스플레이 — IOP 존 게이지 */}
      <GlassCard className="w-full px-6 py-5 mb-4 relative">
        {isMeasuring && (
          <div className="absolute inset-0 bg-white/85 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
            <span className="text-xs text-teal-deep font-bold animate-pulse">안압 측정 중...</span>
          </div>
        )}

        <div className="flex justify-between items-center mb-1">
          <span className="text-[11px] text-ink-3 font-semibold">현재 입력 / 측정치</span>
          <span className="text-[10px] text-teal-deep font-semibold flex items-center gap-1">
            <Edit2 size={10} /> 수기 수정 가능
          </span>
        </div>

        <div className="flex items-end justify-between mb-4">
          <div className="flex items-baseline gap-1.5">
            <input
              type="number"
              value={measuredValue || ''}
              onChange={(e) => setMeasuredValue(Number(e.target.value))}
              placeholder="0"
              className="bg-transparent text-left text-[52px] leading-none font-black text-ink num w-28 outline-none border-b-2 border-line focus:border-teal pb-1"
            />
            <span className="text-sm text-ink-3 font-semibold">mmHg</span>
          </div>

          {/* 상태 배지 */}
          <span
            className="text-[11px] font-extrabold px-2.5 py-1 rounded-full"
            style={{ color: status.color, background: status.soft }}
          >
            {status.text}
          </span>
        </div>

        <IopGauge value={measuredValue} />
      </GlassCard>

      {/* 저장 / 취소 */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          className="flex items-center justify-center gap-1.5 py-3 bg-surface hover:bg-high-soft border border-line rounded-xl font-bold text-xs text-high cursor-pointer transition-colors active:scale-98"
          onClick={handleCancel}
        >
          <X size={14} />
          <span>취소</span>
        </button>
        <button
          className="flex items-center justify-center gap-1.5 py-3 bg-teal hover:bg-teal-deep rounded-xl font-bold text-xs text-white cursor-pointer transition-all active:scale-98 shadow-md shadow-teal/20"
          onClick={handleSave}
        >
          <Save size={14} />
          <span>저장</span>
        </button>
      </div>

      {/* 하단 바로가기 */}
      <button
        className="w-full flex items-center justify-center py-3 bg-surface hover:border-teal border border-line rounded-xl font-semibold text-xs text-teal-deep cursor-pointer transition-all active:scale-98 mt-auto mb-2"
        onClick={() => onNavigate('history')}
      >
        안압기록 전체 보기
      </button>
    </div>
  )
}
