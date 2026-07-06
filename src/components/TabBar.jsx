import { Home, Eye, BarChart3, LayoutGrid } from 'lucide-react'

const TABS = [
  { id: 'home', label: '홈', icon: Home },
  { id: 'record', label: '측정', icon: Eye },
  { id: 'report', label: '리포트', icon: BarChart3 },
  { id: 'my', label: '전체', icon: LayoutGrid },
]

export function TabBar({ current, onNavigate }) {
  return (
    <nav className="shrink-0 bg-surface border-t border-line flex items-stretch px-2 pb-2 pt-1 z-30">
      {TABS.map(tab => {
        const Icon = tab.icon
        const active = current === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 cursor-pointer group"
          >
            <span className={`flex items-center justify-center w-12 h-7 rounded-full transition-colors ${
              active ? 'bg-teal-soft' : 'group-hover:bg-app-bg'
            }`}>
              <Icon size={19} strokeWidth={active ? 2.4 : 2}
                className={active ? 'text-teal-deep' : 'text-ink-3'} />
            </span>
            <span className={`text-[10px] font-bold ${active ? 'text-teal-deep' : 'text-ink-3'}`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
