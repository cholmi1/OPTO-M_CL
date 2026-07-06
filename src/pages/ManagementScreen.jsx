import { useState } from 'react'
import { Eye } from 'lucide-react'
import { GlassCard } from '../components/ui/GlassCard'
import { cn } from '../lib/utils'

export default function ManagementScreen({ onNavigate }) {
    const [selectedEye, setSelectedEye] = useState('left')
    const [targetPressure, setTargetPressure] = useState('15')
    const [maxPressure, setMaxPressure] = useState('18')
    const [minPressure, setMinPressure] = useState('12')

    const SettingRow = ({ label, value, onChange, last }) => (
        <div className={cn("flex justify-between items-center px-4 py-4", !last && "border-b border-line")}>
            <span className="text-sm font-semibold text-ink-2">{label}</span>
            <div className="flex items-baseline gap-2">
                <input
                    type="number"
                    value={value}
                    onChange={onChange}
                    className="bg-transparent text-right text-2xl font-black text-ink num w-20 outline-none border-b-2 border-line focus:border-teal pb-0.5"
                />
                <span className="text-xs font-semibold text-ink-3">mmHg</span>
            </div>
        </div>
    )

    return (
        <div className="flex flex-col h-full items-center pt-4 text-ink">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-extrabold tracking-tight">안압 관리</h1>
                <p className="text-xs text-ink-2 mt-1.5 font-medium">눈별 목표 안압과 경계 임계값을 설정합니다</p>
            </div>

            {/* 좌/우안 선택 */}
            <div className="flex w-full gap-4 mb-6">
                <GlassCard
                    className={cn(
                        "flex-1 aspect-square flex flex-col justify-center items-center cursor-pointer transition-all",
                        selectedEye === 'left'
                            ? 'border-teal bg-teal-soft'
                            : 'opacity-70 hover:opacity-100'
                    )}
                    onClick={() => setSelectedEye('left')}
                >
                    <Eye className={cn("w-10 h-10 mb-2", selectedEye === 'left' ? 'text-teal-deep' : 'text-ink-3')} />
                    <span className="text-lg font-extrabold">좌안</span>
                    <span className="text-[10px] font-bold text-ink-3 tracking-widest">OS</span>
                </GlassCard>
                <GlassCard
                    className={cn(
                        "flex-1 aspect-square flex flex-col justify-center items-center cursor-pointer transition-all",
                        selectedEye === 'right'
                            ? 'border-violet bg-violet-soft'
                            : 'opacity-70 hover:opacity-100'
                    )}
                    onClick={() => setSelectedEye('right')}
                >
                    <Eye className={cn("w-10 h-10 mb-2", selectedEye === 'right' ? 'text-violet' : 'text-ink-3')} />
                    <span className="text-lg font-extrabold">우안</span>
                    <span className="text-[10px] font-bold text-ink-3 tracking-widest">OD</span>
                </GlassCard>
            </div>

            {/* 설정 리스트 */}
            <GlassCard className="w-full p-0 mb-8 overflow-hidden">
                <SettingRow label="목표안압" value={targetPressure} onChange={(e) => setTargetPressure(e.target.value)} />
                <SettingRow label="최고안압" value={maxPressure} onChange={(e) => setMaxPressure(e.target.value)} />
                <SettingRow label="최저안압" value={minPressure} onChange={(e) => setMinPressure(e.target.value)} last />
            </GlassCard>

            {/* 버튼 */}
            <div className="w-full grid grid-cols-2 gap-3 mt-auto mb-6">
                <button
                    className="flex items-center justify-center py-4 bg-teal hover:bg-teal-deep rounded-xl cursor-pointer transition-colors shadow-md shadow-teal/20"
                    onClick={() => console.log('Save')}
                >
                    <span className="text-sm font-bold text-white">저장</span>
                </button>
                <button
                    className="flex items-center justify-center py-4 bg-surface border border-line hover:border-teal rounded-xl cursor-pointer transition-colors"
                    onClick={() => onNavigate('menu')}
                >
                    <span className="text-sm font-bold text-ink-2">취소</span>
                </button>
            </div>
        </div>
    )
}
