import { useRef, useEffect } from 'react';
import DigitalAvatar from './DigitalAvatar';

interface VideoPanelProps {
  stream: MediaStream | null;
  isRecording: boolean;
  error: string | null;
  isAISpeaking?: boolean;
  isListening?: boolean;
  phase?: 'idle' | 'interviewing' | 'completed';
}

export default function VideoPanel({ stream, isRecording, error, isAISpeaking, isListening, phase = 'idle' }: VideoPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-lg w-full" style={{ aspectRatio: '16/9', minHeight: '280px' }}>
      {/* 摄像头画面（右上角小窗） */}
      {stream && (
        <div className="absolute top-3 right-3 z-20 w-24 sm:w-32 aspect-video rounded-lg overflow-hidden border-2 border-white/20 shadow-lg">
          <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover scale-x-[-1]" />
        </div>
      )}

      {/* 主画面：数字人 */}
      <div className="absolute inset-0">
        <DigitalAvatar isSpeaking={isAISpeaking || false} isListening={isListening || false} phase={phase} />
      </div>

      {/* 错误提示覆盖层 */}
      {error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-gray-400 p-6 bg-slate-900/90">
          <svg className="w-12 h-12 mb-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-sm text-center">{error}</p>
          <p className="text-xs text-gray-500 mt-2">数字人模式已启用，可继续面试</p>
        </div>
      )}

      {/* 录制状态指示器 */}
      {isRecording && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse-recording" />
          <span className="text-white text-xs font-medium">录制中</span>
        </div>
      )}

      {/* AI 标签 */}
      <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
        <div className="w-5 h-5 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold">AI</div>
        <span className="text-white/80 text-xs">AI 面试官</span>
      </div>

      {/* 实时时间戳 */}
      {isRecording && (
        <div className="absolute bottom-3 right-3 z-20 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="text-white/80 text-xs font-mono">
            {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      )}
    </div>
  );
}
