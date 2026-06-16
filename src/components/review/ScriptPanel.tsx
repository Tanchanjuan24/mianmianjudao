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
    <div className="bg-white rounded-xl border border-gray-200 h-full flex flex-col overflow-hidden">
      {/* 标题栏 */}
      <div className="border-b border-gray-200 px-4 py-3">
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">AI 优化文稿</h3>
        <p className="text-xs text-gray-400 mt-0.5">原始回答 vs AI优化版本</p>
      </div>

      {/* Tab切换 */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab('compare')}
          className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
            activeTab === 'compare'
              ? 'text-indigo-600 border-b-2 border-indigo-500'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          逐句对比
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
            activeTab === 'summary'
              ? 'text-indigo-600 border-b-2 border-indigo-500'
              : 'text-gray-400 hover:text-gray-600'
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
              <div key={line.id} className="border border-gray-100 rounded-lg overflow-hidden">
                {/* 原始版本 */}
                <div className="bg-red-50/50 px-3 py-2 border-l-2 border-red-400">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-medium text-red-500 bg-red-100 px-1.5 py-0.5 rounded">原始</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{line.original}</p>
                </div>
                {/* 优化版本 */}
                <div className="bg-green-50/50 px-3 py-2 border-l-2 border-green-400">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-medium text-green-500 bg-green-100 px-1.5 py-0.5 rounded">优化</span>
                    {line.hasChange && (
                      <span className="text-[10px] text-green-600">已改进</span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{line.optimized}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* 总评 */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">📝 综合评价</h4>
              <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-3">{summary}</p>
            </div>

            {/* 优势 */}
            <div>
              <h4 className="text-sm font-medium text-green-700 mb-2">💪 你的优势</h4>
              <ul className="space-y-1.5">
                {strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* 改进 */}
            <div>
              <h4 className="text-sm font-medium text-amber-700 mb-2">🎯 改进方向</h4>
              <ul className="space-y-1.5">
                {improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-amber-500 mt-0.5 shrink-0">→</span>
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
