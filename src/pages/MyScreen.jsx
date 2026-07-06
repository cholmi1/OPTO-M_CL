import { GlassCard } from '../components/ui/GlassCard'
import {
  User, ChevronRight, Eye, FileText, TrendingUp, Upload, Bell,
  Droplets, Activity, ClipboardList, BookOpen, Bluetooth, BluetoothOff, LayoutDashboard
} from 'lucide-react'

const Row = ({ icon: Icon, iconBg, iconColor, label, sub, onClick, last }) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-app-bg transition-colors text-left ${!last ? 'border-b border-line' : ''}`}
    onClick={onClick}
  >
    <span className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center ${iconColor} shrink-0`}>
      <Icon size={15} strokeWidth={2.2} />
    </span>
    <span className="flex-1">
      <span className="block text-[13px] font-bold text-ink">{label}</span>
      {sub && <span className="block text-[10px] text-ink-3 font-medium mt-0.5">{sub}</span>}
    </span>
    <ChevronRight size={15} className="text-ink-3" />
  </button>
)

export default function MyScreen({ onNavigate, isBluetoothConnected }) {
  return (
    <div className="flex flex-col h-full text-ink">
      <h2 className="text-xl font-extrabold tracking-tight mb-4">전체</h2>

      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3.5 pb-3">

        {/* 프로필 카드 */}
        <GlassCard className="p-4 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-teal-soft flex items-center justify-center">
            <User size={22} className="text-teal-deep" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-extrabold text-ink">OPTO-M 회원님</p>
            <p className="text-[10px] text-ink-3 font-medium mt-0.5">녹내장 자가관리 · 가입 2026년</p>
          </div>
          <div className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-full ${
            isBluetoothConnected ? 'bg-teal-soft text-teal-deep' : 'bg-app-bg text-ink-3 border border-line'
          }`}>
            {isBluetoothConnected ? <Bluetooth size={11} /> : <BluetoothOff size={11} />}
            {isBluetoothConnected ? 'CVT200-A' : '미연결'}
          </div>
        </GlassCard>

        {/* 안압 관리 그룹 */}
        <div>
          <p className="text-[11px] font-extrabold text-ink-3 px-1 mb-1.5">안압 관리 (TONO-i)</p>
          <GlassCard className="p-0 overflow-hidden">
            <Row icon={Eye} iconBg="bg-teal-soft" iconColor="text-teal-deep" label="측정하기" sub="기기연결 · 수기 입력" onClick={() => onNavigate('record')} />
            <Row icon={FileText} iconBg="bg-teal-soft" iconColor="text-teal-deep" label="안압 기록" sub="측정 이력 조회 · 편집" onClick={() => onNavigate('history')} />
            <Row icon={TrendingUp} iconBg="bg-teal-soft" iconColor="text-teal-deep" label="기간별 분석" onClick={() => onNavigate('analysis')} />
            <Row icon={Eye} iconBg="bg-teal-soft" iconColor="text-teal-deep" label="목표 안압 설정" onClick={() => onNavigate('management')} />
            <Row icon={Upload} iconBg="bg-teal-soft" iconColor="text-teal-deep" label="기록 전송 (CSV)" onClick={() => onNavigate('send')} />
            <Row icon={Bell} iconBg="bg-violet-soft" iconColor="text-violet" label="측정 알람" onClick={() => onNavigate('alarm')} last />
          </GlassCard>
        </div>

        {/* 통합 케어 그룹 */}
        <div>
          <p className="text-[11px] font-extrabold text-ink-3 px-1 mb-1.5">통합 케어</p>
          <GlassCard className="p-0 overflow-hidden">
            <Row icon={Droplets} iconBg="bg-violet-soft" iconColor="text-violet" label="점안관리 (IDROPM)" sub="스마트 점안 준수 현황" onClick={() => onNavigate('idrop')} />
            <Row icon={Activity} iconBg="bg-high-soft" iconColor="text-high" label="생체신호" sub="혈압 · 혈당 · 수면 · 심박" onClick={() => onNavigate('bio')} />
            <Row icon={ClipboardList} iconBg="bg-warn-soft" iconColor="text-warn" label="생활습관 문진표" sub="12문항 · 맞춤 피드백" onClick={() => onNavigate('survey')} last />
          </GlassCard>
        </div>

        {/* 지원 그룹 */}
        <div>
          <p className="text-[11px] font-extrabold text-ink-3 px-1 mb-1.5">지원</p>
          <GlassCard className="p-0 overflow-hidden">
            <Row icon={BookOpen} iconBg="bg-app-bg" iconColor="text-ink-2" label="사용 가이드" onClick={() => onNavigate('guide')} />
            <Row icon={LayoutDashboard} iconBg="bg-app-bg" iconColor="text-ink-2" label="클래식 메뉴 보기" sub="기존 표지 · 메뉴 화면" onClick={() => onNavigate('cover')} last />
          </GlassCard>
        </div>

        <p className="text-center text-[9px] text-ink-3 font-medium pt-1">
          OPTO-M v2.0 · © CNV Biotech
        </p>
      </div>
    </div>
  )
}
