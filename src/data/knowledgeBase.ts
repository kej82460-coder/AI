import { Course, CenterInfo } from '../types';

export const DEFAULT_CENTER_INFO: CenterInfo = {
  name: "파주새일센터",
  phone: "031-942-1653",
  fax: "031-942-1654",
  address: "경기도 파주시 시민회관길 16 파주여성새로일하기센터 (직업교육훈련팀)",
  operatingHours: "평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00 / 토·일·공휴일 휴무)",
  subwayInfo: "경의선 금촌역 1번 출구 도보 10분 (파주시민회관 옆)",
  busInfo: "파주시민회관/파주새일센터 정류장 하차 (마을버스 010, 025, 034, 038 등)",
  noticeYear: 2026,
};

export const COURSES_KNOWLEDGE_BASE: Course[] = [
  {
    id: "course-2026-01",
    name: "AI디지털튜터 양성과정",
    category: "IT/교육",
    status: "모집중",
    targetAudience: "취업 의지가 확고한 미취업 여성 및 경력단절여성 (IT 및 교육 분야 재취업 희망자 우대)",
    noticeTitle: "2026년 직업교육훈련 「AI디지털튜터 양성과정」 수강생 모집공고",
    applicationPeriod: "2026.08.01 ~ 2026.08.25 (방문접수 기준, 18:00 마감)",
    trainingPeriod: "2026.09.01 ~ 2026.11.15 (총 50일 / 200시간)",
    trainingSchedule: "월~금 09:30 ~ 13:30 (일 4시간)",
    trainingLocation: "파주여성새로일하기센터 3층 제1IT교육실",
    totalHours: "200시간",
    capacity: 20,
    fee: "무료 (국비 + 지방비 100% 지원)",
    applicationMethod: "센터 직접 방문접수 (※ 온라인 및 전화 접수 불가)",
    selectionProcess: "1차 서류접수 → 2차 면접심사 (개강 5~7일 전 유선 및 문자로 면접일정 개별 안내)",
    allowanceInfo: {
      participationAllowance: "교육일수 20일 기준, 출석률 80% 이상 시 지급 (월 최대 훈련수당 지급 조건 충족 시)",
      employmentSuccessAllowance: "수료 후 3개월 이내 관련 분야 취업 시 지급 (상세 증빙서류 제출 필요)"
    },
    documentsRequired: [
      "직업교육훈련 참가신청서 1부 (센터 비치 또는 홈페이지 양식 다운로드)",
      "구직신청서 1부",
      "주민등록등본 1부 (최근 3개월 이내 발급)",
      "반명함판 증명사진 1매",
      "관련 자격증 사본 (소지자에 한함)"
    ],
    description: "생성형 AI 툴 및 에듀테크 디바이스 활용법, 초·중·고 디지털 튜터 실무 지도법과 AI 윤리 교육을 종합적으로 습득하여 학교 및 교육기관의 AI 디지털 튜터로의 취업을 지원합니다."
  },
  {
    id: "course-2026-02",
    name: "실무형 세무회계·ERP 전산세무 양성과정",
    category: "경영/사무",
    status: "모집중",
    targetAudience: "세무회계 분야 취업을 희망하는 미취업 여성 (전산회계 자격증 소지자 및 사무직 재취업 희망자 우대)",
    noticeTitle: "2026년 직업교육훈련 「실무형 세무회계·ERP 전산세무 양성과정」 모집안내",
    applicationPeriod: "2026.08.05 ~ 2026.08.28 (방문접수 기준, 18:00 마감)",
    trainingPeriod: "2026.09.05 ~ 2026.11.20 (총 52일 / 208시간)",
    trainingSchedule: "월~금 14:00 ~ 18:00 (일 4시간)",
    trainingLocation: "파주여성새로일하기센터 2층 회계실무 전용실",
    totalHours: "208시간",
    capacity: 20,
    fee: "무료 (국비 + 지방비 100% 지원)",
    applicationMethod: "센터 직접 방문접수 (※ 온라인 및 전화 접수 불가)",
    selectionProcess: "1차 서류접수 → 2차 면접심사 (개강 5~7일 전 유선 및 문자로 면접일정 개별 안내)",
    allowanceInfo: {
      participationAllowance: "교육일수 20일 기준, 출석률 80% 이상 시 지급 (출석 조건 충족 필수)",
      employmentSuccessAllowance: "수료 후 3개월 이내 회계·사무 분야 취업 확정 시 지급"
    },
    documentsRequired: [
      "직업교육훈련 참가신청서 1부",
      "구직신청서 1부",
      "주민등록등본 1부",
      "자격증 증빙 서류 사본"
    ],
    description: "전산세무회계, KLeP 및 ERP 정보관리사 회계 프로그램 실무를 익혀 중소기업 회계사무원 및 세무사 사무소 취업을 전폭 지원합니다."
  },
  {
    id: "course-2026-03",
    name: "초등 코딩 & 생성형 AI 교육전문가 양성과정",
    category: "교육/강사",
    status: "모집예정",
    targetAudience: "방과후 강사, 코딩 교육 및 AI 교육 분야로 재취업을 희망하는 미취업 여성",
    noticeTitle: "2026년 직업교육훈련 「초등 코딩 & 생성형 AI 교육전문가 양성과정」 모집 사전안내",
    applicationPeriod: "2026.09.01 ~ 2026.09.20 (예정, 방문접수)",
    trainingPeriod: "2026.10.01 ~ 2026.12.10 (총 45일 / 180시간)",
    trainingSchedule: "월~금 09:30 ~ 13:30 (일 4시간)",
    trainingLocation: "파주여성새로일하기센터 3층 강의실",
    totalHours: "180시간",
    capacity: 18,
    fee: "무료 (국비 + 지방비 100% 지원)",
    applicationMethod: "센터 직접 방문접수 (※ 온라인 및 전화 접수 불가)",
    selectionProcess: "1차 서류접수 → 2차 면접심사 (개강 5~7일 전 유선 및 문자로 면접일정 개별 안내)",
    allowanceInfo: {
      participationAllowance: "교육일수 20일 기준, 출석률 80% 이상 시 지급 조건 충족 시 지급",
      employmentSuccessAllowance: "수료 후 3개월 이내 교육기관/방과후학교 취업 시 지급"
    },
    documentsRequired: [
      "직업교육훈련 참가신청서 1부",
      "구직등록신청서 1부",
      "주민등록등본 1부"
    ],
    description: "엔트리, 파이썬 기본 및 생성형 AI 유치·초등 교구 활용법을 실습하여 학교 방과후 교사 및 창의체험 강사로 출강할 수 있도록 유연한 취업 기회를 제공합니다."
  },
  {
    id: "course-2026-04",
    name: "사회복지 행정실무자 양성과정",
    category: "사회복지/행정",
    status: "모집중",
    targetAudience: "사회복지사 자격증 보유자 중 행정실무 및 W4C 시스템 실무를 습득하여 취업하려는 여성",
    noticeTitle: "2026년 직업교육훈련 「사회복지 행정실무자 양성과정」 수강생 모집공고",
    applicationPeriod: "2026.08.01 ~ 2026.08.22 (방문접수 기준, 18:00 마감)",
    trainingPeriod: "2026.09.01 ~ 2026.10.25 (총 35일 / 140시간)",
    trainingSchedule: "월~금 13:30 ~ 17:30 (일 4시간)",
    trainingLocation: "파주여성새로일하기센터 2층 강의실",
    totalHours: "140시간",
    capacity: 20,
    fee: "무료 (국비 + 지방비 100% 지원)",
    applicationMethod: "센터 직접 방문접수 (※ 온라인 및 전화 접수 불가)",
    selectionProcess: "1차 서류접수 → 2차 면접심사 (개강 5~7일 전 유선 및 문자로 면접일정 개별 안내)",
    allowanceInfo: {
      participationAllowance: "교육일수 20일 기준, 출석률 80% 이상 시 지급",
      employmentSuccessAllowance: "수료 후 3개월 이내 사회복지 시설 취업 시 지급"
    },
    documentsRequired: [
      "직업교육훈련 참가신청서 1부",
      "구직신청서 1부",
      "사회복지사 자격증 사본 1부",
      "주민등록등본 1부"
    ],
    description: "사회복지 시설 행정, 보조금 회계(W4C), 프로포절 작성법 등 실무 중심 교육을 통해 노인·장애인·아동 복지시설 취업을 연계합니다."
  }
];

export const GENERAL_FAQ_KNOWLEDGE = [
  {
    question: "신청하고 싶어요 / 신청 방법이 어떻게 되나요?",
    answer: "신청 절차 안내 전 선제 확인(고용보험, 사업자등록, 타 국비훈련 여부)이 필요합니다. 방문 접수로 진행되며 선착순 마감이 아닙니다."
  },
  {
    question: "교육비는 얼마인가요?",
    answer: "본 센터의 직업교육훈련은 국비와 지방비 지원으로 무료로 운영됩니다."
  },
  {
    question: "선착순 마감인가요? 빨리 신청해야 하나요?",
    answer: "아닙니다. 정해진 접수기간 안에 방문 접수하시면 동일하게 심사 기회가 주어지며, 1차 서류 + 2차 면접으로 선발됩니다."
  },
  {
    question: "훈련수당(참여수당, 취업성공수당)은 무조건 주나요?",
    answer: "무조건 지급이 아니며 조건을 충족해야 합니다. 참여수당은 교육 20일 기준 출석률 80% 이상일 때, 취업성공수당은 수료 후 기한 내 취업 시 지급됩니다."
  },
  {
    question: "직장인이나 사업자도 들을 수 있나요?",
    answer: "고용보험 가입 직장인, 사업자등록증 소지자, 다른 국비지원 훈련 참여자는 신청이 제한될 수 있습니다. 정확한 확인을 위해 방문 전 센터 전화 상담이 필요합니다."
  }
];
