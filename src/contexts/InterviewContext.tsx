import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { InterviewState, InterviewAction, AIConfig, JobConfig, ClubConfig } from '../types';

const defaultAIConfig: AIConfig = {
  provider: 'openai',
  apiKey: '',
  baseUrl: 'https://api.openai.com/v1',
  model: 'gpt-4o-mini',
};

const defaultJobConfig: JobConfig = {
  industry: '',
  position: '',
  resumeContent: '',
  resumeFileName: '',
  notes: '',
};

const defaultClubConfig: ClubConfig = {
  organizationType: '',
  position: '',
  personalStatement: '',
  notes: '',
};

const initialState: InterviewState = {
  scene: 'job',
  phase: 'idle',
  messages: [],
  startTime: null,
  elapsedTime: 0,
  aiConfig: defaultAIConfig,
  isMockMode: true,
  report: null,
  jobConfig: defaultJobConfig,
  clubConfig: defaultClubConfig,
  questionCount: 0,
  maxQuestions: 5,
};

function loadAIConfig(): AIConfig {
  try {
    const saved = localStorage.getItem('mmjd-ai-config');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultAIConfig, ...parsed };
    }
  } catch { /* ignore */ }
  return defaultAIConfig;
}

function saveAIConfig(config: AIConfig) {
  try {
    localStorage.setItem('mmjd-ai-config', JSON.stringify(config));
  } catch { /* ignore */ }
}

function interviewReducer(state: InterviewState, action: InterviewAction): InterviewState {
  switch (action.type) {
    case 'SET_SCENE':
      return { ...state, scene: action.payload };
    case 'SET_PHASE':
      return { ...state, phase: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'SET_START_TIME':
      return { ...state, startTime: action.payload };
    case 'SET_ELAPSED_TIME':
      return { ...state, elapsedTime: action.payload };
    case 'SET_AI_CONFIG': {
      const newConfig = { ...state.aiConfig, ...action.payload };
      saveAIConfig(newConfig);
      return { ...state, aiConfig: newConfig, isMockMode: !newConfig.apiKey };
    }
    case 'SET_MOCK_MODE':
      return { ...state, isMockMode: action.payload };
    case 'SET_REPORT':
      return { ...state, report: action.payload };
    case 'SET_JOB_CONFIG':
      return { ...state, jobConfig: { ...state.jobConfig, ...action.payload } };
    case 'SET_CLUB_CONFIG':
      return { ...state, clubConfig: { ...state.clubConfig, ...action.payload } };
    case 'INCREMENT_QUESTION':
      return { ...state, questionCount: state.questionCount + 1 };
    case 'RESET':
      return {
        ...initialState,
        aiConfig: state.aiConfig,
        isMockMode: !state.aiConfig.apiKey,
        jobConfig: state.jobConfig,
        clubConfig: state.clubConfig,
      };
    default:
      return state;
  }
}

interface InterviewContextValue {
  state: InterviewState;
  dispatch: React.Dispatch<InterviewAction>;
}

const InterviewContext = createContext<InterviewContextValue | null>(null);

export function InterviewProvider({ children }: { children: React.ReactNode }) {
  const savedConfig = loadAIConfig();
  const [state, dispatch] = useReducer(interviewReducer, {
    ...initialState,
    aiConfig: savedConfig,
    isMockMode: !savedConfig.apiKey,
  });

  // 计时器
  useEffect(() => {
    if (state.phase !== 'interviewing' || !state.startTime) return;
    const timer = setInterval(() => {
      dispatch({
        type: 'SET_ELAPSED_TIME',
        payload: Math.floor((Date.now() - state.startTime!) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [state.phase, state.startTime]);

  return (
    <InterviewContext.Provider value={{ state, dispatch }}>
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview(): InterviewContextValue {
  const ctx = useContext(InterviewContext);
  if (!ctx) {
    throw new Error('useInterview must be used within InterviewProvider');
  }
  return ctx;
}
