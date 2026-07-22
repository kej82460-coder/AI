import React from 'react';
import { HelpCircle, Sparkles, CheckSquare, DollarSign, Clock, Gift, FileText } from 'lucide-react';

interface QuickButtonsProps {
  onSelectPrompt: (promptText: string) => void;
  onOpenSelfCheck: () => void;
}

export const QuickButtons: React.FC<QuickButtonsProps> = ({
  onSelectPrompt,
  onOpenSelfCheck,
}) => {
  const quickPrompts = [
    {
      label: "신청하고 싶어요 (신청절차 안내)",
      prompt: "이 과정 신청하고 싶어요. 어떻게 하면 되나요?",
      icon: Sparkles,
      color: "bg-[#3D5245] text-white hover:bg-[#2C3E35] border-[#3D5245] font-bold shadow-xs",
    },
    {
      label: "신청 제한요건 3가지 셀프체크",
      prompt: "SELF_CHECK", // Special trigger for modal
      icon: CheckSquare,
      color: "bg-amber-100 text-amber-950 hover:bg-amber-200 border-amber-300 font-bold",
    },
    {
      label: "교육비 얼마예요?",
      prompt: "교육비 얼마예요?",
      icon: DollarSign,
      color: "bg-white text-[#2C3E35] hover:bg-[#EFEFD8] border-[#3D5245]/20 font-bold",
    },
    {
      label: "선착순 마감인가요?",
      prompt: "빨리 신청해야 자리가 마감 안 되나요?",
      icon: Clock,
      color: "bg-white text-[#2C3E35] hover:bg-[#EFEFD8] border-[#3D5245]/20 font-bold",
    },
    {
      label: "훈련수당(참여/취업성공수당)",
      prompt: "교육받으면 돈도 주나요? 훈련수당 지급 조건이 어떻게 되나요?",
      icon: Gift,
      color: "bg-white text-[#2C3E35] hover:bg-[#EFEFD8] border-[#3D5245]/20 font-bold",
    },
    {
      label: "제출서류 및 선발방법",
      prompt: "제출해야 하는 서류와 선발 절차는 어떻게 되나요?",
      icon: FileText,
      color: "bg-white text-[#2C3E35] hover:bg-[#EFEFD8] border-[#3D5245]/20 font-bold",
    },
  ];

  return (
    <div className="bg-white/90 border-t border-[#5A5A40]/15 p-3 sm:p-4">
      <div className="max-w-5xl mx-auto space-y-2">
        <div className="flex items-center space-x-1.5 text-xs font-semibold text-stone-500">
          <HelpCircle className="w-3.5 h-3.5 text-[#5A5A40]" />
          <span>자주 하는 질문 (클릭 시 바로 답변):</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          {quickPrompts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  if (item.prompt === "SELF_CHECK") {
                    onOpenSelfCheck();
                  } else {
                    onSelectPrompt(item.prompt);
                  }
                }}
                className={`inline-flex items-center space-x-1.5 text-xs sm:text-sm px-3.5 py-1.5 rounded-full border transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer ${item.color}`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
