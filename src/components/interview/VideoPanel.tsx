import { useRef, useEffect } from 'react';

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
    <div className="relative bg-[#1A2B20] rounded-2xl overflow-hidden shadow-lg w-full" style={{ aspectRatio: '16/9', minHeight: '300px' }}>
      {/* 主画面：面试者摄像头 */}
      {stream ? (
        <video ref={videoRef} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover scale-x-[-1]" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#3A3A38] to-[#1A2B20] text-[#8A9B8F]">
          <svg className="w-14 h-14 mb-3 text-[#4A5C50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <p className="text-sm">摄像头未开启</p>
          <p className="text-xs text-[#4A5C50] mt-1">点击下方「开始面试」</p>
        </div>
      )}

      {/* 左上角：AI面试官方块 */}
      <div className="absolute top-3 left-3 z-20">
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex flex-col items-center justify-center shadow-lg border-2 transition-all ${
          isAISpeaking
            ? 'border-[#3D8357] bg-[#3D8357]/20 animate-glow'
            : isListening
              ? 'border-[#FBC64D]/60 bg-[#FBC64D]/10'
              : 'border-white/20 bg-black/50'
        }`}>
          <span className={`text-xs sm:text-sm font-bold ${isAISpeaking ? 'text-[#3D8357]' : isListening ? 'text-[#FBC64D]' : 'text-white/80'}`}>面试官</span>
          {isAISpeaking && (
            <div className="voice-wave text-[#3D8357] mt-1" style={{ height: 8 }}>
              <span /><span /><span /><span /><span />
            </div>
          )}
          {isListening && !isAISpeaking && (
            <span className="text-[#FBC64D] text-[8px] mt-1">聆听中</span>
          )}
          {phase === 'idle' && !isAISpeaking && !isListening && (
            <span className="text-white/40 text-[8px] mt-1">待命</span>
          )}
        </div>
      </div>

      {/* 右上角：录制状态 */}
      {isRecording && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1">
          <span className="w-2 h-2 bg-[#C96B5E] rounded-full animate-pulse-recording" />
          <span className="text-white/80 text-[10px] font-medium">录制中</span>
        </div>
      )}

      {/* 底部信息栏 */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/40 to-transparent px-3 py-2 flex items-center justify-between">
        <span className="text-white/40 text-[10px]">面试者画面</span>
        {isRecording && (
          <span className="text-white/40 text-[10px] font-mono">
            {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        )}
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 bg-black/70 rounded-lg px-3 py-1.5">
          <p className="text-[10px] text-[#FBC64D]">{error}</p>
        </div>
      )}
    </div>
  );
}
