import type { AnswerAnalysis } from '../../types';

interface AnswerAnalysisPanelProps {
  analyses: AnswerAnalysis[];
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-[#5CA98A] bg-[#E8F3EE] border-[#5CA98A]/30';
  if (score >= 65) return 'text-[#D4A843] bg-[#FAF3E0] border-[#D4A843]/30';
  return 'text-[#C97064] bg-[#C97064]/10 border-[#C97064]/30';
}

export default function AnswerAnalysisPanel({ analyses }: AnswerAnalysisPanelProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E0DCCF] h-full flex flex-col overflow-hidden shadow-sm">
      <div className="border-b border-[#E0DCCF] px-4 py-3">
        <h3 className="font-semibold text-[#2A2A28] text-sm sm:text-base">💬 回答内容分析</h3>
        <p className="text-xs text-[#9E9E9B] mt-0.5">AI逐题分析你的回答质量</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin space-y-3">
        {analyses.map((item, i) => (
          <div key={i} className="border border-[#E0DCCF] rounded-xl overflow-hidden">
            {/* 问题 */}
            <div className="bg-[#FAF7EE] px-3 py-2">
              <div className="flex items-start gap-2">
                <span className="text-xs font-bold text-[#5CA98A] bg-[#5CA98A]/20 px-1.5 py-0.5 rounded shrink-0">Q{i + 1}</span>
                <p className="text-xs text-[#6B6B68] font-medium">{item.question}</p>
              </div>
            </div>

            {/* 回答 */}
            <div className="px-3 py-2 border-l-2 border-[#E0DCCF]">
              <p className="text-xs text-[#9E9E9B] leading-relaxed line-clamp-3">{item.answer}</p>
            </div>

            {/* 评分和反馈 */}
            <div className="px-3 py-2.5 bg-white">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex flex-wrap gap-1">
                  {item.keywords.map((kw, ki) => (
                    <span key={ki} className="text-[10px] bg-[#FAF7EE] text-[#9E9E9B] px-1.5 py-0.5 rounded">{kw}</span>
                  ))}
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${getScoreColor(item.score)}`}>
                  {item.score}分
                </span>
              </div>
              <div className="flex items-start gap-1.5 mt-1">
                <svg className="w-3 h-3 text-[#5CA98A] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-xs text-[#9E9E9B] leading-relaxed">{item.feedback}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
