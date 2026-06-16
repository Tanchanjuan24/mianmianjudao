import { useRef, useEffect } from 'react';

interface VideoPanelProps {
  stream: MediaStream | null;
  isRecording: boolean;
  error: string | null;
}

export default function VideoPanel({ stream, isRecording, error }: VideoPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video">
      {/* 真实摄像头画面 */}
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : error ? (
        /* 错误状态 */
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-6">
          <svg className="w-12 h-12 mb-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-sm text-center">{error}</p>
          <p className="text-xs text-gray-500 mt-2">请检查摄像头/麦克风权限设置</p>
        </div>
      ) : (
        /* 占位状态 */
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
          <svg className="w-16 h-16 mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <p className="text-sm">摄像头未启动</p>
          <p className="text-xs text-gray-600 mt-1">点击下方按钮开始</p>
        </div>
      )}

      {/* 录制状态指示器 */}
      {isRecording && (
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse-recording" />
          <span className="text-white text-xs font-medium">录制中</span>
        </div>
      )}

      {/* 时间戳 */}
      {isRecording && (
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="text-white text-xs font-mono">
            {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      )}
    </div>
  );
}
