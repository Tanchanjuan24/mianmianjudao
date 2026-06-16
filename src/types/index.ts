// 面试场景
export type SceneType = 'job' | 'club';

// 面试阶段
export type InterviewPhase = 'idle' | 'interviewing' | 'completed';

// 消息角色
export type MessageRole = 'interviewer' | 'user' | 'system';

// 单条消息
export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

// 视频标记
export interface VideoMarker {
  id: string;
  time: number;
  label: string;
  type: 'warning' | 'info' | 'good' | 'bad';
  description: string;
}

// 雷达图维度
export interface RadarDimension {
  name: string;
  score: number;
  fullMark: number;
}

// 复盘数据
export interface ReviewReport {
  scene: SceneType;
  overallScore: number;
  dimensions: RadarDimension[];
  originalScript: ScriptLine[];
  optimizedScript: ScriptLine[];
  markers: VideoMarker[];
  summary: string;
  strengths: string[];
  improvements: string[];
}

// 文稿行（用于对比展示）
export interface ScriptLine {
  id: string;
  original: string;
  optimized: string;
  hasChange: boolean;
}

// AI API 配置
export interface AIConfig {
  provider: 'openai' | 'anthropic' | 'deepseek' | 'custom';
  apiKey: string;
  baseUrl: string;
  model: string;
}

// ── 求职面试配置 ──
export interface JobConfig {
  industry: string;
  position: string;
  resumeContent: string;
  resumeFileName: string;
  notes: string;
}

// ── 社团面试配置 ──
export interface ClubConfig {
  organizationType: string;
  position: string;
  personalStatement: string;
  notes: string;
}

// ── 面试记录（持久化到 localStorage） ──
export interface InterviewRecord {
  id: string;
  sceneType: SceneType;
  config: JobConfig | ClubConfig;
  messages: Message[];
  report: ReviewReport | null;
  duration: number;
  createdAt: string;
  aiScore: number;
}

// 面试状态（扩展）
export interface InterviewState {
  scene: SceneType;
  phase: InterviewPhase;
  messages: Message[];
  startTime: number | null;
  elapsedTime: number;
  aiConfig: AIConfig;
  isMockMode: boolean;
  report: ReviewReport | null;
  // 新增：面试配置
  jobConfig: JobConfig;
  clubConfig: ClubConfig;
  // 新增：AI 追问计数
  questionCount: number;
  maxQuestions: number;
}

// 面试操作
export type InterviewAction =
  | { type: 'SET_SCENE'; payload: SceneType }
  | { type: 'SET_PHASE'; payload: InterviewPhase }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'SET_START_TIME'; payload: number }
  | { type: 'SET_ELAPSED_TIME'; payload: number }
  | { type: 'SET_AI_CONFIG'; payload: Partial<AIConfig> }
  | { type: 'SET_MOCK_MODE'; payload: boolean }
  | { type: 'SET_REPORT'; payload: ReviewReport }
  | { type: 'SET_JOB_CONFIG'; payload: Partial<JobConfig> }
  | { type: 'SET_CLUB_CONFIG'; payload: Partial<ClubConfig> }
  | { type: 'INCREMENT_QUESTION' }
  | { type: 'RESET' };
