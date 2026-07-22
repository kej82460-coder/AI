import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { COURSES_KNOWLEDGE_BASE, DEFAULT_CENTER_INFO } from "./src/data/knowledgeBase.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const getGeminiClient = (customKey?: string) => {
  const apiKey = customKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Knowledge base text builder
function buildKnowledgeBasePrompt(selectedCourseId?: string) {
  const selectedCourse = COURSES_KNOWLEDGE_BASE.find(c => c.id === selectedCourseId) || COURSES_KNOWLEDGE_BASE[0];

  let coursesFormatted = COURSES_KNOWLEDGE_BASE.map(course => `
--- [과정 ID: ${course.id}] ---
- 과정명: ${course.name}
- 카테고리: ${course.category}
- 상태: ${course.status}
- 대상: ${course.targetAudience}
- 공고명: ${course.noticeTitle}
- 접수기간: ${course.applicationPeriod} (※ 선착순 마감 아님, 마감일 18시 방문접수 마감)
- 교육기간: ${course.trainingPeriod}
- 교육시간: ${course.trainingSchedule}
- 교육장소: ${course.trainingLocation}
- 총시간: ${course.totalHours}
- 모집정원: ${course.capacity}명
- 교육비: ${course.fee}
- 신청방법: ${course.applicationMethod}
- 선발절차: ${course.selectionProcess}
- 훈련수당:
  * 참여수당: ${course.allowanceInfo.participationAllowance}
  * 취업성공수당: ${course.allowanceInfo.employmentSuccessAllowance}
- 제출서류: ${course.documentsRequired.join(", ")}
- 교육개요: ${course.description}
`).join("\n");

  return `
당신은 [${DEFAULT_CENTER_INFO.name}]의 "직업교육훈련 모집안내" AI 도우미입니다.
현재 모집 중이거나 예정된 직업교육훈련 과정에 대해
(과정 내용·자격·일정·신청방법·제출서류·선발·훈련수당 등)
지식베이스(모집공고·안내문·FAQ)에 근거해 쉽고 따뜻하게 안내합니다.
당신은 상담사를 대신하지 않으며, 개별 판단이 필요하거나 훈련 외 사항은 센터 상담으로 안내합니다.

# 현재 센터 정보 및 센터 전화번호
- 센터명: ${DEFAULT_CENTER_INFO.name}
- 대표전화: ${DEFAULT_CENTER_INFO.phone}
- 주소: ${DEFAULT_CENTER_INFO.address} (3층 직업교육훈련팀)
- 운영시간: ${DEFAULT_CENTER_INFO.operatingHours}
- 현재 안내 기준 과정: "${selectedCourse.name}" (과정 ID: ${selectedCourse.id})

# 모집공고 지식베이스
${coursesFormatted}

# 직업교육훈련의 목적
- 본 훈련은 "취업"을 목적으로 하는 과정입니다.
  단순 취미·자기계발이 아니라 취업을 준비·희망하는 분을 위한 과정임을 자연스럽게 안내합니다.

# 다루는 범위
- 다루는 것: 직업교육훈련 과정 안내, 신청자격·제한, 신청기간·방법, 제출서류, 교육기간·시간·장소, 교육비, 선발방법, 훈련수당(참여수당·취업성공수당).
- 다루지 않는 것(범위 밖): 새일여성인턴, 취업연계, 사후관리, 창업지원, 개인별 자격 최종판정 → 억지로 답하지 말고 "이 안내는 직업교육훈련 중심이라, 해당 내용은 센터에서 확인이 필요합니다"라며 [문의·상담]으로 연결합니다.

# 최우선 원칙 — 근거 기반과 안전
1. 모든 안내는 제공된 모집공고·안내문에만 근거합니다. 없는 내용은 지어내지 않습니다.
2. ★과정별 구분: 자격·기간·일정·정원은 과정마다 다르므로 여러 과정의 정보를 섞지 않습니다. 어느 과정인지 불분명하면 먼저 여쭙습니다.
3. ★교육비: 본 센터 직업교육훈련은 국비+지방비 지원으로 "무료 운영"됩니다.
4. ★신청·선발 방식:
   - 지원방식은 "방문접수"입니다. (온라인·전화 접수가 아님을 정확히 안내)
   - 선발은 "1차 서류접수 → 2차 면접" 절차로 이뤄지며, 신청이 곧 참여 확정이 아닙니다.
   - 면접은 개강 5~7일 전에 유선(전화) 및 문자로 개별 안내됩니다.
5. ★접수기간(중요): 본 과정은 "선착순 마감이 아닙니다".
   정해진 접수기간 안에 방문접수하면 되며, "먼저 신청해야 마감 전 된다"는 식으로 선착순인 것처럼 안내하지 않습니다. 접수기간(시작·마감일)은 공고에 적힌 날짜 그대로 안내하고 추정하지 않습니다.
6. ★훈련수당(참여수당·취업성공수당):
   - 참여수당: 교육일수 20일 기준, 출석률 80% 이상일 때 지급됩니다. 출석 조건을 충족해야 지급됨을 분명히 안내하고, "무조건 지급"으로 오해하지 않게 합니다.
   - 취업성공수당: 수료 후 6개월 이내 취업 시 지급됩니다. 수료 + 기한 내 취업이라는 조건이 있음을 안내합니다.
   - 금액·지급조건·기한은 공고에 적힌 그대로만 안내하고 추정·계산하지 않습니다. 세부 지급 요건은 개인 상황에 따라 다를 수 있어 "정확한 확인은 센터 상담"을 권합니다.
7. 자격·수당 해당 여부는 개인 상황에 따라 다르므로 "일반 안내"임을 밝히고 "정확한 확인은 센터 상담"을 권합니다. ("지급됩니다" 단정 대신 "지급될 수 있습니다")
8. 근거가 없거나 불충분하면 추측하지 말고 [문의·상담]으로 연결합니다.

# ★신청 제한요건 — 선제 확인 규칙 (핵심)
- 발동 조건: 사용자가 "신청하고 싶다 / 신청 방법 / 참여하고 싶다 / 등록"처럼 ‘신청 의향’을 보이거나, 신청 절차를 물을 때.
  (단순 정보 질문 — 교육비·시간·과정내용 등 — 에는 발동하지 않는다.)
- 발동 시 행동: 신청 안내를 하기 전에, 아래 세 가지를 부드럽게 먼저 확인한다.
  ① 현재 직장에 다니고 계신가요(고용보험 가입 상태)?
  ② 사업자등록증을 가지고 계신가요?
  ③ 현재 다른 국비지원 훈련에 참여 중이신가요?
- 확인 방식: 캐묻는 느낌이 들지 않도록, 응원하는 어조로 "몇 가지만 확인하면 더 정확히 안내해 드릴 수 있어요"라고 이유를 밝히고 묻는다.
- ★판정 금지: 답을 들어도 챗봇이 "그러면 신청 가능/불가능"이라고 확정하지 않는다.
  하나라도 해당하면 "신청이 제한될 수 있어 방문·신청 전 센터 전화 확인이 필요하다"고 안내하고 [문의·상담]으로 연결한다.
  셋 다 해당 없으면 "제한요건에는 해당하지 않으실 수 있으나 최종 확인은 센터에서 이뤄진다"고 밝히고 신청 절차를 안내한다.
- 이미 사용자가 관련 정보를 말했다면 다시 묻지 않고 그 내용을 반영한다.

# 어조
- 다시 일을 준비하시는 분을 응원하는 따뜻한 말투. 경력 공백을 부정적으로 규정하지 않는다.
- 전문용어는 쉬운 말로 풀고, 필요한 용어는 (괄호로) 설명한다.
- 돌봄 병행 고민을 고려해, 교육 시간대·운영방식 정보가 공고에 있으면 함께 안내한다.

# 답변 구성 — 질문에 따라 "필요한 것만" (매번 전부 넣지 않는다)
- [한눈에 요약] : 항상 포함. 쉬운 말 2~3문장.
- [자세히 안내] : 신청방법·서류·일정·수당 등이 있을 때만.
- [꼭 확인하세요] : 접수기간·선발절차·신청제한·수당조건 등 놓치기 쉬운 점이 있을 때만.
- [문의·상담] : 개별 판단·신청제한 해당·범위 밖·근거 불충분 시 (적극 안내, 센터 전화번호 ${DEFAULT_CENTER_INFO.phone} 명시).
- [이런 것도 궁금하실 수 있어요] : 지식베이스로 답변 가능한 연관 질문을 최대 3~5개 제안.

# 출처·시의성
- 답변 끝에 근거를 한 줄로 밝힙니다.
  예) "이 안내는 「2026년 ${selectedCourse.name} 모집공고」를 바탕으로 합니다."
- "최신 모집 여부·접수기간은 센터나 공식 공고로 확인"을 덧붙입니다.

# 다중 질문 / 모호한 질문
- 질문이 둘 이상이면 번호를 붙여 각각 답합니다.
- 어느 과정을 묻는지 불분명하면 넘겨짚지 말고 "어떤 과정을 말씀하시는지" 먼저 여쭙니다.
`;
}

// API Routes
app.get("/api/courses", (req, res) => {
  res.json({
    courses: COURSES_KNOWLEDGE_BASE,
    center: DEFAULT_CENTER_INFO,
    hasServerKey: !!process.env.GEMINI_API_KEY
  });
});

// Verify Gemini API Key Endpoint
app.post("/api/verify-key", async (req, res) => {
  try {
    const rawKey = req.body.apiKey ? String(req.body.apiKey).trim() : '';
    const keyToTest = rawKey || process.env.GEMINI_API_KEY;

    if (!keyToTest) {
      return res.status(400).json({
        success: false,
        message: "Gemini API Key가 누락되었습니다. Key를 입력하거나 기본 환경키를 승인해 주세요."
      });
    }

    const testAi = new GoogleGenAI({
      apiKey: keyToTest,
      httpOptions: {
        headers: { 'User-Agent': 'aistudio-build' },
      },
    });

    const candidateModels = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-3.6-flash"];
    let verificationSuccess = false;
    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        const testResponse = await testAi.models.generateContent({
          model: modelName,
          contents: [{ role: 'user', parts: [{ text: "안녕" }] }],
        });

        if (testResponse) {
          verificationSuccess = true;
          break;
        }
      } catch (err: any) {
        lastError = err;
        // If error is about model not found, try next model. If API key is invalid, break.
        if (err?.message?.includes("API key not valid") || err?.status === 400 || err?.status === 403 || err?.status === 401) {
          break;
        }
      }
    }

    if (verificationSuccess) {
      return res.json({
        success: true,
        message: "Gemini API Key가 성공적으로 승인되었습니다! 모든 AI 안내 기능이 활성화되었습니다.",
        hasServerKey: !!process.env.GEMINI_API_KEY
      });
    } else {
      const errMsg = lastError?.message || "Gemini API Key 검증에 실패하였습니다. 입력하신 키가 유효한지 확인해 주세요.";
      return res.status(400).json({
        success: false,
        message: errMsg
      });
    }
  } catch (error: any) {
    console.error("API Key verification failed:", error);
    return res.status(400).json({
      success: false,
      message: error?.message || "유효하지 않거나 승인되지 않은 Gemini API Key입니다. 키를 다시 확인해 주세요."
    });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages, selectedCourseId, apiKey } = req.body;
    const clientKey = (apiKey ? String(apiKey).trim() : '') || (req.headers['x-gemini-api-key'] as string);
    const gemini = getGeminiClient(clientKey);

    if (!gemini) {
      return res.status(400).json({
        error: "Gemini API Key 승인이 필요합니다.",
        reply: `[한눈에 요약] 서비스를 이용하시려면 먼저 랜딩페이지에서 Gemini API Key 승인을 받으셔야 합니다.\n\n[문의·상담] 파주새일센터 대표전화: ${DEFAULT_CENTER_INFO.phone}`,
        suggestions: ["Gemini API Key 승인 받으러 가기"]
      });
    }

    const systemInstruction = buildKnowledgeBasePrompt(selectedCourseId);

    // Build chat history for Gemini
    // Convert previous messages to standard user/model turns
    const promptContents = messages.map((m: any) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const candidateModels = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-3.6-flash"];
    let responseText = "";
    let lastChatErr = null;

    for (const modelName of candidateModels) {
      try {
        const response = await gemini.models.generateContent({
          model: modelName,
          contents: promptContents,
          config: {
            systemInstruction,
            temperature: 0.3,
          },
        });
        if (response && response.text) {
          responseText = response.text;
          break;
        }
      } catch (err: any) {
        lastChatErr = err;
      }
    }

    const replyText = responseText || "답변을 불러오지 못했습니다. 센터 전화로 문의해주세요.";

    // Parse suggestions from response if generated or build default fallback suggestions
    let suggestions: string[] = [];
    if (replyText.includes("[이런 것도 궁금하실 수 있어요]")) {
      const match = replyText.match(/\[이런 것도 궁금하실 수 있어요\]([\s\S]*?)(?=$|\n\n이 안내는|\n이 안내는)/);
      if (match && match[1]) {
        const lines = match[1].split("\n")
          .map(l => l.replace(/^[-*•\d.\s]+/, "").trim())
          .filter(l => l.length > 2 && l.length < 50);
        suggestions = lines.slice(0, 4);
      }
    }

    if (suggestions.length === 0) {
      suggestions = [
        "교육비가 얼마인가요?",
        "선착순 마감인가요?",
        "훈련수당 자격이 어떻게 되나요?",
        "제출서류에는 어떤 것이 있나요?"
      ];
    }

    return res.json({
      reply: replyText,
      suggestions
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      error: "안내 생성 중 오류가 발생했습니다.",
      reply: `[한눈에 요약] 안내 생성 중 일시적인 오류가 발생했습니다. 잠시 후 다시 시도하시거나 센터로 연락 주시면 친절히 안내해 드리겠습니다.\n\n[문의·상담] ${DEFAULT_CENTER_INFO.name} 대표전화: ${DEFAULT_CENTER_INFO.phone}`
    });
  }
});

// Setup Vite or Static File serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
