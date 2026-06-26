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
      {/* ===== 主画面：面试者摄像头 ===== */}
      {stream ? (
        <video ref={videoRef} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover scale-x-[-1]" />
      ) : (
        /* 无摄像头时的占位 */
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-gray-400">
          <svg className="w-12 h-12 mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <p className="text-sm">摄像头未开启</p>
          <p className="text-xs text-gray-500 mt-1">点击「开始面试」启动摄像头</p>
        </div>
      )}

      {/* ===== 数字人小窗（左上角） ===== */}
      <div className="absolute top-3 left-3 z-20 w-28 sm:w-36 md:w-40 aspect-video rounded-xl overflow-hidden shadow-xl border-2 border-white/20">
        <DigitalAvatar isSpeaking={isAISpeaking || false} isListening={isListening || false} phase={phase} />
      </div>

      {/* ===== 错误提示（覆盖层，不挡数字人） ===== */}
      {error && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 bg-black/70 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
          <p className="text-xs text-amber-400">{error}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">数字人模式继续面试</p>
        </div>
      )}

      {/* ===== 录制状态指示器（右上角） ===== */}
      {isRecording && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse-recording" />
          <span className="text-white text-xs font-medium">录制中</span>
        </div>
      )}

      {/* ===== 底部信息栏 ===== */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold">AI</div>
          <span className="text-white/80 text-xs">AI 面试官</span>
        </div>
        {isRecording && (
          <span className="text-white/60 text-xs font-mono">
            {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
}
