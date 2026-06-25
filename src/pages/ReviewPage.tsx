import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import ScriptPanel from '../components/review/ScriptPanel';
import VideoReplay from '../components/review/VideoReplay';
import RadarChart from '../components/review/RadarChart';
import FacialAnalysisPanel from '../components/review/FacialAnalysisPanel';
import AnswerAnalysisPanel from '../components/review/AnswerAnalysisPanel';
import { useInterview } from '../contexts/InterviewContext';
import { jobReviewReport, clubReviewReport } from '../data/mockData';
import { getRecordById } from '../services/storageService';
import { useIsMobile } from '../hooks/useMediaQuery';
import type { SceneType, ReviewReport } from '../types';

type TabKey = 'script' | 'video' | 'radar' | 'facial' | 'answer';

export default function ReviewPage() {
  const { scene } = useParams<{ scene: SceneType }>();
  const { state } = useInterview();
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabKey>('script');

  const currentScene = (scene as SceneType) || 'job';
  const sceneTitle = currentScene === 'job' ? '求职备战' : '社团竞选';

  const [report, setReport] = useState<ReviewReport>(() => {
    const recordId = searchParams.get('recordId');
    if (recordId) {
      const record = getRecordById(recordId);
      if (record?.report) return record.report;
    }
    if (state.report?.scene === currentScene) return state.report;
    return currentScene === 'job' ? jobReviewReport : clubReviewReport;
  });

  useEffect(() => {
    const recordId = searchParams.get('recordId');
    if (recordId) {
      const record = getRecordById(recordId);
      if (record?.report) { setReport(record.report); return; }
    }
    if (state.report?.scene === currentScene) setReport(state.report);
    else setReport(currentScene === 'job' ? jobReviewReport : clubReviewReport);
  }, [searchParams, currentScene, state.report]);

  // 导出复盘报告
  const handleExportReport = useCallback(() => {
    let text = `面面俱到 - 复盘报告\n${'='.repeat(40)}\n场景：${sceneTitle}\n综合评分：${report.overallScore}/100\n时间：${new Date().toLocaleString('zh-CN')}\n${'='.repeat(40)}\n\n`;
    text += `【综合评价】\n${report.summary}\n\n`;
    text += `【优势】\n${report.strengths.map(s => `  ✓ ${s}`).join('\n')}\n\n`;
    text += `【改进方向】\n${report.improvements.map(s => `  → ${s}`).join('\n')}\n\n`;
    text += `【六维评分】\n${report.dimensions.map(d => `  ${d.name}: ${d.score}/100`).join('\n')}\n\n`;
    if (report.facialAnalysis) {
      text += `【面部表情分析】\n  眼神交流: ${report.facialAnalysis.eyeContact}/100\n  微笑频率: ${report.facialAnalysis.smileRate}/100\n  头部稳定性: ${report.facialAnalysis.headStability}/100\n  表情丰富度: ${report.facialAnalysis.facialExpression}/100\n  紧张程度: ${report.facialAnalysis.nervousness}/100\n  ${report.facialAnalysis.overallFeedback}\n\n`;
    }
    if (report.answerAnalysis) {
      text += `【逐题分析】\n`;
      report.answerAnalysis.forEach((a, i) => {
        text += `  Q${i+1}: ${a.question}\n  评分: ${a.score}/100\n  反馈: ${a.feedback}\n\n`;
      });
    }
    text += `${'='.repeat(40)}\n由 面面俱到 AI模拟面试平台 生成`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `复盘报告-${sceneTitle}-${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [report, sceneTitle]);

  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: 'script', label: 'AI文稿', icon: '📝' },
    { key: 'video', label: '视频回放', icon: '🎬' },
    { key: 'radar', label: '能力雷达', icon: '📊' },
    { key: 'facial', label: '表情分析', icon: '😊' },
    { key: 'answer', label: '回答分析', icon: '💬' },
  ];

  const minHeight = isMobile ? 'calc(100vh - 280px)' : 'calc(100vh - 200px)';

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link to={searchParams.get('recordId') ? '/history' : `/interview/${currentScene}`} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">{sceneTitle} · 复盘报告</h1>
            <p className="text-xs text-gray-400">面试表现全面分析</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExportReport} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-sm transition-colors flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            <span className="hidden sm:inline">导出报告</span>
          </button>
          <Link to="/history" className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-sm transition-colors hidden sm:block">历史记录</Link>
          <Link to="/" className="px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors">返回首页</Link>
        </div>
      </div>

      {/* 手机端 Tab */}
      {isMobile && (
        <div className="flex bg-gray-100 rounded-xl p-1 mb-4 overflow-x-auto scrollbar-thin">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex-1 min-w-[70px] py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${activeTab === tab.key ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}>
              <span className="mr-0.5">{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 min-h-0">
        {!isMobile ? (
          <div className="grid grid-cols-3 gap-4 h-full" style={{ minHeight }}>
            <div className="h-full"><ScriptPanel scriptLines={report.optimizedScript} summary={report.summary} strengths={report.strengths} improvements={report.improvements} /></div>
            <div className="h-full space-y-4">
              <div className="h-1/2"><VideoReplay markers={report.markers} /></div>
              <div className="h-1/2">{report.facialAnalysis && <FacialAnalysisPanel analysis={report.facialAnalysis} />}</div>
            </div>
            <div className="h-full space-y-4">
              <div className="h-1/2"><RadarChart dimensions={report.dimensions} overallScore={report.overallScore} /></div>
              <div className="h-1/2">{report.answerAnalysis && <AnswerAnalysisPanel analyses={report.answerAnalysis} />}</div>
            </div>
          </div>
        ) : (
          <div style={{ minHeight }}>
            {activeTab === 'script' && <div className="h-full" style={{ minHeight }}><ScriptPanel scriptLines={report.optimizedScript} summary={report.summary} strengths={report.strengths} improvements={report.improvements} /></div>}
            {activeTab === 'video' && <div className="h-full" style={{ minHeight }}><VideoReplay markers={report.markers} /></div>}
            {activeTab === 'radar' && <div className="h-full" style={{ minHeight }}><RadarChart dimensions={report.dimensions} overallScore={report.overallScore} /></div>}
            {activeTab === 'facial' && report.facialAnalysis && <div className="h-full" style={{ minHeight }}><FacialAnalysisPanel analysis={report.facialAnalysis} /></div>}
            {activeTab === 'answer' && report.answerAnalysis && <div className="h-full" style={{ minHeight }}><AnswerAnalysisPanel analyses={report.answerAnalysis} /></div>}
          </div>
        )}
      </div>
    </div>
  );
}
