interface DigitalAvatarProps {
  isSpeaking: boolean;
  isListening: boolean;
  phase: 'idle' | 'interviewing' | 'completed';
}

export default function DigitalAvatar({ isSpeaking, isListening, phase }: DigitalAvatarProps) {
  return (
    <div className="relative w-full h-full min-h-[100px] flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-hidden">
      {/* 背景光效 */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl transition-opacity duration-1000 ${isSpeaking ? 'bg-cyan-500/20 opacity-100' : 'bg-indigo-500/10 opacity-50'}`} />
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-2xl transition-opacity duration-1000 ${isListening ? 'bg-emerald-500/15 opacity-100' : 'opacity-30'}`} />
      </div>

      {/* 网格背景 */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* 数字人 */}
      <div className="relative z-10 flex flex-col items-center">
        {/* 头部 */}
        <div className="relative">
          {/* 光环 */}
          {(isSpeaking || isListening) && (
            <div className={`absolute inset-0 -m-8 rounded-full border-2 ${isSpeaking ? 'border-cyan-400/30' : 'border-emerald-400/30'} animate-ping`} style={{ animationDuration: '2s' }} />
          )}

          {/* SVG 数字人 */}
          <svg width="100" height="120" viewBox="0 0 160 200" className="drop-shadow-2xl max-w-full max-h-full">
            {/* 身体/肩膀 */}
            <ellipse cx="80" cy="190" rx="50" ry="20" fill="url(#bodyGradient)" opacity="0.6" />
            <path d="M 35 190 Q 35 150, 80 145 Q 125 150, 125 190 Z" fill="url(#bodyGradient)" opacity="0.8" />
            
            {/* 颈部 */}
            <rect x="70" y="120" width="20" height="30" rx="8" fill="url(#bodyGradient)" opacity="0.7" />

            {/* 头部 */}
            <ellipse cx="80" cy="90" rx="38" ry="44" fill="url(#faceGradient)" />
            
            {/* 头发 */}
            <path d="M 42 80 Q 42 50, 80 46 Q 118 50, 118 80 Q 118 70, 100 68 Q 80 60, 60 68 Q 42 70, 42 80 Z" fill="url(#hairGradient)" />

            {/* 眼睛 - 眨眼动画 */}
            <g style={{ animation: 'blink 4s infinite', transformOrigin: '68px 85px' }}>
              <ellipse cx="68" cy="85" rx="5" ry={isSpeaking ? '3' : '6'} fill="#1e293b" />
            </g>
            <g style={{ animation: 'blink 4s infinite', transformOrigin: '92px 85px' }}>
              <ellipse cx="92" cy="85" rx="5" ry={isSpeaking ? '3' : '6'} fill="#1e293b" />
            </g>

            {/* 嘴巴 - 说话动画 */}
            {isSpeaking ? (
              <ellipse cx="80" cy="105" rx="8" ry="5" fill="#475569" style={{ animation: 'mouthTalk 0.3s ease-in-out infinite', transformOrigin: '80px 105px' }} />
            ) : isListening ? (
              <path d="M 72 105 Q 80 110, 88 105" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />
            ) : (
              <ellipse cx="80" cy="105" rx="6" ry="2" fill="#475569" />
            )}

            {/* 鼻子 */}
            <path d="M 78 95 Q 80 100, 82 95" stroke="#cbd5e1" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* 耳朵 */}
            <ellipse cx="42" cy="90" rx="4" ry="8" fill="url(#faceGradient)" />
            <ellipse cx="118" cy="90" rx="4" ry="8" fill="url(#faceGradient)" />

            {/* 渐变定义 */}
            <defs>
              <linearGradient id="faceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id="hairGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="bodyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#3730a3" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 状态标签 */}
        <div className="mt-2 flex flex-col items-center gap-1">
          {phase === 'idle' && (
            <span className="text-[10px] text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded-full">待命</span>
          )}
          {isSpeaking && (
            <div className="flex items-center gap-1 text-cyan-400">
              <div className="voice-wave" style={{ height: 12 }}>
                <span /><span /><span /><span /><span />
              </div>
              <span className="text-[10px] font-medium">提问中</span>
            </div>
          )}
          {isListening && !isSpeaking && (
            <div className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-medium">聆听中</span>
            </div>
          )}
          {phase === 'interviewing' && !isSpeaking && !isListening && (
            <span className="text-[10px] text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded-full">等待回答</span>
          )}
          {phase === 'completed' && (
            <span className="text-[10px] text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded-full">已结束</span>
          )}
        </div>
      </div>
    </div>
  );
}
