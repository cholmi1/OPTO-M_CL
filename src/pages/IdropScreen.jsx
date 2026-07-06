import React from 'react'
import { ChevronLeft } from 'lucide-react'

export default function IdropScreen({ onNavigate }) {
  return (
    <div className="flex flex-col h-full bg-app-bg text-ink overflow-hidden select-none">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 h-12 bg-surface border-b border-line shrink-0">
        <button
          onClick={() => onNavigate('cover')}
          className="flex items-center text-ink-2 hover:text-ink transition-colors cursor-pointer active:scale-95"
        >
          <ChevronLeft size={20} className="mr-0.5" strokeWidth={2.5} />
          <span className="text-xs font-bold">홈으로</span>
        </button>
        <h2 className="text-sm font-extrabold text-ink">점안관리 (IDROPM)</h2>
        <div className="w-14"></div>
      </div>

      {/* iframe 영역 */}
      <div className="flex-1 w-full h-full bg-transparent overflow-hidden">
        <iframe
          src="/idrop/index.html?embed=true"
          title="IDROPM"
          className="w-full h-full border-none bg-transparent"
          sandbox="allow-scripts allow-same-origin allow-modals allow-popups"
        />
      </div>
    </div>
  )
}
