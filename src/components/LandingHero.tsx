import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  CheckSquare,
  BookOpen,
  Award,
  Phone,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  Users,
  Clock,
  ChevronRight,
  Zap,
  CheckCircle2,
  FileText,
  Building2,
  TrendingUp,
  Lock,
} from 'lucide-react';
import { Course, CenterInfo } from '../types';
import { ApiKeyAuthCard } from './ApiKeyAuthCard';

interface LandingHeroProps {
  courses: Course[];
  centerInfo: CenterInfo;
  apiKey: string;
  isApiKeyApproved: boolean;
  hasServerKey?: boolean;
  onApproveKey: (keyToTest: string) => Promise<{ success: boolean; message: string }>;
  onResetKey: () => void;
  onStartChat: (initialQuery?: string) => void;
  onSelectCourse: (courseId: string) => void;
  onOpenSelfCheck: () => void;
  onOpenNotice: () => void;
  onOpenContact: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  courses,
  centerInfo,
  apiKey,
  isApiKeyApproved,
  hasServerKey = false,
  onApproveKey,
  onResetKey,
  onStartChat,
  onSelectCourse,
  onOpenSelfCheck,
  onOpenNotice,
  onOpenContact,
}) => {
  const activeCourse = courses.find((c) => c.status === '모집중') || courses[0];

  const handleProtectedAction = (action: () => void) => {
    if (!isApiKeyApproved) {
      const authSection = document.getElementById('api-key-auth-section');
      if (authSection) {
        authSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    action();
  };

  const quickQuestions = [
    {
      label: "AI디지털튜터 과정 신청 방법이 궁금해요",
      prompt: "AI디지털튜터 양성과정 신청방법과 모집 일정을 안내해 주세요.",
      icon: Sparkles,
    },
    {
      label: "교육비와 훈련수당 얼마인가요?",
      prompt: "직업교육훈련 교육비가 무료인지, 훈련수당 지원 조건이 어떻게 되나요?",
      icon: Award,
    },
    {
      label: "신청 자격 제한조건 셀프체크하고 싶어요",
      prompt: "고용보험 가입자나 사업자등록증 소지자도 신청할 수 있나요?",
      icon: CheckSquare,
    },
    {
      label: "선발 절차 및 면접 준비는 어떻게 하나요?",
      prompt: "1차 서류전형과 2차 면접심사는 어떻게 진행되나요?",
      icon: Briefcase,
    },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Banner with Motion Graphics */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2C3E35] via-[#3B5244] to-[#1E2E26] text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-[#4A6354]">
        {/* Animated Background Graphics */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-inner"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-emerald-200">
                2026 파주새일센터 공식 AI 가이드 서비스
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                여성의 새로운 내일을 여는 <br />
                <span className="text-emerald-300 underline decoration-emerald-400/50 underline-offset-8">
                  직업교육훈련 AI 가이드
                </span>
              </h1>
            </motion.div>

            {/* Crucial Purpose Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-amber-400/15 border border-amber-300/30 rounded-2xl p-4 backdrop-blur-sm shadow-sm"
            >
              <div className="flex items-start space-x-3">
                <div className="bg-amber-400 text-stone-900 p-1.5 rounded-lg shrink-0 mt-0.5">
                  <Briefcase className="w-4 h-4 font-bold" />
                </div>
                <div className="space-y-1 text-xs sm:text-sm">
                  <p className="font-bold text-amber-200 text-sm sm:text-base">
                    🎯 "직업교육훈련은 취업을 목적으로 하는 교육입니다"
                  </p>
                  <p className="text-stone-200 leading-relaxed">
                    단순 취미나 단순 교양이 아닌, **재취업 및 전문직 진출**을 희망하는 여성분들을 위한 실무 중심 국비 지원 정규 교육입니다.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <button
                onClick={() => handleProtectedAction(() => onStartChat())}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center space-x-2 cursor-pointer"
              >
                {isApiKeyApproved ? <Sparkles className="w-5 h-5 text-stone-950" /> : <Lock className="w-5 h-5 text-stone-950" />}
                <span>AI 상담봇과 즉시 대화하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleProtectedAction(onOpenSelfCheck)}
                className="px-5 py-3.5 bg-white/15 hover:bg-white/25 text-white font-semibold text-sm rounded-2xl border border-white/25 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center space-x-2 cursor-pointer"
              >
                <CheckSquare className="w-4 h-4 text-amber-300" />
                <span>신청자격 셀프체크</span>
              </button>

              <button
                onClick={() => handleProtectedAction(onOpenNotice)}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-stone-200 font-medium text-sm rounded-2xl border border-white/15 backdrop-blur-md transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-emerald-300" />
                <span>모집공고 원문</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Interactive Card Graphic */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4"
            >
              {/* Floating Badge Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/15">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">실시간 모집 안내</h3>
                    <p className="text-[11px] text-stone-300">파주새일센터 2026 공식 지식베이스</p>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-400/30">
                  {activeCourse.status}
                </span>
              </div>

              {/* Course Highlight */}
              <div className="bg-white/10 rounded-2xl p-4 border border-white/15 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">
                  [{activeCourse.category}]
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {activeCourse.name}
                </h4>
                <div className="text-xs text-stone-300 space-y-1 pt-1">
                  <p>• 교육기간: {activeCourse.trainingPeriod}</p>
                  <p>• 교육비: <strong className="text-emerald-300">전액 무료 (국비지원)</strong></p>
                  <p>• 접수방법: 파주새일센터 방문 접수</p>
                </div>
              </div>

              {/* Floating Stats Pill */}
              <div className="grid grid-cols-2 gap-2 text-center pt-1">
                <div className="bg-black/20 p-2.5 rounded-xl border border-white/10">
                  <span className="block text-xs text-stone-400">교육비 지원</span>
                  <span className="text-sm font-extrabold text-emerald-300">100% 전액 지원</span>
                </div>
                <div className="bg-black/20 p-2.5 rounded-xl border border-white/10">
                  <span className="block text-xs text-stone-400">대표 문의전화</span>
                  <span className="text-sm font-extrabold text-amber-300">{centerInfo.phone}</span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => handleProtectedAction(() => {
                  onSelectCourse(activeCourse.id);
                  onStartChat(`[${activeCourse.name}] 과정의 모집 자격과 신청 방법을 알려주세요.`);
                })}
                className="w-full py-3 bg-white text-[#2C3E35] hover:bg-stone-100 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{activeCourse.name} AI 문의하기</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prominent Gemini API Key Approval Section */}
      <section>
        <ApiKeyAuthCard
          apiKey={apiKey}
          isApproved={isApiKeyApproved}
          hasServerKey={hasServerKey}
          onApproveKey={onApproveKey}
          onResetKey={onResetKey}
        />
      </section>

      {/* Trust Stats Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "교육비 본인부담금", value: "0원 (100% 무료)", desc: "국비 + 지방비 지원", icon: Award, color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
          { label: "훈련수당 지원", value: "최대 수당 지급", desc: "참여수당 및 취업성공수당", icon: TrendingUp, color: "text-amber-800 bg-amber-50 border-amber-200" },
          { label: "신청 방법", value: "방문 서류 접수", desc: "선착순 마감 아닌 심사제", icon: ShieldCheck, color: "text-emerald-800 bg-emerald-50 border-emerald-200" },
          { label: "사후 관리", value: "1:1 취업 매칭", desc: "수료 후 맞춤 취업 연계", icon: Briefcase, color: "text-stone-800 bg-stone-100 border-stone-200" },
        ].map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`p-4 sm:p-5 rounded-2xl border shadow-xs flex items-center space-x-3.5 ${stat.color}`}
            >
              <div className="p-2.5 rounded-xl bg-white shadow-2xs shrink-0">
                <IconComp className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-semibold text-stone-600">{stat.label}</span>
                <span className="text-sm sm:text-base font-extrabold block tracking-tight">{stat.value}</span>
                <span className="text-[11px] text-stone-500 font-medium block">{stat.desc}</span>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Core Strengths Section (이 앱의 강점과 특장점) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3D5245] bg-[#EFEFD8] px-3 py-1 rounded-full border border-[#3D5245]/20">
            Paju Saeil Center Key Strengths
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            파주새일센터 AI 직업교육훈련 가이드의 4가지 핵심 특장점
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            공식 모집공고 데이터베이스 연동으로 검증되고 신뢰할 수 있는 정보를 따뜻하게 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: "공식 공고 기반 AI 정확도",
              desc: "파주새일센터 2026년 공식 모집공고 원문 데이터베이스에만 근거하여 왜곡 없는 명확한 정보를 안내합니다.",
              icon: ShieldCheck,
              badge: "검증된 정보",
              color: "border-emerald-200 bg-white",
            },
            {
              title: "3초 셀프 자격검증",
              desc: "고용보험 가입, 사업자등록증, 타 국비지원 참여 여부를 클릭 한 번으로 미리 점검해 드립니다.",
              icon: CheckSquare,
              badge: "신청자격 점검",
              color: "border-amber-200 bg-white",
            },
            {
              title: "100% 국비지원 & 수당안내",
              desc: "교육비 전액 무료 혜택과 국민취업지원제도 연계 수당(참여수당, 취업성공수당) 정보를 한눈에 확인할 수 있습니다.",
              icon: Award,
              badge: "전액 무료",
              color: "border-emerald-200 bg-white",
            },
            {
              title: "취업 목적 맞춤 가이드",
              desc: "1차 서류전형부터 2차 면접전형, 수료 후 지역 내 유망 기업 1:1 취업 연계까지 체계적으로 안내합니다.",
              icon: Briefcase,
              badge: "취업 성공연계",
              color: "border-stone-200 bg-white",
            },
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className={`p-6 rounded-2xl border shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 ${item.color}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#3D5245] text-white flex items-center justify-center shadow-xs">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-[#3D5245] bg-[#EFEFD8] px-2.5 py-1 rounded-full border border-[#3D5245]/20">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900">{item.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Vocational Training Courses Grid */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-stone-200/80 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                2026 파주새일센터
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                직업교육훈련 개설 과정 안내
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              원하시는 과정을 선택하시면 AI 도우미가 신청 자격과 세부 일정을 맞춤 안내해 드립니다.
            </p>
          </div>
          <button
            onClick={onOpenNotice}
            className="inline-flex items-center space-x-1 text-xs font-bold text-[#3D5245] hover:underline cursor-pointer shrink-0"
          >
            <span>전체 모집공고 원문보기</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {courses.map((course, idx) => {
            const isRecruiting = course.status === '모집중';
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`p-6 rounded-2xl border shadow-xs flex flex-col justify-between transition-all hover:shadow-md ${
                  isRecruiting
                    ? 'bg-white border-[#3D5245]/30 ring-1 ring-[#3D5245]/20'
                    : 'bg-stone-50/90 border-stone-200'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#3D5245] bg-[#EFEFD8] px-2.5 py-0.5 rounded-full">
                      {course.category}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                        course.status === '모집중'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300 animate-pulse'
                          : course.status === '교육중'
                          ? 'bg-sky-100 text-sky-800 border-sky-300'
                          : 'bg-stone-200 text-stone-600 border-stone-300'
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                    {course.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="bg-stone-100/80 p-3 rounded-xl space-y-1 text-xs text-stone-700">
                    {course.applicationPeriod ? (
                      <div className="flex justify-between">
                        <span className="text-stone-500">접수기간:</span>
                        <span className="font-semibold text-stone-900">{course.applicationPeriod}</span>
                      </div>
                    ) : null}
                    <div className="flex justify-between">
                      <span className="text-stone-500">교육기간:</span>
                      <span className="font-medium text-stone-800">{course.trainingPeriod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">교육비용:</span>
                      <span className="font-bold text-emerald-700">{course.fee}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-stone-100 mt-4">
                  <button
                    onClick={() => handleProtectedAction(() => {
                      onSelectCourse(course.id);
                      onStartChat(`[${course.name}] 과정에 대해 자세히 알려주세요.`);
                    })}
                    className="flex-1 py-2.5 bg-[#3D5245] hover:bg-[#2C3E35] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                    <span>AI 문의하기</span>
                  </button>

                  <button
                    onClick={() => handleProtectedAction(() => {
                      onSelectCourse(course.id);
                      onOpenNotice();
                    })}
                    className="px-3.5 py-2.5 bg-white hover:bg-stone-100 text-stone-700 font-medium text-xs rounded-xl border border-stone-300 transition-colors cursor-pointer"
                  >
                    공고상세
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Interactive Quick Demo Section */}
      <section className="bg-[#EFEFD8]/60 border border-[#3D5245]/20 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-[#3D5245] text-white">
            <Sparkles className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              궁금한 점을 바로 질문해 보세요
            </h3>
            <p className="text-xs text-stone-600">
              버튼을 클릭하면 AI 상담원과의 질문 대화가 즉시 시작됩니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickQuestions.map((q, idx) => {
            const IconComp = q.icon;
            return (
              <button
                key={idx}
                onClick={() => handleProtectedAction(() => onStartChat(q.prompt))}
                className="p-4 bg-white hover:bg-white/80 border border-[#3D5245]/15 rounded-2xl text-left shadow-2xs hover:shadow-xs transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-[#3D5245]/10 text-[#3D5245] group-hover:bg-[#3D5245] group-hover:text-white transition-colors">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-stone-800">
                    {q.label}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#3D5245] group-hover:translate-x-0.5 transition-all" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Footer Contact Callout */}
      <section className="bg-[#3D5245] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <Building2 className="w-5 h-5 text-emerald-300" />
            <h3 className="text-base sm:text-lg font-bold">파주여성새로일하기센터 직업교육훈련팀</h3>
          </div>
          <p className="text-xs text-stone-200">
            주소: {centerInfo.address} | 운영시간: {centerInfo.operatingHours}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleProtectedAction(onOpenContact)}
            className="px-5 py-3 bg-white text-[#3D5245] hover:bg-stone-100 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#3D5245]" />
            <span>031-942-1653 전화 연결</span>
          </button>
        </div>
      </section>
    </div>
  );
};
