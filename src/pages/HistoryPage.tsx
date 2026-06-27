import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as echarts from 'echarts';
import { loadRecords, deleteRecord } from '../services/storageService';
import type { InterviewRecord } from '../types';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<InterviewRecord[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    setRecords(loadRecords());
  }, []);

  // 成长曲线
  useEffect(() => {
    if (!chartRef.current || records.length < 2) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const sorted = [...records].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#E0DCCF',
        textStyle: { color: '#2A2A28', fontSize: 13 },
      },
      grid: { left: '8%', right: '8%', top: 15, bottom: 15 },
      xAxis: {
        type: 'category',
        data: sorted.map((r) => {
          const d = new Date(r.createdAt);
          return `${d.getMonth() + 1}/${d.getDate()}`;
        }),
        axisLine: { lineStyle: { color: '#E0DCCF' } },
        axisTick: { show: false },
        axisLabel: { color: '#9E9E9B', fontSize: 11 },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        interval: 20,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#9E9E9B', fontSize: 11 },
        splitLine: { lineStyle: { color: '#E0DCCF' } },
      },
      series: [
        {
          data: sorted.map((r) => r.aiScore),
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: { color: '#5CA98A', width: 3 },
          itemStyle: {
            color: '#5CA98A',
            borderColor: '#fff',
            borderWidth: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(92, 169, 138, 0.2)' },
              { offset: 1, color: 'rgba(92, 169, 138, 0.02)' },
            ]),
          },
          markLine: {
            silent: true,
            data: [{ type: 'average', name: '平均分' }],
            lineStyle: { color: '#D4A843', type: 'dashed' },
            label: { color: '#D4A843', fontSize: 11 },
          },
        },
      ],
    };

    chartInstance.current.setOption(option, true);

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [records]);

  const handleDelete = (id: string) => {
    deleteRecord(id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
    setConfirmDelete(null);
  };

  const getSceneLabel = (type: string) => (type === 'job' ? '求职备战' : '社团竞选');
  const getSceneColor = (type: string) =>
    type === 'job'
      ? 'bg-[#E8F3EE] text-[#4E8E75]'
      : 'bg-[#FAF3E0] text-[#D4A843]';

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* 顶部 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-[#9E9E9B] hover:text-[#6B6B68] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-[#2A2A28]">面试历史记录</h1>
        </div>
        <Link
          to="/"
          className="px-4 py-2 bg-[#5CA98A] hover:bg-[#4E8E75] text-white text-sm font-medium rounded-xl transition-colors"
        >
          开始新面试
        </Link>
      </div>

      {/* 成长曲线 */}
      {records.length >= 2 && (
        <div className="bg-white rounded-2xl border border-[#E0DCCF] shadow-sm p-5 mb-6">
          <h2 className="text-base font-semibold text-[#2A2A28] mb-1">📈 成长曲线</h2>
          <p className="text-xs text-[#9E9E9B] mb-4">每次面试的AI评分趋势</p>
          <div ref={chartRef} className="w-full" style={{ height: 220 }} />
        </div>
      )}

      {/* 记录列表 */}
      {records.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E0DCCF] shadow-sm p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-[#E0DCCF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-[#9E9E9B] mb-2">暂无面试记录</h3>
          <p className="text-sm text-[#9E9E9B] mb-6">完成一次模拟面试后，记录将显示在这里</p>
          <Link
            to="/"
            className="inline-flex px-5 py-2.5 bg-[#5CA98A] hover:bg-[#4E8E75] text-white font-medium rounded-xl transition-colors"
          >
            去面试
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E0DCCF] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E0DCCF] bg-[#FAF7EE]/50">
                  <th className="text-left py-3 px-4 text-xs font-medium text-[#9E9E9B]">时间</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-[#9E9E9B]">场景</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-[#9E9E9B] hidden sm:table-cell">详情</th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-[#9E9E9B]">评分</th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-[#9E9E9B]">时长</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-[#9E9E9B]">操作</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec) => (
                  <tr key={rec.id} className="border-b border-[#E0DCCF] hover:bg-[#FAF7EE]/50 transition-colors">
                    <td className="py-3 px-4">
                      <p className="text-sm text-[#2A2A28]">
                        {new Date(rec.createdAt).toLocaleDateString('zh-CN')}
                      </p>
                      <p className="text-xs text-[#9E9E9B]">
                        {new Date(rec.createdAt).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getSceneColor(rec.sceneType)}`}>
                        {getSceneLabel(rec.sceneType)}
                      </span>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <p className="text-sm text-[#6B6B68] truncate max-w-[200px]">
                        {rec.sceneType === 'job'
                          ? `${(rec.config as any).industry || ''} · ${(rec.config as any).position || ''}`
                          : `${(rec.config as any).organizationType || ''} · ${(rec.config as any).position || ''}`}
                      </p>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block font-bold text-sm ${
                        rec.aiScore >= 80 ? 'text-[#5CA98A]' : rec.aiScore >= 60 ? 'text-[#D4A843]' : 'text-[#C97064]'
                      }`}>
                        {rec.aiScore}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-[#9E9E9B]">
                      {Math.floor(rec.duration / 60)}分{rec.duration % 60}秒
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => navigate(`/review/${rec.sceneType}?recordId=${rec.id}`)}
                          className="px-3 py-1.5 text-xs font-medium text-[#5CA98A] hover:bg-[#E8F3EE] rounded-lg transition-colors"
                        >
                          查看报告
                        </button>
                        {confirmDelete === rec.id ? (
                          <span className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(rec.id)}
                              className="px-2 py-1.5 text-xs font-medium text-[#C97064] hover:bg-[#C97064]/10 rounded-lg"
                            >
                              确认
                            </button>
                            <button
                              onClick={() => setConfirmDelete(null)}
                              className="px-2 py-1.5 text-xs text-[#9E9E9B] hover:text-[#6B6B68]"
                            >
                              取消
                            </button>
                          </span>
                        ) : (
                          <button
                            onClick={() => setConfirmDelete(rec.id)}
                            className="p-1.5 text-[#E0DCCF] hover:text-[#C97064] transition-colors"
                            title="删除"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
