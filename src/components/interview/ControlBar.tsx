interface ControlBarProps {
  phase: 'idle' | 'interviewing' | 'completed';
  elapsedTime: number;
  onStart: () => void;
  onStop: () => void;
  onToggleCamera: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function ControlBar({ phase, elapsedTime, onStart, onStop, onToggleCamera }: ControlBarProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-4 sm:px-6 py-3 flex items-center justify-between flex-wrap gap-3">
      {/* 左侧 - 计时器 */}
      <div className="flex items-center gap-3">
        <div className={`w-2.5 h-2.5 rounded-full ${phase === 'interviewing' ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
        <span className="text-lg sm:text-xl font-mono font-semibold text-gray-700 tabular-nums">
          {formatTime(elapsedTime)}
        </span>
        {phase === 'interviewing' && (
          <span className="text-xs text-green-600 font-medium hidden sm:inline">面试进行中</span>
        )}
      </div>

      {/* 中间 - 主按钮 */}
      <div className="flex items-center gap-2">
        {phase === 'idle' && (
          <button
            onClick={onStart}
            className="px-5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium rounded-xl text-sm sm:text-base transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              开始面试
            </span>
          </button>
        )}

        {phase === 'interviewing' && (
          <button
            onClick={onStop}
            className="px-5 sm:px-6 py-2 sm:py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl text-sm sm:text-base transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
              结束面试
            </span>
          </button>
        )}

        {phase === 'completed' && (
          <span className="text-sm text-gray-500 font-medium">面试已完成</span>
        )}
      </div>

      {/* 右侧 - 辅助按钮 */}
      <div className="flex items-center gap-2">
        {phase === 'interviewing' && (
          <button
            onClick={onToggleCamera}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="切换摄像头"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
