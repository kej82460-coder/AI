import React from 'react';
import { FileText, Phone, CheckSquare, Sparkles, MessageSquareText, Home, ShieldCheck, Lock } from 'lucide-react';
import { CenterInfo } from '../types';

interface HeaderProps {
  centerInfo: CenterInfo;
  activeView: 'landing' | 'chat';
  isApiKeyApproved: boolean;
  onSelectView: (view: 'landing' | 'chat') => void;
  onOpenNotice: () => void;
  onOpenContact: () => void;
  onOpenSelfCheck: () => void;
  onOpenAuthCard?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  centerInfo,
  activeView,
  isApiKeyApproved,
  onSelectView,
  onOpenNotice,
  onOpenContact,
  onOpenSelfCheck,
  onOpenAuthCard,
}) => {
  const handleTabClick = (view: 'landing' | 'chat') => {
    if (view === 'chat' && !isApiKeyApproved) {
      if (onOpenAuthCard) onOpenAuthCard();
      return;
    }
    onSelectView(view);
  };

  const handleActionClick = (action: () => void) => {
    if (!isApiKeyApproved) {
      if (onOpenAuthCard) onOpenAuthCard();
      return;
    }
    action();
  };

  return (
    <header className="bg-[#2C3E35] text-white shadow-md sticky top-0 z-30 border-b border-[#3D5245]">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Brand & Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectView('landing')}>
            <div className="bg-emerald-500/20 p-2.5 rounded-2xl backdrop-blur-sm border border-emerald-400/30 shadow-inner flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-[#1E2E26] text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                  {centerInfo.name}
                </span>
                <span className="text-[11px] text-stone-300 font-medium hidden sm:inline-block">
                  2026 직업교육훈련 AI 가이드
                </span>
                
                {/* API Key Approval Status Badge */}
                <button
                  onClick={onOpenAuthCard}
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border transition-all flex items-center space-x-1 cursor-pointer ${
                    isApiKeyApproved
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30 hover:bg-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-400/40 hover:bg-amber-500/30 animate-pulse'
                  }`}
                  title={isApiKeyApproved ? 'Gemini API 승인됨 (클릭하여 관리)' : 'Gemini API 미승인 (클릭하여 승인)'}
                >
                  {isApiKeyApproved ? (
                    <>
                      <ShieldCheck className="w-3 h-3 text-emerald-300" />
                      <span>API 승인 완료</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3 text-amber-300" />
                      <span>API 미승인</span>
                    </>
                  )}
                </button>
              </div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white mt-0.5">
                파주새일센터 직업교육훈련 신청 가이드봇
              </h1>
            </div>
          </div>

          {/* Navigation & Action Buttons */}
          <div className="flex items-center justify-between md:justify-end gap-2 flex-wrap">
            {/* View Switcher Tabs */}
            <div className="bg-[#1E2E26] p-1 rounded-xl border border-white/10 flex items-center">
              <button
                onClick={() => handleTabClick('landing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeView === 'landing'
                    ? 'bg-emerald-500 text-stone-950 shadow-xs'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>소개 & 강점</span>
              </button>

              <button
                onClick={() => handleTabClick('chat')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeView === 'chat'
                    ? 'bg-emerald-500 text-stone-950 shadow-xs'
                    : isApiKeyApproved
                    ? 'text-stone-300 hover:text-white hover:bg-white/5'
                    : 'text-amber-300/80 hover:text-amber-200 hover:bg-amber-500/10'
                }`}
              >
                {isApiKeyApproved ? (
                  <MessageSquareText className="w-3.5 h-3.5" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-amber-300" />
                )}
                <span>AI 상담봇</span>
              </button>
            </div>

            {/* Quick Action Modals */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleActionClick(onOpenSelfCheck)}
                className={`inline-flex items-center space-x-1 text-xs px-3 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer ${
                  isApiKeyApproved
                    ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-stone-800 text-stone-400 border border-stone-700 font-medium'
                }`}
              >
                {isApiKeyApproved ? (
                  <CheckSquare className="w-3.5 h-3.5 text-stone-950" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span className="hidden sm:inline">신청자격 </span>
                <span>셀프체크</span>
              </button>

              <button
                onClick={() => handleActionClick(onOpenNotice)}
                className="inline-flex items-center space-x-1 bg-white/10 hover:bg-white/20 text-white font-medium text-xs px-2.5 py-1.5 rounded-xl border border-white/15 transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-300" />
                <span className="hidden sm:inline">모집공고</span>
              </button>

              <button
                onClick={() => handleActionClick(onOpenContact)}
                className="inline-flex items-center space-x-1 bg-white/10 hover:bg-white/20 text-white font-medium text-xs px-2.5 py-1.5 rounded-xl border border-white/15 transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-300" />
                <span className="hidden sm:inline">문의처</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};


