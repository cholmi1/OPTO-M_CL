import React, { useState, useEffect } from 'react'
import { ChevronLeft, RefreshCw, Edit3 } from 'lucide-react'

// 초기 기본 바이오 데이터
const DEFAULT_BIO_DATA = {
  bloodPressureMax: 120,
  bloodPressureMin: 80,
  bloodPressureTime: '26년 07월 03일 14시',
  bloodGlucose: 100,
  bloodGlucoseTime: '26년 07월 03일 12시',
  stepCount: 0,
  stepCountTime: '26년 07월 03일 10시',
  sleepHours: 0,
  sleepMinutes: 0,
  sleepTime: '26년 07월 03일 08시',
  foodCalories: 0,
  foodCaloriesTime: '26년 07월 03일 13시',
  heartRate: 0,
  heartRateTime: '26년 07월 03일 11시'
}

export default function BioScreen({ onNavigate }) {
  const [bioData, setBioData] = useState(() => {
    const saved = localStorage.getItem('tono_i_bio_data')
    return saved ? JSON.parse(saved) : DEFAULT_BIO_DATA
  })

  // 모달 상태
  const [activeModal, setActiveModal] = useState(null) // 'bloodPressure', 'bloodGlucose', 'stepCount', 'sleep', 'food', 'heartRate'
  const [tempValues, setTempValues] = useState({})

  useEffect(() => {
    localStorage.setItem('tono_i_bio_data', JSON.stringify(bioData))
  }, [bioData])

  // 현재 날짜/시간 포맷 생성 함수 (YY년 MM월 DD일 HH시)
  const getFormattedTime = () => {
    const now = new Date()
    const yy = String(now.getFullYear()).substring(2)
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const hh = String(now.getHours()).padStart(2, '0')
    return `${yy}년 ${mm}월 ${dd}일 ${hh}시`
  }

  // 모의 스마트워치 데이터 동기화
  const handleWatchSync = () => {
    const timeStr = getFormattedTime()
    setBioData(prev => ({
      ...prev,
      stepCount: 2731,
      stepCountTime: timeStr,
      sleepHours: 3,
      sleepMinutes: 30,
      sleepTime: timeStr,
      heartRate: 130,
      heartRateTime: timeStr
    }))
    alert('스마트워치 생체 신호가 성공적으로 연동되었습니다!\n- 걸음 수: 2,731걸음\n- 수면 시간: 3시간 30분\n- 심박수: 130 bpm')
  }

  // 모달 열기
  const openEditModal = (type) => {
    setActiveModal(type)
    if (type === 'bloodPressure') {
      setTempValues({
        max: bioData.bloodPressureMax,
        min: bioData.bloodPressureMin
      })
    } else if (type === 'sleep') {
      setTempValues({
        hours: bioData.sleepHours,
        minutes: bioData.sleepMinutes
      })
    } else {
      setTempValues({
        val: bioData[type]
      })
    }
  }

  // 저장 처리
  const handleSave = () => {
    const timeStr = getFormattedTime()
    setBioData(prev => {
      const updated = { ...prev }
      if (activeModal === 'bloodPressure') {
        updated.bloodPressureMax = Number(tempValues.max) || 0
        updated.bloodPressureMin = Number(tempValues.min) || 0
        updated.bloodPressureTime = timeStr
      } else if (activeModal === 'sleep') {
        updated.sleepHours = Number(tempValues.hours) || 0
        updated.sleepMinutes = Number(tempValues.minutes) || 0
        updated.sleepTime = timeStr
      } else {
        updated[activeModal] = Number(tempValues.val) || 0
        updated[`${activeModal}Time`] = timeStr
      }
      return updated
    })
    setActiveModal(null)
  }

  return (
    <div className="flex flex-col h-full bg-app-bg text-ink select-none">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 h-12 bg-surface border-b border-line shrink-0">
        <button 
          onClick={() => onNavigate('cover')} 
          className="flex items-center text-ink-2 hover:text-ink transition-colors cursor-pointer active:scale-95"
        >
          <ChevronLeft size={20} className="-ml-1" strokeWidth={2.5} />
          <span className="text-xs font-bold">홈으로</span>
        </button>
        <h2 className="text-sm font-extrabold text-ink">생체신호</h2>
        <button 
          onClick={handleWatchSync}
          className="flex items-center gap-1 bg-high hover:opacity-90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors cursor-pointer active:scale-95 shadow-md shadow-high/20"
        >
          <RefreshCw size={10} />
          워치연동
        </button>
      </div>

      {/* 스크롤 가능한 생체신호 리스트 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        
        {/* 설명 안내 */}
        <div className="bg-high-soft border border-high/20 rounded-2xl p-3 text-xs text-high leading-relaxed font-medium">
          * 스마트워치 연동 또는 각 카드를 클릭(수기 입력)하여 일상 건강 정보를 기록하고 안압과의 유기성을 추적하세요.
        </div>

        {/* 6개 그리드 카드 */}
        <div className="grid grid-cols-1 gap-3">
          
          {/* 혈압 */}
          <div 
            onClick={() => openEditModal('bloodPressure')}
            className="flex items-center justify-between p-4 bg-surface border border-line hover:border-high rounded-2xl transition-all cursor-pointer group active:scale-[0.99] card-shadow"
          >
            <div>
              <span className="text-[11px] font-bold text-high">혈압 (mmHg)</span>
              <div className="flex items-baseline mt-1 gap-2">
                <span className="text-2xl font-black text-ink num">{bioData.bloodPressureMax}</span>
                <span className="text-xs text-ink-3 font-semibold">최고</span>
                <span className="text-xl font-bold text-ink-3">/</span>
                <span className="text-2xl font-black text-ink num">{bioData.bloodPressureMin}</span>
                <span className="text-xs text-ink-3 font-semibold">최저</span>
              </div>
              <p className="text-[9px] text-ink-3 mt-2 num">{bioData.bloodPressureTime}</p>
            </div>
            <Edit3 size={16} className="text-ink-3 group-hover:text-high transition-colors" />
          </div>

          {/* 혈당 */}
          <div 
            onClick={() => openEditModal('bloodGlucose')}
            className="flex items-center justify-between p-4 bg-surface border border-line hover:border-high rounded-2xl transition-all cursor-pointer group active:scale-[0.99] card-shadow"
          >
            <div>
              <span className="text-[11px] font-bold text-high">혈당 (mg/dL)</span>
              <div className="flex items-baseline mt-1 gap-1">
                <span className="text-2xl font-black text-ink num">{bioData.bloodGlucose}</span>
                <span className="text-[10px] text-ink-3 font-bold ml-0.5">mg/dL</span>
              </div>
              <p className="text-[9px] text-ink-3 mt-2 num">{bioData.bloodGlucoseTime}</p>
            </div>
            <Edit3 size={16} className="text-ink-3 group-hover:text-high transition-colors" />
          </div>

          {/* 걸음수 */}
          <div 
            onClick={() => openEditModal('stepCount')}
            className="flex items-center justify-between p-4 bg-surface border border-line hover:border-high rounded-2xl transition-all cursor-pointer group active:scale-[0.99] card-shadow"
          >
            <div>
              <span className="text-[11px] font-bold text-high">걸음 수 (걸음)</span>
              <div className="flex items-baseline mt-1 gap-1">
                <span className="text-2xl font-black text-ink num">
                  {bioData.stepCount.toLocaleString()}
                </span>
                <span className="text-[10px] text-ink-3 font-bold ml-0.5">걸음</span>
              </div>
              <p className="text-[9px] text-ink-3 mt-2 num">{bioData.stepCountTime}</p>
            </div>
            <Edit3 size={16} className="text-ink-3 group-hover:text-high transition-colors" />
          </div>

          {/* 수면 */}
          <div 
            onClick={() => openEditModal('sleep')}
            className="flex items-center justify-between p-4 bg-surface border border-line hover:border-high rounded-2xl transition-all cursor-pointer group active:scale-[0.99] card-shadow"
          >
            <div>
              <span className="text-[11px] font-bold text-high">수면 시간 (시간·분)</span>
              <div className="flex items-baseline mt-1 gap-2">
                <span className="text-2xl font-black text-ink num">{bioData.sleepHours}</span>
                <span className="text-xs text-ink-3 font-semibold">시간</span>
                <span className="text-2xl font-black text-ink num">{bioData.sleepMinutes}</span>
                <span className="text-xs text-ink-3 font-semibold">분</span>
              </div>
              <p className="text-[9px] text-ink-3 mt-2 num">{bioData.sleepTime}</p>
            </div>
            <Edit3 size={16} className="text-ink-3 group-hover:text-high transition-colors" />
          </div>

          {/* 음식 */}
          <div 
            onClick={() => openEditModal('foodCalories')}
            className="flex items-center justify-between p-4 bg-surface border border-line hover:border-high rounded-2xl transition-all cursor-pointer group active:scale-[0.99] card-shadow"
          >
            <div>
              <span className="text-[11px] font-bold text-high">음식 섭취 (Kcal)</span>
              <div className="flex items-baseline mt-1 gap-1">
                <span className="text-2xl font-black text-ink num">{bioData.foodCalories}</span>
                <span className="text-[10px] text-ink-3 font-bold ml-0.5">Kcal</span>
              </div>
              <p className="text-[9px] text-ink-3 mt-2 num">{bioData.foodCaloriesTime}</p>
            </div>
            <Edit3 size={16} className="text-ink-3 group-hover:text-high transition-colors" />
          </div>

          {/* 심박수 */}
          <div 
            onClick={() => openEditModal('heartRate')}
            className="flex items-center justify-between p-4 bg-surface border border-line hover:border-high rounded-2xl transition-all cursor-pointer group active:scale-[0.99] card-shadow"
          >
            <div>
              <span className="text-[11px] font-bold text-high">심박수 (bpm)</span>
              <div className="flex items-baseline mt-1 gap-1">
                <span className="text-2xl font-black text-ink num">{bioData.heartRate}</span>
                <span className="text-[10px] text-ink-3 font-bold ml-0.5">bpm</span>
              </div>
              <p className="text-[9px] text-ink-3 mt-2 num">{bioData.heartRateTime}</p>
            </div>
            <Edit3 size={16} className="text-ink-3 group-hover:text-high transition-colors" />
          </div>

        </div>
      </div>

      {/* 수기 입력 모달 팝업 */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/35 backdrop-blur-sm">
          <div className="w-full max-w-[280px] bg-surface border border-line rounded-3xl p-5 shadow-2xl rise-in">
            <h3 className="text-base font-extrabold text-center text-ink mb-4">
              {activeModal === 'bloodPressure' ? '혈압 입력' :
               activeModal === 'bloodGlucose' ? '혈당 입력' :
               activeModal === 'stepCount' ? '걸음 수 입력' :
               activeModal === 'sleep' ? '수면 시간 입력' :
               activeModal === 'foodCalories' ? '음식 칼로리 입력' :
               activeModal === 'heartRate' ? '심박수 입력' : '데이터 입력'}
            </h3>

            {/* 입력 폼 필드 */}
            <div className="space-y-3 mb-5">
              {activeModal === 'bloodPressure' ? (
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] text-ink-2 font-semibold block mb-1">최고 (mmHg)</label>
                    <input 
                      type="number"
                      value={tempValues.max || ''}
                      onChange={e => setTempValues(prev => ({ ...prev, max: e.target.value }))}
                      className="w-full bg-app-bg border border-line rounded-xl px-3 py-2 text-center text-lg font-bold text-ink num focus:outline-none focus:border-high"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-ink-2 font-semibold block mb-1">최저 (mmHg)</label>
                    <input 
                      type="number"
                      value={tempValues.min || ''}
                      onChange={e => setTempValues(prev => ({ ...prev, min: e.target.value }))}
                      className="w-full bg-app-bg border border-line rounded-xl px-3 py-2 text-center text-lg font-bold text-ink num focus:outline-none focus:border-high"
                    />
                  </div>
                </div>
              ) : activeModal === 'sleep' ? (
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] text-ink-2 font-semibold block mb-1">시간 (H)</label>
                    <input 
                      type="number"
                      value={tempValues.hours !== undefined ? tempValues.hours : ''}
                      onChange={e => setTempValues(prev => ({ ...prev, hours: e.target.value }))}
                      className="w-full bg-app-bg border border-line rounded-xl px-3 py-2 text-center text-lg font-bold text-ink num focus:outline-none focus:border-high"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-ink-2 font-semibold block mb-1">분 (M)</label>
                    <input 
                      type="number"
                      value={tempValues.minutes !== undefined ? tempValues.minutes : ''}
                      onChange={e => setTempValues(prev => ({ ...prev, minutes: e.target.value }))}
                      className="w-full bg-app-bg border border-line rounded-xl px-3 py-2 text-center text-lg font-bold text-ink num focus:outline-none focus:border-high"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-[10px] text-ink-2 font-semibold block mb-1">값 입력</label>
                  <input 
                    type="number"
                    value={tempValues.val !== undefined ? tempValues.val : ''}
                    onChange={e => setTempValues(prev => ({ ...prev, val: e.target.value }))}
                    className="w-full bg-app-bg border border-line rounded-xl px-3 py-2 text-center text-xl font-bold text-ink num focus:outline-none focus:border-high"
                  />
                </div>
              )}
            </div>

            {/* 하단 액션 버튼 */}
            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                className="flex-1 bg-high hover:opacity-90 text-white text-xs font-bold py-2.5 rounded-xl cursor-pointer transition-colors"
              >
                저장
              </button>
              <button 
                onClick={() => setActiveModal(null)}
                className="flex-1 bg-app-bg hover:bg-line text-ink-2 text-xs font-bold py-2.5 rounded-xl border border-line cursor-pointer transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
