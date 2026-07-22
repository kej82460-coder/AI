import React from 'react';
import { ChatMessage } from '../types';
import { Sparkles, User, AlertTriangle, PhoneCall, Info, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

interface ChatMessageItemProps {
  message: ChatMessage;
  onSelectSuggestion?: (suggestion: string) => void;
  onOpenContactModal?: () => void;
  onOpenSelfCheckModal?: () => void;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  onSelectSuggestion,
  onOpenContactModal,
  onOpenSelfCheckModal,
}) => {
  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end my-3">
        <div className="flex items-end space-x-2 max-w-[85%] sm:max-w-[75%]">
          <span className="text-[11px] text-stone-400 mb-1 shrink-0">
            {message.timestamp}
          </span>
          <div className="bg-[#3D5245] text-white font-medium text-sm sm:text-base py-3 px-4 rounded-[24px] rounded-tr-none shadow-xs leading-relaxed whitespace-pre-wrap">
            {message.text}
          </div>
          <div className="w-8 h-8 rounded-full bg-[#EFEFD8] border border-[#3D5245]/20 flex items-center justify-center text-[#3D5245] shrink-0 shadow-2xs">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    );
  }

  // Parse sections in bot message
  const rawText = message.text;

  // Helpers to parse specific tags
  const extractSection = (tag: string): string | null => {
    const pattern = new RegExp(`\\[${tag}\\]([\\s\\S]*?)(?=\\[|이 안내는|$)`, 'i');
    const match = rawText.match(pattern);
    return match ? match[1].trim() : null;
  };

  const summary = extractSection('한눈에 요약');
  const details = extractSection('자세히 안내');
  const warning = extractSection('꼭 확인하세요');
  const contact = extractSection('문의·상담') || extractSection('문의·상담 및 센터');
  
  // Extract citation line at bottom
  const citationMatch = rawText.match(/이 안내는[\s\S]*?바탕으로 합니다\./i) || rawText.match(/이 안내는[\s\S]*?확인/i);
  const citation = citationMatch ? citationMatch[0].trim() : "이 안내는 모집공고 지식베이스를 바탕으로 제공됩니다.";

  // Check if message text is standard plain text without tags
  const hasTags = summary || details || warning || contact;

  return (
    <div className="flex justify-start my-4">
      <div className="flex items-start space-x-2.5 max-w-[92%] sm:max-w-[85%]">
        {/* Bot Avatar */}
        <div className="w-9 h-9 rounded-2xl bg-[#2C3E35] text-white flex items-center justify-center shrink-0 shadow-xs border border-[#3D5245] mt-1">
          <Sparkles className="w-5 h-5 text-emerald-300 animate-pulse" />
        </div>

        <div className="space-y-3">
          {/* Main Content Box */}
          <div className="bg-white border border-[#3D5245]/15 rounded-[24px] rounded-tl-none p-4 sm:p-5 shadow-xs text-stone-800 text-sm sm:text-[15px] leading-relaxed">
            
            {/* If tags are formatted */}
            {hasTags ? (
              <div className="space-y-3.5">
                {/* [한눈에 요약] */}
                {summary && (
                  <div className="bg-[#EFEFD8]/80 border border-[#3D5245]/25 rounded-2xl p-3.5 text-stone-800">
                    <div className="flex items-center space-x-1.5 font-bold text-[#2C3E35] text-xs sm:text-sm mb-1.5">
                      <span className="bg-white px-2 py-0.5 rounded-full text-[#3D5245] text-xs border border-[#3D5245]/20 font-bold">[한눈에 요약]</span>
                    </div>
                    <div className="whitespace-pre-wrap leading-relaxed text-stone-800 font-medium">
                      {summary}
                    </div>
                  </div>
                )}

                {/* [자세히 안내] */}
                {details && (
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5">
                    <div className="flex items-center space-x-1.5 font-bold text-stone-900 text-xs sm:text-sm mb-1.5">
                      <Info className="w-4 h-4 text-[#3D5245]" />
                      <span>[자세히 안내]</span>
                    </div>
                    <div className="whitespace-pre-wrap leading-relaxed text-stone-700">
                      {details}
                    </div>
                  </div>
                )}

                {/* [꼭 확인하세요] */}
                {warning && (
                  <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-3.5">
                    <div className="flex items-center space-x-1.5 font-bold text-amber-900 text-xs sm:text-sm mb-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>[꼭 확인하세요]</span>
                    </div>
                    <div className="whitespace-pre-wrap leading-relaxed text-amber-950 font-medium">
                      {warning}
                    </div>
                  </div>
                )}

                {/* [문의·상담] */}
                {contact && (
                  <div className="bg-[#EFEFD8]/50 border border-[#3D5245]/20 rounded-2xl p-3.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
                      <div className="flex items-center space-x-1.5 font-bold text-[#2C3E35] text-xs sm:text-sm">
                        <PhoneCall className="w-4 h-4 text-[#3D5245]" />
                        <span>[문의·상담]</span>
                      </div>
                      {onOpenContactModal && (
                        <button
                          onClick={onOpenContactModal}
                          className="text-xs bg-[#3D5245] hover:bg-[#2C3E35] text-white font-bold px-3 py-1 rounded-full shadow-2xs transition-colors cursor-pointer"
                        >
                          센터 전화연결 / 위치안내
                        </button>
                      )}
                    </div>
                    <div className="whitespace-pre-wrap leading-relaxed text-stone-800 font-medium">
                      {contact}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Plain text rendering fallback */
              <div className="whitespace-pre-wrap leading-relaxed">
                {rawText}
              </div>
            )}

            {/* Citation footer */}
            <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center space-x-1.5 text-xs text-stone-500 italic font-normal">
              <FileText className="w-3.5 h-3.5 text-[#3D5245] shrink-0" />
              <span>{citation}</span>
            </div>
          </div>

          {/* Interactive Suggestions / Follow-up buttons */}
          {message.suggestions && message.suggestions.length > 0 && (
            <div className="bg-[#EFEFD8]/40 border border-[#3D5245]/15 rounded-2xl p-3 space-y-2">
              <div className="text-xs font-bold text-[#2C3E35] flex items-center space-x-1">
                <ArrowRight className="w-3.5 h-3.5 text-[#3D5245]" />
                <span>[이런 것도 궁금하실 수 있어요]</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {message.suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectSuggestion && onSelectSuggestion(suggestion)}
                    className="text-xs bg-white hover:bg-[#EFEFD8] text-[#2C3E35] border border-[#3D5245]/20 font-bold px-3.5 py-1.5 rounded-full shadow-2xs transition-all hover:scale-[1.01] active:scale-[0.99] text-left cursor-pointer"
                  >
                    💬 {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="text-[11px] text-stone-400 pl-1">
            {message.timestamp}
          </div>
        </div>
      </div>
    </div>
  );
};
