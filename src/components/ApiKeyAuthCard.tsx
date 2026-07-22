import React, { useState } from 'react';
import { Key, ShieldCheck, Lock, AlertCircle, CheckCircle2, ExternalLink, Loader2, RefreshCw, Eye, EyeOff, Sparkles } from 'lucide-react';

interface ApiKeyAuthCardProps {
  apiKey: string;
  isApproved: boolean;
  hasServerKey?: boolean;
  onApproveKey: (keyToTest: string) => Promise<{ success: boolean; message: string }>;
  onResetKey: () => void;
}

export const ApiKeyAuthCard: React.FC<ApiKeyAuthCardProps> = ({
  apiKey,
  isApproved,
  hasServerKey = false,
  onApproveKey,
  onResetKey,
}) => {
  const [inputKey, setInputKey] = useState<string>(apiKey || '');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleVerify = async (keyToUse?: string) => {
    const targetKey = keyToUse !== undefined ? keyToUse : inputKey.trim();
    setIsVerifying(true);
    setFeedback({ type: null, message: '' });

    try {
      const result = await onApproveKey(targetKey);
      if (result.success) {
        setFeedback({
          type: 'success',
          message: result.message || 'Gemini API Key가 성공적으로 승인되었습니다!',
        });
      } else {
        setFeedback({
          type: 'error',
          message: result.message || 'Gemini API Key 승인에 실패하였습니다. 키를 확인해 주세요.',
        });
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || '승인 확인 도중 네트워크 오류가 발생했습니다.',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div
      id="api-key-auth-section"
      className={`rounded-3xl transition-all duration-300 overflow-hidden shadow-xl border ${
        isApproved
          ? 'bg-gradient-to-br from-[#1E2E26] via-[#2C3E35] to-[#1E2E26] border-emerald-500/40 text-white'
          : 'bg-stone-900 border-amber-500/50 text-white ring-4 ring-amber-500/10'
      }`}
    >
      <div className="p-6 sm:p-8 space-y-6">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center space-x-3.5">
            <div
              className={`p-3 rounded-2xl border flex items-center justify-center shrink-0 ${
                isApproved
                  ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                  : 'bg-amber-500/20 border-amber-400/40 text-amber-300 animate-pulse'
              }`}
            >
              {isApproved ? <ShieldCheck className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    isApproved
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                  }`}
                >
                  {isApproved ? '🔑 API 승인 완료' : '🔒 필수 접근 승인 필요'}
                </span>
                <span className="text-xs text-stone-300 font-medium hidden sm:inline-block">
                  Google Gemini API 인증
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-1">
                {isApproved ? '파주새일센터 AI 가이드 서비스 활성화됨' : 'Gemini API Key 승인 및 웹앱 이용 인증'}
              </h2>
            </div>
          </div>

          {isApproved && (
            <button
              onClick={onResetKey}
              className="inline-flex items-center space-x-1.5 text-xs bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white px-3 py-1.5 rounded-xl border border-white/15 transition-all cursor-pointer shrink-0 font-bold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>API Key 변경 / 승인 해제</span>
            </button>
          )}
        </div>

        {/* Notice description */}
        <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-medium">
          {isApproved ? (
            <span className="text-emerald-200">
              ✨ Gemini API 승인이 완료되어 파주새일센터 직업교육훈련 AI 상담봇, 모집공고 상세, 자격 셀프체크 등 모든 메뉴와 기능을 자유롭게 이용하실 수 있습니다.
            </span>
          ) : (
            <span>
              파주새일센터 2026 직업교육훈련 AI 가이드북을 이용하시려면 **Google Gemini API Key 승인**이 필요합니다. API Key를 입력하고 승인을 받으시면 대화형 AI 상담 및 모든 안내 서비스가 활성화됩니다.
            </span>
          )}
        </p>

        {/* Unapproved State: Form Input & Options */}
        {!isApproved && (
          <div className="space-y-4 pt-1">
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-200 flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <Key className="w-4 h-4 text-emerald-400" />
                  <span>Gemini API Key (AIzaSy...) 입력</span>
                </span>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-300 hover:text-emerald-200 text-xs font-bold flex items-center space-x-1 hover:underline"
                >
                  <span>무료 API Key 발급받기</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="Google AI Studio에서 발급받은 API 키를 입력하세요 (예: AIzaSy...)"
                  className="w-full bg-black/40 border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 text-white text-sm rounded-2xl py-3.5 pl-4 pr-12 outline-none transition-all placeholder:text-stone-500 font-mono"
                  disabled={isVerifying}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Verification Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => handleVerify()}
                disabled={isVerifying || (!inputKey.trim() && !hasServerKey)}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm inline-flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer ${
                  inputKey.trim() && !isVerifying
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 hover:scale-[1.01] active:scale-[0.99]'
                    : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed'
                }`}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-stone-900" />
                    <span>Gemini API Key 검증 중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-stone-950" />
                    <span>입력한 API Key로 승인받기</span>
                  </>
                )}
              </button>

              {hasServerKey && (
                <button
                  onClick={() => handleVerify('')}
                  disabled={isVerifying}
                  className="py-3.5 px-5 bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/15 backdrop-blur-md transition-all cursor-pointer inline-flex items-center justify-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>시스템 기본 환경키로 자동 승인</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Feedback Alert Box */}
        {feedback.message && (
          <div
            className={`p-4 rounded-2xl border flex items-start space-x-3 text-xs sm:text-sm font-medium ${
              feedback.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="leading-relaxed font-semibold">{feedback.message}</div>
          </div>
        )}

        {/* Approval Success Status Banner */}
        {isApproved && (
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 flex items-center space-x-3 text-xs sm:text-sm text-emerald-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              **승인 상태:** Gemini API 인증이 완료되어 모든 대화 및 메뉴 사용이 허용되었습니다. 아래 메뉴 또는 AI 상담봇을 자유롭게 이용하세요!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
