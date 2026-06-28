import type { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
  onSpeak?: (text: string) => void;
  isSpeaking?: boolean;
}

export default function MessageBubble({ message, onSpeak, isSpeaking }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="bg-[#F2F4F1] text-[#8A9B8F] text-xs px-3 py-1.5 rounded-full">{message.content}</div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 animate-slide-in-right`}>
      <div className={`flex items-start gap-2 max-w-[88%] ${isUser ? 'flex-row-reverse' : ''}`}>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] font-bold ${isUser ? 'bg-gradient-to-br from-[#FBC64D] to-[#FBC64D]' : 'bg-gradient-to-br from-[#3D8357] to-[#2D6B45]'}`}>
          {isUser ? '我' : 'AI'}
        </div>
        <div className={`relative ${isUser ? '' : 'flex-1'}`}>
          <div className={`px-3.5 py-2.5 text-sm leading-relaxed ${isUser ? 'bg-[#FCF3DC] text-[#1A2B20] border border-[#FBC64D]/20 rounded-2xl rounded-tr-md' : 'bg-[#E0EDE5] text-[#1A2B20] border border-[#3D8357]/20 rounded-2xl rounded-tl-md'}`}>
            <p className="whitespace-pre-wrap break-words m-0">{message.content}</p>
          </div>
          {!isUser && onSpeak && (
            <div className="flex items-center gap-2 mt-1 px-1">
              <button onClick={() => onSpeak(message.content)} className={`flex items-center gap-1 text-[10px] transition-colors ${isSpeaking ? 'text-[#3D8357] font-medium' : 'text-[#8A9B8F] hover:text-[#3D8357]'}`} title="语音播放">
                {isSpeaking ? (
                  <div className="voice-wave text-[#3D8357]" style={{ height: 10 }}><span /><span /><span /><span /><span /></div>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                )}
                {isSpeaking ? '播放中' : '播放'}
              </button>
              <span className="text-[10px] text-[#8A9B8F]">{new Date(message.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          )}
          {isUser && (
            <div className="text-right mt-1 px-1">
              <span className="text-[10px] text-[#8A9B8F]">{new Date(message.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
