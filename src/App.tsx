import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { LandingHero } from './components/LandingHero';
import { CourseSelectorBar } from './components/CourseSelectorBar';
import { ChatMessageItem } from './components/ChatMessageItem';
import { QuickButtons } from './components/QuickButtons';
import { SelfCheckModal } from './components/SelfCheckModal';
import { NoticeModal } from './components/NoticeModal';
import { ContactModal } from './components/ContactModal';
import { ChatMessage, Course, CenterInfo } from './types';
import { COURSES_KNOWLEDGE_BASE, DEFAULT_CENTER_INFO } from './data/knowledgeBase';
import { Send, Loader2, RefreshCw, ArrowLeft } from 'lucide-react';

export default function App() {
  const [courses, setCourses] = useState<Course[]>(COURSES_KNOWLEDGE_BASE);
  const [centerInfo, setCenterInfo] = useState<CenterInfo>(DEFAULT_CENTER_INFO);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(COURSES_KNOWLEDGE_BASE[0].id);

  // Gemini API Key Authorization State
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('paju_gemini_api_key') || '';
  });
  const [isApiKeyApproved, setIsApiKeyApproved] = useState<boolean>(() => {
    return localStorage.getItem('paju_gemini_api_approved') === 'true';
  });
  const [hasServerKey, setHasServerKey] = useState<boolean>(false);

  // View state: 'landing' (motion graphics hero overview) or 'chat' (AI chatbot guidance)
  const [activeView, setActiveView] = useState<'landing' | 'chat'>('landing');

  // Chat state
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Modals state
  const [isSelfCheckOpen, setIsSelfCheckOpen] = useState<boolean>(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  // Initial welcome message
  const initialBotMessage: ChatMessage = {
    id: 'msg-welcome',
    sender: 'bot',
    text: `[한눈에 요약]
안녕하세요! **파주새일센터 직업교육훈련 신청 가이드봇**입니다. 🌿

🎯 **"직업교육훈련은 취업을 목적으로 하는 교육입니다."**
새로운 일자리를 준비하시고 재취업에 도전하시는 여성분들을 진심으로 응원합니다!
모집 과정의 신청자격, 접수방법, 선발절차, 훈련수당 등에 대해 무엇이든 편하게 물어보세요.

[자세히 안내]
· **교육목적**: 단순 취미나 자기계발이 아닌 **취업 및 창업을 목적으로 진행되는 직업교육훈련**입니다.
· **교육비**: 국비 + 지방비 지원으로 **전액 무료**로 운영됩니다.
· **신청방법**: 정해진 접수기간 내 **파주새일센터 직접 방문접수** (온라인/전화 접수 불가)
· **선발절차**: 1차 서류전형 → 2차 면접심사를 거쳐 최종 선발됩니다.

[꼭 확인하세요]
· 본 직업교육훈련은 **선착순 마감이 아닙니다**. 기간 내 방문 접수하시면 동일하게 심사됩니다.
· 고용보험 가입 직장인, 사업자등록증 소지자, 타 국비훈련 수강자는 신청이 제한될 수 있습니다.

[문의·상담]
궁금한 점은 언제든 질문해 주시거나, 센터 대표전화(**031-942-1653**)로 연락해 주세요.

이 안내는 「2026년 파주새일센터 직업교육훈련 모집공고」를 바탕으로 합니다.`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestions: [
      "이 과정 신청하고 싶어요. 어떻게 하면 되나요?",
      "교육비가 정말 무료인가요?",
      "선착순 마감인가요? 빨리 접수해야 하나요?",
      "훈련수당(참여수당/취업성공수당) 지급 조건이 어떻게 되나요?",
      "신청 제한요건 3가지 확인하기"
    ]
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialBotMessage]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeView === 'chat') {
      scrollToBottom();
    }
  }, [messages, isLoading, activeView]);

  // Fetch initial course knowledge base if backend server is live
  useEffect(() => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => {
        if (data.courses && data.courses.length > 0) {
          setCourses(data.courses);
        }
        if (data.center) {
          setCenterInfo(data.center);
        }
        if (data.hasServerKey) {
          setHasServerKey(true);
        }
      })
      .catch((err) => {
        console.log('Using local fallback knowledge base:', err);
      });
  }, []);

  // Gemini API Key Verification Handler
  const handleApproveKey = async (keyToTest: string) => {
    const trimmedKey = (keyToTest || '').trim();
    try {
      const res = await fetch('/api/verify-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: trimmedKey }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setApiKey(trimmedKey);
        setIsApiKeyApproved(true);
        localStorage.setItem('paju_gemini_api_key', trimmedKey);
        localStorage.setItem('paju_gemini_api_approved', 'true');
        return { success: true, message: data.message || 'Gemini API Key가 성공적으로 승인되었습니다.' };
      } else {
        setIsApiKeyApproved(false);
        localStorage.removeItem('paju_gemini_api_approved');
        return { success: false, message: data.message || 'Gemini API Key 승인에 실패하였습니다.' };
      }
    } catch (err: any) {
      return { success: false, message: '네트워크 연결 상태를 확인해 주세요.' };
    }
  };

  const handleResetKey = () => {
    setApiKey('');
    setIsApiKeyApproved(false);
    localStorage.removeItem('paju_gemini_api_key');
    localStorage.removeItem('paju_gemini_api_approved');
    setActiveView('landing');
  };

  const scrollToAuthCard = () => {
    setActiveView('landing');
    setTimeout(() => {
      const authElem = document.getElementById('api-key-auth-section');
      if (authElem) {
        authElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Send message handler
  const handleSendMessage = async (textToSend?: string) => {
    // Strict Gatekeeping: Ensure API key is approved before chatting
    if (!isApiKeyApproved) {
      scrollToAuthCard();
      return;
    }

    const text = (textToSend || inputPrompt).trim();
    if (!text || isLoading) return;

    if (activeView !== 'chat') {
      setActiveView('chat');
    }

    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: userTimestamp,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ sender: m.sender, text: m.text })),
          selectedCourseId,
          apiKey: apiKey ? apiKey.trim() : '',
        }),
      });

      const data = await response.json();
      const botTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (response.status === 401 || data.needAuth) {
        setIsApiKeyApproved(false);
        localStorage.removeItem('paju_gemini_api_approved');
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-auth-err-${Date.now()}`,
            sender: 'bot',
            text: `[오류] Gemini API Key 승인이 해제되었거나 유효하지 않습니다.\n\n랜딩페이지의 'Gemini API Key 승인' 카드에서 올바른 API Key를 입력 후 승인받아 주세요.`,
            timestamp: botTimestamp,
            isError: true,
          },
        ]);
        scrollToAuthCard();
        return;
      }

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: data.reply,
            timestamp: botTimestamp,
            suggestions: data.suggestions || [],
          },
        ]);
      } else {
        throw new Error(data.error || 'No reply from server');
      }
    } catch (error: any) {
      console.error('Failed to send message:', error);
      const botTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: `[한눈에 요약] 죄송합니다. 잠시 서버 응답이 원활하지 않습니다.\n\n[문의·상담] 세부 문의사항은 파주새일센터 대표전화(${centerInfo.phone})로 언제든 연락 주시면 친절하게 도와드리겠습니다.\n\n이 안내는 모집공고 지식베이스를 바탕으로 합니다.`,
          timestamp: botTimestamp,
          isError: true,
          suggestions: [
            "교육비가 얼마인가요?",
            "선착순 마감인가요?",
            "신청 제한요건 셀프체크"
          ]
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    if (window.confirm("대화 내역을 초기화하시겠습니까?")) {
      setMessages([initialBotMessage]);
    }
  };

  const handleStartChatFromLanding = (query?: string) => {
    setActiveView('chat');
    if (query) {
      setTimeout(() => {
        handleSendMessage(query);
      }, 120);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col font-sans text-stone-900 antialiased selection:bg-[#EFEFD8] selection:text-[#2C3E35]">
      {/* Top Header */}
      <Header
        centerInfo={centerInfo}
        activeView={activeView}
        isApiKeyApproved={isApiKeyApproved}
        onSelectView={(view) => {
          if (view === 'chat' && !isApiKeyApproved) {
            scrollToAuthCard();
          } else {
            setActiveView(view);
          }
        }}
        onOpenNotice={() => {
          if (!isApiKeyApproved) { scrollToAuthCard(); } else { setIsNoticeOpen(true); }
        }}
        onOpenContact={() => {
          if (!isApiKeyApproved) { scrollToAuthCard(); } else { setIsContactOpen(true); }
        }}
        onOpenSelfCheck={() => {
          if (!isApiKeyApproved) { scrollToAuthCard(); } else { setIsSelfCheckOpen(true); }
        }}
        onOpenAuthCard={scrollToAuthCard}
      />

      {/* Main View Router */}
      {activeView === 'landing' ? (
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 flex flex-col">
          <LandingHero
            centerInfo={centerInfo}
            courses={courses}
            apiKey={apiKey}
            isApiKeyApproved={isApiKeyApproved}
            hasServerKey={hasServerKey}
            onApproveKey={handleApproveKey}
            onResetKey={handleResetKey}
            selectedCourseId={selectedCourseId}
            onSelectCourse={(id) => setSelectedCourseId(id)}
            onStartChat={handleStartChatFromLanding}
            onOpenSelfCheck={() => setIsSelfCheckOpen(true)}
            onOpenNotice={() => setIsNoticeOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
          />
        </main>
      ) : (
        /* Chat View */
        <div className="flex-1 flex flex-col">
          {/* Course Banner */}
          <CourseSelectorBar
            courses={courses}
            selectedCourseId={selectedCourseId}
            onSelectCourse={(id) => setSelectedCourseId(id)}
            onOpenNotice={() => setIsNoticeOpen(true)}
          />

          {/* Main Chat Container */}
          <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-4 flex flex-col min-h-0">
            <div className="bg-[#f5f5f0] border border-[#3D5245]/20 rounded-2xl shadow-xs flex-1 flex flex-col overflow-hidden min-h-[480px]">
              {/* Top Navigation Bar inside Chat */}
              <div className="bg-[#2C3E35] text-white px-4 py-2 flex items-center justify-between border-b border-[#3D5245]">
                <button
                  onClick={() => setActiveView('landing')}
                  className="inline-flex items-center space-x-1.5 text-xs text-stone-200 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors cursor-pointer font-bold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>센터 및 과정 소개로 돌아가기</span>
                </button>
                <div className="text-[11px] text-emerald-300 font-bold hidden sm:block">
                  💬 파주새일센터 AI 가이드봇 실시간 대화 중
                </div>
              </div>

              {/* Chat Messages Scroll Window */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {/* Header info banner */}
                <div className="bg-[#EFEFD8] border border-[#3D5245]/30 rounded-2xl p-4 text-xs text-[#1E2E26] space-y-2 shadow-2xs">
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#3D5245] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      파주새일센터 핵심 안내
                    </span>
                    <span className="text-[#2C3E35] font-bold text-xs sm:text-sm">
                      🎯 직업교육훈련은 취업을 목적으로 하는 교육입니다
                    </span>
                  </div>
                  <p className="text-stone-700 leading-relaxed pl-0.5">
                    본 가이드 봇은 모집공고·안내문·FAQ 공식 지식베이스에 기반하여 수강신청, 자격요건, 선발절차, 훈련수당 등을 따뜻하게 안내합니다. (문의: {centerInfo.phone})
                  </p>
                </div>

                {/* Message list */}
                {messages.map((msg) => (
                  <ChatMessageItem
                    key={msg.id}
                    message={msg}
                    onSelectSuggestion={(prompt) => handleSendMessage(prompt)}
                    onOpenContactModal={() => setIsContactOpen(true)}
                    onOpenSelfCheckModal={() => setIsSelfCheckOpen(true)}
                  />
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start my-3">
                    <div className="flex items-center space-x-2.5 bg-white border border-[#3D5245]/20 rounded-2xl p-4 shadow-2xs text-stone-600 text-xs sm:text-sm font-medium">
                      <Loader2 className="w-4 h-4 text-[#3D5245] animate-spin" />
                      <span>모집공고 지식베이스를 확인하여 정확하고 따뜻한 안내를 작성하고 있습니다...</span>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Quick Prompts Bar */}
              <QuickButtons
                onSelectPrompt={(promptText) => handleSendMessage(promptText)}
                onOpenSelfCheck={() => setIsSelfCheckOpen(true)}
              />

              {/* Input Box Bar */}
              <div className="bg-white border-t border-[#3D5245]/15 p-3 sm:p-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleResetChat}
                    title="대화 초기화"
                    className="p-3 text-stone-500 hover:text-stone-800 bg-[#f5f5f0] hover:bg-[#EFEFD8] rounded-full transition-colors cursor-pointer shrink-0 border border-[#3D5245]/20"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>

                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputPrompt}
                      onChange={(e) => setInputPrompt(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="직업교육훈련 관련 질문을 입력하세요 (예: 신청방법, 교육비, 훈련수당 등)"
                      className="w-full bg-[#f5f5f0] border border-[#3D5245]/20 focus:border-[#3D5245] focus:ring-2 focus:ring-[#3D5245]/20 text-stone-900 text-sm rounded-full py-3 pl-5 pr-10 outline-none transition-all"
                      disabled={isLoading}
                    />
                  </div>

                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputPrompt.trim() || isLoading}
                    className={`px-5 py-3 rounded-full font-bold text-sm inline-flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer shrink-0 ${
                      inputPrompt.trim() && !isLoading
                        ? 'bg-[#3D5245] hover:bg-[#2C3E35] text-white hover:scale-[1.01] active:scale-[0.99]'
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    <span>전송</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-[11px] text-stone-400 text-center mt-2">
                  본 가이드 봇은 모집공고 기반의 일반 안내를 제공하며, 최종 자격 및 수강생 선발은 파주새일센터 방문상담을 통해 결정됩니다.
                </div>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* Modals */}
      <SelfCheckModal
        isOpen={isSelfCheckOpen}
        onClose={() => setIsSelfCheckOpen(false)}
        centerInfo={centerInfo}
        onSendCheckToBot={(checkPrompt) => {
          setActiveView('chat');
          handleSendMessage(checkPrompt);
        }}
      />

      <NoticeModal
        isOpen={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        courses={courses}
        selectedCourseId={selectedCourseId}
        onSelectCourse={(id) => setSelectedCourseId(id)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        centerInfo={centerInfo}
      />
    </div>
  );
}
