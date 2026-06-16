import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import VideoPanel from '../components/interview/VideoPanel';
import ChatPanel from '../components/interview/ChatPanel';
import ControlBar from '../components/interview/ControlBar';
import AIConfigPanel from '../components/interview/AIConfigPanel';
import { useInterview } from '../contexts/InterviewContext';
import { useRecorder } from '../hooks/useRecorder';
import { callAI } from '../services/aiService';
import { addRecord, generateId } from '../services/storageService';
import { resetMockQuestionIndex } from '../data/mockData';
import { jobReviewReport, clubReviewReport } from '../data/mockData';
import type { SceneType, Message, InterviewRecord } from '../types';

export default function InterviewPage() {
  const { scene } = useParams<{ scene: SceneType }>();
  const navigate = useNavigate();
  const { state, dispatch } = useInterview();
  const { isRecording, stream, error: recorderError, startRecording, stopRecording } = useRecorder();
  const [showAIConfig, setShowAIConfig] = useState(false);
  const [isAIThinking, setIsAIThinking] = useState(false);

  const currentScene = (scene as SceneType) || 'job';
  const sceneTitle = currentScene === 'job' ? '求职备战' : '社团竞选';
  const sceneSubtitle = currentScene === 'job' ? '模拟真实求职面试' : '模拟社团竞选答辩';

  // 初始化场景
  useEffect(() => {
    dispatch({ type: 'SET_SCENE', payload: currentScene });
    resetMockQuestionIndex();
    // 不 RESET 以保留配置
  }, [currentScene, dispatch]);

  // 构建带配置上下文的系统提示
  const getConfigContext = useCallback((): string => {
    if (currentScene === 'job') {
      const { industry, position, resumeContent, notes } = state.jobConfig;
      const parts: string[] = [];
      if (industry) parts.push(`目标行业：${industry}`);
      if (position) parts.push(`岗位类型：${position}`);
      if (resumeContent) parts.push(`简历摘要：${resumeContent.substring(0, 500)}`);
      if (notes) parts.push(`候选人备注：${notes}`);
      return parts.length > 0 ? parts.join('\n') : '';
    } else {
      const { organizationType, position, personalStatement, notes } = state.clubConfig;
      const parts: string[] = [];
      if (organizationType) parts.push(`竞选组织：${organizationType}`);
      if (position) parts.push(`竞选职位：${position}`);
      if (personalStatement) parts.push(`个人陈述：${personalStatement}`);
      if (notes) parts.push(`补充说明：${notes}`);
      return parts.length > 0 ? parts.join('\n') : '';
    }
  }, [currentScene, state.jobConfig, state.clubConfig]);

  // 获取AI响应
  const getAIResponse = useCallback(
    async (msgs: Message[], isFollowUp = false) => {
      setIsAIThinking(true);
      try {
        const contextMsg: Message = {
          id: `ctx-${Date.now()}`,
          role: 'system',
          content: getConfigContext(),
          timestamp: Date.now(),
        };
        const allMsgs = getConfigContext() ? [contextMsg, ...msgs] : msgs;

        const response = await callAI(state.aiConfig, allMsgs, currentScene, isFollowUp);
        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          role: 'interviewer',
          content: response,
          timestamp: Date.now(),
        };
        dispatch({ type: 'ADD_MESSAGE', payload: aiMsg });
        dispatch({ type: 'INCREMENT_QUESTION' });

        // 检查是否达到最大问题数（用户回复数 >= maxQuestions）
        const userMsgCount = msgs.filter((m) => m.role === 'user').length;
        if (userMsgCount >= state.maxQuestions) {
          // 自动结束
          setTimeout(() => {
            finishInterview();
          }, 2000);
        }
      } catch (err) {
        const errMsg: Message = {
          id: `err-${Date.now()}`,
          role: 'system',
          content: err instanceof Error ? err.message : 'AI响应失败，请检查配置',
          timestamp: Date.now(),
        };
        dispatch({ type: 'ADD_MESSAGE', payload: errMsg });
      } finally {
        setIsAIThinking(false);
      }
    },
    [state.aiConfig, currentScene, dispatch, getConfigContext, state.maxQuestions]
  );

  // 开始面试
  const handleStart = async () => {
    dispatch({ type: 'SET_PHASE', payload: 'interviewing' });
    dispatch({ type: 'SET_START_TIME', payload: Date.now() });
    dispatch({ type: 'SET_MESSAGES', payload: [] });
    resetMockQuestionIndex();

    // 启动录制
    await startRecording();

    // AI 开场白（带配置上下文）
    const configCtx = getConfigContext();
    const openingContent =
      currentScene === 'job'
        ? configCtx
          ? `你好！我看到你选择了「${state.jobConfig.industry}」行业的「${state.jobConfig.position}」岗位。我是今天的面试官，请你先做一个简单的自我介绍吧。`
          : '你好！欢迎参加今天的面试。我是今天的面试官，请你先做一个简单的自我介绍吧。'
        : configCtx
          ? `同学你好！我看到你想竞选「${state.clubConfig.organizationType}」的「${state.clubConfig.position}」。欢迎参加今天的竞选面试，请先自我介绍一下吧。`
          : '同学你好！欢迎参加今天的竞选面试。请先自我介绍一下，说说你为什么想加入我们？';

    const openingMessage: Message = {
      id: `open-${Date.now()}`,
      role: 'interviewer',
      content: openingContent,
      timestamp: Date.now(),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: openingMessage });
  };

  // 发送用户消息
  const handleSend = async (content: string) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: userMsg });

    const updatedMessages = [...state.messages, userMsg];
    await getAIResponse(updatedMessages, true);
  };

  // 结束面试并保存记录
  const finishInterview = () => {
    stopRecording();
    dispatch({ type: 'SET_PHASE', payload: 'completed' });

    const report = currentScene === 'job' ? jobReviewReport : clubReviewReport;
    dispatch({ type: 'SET_REPORT', payload: report });

    // 保存到 localStorage
    const record: InterviewRecord = {
      id: generateId(),
      sceneType: currentScene,
      config: currentScene === 'job' ? { ...state.jobConfig } : { ...state.clubConfig },
      messages: [...state.messages],
      report,
      duration: state.elapsedTime,
      createdAt: new Date().toISOString(),
      aiScore: report.overallScore,
    };
    addRecord(record);
  };

  const handleStop = () => {
    finishInterview();
  };

  // 查看复盘
  const handleViewReview = () => {
    navigate(`/review/${currentScene}`);
  };

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* 顶部标题栏 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-3">
            <Link to={currentScene === 'job' ? '/job-config' : '/club-config'} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">{sceneTitle}</h1>
              <p className="text-xs text-gray-400">{sceneSubtitle}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* 进度指示 */}
          {state.phase === 'interviewing' && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full hidden sm:inline">
              问题 {state.questionCount}/{state.maxQuestions}
            </span>
          )}

          {/* AI配置按钮 */}
          <button
            onClick={() => setShowAIConfig(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              state.isMockMode
                ? 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
                : 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
            }`}
          >
            {state.isMockMode ? 'Mock 模式' : 'AI 模式'}
          </button>

          {state.phase === 'completed' && (
            <button
              onClick={handleViewReview}
              className="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all"
            >
              查看复盘报告
            </button>
          )}
        </div>
      </div>

      {/* 配置信息提示条 */}
      {state.phase === 'idle' && (
        <div className="mb-4 p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-sm text-indigo-700 flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            {currentScene === 'job'
              ? `目标：${state.jobConfig.industry || '未选择'} · ${state.jobConfig.position || '未选择'}｜共 ${state.maxQuestions} 轮对话，AI将根据你的配置进行个性化提问`
              : `竞选：${state.clubConfig.organizationType || '未选择'} · ${state.clubConfig.position || '未选择'}｜共 ${state.maxQuestions} 轮对话`}
          </span>
        </div>
      )}

      {/* 主体区域 */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-0">
        {/* 左侧 - 视频面板 (占3列) */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <VideoPanel stream={stream} isRecording={isRecording} error={recorderError} />
          {/* 移动端进度条 */}
          {state.phase === 'interviewing' && (
            <div className="sm:hidden flex items-center gap-2 text-xs text-gray-500">
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all"
                  style={{ width: `${(state.questionCount / state.maxQuestions) * 100}%` }}
                />
              </div>
              <span>{state.questionCount}/{state.maxQuestions}</span>
            </div>
          )}
        </div>

        {/* 右侧 - 聊天面板 (占2列) */}
        <div className="lg:col-span-2 min-h-0" style={{ height: 'calc(100vh - 280px)', minHeight: '400px' }}>
          <ChatPanel
            messages={state.messages}
            onSend={handleSend}
            disabled={state.phase !== 'interviewing' || isAIThinking}
          />
          {isAIThinking && (
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-2 px-1">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              AI 面试官正在思考...
            </div>
          )}
        </div>
      </div>

      {/* 底部控制栏 */}
      <div className="mt-4">
        <ControlBar
          phase={state.phase}
          elapsedTime={state.elapsedTime}
          onStart={handleStart}
          onStop={handleStop}
          onToggleCamera={() => {
            stopRecording();
            startRecording();
          }}
        />
      </div>

      {/* AI 配置面板 */}
      <AIConfigPanel isOpen={showAIConfig} onClose={() => setShowAIConfig(false)} />
    </div>
  );
}
