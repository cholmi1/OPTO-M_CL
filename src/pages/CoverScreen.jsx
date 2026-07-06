import React from 'react'
import { Eye, Droplets, Activity, ClipboardList, ChevronRight } from 'lucide-react'

export default function CoverScreen({ onNavigate }) {
  const menuItems = [
    {
      id: 'menu',
      title: '안압측정',
      desc: 'TONO-i 안압계 측정 및 관리',
      icon: Eye,
      iconBg: 'bg-teal-soft',
      iconColor: 'text-teal-deep'
    },
    {
      id: 'idrop',
      title: '점안관리',
      desc: '스마트 점안 기기 및 준수 현황',
      icon: Droplets,
      iconBg: 'bg-violet-soft',
      iconColor: 'text-violet'
    },
    {
      id: 'bio',
      title: '생체신호',
      desc: '혈압, 혈당, 수면 등 건강 지표',
      icon: Activity,
      iconBg: 'bg-high-soft',
      iconColor: 'text-high'
    },
    {
      id: 'survey',
      title: '문진표',
      desc: '생활습관 정기 문진 및 피드백',
      icon: ClipboardList,
      iconBg: 'bg-warn-soft',
      iconColor: 'text-warn'
    }
  ]

  return (
    <div className="flex flex-col h-full bg-app-bg text-ink p-6 justify-between select-none">
      {/* 상단 로고 */}
      <div className="text-center mt-6">
        <h1 className="text-3xl font-black tracking-tight text-ink">
          OPTO<span className="text-teal">-M</span>
        </h1>
        <p className="text-xs font-semibold text-ink-2 mt-1.5">
          통합 녹내장 관리 솔루션
        </p>
      </div>

      {/* 메뉴 카드 */}
      <div className="flex flex-col gap-3.5 my-6">
        {menuItems.map((item, i) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{ animationDelay: `${i * 60}ms` }}
              className="rise-in w-full flex items-center p-4 bg-surface border border-line rounded-3xl card-shadow hover:border-teal transition-all duration-300 group cursor-pointer active:scale-[0.98] text-left"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center ${item.iconColor} group-hover:scale-105 transition-transform duration-300`}>
                <Icon size={26} className="stroke-[2.2]" />
              </div>

              <div className="ml-4 flex-1">
                <h3 className="text-base font-bold text-ink">
                  {item.title}
                </h3>
                <p className="text-xs text-ink-2 mt-0.5 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <ChevronRight
                size={18}
                className="text-ink-3 group-hover:text-teal group-hover:translate-x-1 transition-all mr-1"
                strokeWidth={2.5}
              />
            </button>
          )
        })}
      </div>

      {/* 하단 정보 */}
      <div className="text-center mb-2">
        <p className="text-[10px] text-ink-3 font-medium">
          © CNV Biotech. All Rights Reserved.
        </p>
      </div>
    </div>
  )
}
