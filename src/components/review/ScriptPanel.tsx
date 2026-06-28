import { useState } from 'react';
import type { ScriptLine } from '../../types';

interface ScriptPanelProps {
  scriptLines: ScriptLine[];
  summary: string;
  strengths: string[];
  improvements: string[];
}

export default function ScriptPanel({ scriptLines, summary, strengths, improvements }: ScriptPanelProps) {
  const [activeTab, setActiveTab] = useState<'compare' | 'summary'>('compare');

  return (
    <div className="bg-white rounded-xl border border-[#CDD2CC] h-full flex flex-col overflow-hidden">
      {/* 标题栏 */}
      <div className="border-b border-[#CDD2CC] px-4 py-3">
        <h3 className="font-semibold text-[#1A2B20] text-sm sm:text-base">AI 优化文稿</h3>
        <p className="text-xs text-[#8A9B8F] mt-0.5">原始回答 vs AI优化版本</p>
      </div>

      {/* Tab切换 */}
      <div className="flex border-b border-[#CDD2CC]">
        <button
          onClick={() => setActiveTab('compare')}
          className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
            activeTab === 'compare'
              ? 'text-[#3D8357] border-b-2 border-[#3D8357]'
              : 'text-[#8A9B8F] hover:text-[#4A5C50]'
          }`}
        >
          逐句对比
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
            activeTab === 'summary'
              ? 'text-[#3D8357] border-b-2 border-[#3D8357]'
              : 'text-[#8A9B8F] hover:text-[#4A5C50]'
          }`}
        >
          总体评价
        </button>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 scrollbar-thin">
        {activeTab === 'compare' ? (
          <div className="space-y-3">
            {scriptLines.map((line) => (
              <div key={line.id} className="border border-[#CDD2CC] rounded-lg overflow-hidden">
                {/* 原始版本 */}
                <div className="bg-[#C96B5E]/10 px-3 py-2 border-l-2 border-[#C96B5E]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-medium text-[#C96B5E] bg-[#C96B5E]/20 px-1.5 py-0.5 rounded">原始</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A5C50] leading-relaxed">{line.original}</p>
                </div>
                {/* 优化版本 */}
                <div className="bg-[#E0EDE5] px-3 py-2 border-l-2 border-[#3D8357]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-medium text-[#3D8357] bg-[#3D8357]/20 px-1.5 py-0.5 rounded">优化</span>
                    {line.hasChange && (
                      <span className="text-[10px] text-[#3D8357]">已改进</span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[#1A2B20] leading-relaxed">{line.optimized}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* 总评 */}
            <div>
              <h4 className="text-sm font-medium text-[#1A2B20] mb-2">📝 综合评价</h4>
              <p className="text-sm text-[#4A5C50] leading-relaxed bg-[#F2F4F1] rounded-lg p-3">{summary}</p>
            </div>

            {/* 优势 */}
            <div>
              <h4 className="text-sm font-medium text-[#3D8357] mb-2">💪 你的优势</h4>
              <ul className="space-y-1.5">
                {strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#4A5C50]">
                    <span className="text-[#3D8357] mt-0.5 shrink-0">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* 改进 */}
            <div>
              <h4 className="text-sm font-medium text-[#FBC64D] mb-2">🎯 改进方向</h4>
              <ul className="space-y-1.5">
                {improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#4A5C50]">
                    <span className="text-[#FBC64D] mt-0.5 shrink-0">→</span>
                    {imp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
