import React, { useState } from 'react';
import { X, CheckSquare, AlertTriangle, CheckCircle2, PhoneCall, Send, Info } from 'lucide-react';
import { CenterInfo } from '../types';

interface SelfCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  centerInfo: CenterInfo;
  onSendCheckToBot: (message: string) => void;
}

export const SelfCheckModal: React.FC<SelfCheckModalProps> = ({
  isOpen,
  onClose,
  centerInfo,
  onSendCheckToBot,
}) => {
  const [isEmployed, setIsEmployed] = useState<boolean | null>(null);
  const [hasBusinessLicense, setHasBusinessLicense] = useState<boolean | null>(null);
  const [isOtherTrainingActive, setIsOtherTrainingActive] = useState<boolean | null>(null);

  if (!isOpen) return null;

  const handleReset = () => {
    setIsEmployed(null);
    setHasBusinessLicense(null);
    setIsOtherTrainingActive(null);
  };

  const isAllAnswered = isEmployed !== null && hasBusinessLicense !== null && isOtherTrainingActive !== null;
  const isAnyRestricted = isEmployed === true || hasBusinessLicense === true || isOtherTrainingActive === true;

  const handleSendToBot = () => {
    let text = "신청 제한요건 세 가지 답변 드려요:\n";
    text += `1. 고용보험 가입 직장인 여부: ${isEmployed ? "예 (가입 중)" : "아니오 (미가입)"}\n`;
    text += `2. 사업자등록증 소유 여부: ${hasBusinessLicense ? "예 (보유)" : "아니오 (미보유)"}\n`;
    text += `3. 다른 국비지원 훈련 참여 여부: ${isOtherTrainingActive ? "예 (참여 중)" : "아니오 (미참여)"}\n`;
    text += "신청 가능 여부와 다음 방문 절차를 안내해 주세요.";

    onSendCheckToBot(text);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#3D5245] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="bg-white/10 p-2 rounded-xl">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                직업교육훈련 신청 제한요건 3가지 셀프체크
              </h2>
              <p className="text-xs text-stone-200 mt-0.5">
                신청 가능 여부를 미리 점검해 보세요
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-stone-800 text-sm">
          <div className="bg-[#EFEFD8] border border-[#3D5245]/20 rounded-xl p-3.5 text-xs text-[#1E2E26] flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-[#3D5245] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              본 직업교육훈련은 미취업 여성의 취업을 지원하는 국비 과정으로, 아래 항목 중 하나라도 해당하시는 경우 **신청이 제한되거나 센터 확인이 필요**할 수 있습니다.
            </p>
          </div>

          {/* Question 1 */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-2.5">
            <div className="font-semibold text-stone-900 flex items-start space-x-2">
              <span className="bg-[#3D5245] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</span>
              <span>현재 직장에 다니고 계신가요? (고용보험 가입 상태)</span>
            </div>
            <div className="flex gap-2 pl-7">
              <button
                onClick={() => setIsEmployed(true)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  isEmployed === true
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                }`}
              >
                예 (재직 중)
              </button>
              <button
                onClick={() => setIsEmployed(false)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  isEmployed === false
                    ? 'bg-[#3D5245] text-white border-[#3D5245] shadow-xs'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                }`}
              >
                아니오 (미취업)
              </button>
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-2.5">
            <div className="font-semibold text-stone-900 flex items-start space-x-2">
              <span className="bg-[#3D5245] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</span>
              <span>사업자등록증을 가지고 계신가요?</span>
            </div>
            <div className="flex gap-2 pl-7">
              <button
                onClick={() => setHasBusinessLicense(true)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  hasBusinessLicense === true
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                }`}
              >
                예 (사업자 보유)
              </button>
              <button
                onClick={() => setHasBusinessLicense(false)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  hasBusinessLicense === false
                    ? 'bg-[#3D5245] text-white border-[#3D5245] shadow-xs'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                }`}
              >
                아니오 (미보유)
              </button>
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-2.5">
            <div className="font-semibold text-stone-900 flex items-start space-x-2">
              <span className="bg-[#3D5245] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">3</span>
              <span>현재 다른 국비지원 훈련에 참여 중이신가요?</span>
            </div>
            <div className="flex gap-2 pl-7">
              <button
                onClick={() => setIsOtherTrainingActive(true)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  isOtherTrainingActive === true
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                }`}
              >
                예 (타 훈련 수강 중)
              </button>
              <button
                onClick={() => setIsOtherTrainingActive(false)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  isOtherTrainingActive === false
                    ? 'bg-[#3D5245] text-white border-[#3D5245] shadow-xs'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                }`}
              >
                아니오 (미참여)
              </button>
            </div>
          </div>

          {/* Live Preview Result */}
          {isAllAnswered && (
            <div className={`p-4 rounded-xl border ${
              isAnyRestricted
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-emerald-50 border-emerald-300 text-emerald-950'
            }`}>
              <div className="flex items-center space-x-2 font-bold mb-1">
                {isAnyRestricted ? (
                  <>
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>신청 제한요건 확인 필요</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>제한요건 미해당 (신청 유력)</span>
                  </>
                )}
              </div>
              <p className="text-xs leading-relaxed font-medium">
                {isAnyRestricted
                  ? `체크하신 항목 중 예(해당)가 있어 신청이 제한될 수 있습니다. 방문·신청 전 파주새일센터 전화 확인(${centerInfo.phone})을 권해드립니다.`
                  : "세 가지 항목에 모두 해당하지 않아 신청 제한요건에는 해당하지 않으실 것으로 보여요 (최종 판정은 센터 방문 후 이뤄집니다)."}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-2 shrink-0">
          <button
            onClick={handleReset}
            className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
          >
            초기화
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              닫기
            </button>
            <button
              onClick={handleSendToBot}
              disabled={!isAllAnswered}
              className={`px-4 py-2 font-semibold text-xs rounded-xl inline-flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer ${
                isAllAnswered
                  ? 'bg-[#3D5245] hover:bg-[#2C3E35] text-white'
                  : 'bg-stone-300 text-stone-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>챗봇에게 답변 전송하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
