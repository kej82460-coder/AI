export interface Course {
  id: string;
  name: string;
  category: string;
  status: '모집중' | '모집예정' | '접수마감' | '종료' | '교육중';
  targetAudience: string;
  applicationPeriod: string;
  trainingPeriod: string;
  trainingSchedule: string;
  trainingLocation: string;
  totalHours: string;
  capacity: number;
  fee: string; // "무료 (국비+지방비 지원)"
  applicationMethod: string; // "방문접수 (온라인/전화 접수 불가)"
  selectionProcess: string; // "1차 서류전형 → 2차 면접전형 (개강 5~7일 전 유선/문자 개별 안내)"
  allowanceInfo: {
    participationAllowance: string;
    employmentSuccessAllowance: string;
  };
  documentsRequired: string[];
  description: string;
  noticeTitle: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestions?: string[];
  isError?: boolean;
}

export interface SelfCheckState {
  isEmployed: boolean | null; // 고용보험 가입
  hasBusinessLicense: boolean | null; // 사업자등록증 보유
  isOtherTrainingActive: boolean | null; // 다른 국비지원 훈련 참여 중
}

export interface CenterInfo {
  name: string;
  phone: string;
  fax: string;
  address: string;
  operatingHours: string;
  subwayInfo: string;
  busInfo: string;
  noticeYear: number;
}
