import type { FacialAnalysis } from '../../types';

interface FacialAnalysisPanelProps {
  analysis: FacialAnalysis;
}

function getScoreColor(score: number, inverse = false): string {
  const actual = inverse ? 100 - score : score;
  if (actual >= 75) return 'text-[#3D8357]';
  if (actual >= 55) return 'text-[#FBC64D]';
  return 'text-[#C96B5E]';
}

function getBarColor(score: number, inverse = false): string {
  const actual = inverse ? 100 - score : score;
  if (actual >= 75) return 'bg-[#3D8357]';
  if (actual >= 55) return 'bg-[#FBC64D]';
  return 'bg-[#C96B5E]';
}

export default function FacialAnalysisPanel({ analysis }: FacialAnalysisPanelProps) {
  const metrics = [
    { name: '眼神交流', value: analysis.eyeContact, icon: '👁️', inverse: false, desc: '直视镜头的频率' },
    { name: '微笑频率', value: analysis.smileRate, icon: '😊', inverse: false, desc: '自然微笑的时间占比' },
    { name: '头部稳定性', value: analysis.headStability, icon: '🎯', inverse: false, desc: '头部晃动控制' },
    { name: '表情丰富度', value: analysis.facialExpression, icon: '🎭', inverse: false, desc: '面部表情变化自然度' },
    { name: '紧张程度', value: analysis.nervousness, icon: '😰', inverse: true, desc: '微表情透露的紧张信号（越低越好）' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#CDD2CC] h-full flex flex-col overflow-hidden shadow-sm">
      <div className="border-b border-[#CDD2CC] px-4 py-3">
        <h3 className="font-semibold text-[#1A2B20] text-sm sm:text-base">😊 面部表情 & 眼神分析</h3>
        <p className="text-xs text-[#8A9B8F] mt-0.5">AI视觉分析引擎实时评估</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin space-y-4">
        {/* 数据条 */}
        <div className="space-y-3">
          {metrics.map((m, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-[#4A5C50] flex items-center gap-1.5">
                  <span>{m.icon}</span> {m.name}
                </span>
                <span className={`text-sm font-bold ${getScoreColor(m.value, m.inverse)}`}>
                  {m.value}<span className="text-xs text-[#8A9B8F]">/100</span>
                </span>
              </div>
              <div className="w-full h-2 bg-[#F2F4F1] rounded-full overflow-hidden">
                <div className={`h-full ${getBarColor(m.value, m.inverse)} rounded-full transition-all`} style={{ width: `${m.value}%` }} />
              </div>
              <p className="text-[10px] text-[#8A9B8F] mt-0.5">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* 眼神反馈 */}
        <div className="bg-[#E0EDE5] rounded-xl p-3 border border-[#3D8357]/30">
          <h4 className="text-sm font-medium text-[#2D6B45] mb-1.5 flex items-center gap-1">👁️ 眼神交流分析</h4>
          <p className="text-xs text-[#4A5C50] leading-relaxed">{analysis.eyeContactFeedback}</p>
        </div>

        {/* 表情反馈 */}
        <div className="bg-[#FCF3DC] rounded-xl p-3 border border-[#FBC64D]/30">
          <h4 className="text-sm font-medium text-[#FBC64D] mb-1.5 flex items-center gap-1">🎭 表情分析</h4>
          <p className="text-xs text-[#4A5C50] leading-relaxed">{analysis.expressionFeedback}</p>
        </div>

        {/* 综合反馈 */}
        <div className="bg-[#E0EDE5] rounded-xl p-3 border border-[#3D8357]/30">
          <h4 className="text-sm font-medium text-[#2D6B45] mb-1.5 flex items-center gap-1">📋 综合提升建议</h4>
          <p className="text-xs text-[#4A5C50] leading-relaxed">{analysis.overallFeedback}</p>
        </div>
      </div>
    </div>
  );
}
