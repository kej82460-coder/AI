import React from 'react';
import { Course } from '../types';
import { BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';

interface CourseSelectorBarProps {
  courses: Course[];
  selectedCourseId: string;
  onSelectCourse: (courseId: string) => void;
  onOpenNotice: () => void;
}

export const CourseSelectorBar: React.FC<CourseSelectorBarProps> = ({
  courses,
  selectedCourseId,
  onSelectCourse,
  onOpenNotice,
}) => {
  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  return (
    <div className="bg-[#EFEFD8]/80 border-b border-[#3D5245]/20 py-2.5 px-4 shadow-2xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        <div className="flex items-center space-x-2.5 overflow-x-auto scrollbar-none py-0.5">
          <div className="flex items-center space-x-1 text-[#2C3E35] text-xs font-bold shrink-0">
            <BookOpen className="w-4 h-4 text-[#3D5245]" />
            <span>안내 문의 과정:</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {courses.map((course) => {
              const isSelected = course.id === selectedCourseId;
              return (
                <button
                  key={course.id}
                  onClick={() => onSelectCourse(course.id)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#3D5245] text-white shadow-xs font-bold ring-2 ring-[#3D5245]/30'
                      : 'bg-white hover:bg-[#EFEFD8] text-stone-700 border border-[#3D5245]/20'
                  }`}
                >
                  {course.status === '모집중' && (
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                  )}
                  {course.name}
                </button>
              );
            })}
          </div>
        </div>

        {currentCourse && (
          <div className="flex items-center justify-between md:justify-end text-xs text-stone-600 gap-3 border-t md:border-t-0 border-[#3D5245]/15 pt-2 md:pt-0">
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[11px] border border-emerald-300">
                {currentCourse.status}
              </span>
              <span className="font-medium text-stone-800 truncate max-w-[200px] sm:max-w-xs">
                {currentCourse.noticeTitle}
              </span>
            </div>
            <button
              onClick={onOpenNotice}
              className="text-[#3D5245] hover:text-[#2C3E35] font-bold inline-flex items-center space-x-0.5 shrink-0 underline decoration-[#3D5245]/40 underline-offset-2 cursor-pointer"
            >
              <span>공고 상세</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
