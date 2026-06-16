import { useState, useRef } from 'react';
import type { VideoMarker } from '../../types';

interface VideoReplayProps {
  markers: VideoMarker[];
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const markerColors = {
  warning: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500', label: '需注意' },
  bad: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500', label: '需改进' },
  good: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500', label: '亮点' },
  info: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500', label: '提示' },
};

export default function VideoReplay({ markers }: VideoReplayProps) {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const totalDuration = 300; // 模拟5分钟视频

  // 模拟播放进度
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setIsPlaying(false);
          clearInterval(interval);
          return 100;
        }
        return p + 0.5;
      });
    }, 150);
    // 在下次状态更新时清理
    setTimeout(() => {
      if (!isPlaying) clearInterval(interval);
    }, 30000);
  };

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setProgress(Math.max(0, Math.min(100, pct)));
  };

  const currentTime = (progress / 100) * totalDuration;

  return (
    <div className="bg-white rounded-xl border border-gray-200 h-full flex flex-col overflow-hidden">
      {/* 标题栏 */}
      <div className="border-b border-gray-200 px-4 py-3">
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">视频回放</h3>
        <p className="text-xs text-gray-400 mt-0.5">带关键时间点标记</p>
      </div>

      {/* 模拟视频画面 */}
      <div className="relative bg-gray-900 aspect-video">
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-gray-500">面试录制回放</p>
          <p className="text-[10px] text-gray-600 mt-1">时长: {formatTime(totalDuration)}</p>
        </div>

        {/* 播放进度指示 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <div className="flex items-center gap-3 text-white">
            <button onClick={togglePlay} className="hover:scale-110 transition-transform">
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <span className="text-xs font-mono">{formatTime(currentTime)} / {formatTime(totalDuration)}</span>
          </div>
        </div>
      </div>

      {/* 时间轴 */}
      <div className="px-4 py-3">
        <div
          ref={timelineRef}
          onClick={handleTimelineClick}
          className="relative h-8 bg-gray-100 rounded-full cursor-pointer group"
        >
          {/* 进度条 */}
          <div
            className="absolute top-0 left-0 h-full bg-indigo-200 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
          {/* 标记点 */}
          {markers.map((marker) => {
            const pos = (marker.time / totalDuration) * 100;
            const color = markerColors[marker.type];
            return (
              <div
                key={marker.id}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer group/marker"
                style={{ left: `${pos}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMarker(activeMarker === marker.id ? null : marker.id);
                  setProgress(pos);
                }}
              >
                <div className={`w-3 h-3 ${color.dot} rounded-full border-2 border-white shadow-sm hover:scale-150 transition-transform`} />
              </div>
            );
          })}
          {/* 播放头 */}
          <div
            className="absolute top-0 h-full w-0.5 bg-indigo-600 transition-all pointer-events-none"
            style={{ left: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-gray-400">00:00</span>
          <span className="text-[10px] text-gray-400">{formatTime(totalDuration)}</span>
        </div>
      </div>

      {/* 标记详情 */}
      {activeMarker && (() => {
        const marker = markers.find((m) => m.id === activeMarker);
        if (!marker) return null;
        const color = markerColors[marker.type];
        return (
          <div className={`mx-4 mb-3 ${color.bg} rounded-lg p-3 animate-fade-in`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-medium ${color.text}`}>
                [{color.label}] {marker.label}
              </span>
              <span className="text-[10px] text-gray-500">{formatTime(marker.time)}</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{marker.description}</p>
          </div>
        );
      })()}

      {/* 标记列表 */}
      <div className="flex-1 overflow-y-auto px-4 pb-3 scrollbar-thin">
        <h4 className="text-xs font-medium text-gray-500 mb-2">关键时间点</h4>
        <div className="space-y-1.5">
          {markers.map((marker) => {
            const color = markerColors[marker.type];
            return (
              <button
                key={marker.id}
                onClick={() => {
                  setActiveMarker(marker.id);
                  setProgress((marker.time / totalDuration) * 100);
                }}
                className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors ${
                  activeMarker === marker.id ? `${color.bg} ${color.text}` : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className={`w-2 h-2 ${color.dot} rounded-full shrink-0`} />
                <span className="font-mono text-gray-400">{formatTime(marker.time)}</span>
                <span className="truncate">{marker.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
