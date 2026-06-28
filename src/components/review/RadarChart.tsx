import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { RadarDimension } from '../../types';

interface RadarChartProps {
  dimensions: RadarDimension[];
  overallScore: number;
}

export default function RadarChart({ dimensions, overallScore }: RadarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!instanceRef.current) {
      instanceRef.current = echarts.init(chartRef.current);
    }

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#CDD2CC',
        textStyle: { color: '#1A2B20', fontSize: 13 },
      },
      legend: {
        show: false,
      },
      radar: {
        center: ['50%', '48%'],
        radius: '65%',
        indicator: dimensions.map((d) => ({
          name: d.name,
          max: d.fullMark,
        })),
        axisName: {
          color: '#4A5C50',
          fontSize: 11,
          fontWeight: 500,
        },
        shape: 'polygon',
        splitNumber: 5,
        axisLine: {
          lineStyle: { color: '#CDD2CC' },
        },
        splitLine: {
          lineStyle: { color: '#F2F4F1' },
        },
        splitArea: {
          areaStyle: {
            color: ['#fff', '#F2F4F1'],
          },
        },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: dimensions.map((d) => d.score),
              name: '你的表现',
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(92, 169, 138, 0.3)' },
                  { offset: 1, color: 'rgba(92, 169, 138, 0.05)' },
                ]),
              },
              lineStyle: {
                color: '#3D8357',
                width: 2,
              },
              itemStyle: {
                color: '#3D8357',
                borderColor: '#fff',
                borderWidth: 2,
              },
              symbol: 'circle',
              symbolSize: 6,
            },
          ],
        },
      ],
    };

    instanceRef.current.setOption(option, true);

    const handleResize = () => instanceRef.current?.resize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dimensions]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#3D8357]';
    if (score >= 60) return 'text-[#FBC64D]';
    return 'text-[#C96B5E]';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-[#E0EDE5] border-[#3D8357]/30';
    if (score >= 60) return 'bg-[#FCF3DC] border-[#FBC64D]/30';
    return 'bg-[#C96B5E]/10 border-[#C96B5E]/30';
  };

  return (
    <div className="bg-white rounded-xl border border-[#CDD2CC] h-full flex flex-col overflow-hidden">
      {/* 标题栏 */}
      <div className="border-b border-[#CDD2CC] px-4 py-3">
        <h3 className="font-semibold text-[#1A2B20] text-sm sm:text-base">能力雷达图</h3>
        <p className="text-xs text-[#8A9B8F] mt-0.5">6维综合评估</p>
      </div>

      {/* 综合评分 */}
      <div className="px-4 pt-3">
        <div className={`border rounded-xl p-3 text-center ${getScoreBg(overallScore)}`}>
          <p className="text-xs text-[#8A9B8F] mb-1">综合评分</p>
          <p className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore}
            <span className="text-sm font-normal text-[#8A9B8F]">/100</span>
          </p>
        </div>
      </div>

      {/* 雷达图 */}
      <div ref={chartRef} className="flex-1 w-full min-h-[250px]" />

      {/* 维度详情 */}
      <div className="px-4 pb-4">
        <div className="space-y-1.5">
          {dimensions.map((d, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="text-[#8A9B8F]">{d.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-20 sm:w-24 h-1.5 bg-[#F2F4F1] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#3D8357] rounded-full transition-all"
                    style={{ width: `${(d.score / d.fullMark) * 100}%` }}
                  />
                </div>
                <span className={`font-mono font-medium w-7 text-right ${getScoreColor(d.score)}`}>
                  {d.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
