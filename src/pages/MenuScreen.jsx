import { Eye, FileText, Upload, RefreshCw, Info, Bell, ChevronLeft } from 'lucide-react'

const MenuButton = ({ icon: Icon, label, sub, onClick }) => (
  <button
    className="flex flex-col items-start justify-between aspect-square p-4 bg-surface border border-line rounded-2xl card-shadow cursor-pointer active:scale-95 hover:border-teal transition-all text-left"
    onClick={onClick}
  >
    <div className="w-10 h-10 rounded-xl bg-teal-soft flex items-center justify-center text-teal-deep">
      <Icon size={20} strokeWidth={2.2} />
    </div>
    <div>
      <span className="block text-[15px] font-bold text-ink tracking-tight">{label}</span>
      <span className="block text-[10px] text-ink-3 font-medium mt-0.5">{sub}</span>
    </div>
  </button>
)

export default function MenuScreen({ onNavigate, isBluetoothConnected }) {
  return (
    <div className="flex flex-col h-full text-ink">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <button
            className="p-2 bg-surface hover:bg-teal-soft rounded-full border border-line cursor-pointer transition-colors active:scale-95"
            onClick={() => onNavigate('cover')}
            title="통합 홈으로"
          >
            <ChevronLeft size={18} className="text-ink-2" strokeWidth={2.5} />
          </button>
          <div>
            <h1 className="text-xl font-black tracking-tight text-ink leading-none">
              TONO<span className="text-teal">-i</span>
            </h1>
            <span className="text-[10px] font-semibold text-ink-3">스마트 안압계 CVT200</span>
          </div>
        </div>
        <button
          className="p-2 bg-surface hover:bg-teal-soft rounded-full border border-line cursor-pointer transition-colors"
          onClick={() => onNavigate('guide')}
          title="사용 가이드"
        >
          <Info size={20} className="text-teal" />
        </button>
      </div>

      {/* 메뉴 그리드 */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-3.5 w-full mb-5">
          <MenuButton icon={RefreshCw} label="기기연결" sub="측정 · 기록 입력" onClick={() => onNavigate('record')} />
          <MenuButton icon={Eye} label="안압관리" sub="목표 안압 설정" onClick={() => onNavigate('management')} />
          <MenuButton icon={FileText} label="기록확인" sub="측정 이력 조회" onClick={() => onNavigate('history')} />
          <MenuButton icon={Upload} label="기록전송" sub="CSV 내보내기" onClick={() => onNavigate('send')} />

          {/* 알람설정 — 하단 가로 배치 */}
          <button
            className="col-span-2 flex items-center gap-4 p-4 bg-surface border border-line rounded-2xl card-shadow cursor-pointer active:scale-[0.98] hover:border-teal transition-all"
            onClick={() => onNavigate('alarm')}
          >
            <div className="w-10 h-10 rounded-xl bg-violet-soft flex items-center justify-center text-violet">
              <Bell size={20} strokeWidth={2.2} />
            </div>
            <div className="text-left">
              <span className="block text-[15px] font-bold text-ink tracking-tight">알람설정</span>
              <span className="block text-[10px] text-ink-3 font-medium mt-0.5">정기 측정 일정 관리</span>
            </div>
          </button>
        </div>
      </div>

      {/* 연결 상태 바 */}
      <div className="mt-auto mb-2">
        <button
          className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 bg-surface border border-line rounded-2xl cursor-pointer hover:border-teal transition-colors"
          onClick={() => onNavigate('record')}
        >
          <span className="relative flex w-2.5 h-2.5">
            {isBluetoothConnected && (
              <span className="absolute inline-flex w-full h-full rounded-full bg-ok animate-ping opacity-70"></span>
            )}
            <span className={`relative inline-flex w-2.5 h-2.5 rounded-full ${isBluetoothConnected ? 'bg-ok' : 'bg-high'}`}></span>
          </span>
          <span className="text-xs font-semibold text-ink-2">
            {isBluetoothConnected ? '연결된 기기: CVT200-A' : '연결된 기기 없음 · 터치하여 연결'}
          </span>
        </button>
      </div>
    </div>
  )
}
