import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import VideoPanel from '../components/interview/VideoPanel';
import ChatPanel from '../components/interview/ChatPanel';
import ControlBar from '../components/interview/ControlBar';
import AIConfigPanel from '../components/interview/AIConfigPanel';
import { useInterview } from '../contexts/InterviewContext';
import { useRecorder } from '../hooks/useRecorder';
import { useSpeech } from '../hooks/useSpeech';
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
  const { isListening, isSpeaking, interimText, speak, stopSpeaking, startListening, stopListening, cleanup } = useSpeech();
  const [showAIConfig, setShowAIConfig] = useState(false);
  const [isAIThinking, setIsAIThinking] = useState(false);

  const currentScene = (scene as SceneType) || 'job';
  const sceneTitle = currentScene === 'job' ? '求职备战' : '社团竞选';
  const sceneSubtitle = currentScene === 'job' ? '模拟真实求职面试' : '模拟社团竞选答辩';

  useEffect(() => {
    dispatch({ type: 'SET_SCENE', payload: currentScene });
    resetMockQuestionIndex();
    return () => { cleanup(); };
  }, [currentScene, dispatch, cleanup]);

  const getConfigContext = useCallback((): string => {
    if (currentScene === 'job') {
      const { industry, position, resumeContent, notes } = state.jobConfig;
      const parts: string[] = [];
      if (industry) parts.push(`目标行业：${industry}`);
      if (position) parts.push(`目标岗位：${position}`);
      if (resumeContent) parts.push(`简历摘要：${resumeContent.substring(0, 500)}`);
      if (notes) parts.push(`候选人备注：${notes}`);
      return parts.join('\n');
    } else {
      const { organizationType, position, personalStatement, notes } = state.clubConfig;
      const parts: string[] = [];
      if (organizationType) parts.push(`竞选组织：${organizationType}`);
      if (position) parts.push(`竞选职位：${position}`);
      if (personalStatement) parts.push(`个人陈述：${personalStatement}`);
      if (notes) parts.push(`补充说明：${notes}`);
      return parts.join('\n');
    }
  }, [currentScene, state.jobConfig, state.clubConfig]);

  const getAIResponse = useCallback(
    async (msgs: Message[], isFollowUp = false) => {
      setIsAIThinking(true);
      try {
        const contextMsg: Message = { id: `ctx-${Date.now()}`, role: 'system', content: getConfigContext(), timestamp: Date.now() };
        const allMsgs = getConfigContext() ? [contextMsg, ...msgs] : msgs;
        const response = await callAI(state.aiConfig, allMsgs, currentScene, isFollowUp);
        const aiMsg: Message = { id: `ai-${Date.now()}`, role: 'interviewer', content: response, timestamp: Date.now() };
        dispatch({ type: 'ADD_MESSAGE', payload: aiMsg });
        dispatch({ type: 'INCREMENT_QUESTION' });
        speak(response);
        const userMsgCount = msgs.filter((m) => m.role === 'user').length;
        if (userMsgCount >= state.maxQuestions) {
          setTimeout(() => { finishInterview(); }, 3000);
        }
      } catch (err) {
        const errMsg: Message = { id: `err-${Date.now()}`, role: 'system', content: err instanceof Error ? err.message : 'AI响应失败', timestamp: Date.now() };
        dispatch({ type: 'ADD_MESSAGE', payload: errMsg });
      } finally {
        setIsAIThinking(false);
      }
    },
    [state.aiConfig, currentScene, dispatch, getConfigContext, state.maxQuestions, speak]
  );

  const handleStart = async () => {
    dispatch({ type: 'SET_PHASE', payload: 'interviewing' });
    dispatch({ type: 'SET_START_TIME', payload: Date.now() });
    dispatch({ type: 'SET_MESSAGES', payload: [] });
    resetMockQuestionIndex();
    await startRecording();
    const configCtx = getConfigContext();
    const openingContent = currentScene === 'job'
      ? configCtx ? `你好！我看到你选择了「${state.jobConfig.industry}」行业的「${state.jobConfig.position}」岗位。我是今天的面试官，请先做一个简单的自我介绍吧。` : '你好！欢迎参加今天的面试。请先做一个简单的自我介绍吧。'
      : configCtx ? `同学你好！我看到你想竞选「${state.clubConfig.organizationType}」的「${state.clubConfig.position}」。欢迎参加竞选面试，请先自我介绍一下吧。` : '同学你好！欢迎参加竞选面试。请先自我介绍一下吧。';
    const openingMessage: Message = { id: `open-${Date.now()}`, role: 'interviewer', content: openingContent, timestamp: Date.now() };
    dispatch({ type: 'ADD_MESSAGE', payload: openingMessage });
    speak(openingContent);
  };

  const handleSend = async (content: string) => {
    stopSpeaking();
    stopListening();
    const userMsg: Message = { id: `user-${Date.now()}`, role: 'user', content, timestamp: Date.now() };
    dispatch({ type: 'ADD_MESSAGE', payload: userMsg });
    const updatedMessages = [...state.messages, userMsg];
    await getAIResponse(updatedMessages, true);
  };

  const handleVoiceResult = useCallback((text: string, isFinal: boolean) => {
    if (isFinal && text.trim()) { handleSend(text.trim()); }
  }, [handleSend]);

  const handleToggleListening = useCallback(() => {
    if (isListening) { stopListening(); } else { stopSpeaking(); startListening(handleVoiceResult); }
  }, [isListening, stopListening, stopSpeaking, startListening, handleVoiceResult]);

  // 导出对话记录
  const handleExport = useCallback(() => {
    const sceneLabel = currentScene === 'job' ? '求职备战' : '社团竞选';
    const configInfo = currentScene === 'job'
      ? `行业：${state.jobConfig.industry} | 岗位：${state.jobConfig.position}`
      : `组织：${state.clubConfig.organizationType} | 职位：${state.clubConfig.position}`;
    let text = `面面俱到 - 面试记录\n${'='.repeat(40)}\n场景：${sceneLabel}\n${configInfo}\n时间：${new Date().toLocaleString('zh-CN')}\n时长：${Math.floor(state.elapsedTime/60)}分${state.elapsedTime%60}秒\n${'='.repeat(40)}\n\n`;
    state.messages.forEach((msg) => {
      const role = msg.role === 'interviewer' ? 'AI面试官' : msg.role === 'user' ? '我' : '系统';
      const time = new Date(msg.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      text += `【${role}】${time}\n${msg.content}\n\n`;
    });
    text += `${'='.repeat(40)}\n由 面面俱到 AI模拟面试平台 生成`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `面试记录-${sceneLabel}-${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [currentScene, state.jobConfig, state.clubConfig, state.messages, state.elapsedTime]);

  const finishInterview = useCallback(() => {
    stopRecording(); stopSpeaking(); stopListening();
    dispatch({ type: 'SET_PHASE', payload: 'completed' });
    const report = currentScene === 'job' ? jobReviewReport : clubReviewReport;
    dispatch({ type: 'SET_REPORT', payload: report });
    const record: InterviewRecord = {
      id: generateId(), sceneType: currentScene,
      config: currentScene === 'job' ? { ...state.jobConfig } : { ...state.clubConfig },
      messages: [...state.messages], report, duration: state.elapsedTime,
      createdAt: new Date().toISOString(), aiScore: report.overallScore,
    };
    addRecord(record);
  }, [stopRecording, stopSpeaking, stopListening, currentScene, state.jobConfig, state.clubConfig, state.messages, state.elapsedTime, dispatch]);

  const handleStop = () => { finishInterview(); };
  const handleViewReview = () => { navigate(`/review/${currentScene}`); };

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link to={currentScene === 'job' ? '/job-config' : '/club-config'} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">{sceneTitle}</h1>
            <p className="text-xs text-gray-400">{sceneSubtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(isSpeaking || isListening) && (
            <div className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${isSpeaking ? 'bg-cyan-50 text-cyan-600' : 'bg-red-50 text-red-600'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isSpeaking ? 'bg-cyan-500' : 'bg-red-500'} animate-pulse`} />
              {isSpeaking ? 'AI说话中' : '聆听中'}
            </div>
          )}
          {state.phase === 'interviewing' && (
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
              <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all" style={{ width: `${(state.questionCount / state.maxQuestions) * 100}%` }} />
              </div>
              <span>{state.questionCount}/{state.maxQuestions}</span>
            </div>
          )}
          <button onClick={() => setShowAIConfig(true)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${state.isMockMode ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-green-200 bg-green-50 text-green-700'}`}>
            {state.isMockMode ? 'Mock' : 'AI'}
          </button>
          {state.phase === 'completed' && (
            <button onClick={handleViewReview} className="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all">查看复盘报告</button>
          )}
        </div>
      </div>

      {state.phase === 'idle' && (
        <div className="mb-4 p-3 glass rounded-xl text-sm text-gray-600 flex items-center gap-3 shadow-sm">
          <span className="text-lg">🎙️</span>
          <div>
            <p className="font-medium text-gray-700">
              {currentScene === 'job' ? `${state.jobConfig.industry || '未选择'} · ${state.jobConfig.position || '未选择'}` : `${state.clubConfig.organizationType || '未选择'} · ${state.clubConfig.position || '未选择'}`}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">AI面试官将语音提问，你可以打字或语音回答</p>
          </div>
        </div>
      )}

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-0">
        <div className="lg:col-span-3 flex flex-col gap-3">
          <VideoPanel stream={stream} isRecording={isRecording} error={recorderError}
            isAISpeaking={isSpeaking} isListening={isListening} phase={state.phase} />
          {state.phase === 'interviewing' && (
            <div className="sm:hidden flex items-center gap-2 text-xs text-gray-500">
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all" style={{ width: `${(state.questionCount / state.maxQuestions) * 100}%` }} />
              </div>
              <span>{state.questionCount}/{state.maxQuestions}</span>
            </div>
          )}
        </div>
        <div className="lg:col-span-2 min-h-0" style={{ height: 'calc(100vh - 280px)', minHeight: '400px' }}>
          <ChatPanel messages={state.messages} onSend={handleSend} disabled={state.phase !== 'interviewing' || isAIThinking}
            isListening={isListening} isSpeaking={isSpeaking} interimText={interimText}
            onStartListening={handleToggleListening} onStopListening={handleToggleListening} onExport={handleExport} />
          {isAIThinking && (
            <div className="flex items-center gap-2 text-sm text-indigo-500 mt-2 px-2 font-medium">
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

      <div className="mt-4">
        <ControlBar phase={state.phase} elapsedTime={state.elapsedTime} onStart={handleStart} onStop={handleStop}
          onToggleCamera={() => { stopRecording(); startRecording(); }} />
      </div>
      <AIConfigPanel isOpen={showAIConfig} onClose={() => setShowAIConfig(false)} />
    </div>
  );
}
