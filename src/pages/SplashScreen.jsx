import React from 'react'
import { Eye } from 'lucide-react'

export default function SplashScreen({ onNavigate }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-between p-8 bg-gradient-to-b from-white via-teal-soft/40 to-app-bg cursor-pointer select-none"
      onClick={() => onNavigate('login')}
    >
      {/* 상단 라벨 */}
      <div className="w-full flex justify-between items-center text-teal/70 text-[10px] font-bold tracking-widest uppercase">
        <span>Clinical Standard</span>
        <span>v2.0.0</span>
      </div>

      {/* 중앙 로고 */}
      <div className="flex flex-col items-center text-center rise-in">
        <div className="w-20 h-20 rounded-3xl bg-teal flex items-center justify-center text-white shadow-xl shadow-teal/25 mb-6 relative">
          <Eye size={40} className="stroke-[2]" />
          <div className="absolute -inset-1 rounded-3xl bg-teal/15 animate-ping -z-10"></div>
        </div>

        <h1 className="text-4xl font-black tracking-tight text-ink">
          OPTO<span className="text-teal">-M</span>
        </h1>

        <p className="text-xs font-semibold text-ink-2 mt-2 tracking-wide uppercase">
          Smart Glaucoma Care System
        </p>
        <div className="w-12 h-1 bg-teal rounded-full mx-auto mt-4"></div>
      </div>

      {/* 하단 안내 */}
      <div className="flex flex-col items-center gap-6">
        <p className="text-[11px] font-bold text-teal-deep animate-pulse bg-teal-soft px-4 py-1.5 rounded-full border border-teal/20">
          화면을 터치하시면 시작합니다
        </p>
        <span className="text-[9px] text-ink-3 font-medium tracking-tight">
          Developed in compliance with medical device standards.
        </span>
      </div>
    </div>
  )
}
