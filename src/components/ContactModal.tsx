import React from 'react';
import { X, Phone, MapPin, Clock, Building, Bus, Navigation } from 'lucide-react';
import { CenterInfo } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  centerInfo: CenterInfo;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  centerInfo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-100 flex flex-col">
        {/* Header */}
        <div className="bg-[#3D5245] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="bg-white/10 p-2 rounded-xl">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                {centerInfo.name} 문의처
              </h2>
              <p className="text-xs text-stone-200 mt-0.5">
                방문접수 및 대표전화 안내
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

        {/* Content */}
        <div className="p-5 space-y-4 text-stone-800 text-sm leading-relaxed">
          {/* Main Phone Card */}
          <div className="bg-[#EFEFD8]/90 border border-[#3D5245]/25 p-4 rounded-2xl text-center space-y-1">
            <span className="text-xs text-[#3D5245] font-bold">직업교육훈련 문의 대표전화</span>
            <div className="text-2xl font-bold text-[#1E2E26] tracking-tight flex items-center justify-center space-x-2">
              <Phone className="w-6 h-6 text-[#3D5245] animate-bounce" />
              <a href={`tel:${centerInfo.phone}`} className="hover:underline">
                {centerInfo.phone}
              </a>
            </div>
            <p className="text-[11px] text-stone-500">
              팩스: {centerInfo.fax} (상담시간 내 전화 연결)
            </p>
          </div>

          {/* Operating Hours */}
          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-700">
              <Clock className="w-4 h-4 text-[#3D5245]" />
              <span>운영시간</span>
            </div>
            <p className="text-xs text-stone-800 font-medium pl-5">
              {centerInfo.operatingHours}
            </p>
          </div>

          {/* Location */}
          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-700">
              <MapPin className="w-4 h-4 text-[#3D5245]" />
              <span>방문접수 위치</span>
            </div>
            <p className="text-xs text-stone-800 font-medium pl-5">
              {centerInfo.address}
            </p>
          </div>

          {/* Transportation */}
          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-2 text-xs">
            <div className="flex items-center space-x-1.5 font-bold text-stone-700">
              <Navigation className="w-4 h-4 text-[#3D5245]" />
              <span>오시는 길 (대중교통)</span>
            </div>
            <div className="pl-5 space-y-1 text-stone-700">
              <p>• 지하철: {centerInfo.subwayInfo}</p>
              <p>• 버 스: {centerInfo.busInfo}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#3D5245] hover:bg-[#2C3E35] text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
