import React, { useState } from 'react'
import { Mail, Lock, LogIn, ShieldCheck } from 'lucide-react'

export default function LoginScreen({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    // 프론트엔드 모의 데모이므로 바로 커버 페이지로 통과시킵니다.
    onNavigate('home')
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white via-teal-soft/30 to-app-bg p-6 justify-between select-none overflow-y-auto scrollbar-hide">
      
      {/* 상단 타이틀 로고 영역 */}
      <div className="text-center mt-6">
        <div className="w-12 h-12 rounded-2xl bg-teal flex items-center justify-center text-white shadow-lg shadow-teal/25 mx-auto mb-3">
          <ShieldCheck size={26} />
        </div>
        <h1 className="text-2xl font-black tracking-wider text-ink">
          OPTO-M
        </h1>
        <p className="text-[10px] font-bold text-ink-3 mt-1 uppercase tracking-widest">
          Integrated Care Login
        </p>
      </div>

      {/* 이메일 로그인 박스 */}
      <form onSubmit={handleLoginSubmit} className="bg-surface border border-line rounded-3xl p-5 card-shadow space-y-3.5 my-4">
        <h3 className="text-xs font-black text-ink uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Mail size={12} className="text-teal" />
          이메일 로그인
        </h3>
        
        {/* 이메일 입력 */}
        <div className="relative">
          <input 
            type="email" 
            placeholder="이메일 주소"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-app-bg border border-line rounded-2xl py-2.5 pl-10 pr-4 text-xs font-semibold text-ink outline-none focus:border-teal focus:bg-white transition-all"
            required
          />
          <Mail size={14} className="absolute left-3.5 top-3.5 text-ink-3" />
        </div>

        {/* 비밀번호 입력 */}
        <div className="relative">
          <input 
            type="password" 
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-app-bg border border-line rounded-2xl py-2.5 pl-10 pr-4 text-xs font-semibold text-ink outline-none focus:border-teal focus:bg-white transition-all"
            required
          />
          <Lock size={14} className="absolute left-3.5 top-3.5 text-ink-3" />
        </div>

        {/* 로그인 버튼 */}
        <button 
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-teal hover:bg-teal-deep text-white text-xs font-extrabold py-3 rounded-2xl transition-all cursor-pointer shadow-md shadow-teal/20 active:scale-[0.98]"
        >
          <LogIn size={14} />
          로그인
        </button>
      </form>

      {/* 소셜 로그인 구분선 및 버튼 */}
      <div className="space-y-3 my-2">
        <div className="flex items-center justify-center gap-2.5 text-[10px] font-bold text-ink-3 uppercase tracking-widest">
          <div className="h-px bg-line flex-1"></div>
          <span>소셜 로그인</span>
          <div className="h-px bg-line flex-1"></div>
        </div>

        {/* 소셜 버튼 그리드 */}
        <div className="grid grid-cols-4 gap-2">
          
          {/* 구글 */}
          <button 
            type="button"
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center justify-center p-2 bg-surface border border-line rounded-2xl cursor-pointer hover:bg-app-bg transition-colors active:scale-95 group"
          >
            <div className="w-8 h-8 rounded-full bg-app-bg flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C18.155 2.502 15.427 1.5 12.24 1.5c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5c6.05 0 10.07-4.237 10.07-10.237 0-.69-.074-1.21-.16-1.727H12.24z"/>
              </svg>
            </div>
            <span className="text-[9px] font-bold text-ink-2 mt-1.5">Google</span>
          </button>

          {/* 카카오 */}
          <button 
            type="button"
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center justify-center p-2 bg-[#FEE500] border border-[#FEE500] rounded-2xl cursor-pointer hover:brightness-95 transition-all active:scale-95 group"
          >
            <div className="w-8 h-8 rounded-full bg-[#371D1F]/5 flex items-center justify-center group-hover:scale-105 transition-transform text-[#371D1F]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.012l-.841 3.127a.382.382 0 0 0 .584.417l3.707-2.477c.414.056.842.086 1.28.086 4.97 0 9-3.185 9-7.115S16.97 3 12 3z"/>
              </svg>
            </div>
            <span className="text-[9px] font-bold text-[#371D1F] mt-1.5">Kakao</span>
          </button>

          {/* 네이버 */}
          <button 
            type="button"
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center justify-center p-2 bg-[#03C75A] border border-[#03C75A] rounded-2xl cursor-pointer hover:brightness-95 transition-all active:scale-95 group"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-105 transition-transform text-white">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.2 3H12l-4.5 6.45V3H3v18h4.2l4.5-6.45V21H16.2V3z"/>
              </svg>
            </div>
            <span className="text-[9px] font-bold text-white mt-1.5">Naver</span>
          </button>

          {/* 메타 (Meta) */}
          <button 
            type="button"
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center justify-center p-2 bg-[#0866FF] border border-[#0866FF] rounded-2xl cursor-pointer hover:brightness-95 transition-all active:scale-95 group"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-105 transition-transform text-white">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </div>
            <span className="text-[9px] font-bold text-white mt-1.5">Meta</span>
          </button>

        </div>
      </div>

      {/* 비회원 로그인 버튼 및 하단 푸터 */}
      <div className="flex flex-col items-center gap-4 my-2 shrink-0">
        <button 
          type="button"
          onClick={() => onNavigate('home')}
          className="text-xs font-bold text-teal-deep hover:text-teal underline decoration-2 cursor-pointer active:scale-95 py-1"
        >
          비회원으로 시작하기
        </button>
        <span className="text-[9px] text-ink-3 font-medium tracking-tight">
          개인정보는 의료법에 의해 안전하게 보호됩니다.
        </span>
      </div>

    </div>
  )
}
