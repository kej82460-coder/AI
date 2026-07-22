import React from 'react';
import { X, FileText, CheckCircle2, DollarSign, Calendar, MapPin, Users, Award, AlertCircle } from 'lucide-react';
import { Course } from '../types';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  selectedCourseId: string;
  onSelectCourse: (courseId: string) => void;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({
  isOpen,
  onClose,
  courses,
  selectedCourseId,
  onSelectCourse,
}) => {
  if (!isOpen) return null;

  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-stone-100">
        {/* Header */}
        <div className="bg-[#3D5245] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="bg-white/10 p-2 rounded-xl">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                2026년 파주새일센터 직업교육훈련 모집공고
              </h2>
              <p className="text-xs text-stone-200 mt-0.5">
                공식 공고 지식베이스 원문 보기
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

        {/* Course Tabs */}
        <div className="bg-stone-100 border-b border-stone-200 px-4 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course.id)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all cursor-pointer ${
                course.id === currentCourse.id
                  ? 'bg-[#3D5245] text-white font-semibold shadow-xs'
                  : 'bg-white hover:bg-stone-200 text-stone-700 border border-stone-300'
              }`}
            >
              {course.name}
            </button>
          ))}
        </div>

        {/* Notice Detail Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-stone-800 text-sm leading-relaxed">
          {/* Notice Title Header */}
          <div className="bg-[#EFEFD8]/80 border-l-4 border-[#5A5A40] p-4 rounded-r-xl">
            <span className="bg-[#5A5A40] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              {currentCourse.status}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#2d2d25] mt-1.5">
              {currentCourse.noticeTitle}
            </h3>
            <p className="text-xs text-[#5A5A40] font-medium mt-1">
              카테고리: {currentCourse.category} | 지원대상: {currentCourse.targetAudience}
            </p>
          </div>

          {/* Quick Notice Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-600">
                <Calendar className="w-4 h-4 text-[#5A5A40]" />
                <span>접수기간 (선착순 마감 아님)</span>
              </div>
              <p className="font-semibold text-stone-900 text-xs sm:text-sm">
                {currentCourse.applicationPeriod || '별도 안내 (센터 문의)'}
              </p>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-600">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>교육비</span>
              </div>
              <p className="font-semibold text-emerald-800 text-xs sm:text-sm">
                {currentCourse.fee}
              </p>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-600">
                <MapPin className="w-4 h-4 text-[#5A5A40]" />
                <span>교육기간 및 시간</span>
              </div>
              <p className="font-medium text-stone-900 text-xs">
                {currentCourse.trainingPeriod} ({currentCourse.trainingSchedule})
              </p>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-600">
                <Users className="w-4 h-4 text-[#5A5A40]" />
                <span>신청방법 및 선발</span>
              </div>
              <p className="font-medium text-stone-900 text-xs">
                {currentCourse.applicationMethod} | {currentCourse.selectionProcess}
              </p>
            </div>
          </div>

          {/* Course Overview */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-900 text-sm flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#5A5A40]" />
              <span>교육 개요 및 취업 목적</span>
            </h4>
            <p className="text-stone-700 bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 leading-relaxed text-xs sm:text-sm">
              {currentCourse.description}
            </p>
          </div>

          {/* Allowance Info */}
          <div className="bg-[#EFEFD8]/60 border border-[#5A5A40]/20 p-4 rounded-xl space-y-2">
            <h4 className="font-bold text-[#4A4A35] text-sm flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-[#5A5A40]" />
              <span>훈련수당 안내 (조건 충족 시 지급)</span>
            </h4>
            <ul className="text-xs text-stone-800 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>
                <strong>참여수당:</strong> {currentCourse.allowanceInfo.participationAllowance}
              </li>
              <li>
                <strong>취업성공수당:</strong> {currentCourse.allowanceInfo.employmentSuccessAllowance}
              </li>
            </ul>
          </div>

          {/* Required Documents */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-900 text-sm flex items-center space-x-1.5">
              <FileText className="w-4 h-4 text-stone-600" />
              <span>제출서류 목록 (방문 접수 시 지참)</span>
            </h4>
            <ul className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs text-stone-800 space-y-1 list-disc pl-5">
              {currentCourse.documentsRequired.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          </div>

          {/* Warning Banner */}
          <div className="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-0.5">유의사항 (선착순 마감 아님)</p>
              <p className="leading-relaxed">
                본 교육훈련은 선착순 접수가 아닌 정해진 접수기간 내 방문접수자를 대상으로 **1차 서류심사 및 2차 면접심사**를 거쳐 최종 수강생을 선발합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#3D5245] hover:bg-[#2C3E35] text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
