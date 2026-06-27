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
    <div className="bg-white rounded-xl border border-[#E0DCCF] h-full flex flex-col overflow-hidden">
      {/* 标题栏 */}
      <div className="border-b border-[#E0DCCF] px-4 py-3">
        <h3 className="font-semibold text-[#2A2A28] text-sm sm:text-base">AI 优化文稿</h3>
        <p className="text-xs text-[#9E9E9B] mt-0.5">原始回答 vs AI优化版本</p>
      </div>

      {/* Tab切换 */}
      <div className="flex border-b border-[#E0DCCF]">
        <button
          onClick={() => setActiveTab('compare')}
          className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
            activeTab === 'compare'
              ? 'text-[#5CA98A] border-b-2 border-[#5CA98A]'
              : 'text-[#9E9E9B] hover:text-[#6B6B68]'
          }`}
        >
          逐句对比
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
            activeTab === 'summary'
              ? 'text-[#5CA98A] border-b-2 border-[#5CA98A]'
              : 'text-[#9E9E9B] hover:text-[#6B6B68]'
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
              <div key={line.id} className="border border-[#E0DCCF] rounded-lg overflow-hidden">
                {/* 原始版本 */}
                <div className="bg-[#C97064]/10 px-3 py-2 border-l-2 border-[#C97064]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-medium text-[#C97064] bg-[#C97064]/20 px-1.5 py-0.5 rounded">原始</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6B6B68] leading-relaxed">{line.original}</p>
                </div>
                {/* 优化版本 */}
                <div className="bg-[#E8F3EE] px-3 py-2 border-l-2 border-[#5CA98A]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-medium text-[#5CA98A] bg-[#5CA98A]/20 px-1.5 py-0.5 rounded">优化</span>
                    {line.hasChange && (
                      <span className="text-[10px] text-[#5CA98A]">已改进</span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[#2A2A28] leading-relaxed">{line.optimized}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* 总评 */}
            <div>
              <h4 className="text-sm font-medium text-[#2A2A28] mb-2">📝 综合评价</h4>
              <p className="text-sm text-[#6B6B68] leading-relaxed bg-[#FAF7EE] rounded-lg p-3">{summary}</p>
            </div>

            {/* 优势 */}
            <div>
              <h4 className="text-sm font-medium text-[#5CA98A] mb-2">💪 你的优势</h4>
              <ul className="space-y-1.5">
                {strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#6B6B68]">
                    <span className="text-[#5CA98A] mt-0.5 shrink-0">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* 改进 */}
            <div>
              <h4 className="text-sm font-medium text-[#D4A843] mb-2">🎯 改进方向</h4>
              <ul className="space-y-1.5">
                {improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#6B6B68]">
                    <span className="text-[#D4A843] mt-0.5 shrink-0">→</span>
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
