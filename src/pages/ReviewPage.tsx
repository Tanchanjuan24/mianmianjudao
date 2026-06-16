import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import ScriptPanel from '../components/review/ScriptPanel';
import VideoReplay from '../components/review/VideoReplay';
import RadarChart from '../components/review/RadarChart';
import { useInterview } from '../contexts/InterviewContext';
import { jobReviewReport, clubReviewReport } from '../data/mockData';
import { getRecordById } from '../services/storageService';
import { useIsMobile } from '../hooks/useMediaQuery';
import type { SceneType, ReviewReport } from '../types';

export default function ReviewPage() {
  const { scene } = useParams<{ scene: SceneType }>();
  const { state } = useInterview();
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'script' | 'video' | 'radar'>('script');

  const currentScene = (scene as SceneType) || 'job';
  const sceneTitle = currentScene === 'job' ? '求职备战' : '社团竞选';

  // 加载报告：URL参数 recordId > context > mock
  const [report, setReport] = useState<ReviewReport>(() => {
    // 1. 从 URL 参数读取 recordId
    const recordId = searchParams.get('recordId');
    if (recordId) {
      const record = getRecordById(recordId);
      if (record?.report) return record.report;
    }
    // 2. 从 context
    if (state.report?.scene === currentScene) return state.report;
    // 3. mock
    return currentScene === 'job' ? jobReviewReport : clubReviewReport;
  });

  // 当 recordId 变化时重新加载
  useEffect(() => {
    const recordId = searchParams.get('recordId');
    if (recordId) {
      const record = getRecordById(recordId);
      if (record?.report) {
        setReport(record.report);
        return;
      }
    }
    if (state.report?.scene === currentScene) {
      setReport(state.report);
    } else {
      setReport(currentScene === 'job' ? jobReviewReport : clubReviewReport);
    }
  }, [searchParams, currentScene, state.report]);

  const tabs = [
    { key: 'script' as const, label: 'AI优化文稿', icon: '📝' },
    { key: 'video' as const, label: '视频回放', icon: '🎬' },
    { key: 'radar' as const, label: '能力雷达', icon: '📊' },
  ];

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* 顶部标题栏 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link
            to={searchParams.get('recordId') ? '/history' : `/interview/${currentScene}`}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">
              {sceneTitle} · 复盘报告
            </h1>
            <p className="text-xs text-gray-400">面试表现全面分析</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            to="/history"
            className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-sm transition-colors"
          >
            历史记录
          </Link>
          <Link
            to="/"
            className="px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>

      {/* 手机端 Tab 切换 */}
      {isMobile && (
        <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* 三栏布局 (PC) / 单栏Tab切换 (手机) */}
      <div className="flex-1 min-h-0">
        {!isMobile ? (
          <div className="grid grid-cols-3 gap-4 h-full" style={{ minHeight: 'calc(100vh - 200px)' }}>
            <div className="h-full">
              <ScriptPanel
                scriptLines={report.optimizedScript}
                summary={report.summary}
                strengths={report.strengths}
                improvements={report.improvements}
              />
            </div>
            <div className="h-full">
              <VideoReplay markers={report.markers} />
            </div>
            <div className="h-full">
              <RadarChart dimensions={report.dimensions} overallScore={report.overallScore} />
            </div>
          </div>
        ) : (
          <div style={{ minHeight: 'calc(100vh - 250px)' }}>
            {activeTab === 'script' && (
              <div className="h-full" style={{ minHeight: 'calc(100vh - 250px)' }}>
                <ScriptPanel
                  scriptLines={report.optimizedScript}
                  summary={report.summary}
                  strengths={report.strengths}
                  improvements={report.improvements}
                />
              </div>
            )}
            {activeTab === 'video' && (
              <div className="h-full" style={{ minHeight: 'calc(100vh - 250px)' }}>
                <VideoReplay markers={report.markers} />
              </div>
            )}
            {activeTab === 'radar' && (
              <div className="h-full" style={{ minHeight: 'calc(100vh - 250px)' }}>
                <RadarChart dimensions={report.dimensions} overallScore={report.overallScore} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
