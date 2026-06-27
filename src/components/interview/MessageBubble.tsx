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
        <div className="bg-[#FAF7EE] text-[#9E9E9B] text-xs px-3 py-1.5 rounded-full">{message.content}</div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 animate-slide-in-right`}>
      <div className={`flex items-start gap-2 max-w-[88%] ${isUser ? 'flex-row-reverse' : ''}`}>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] font-bold ${isUser ? 'bg-gradient-to-br from-[#D4A843] to-[#D4A843]' : 'bg-gradient-to-br from-[#5CA98A] to-[#4E8E75]'}`}>
          {isUser ? '我' : 'AI'}
        </div>
        <div className={`relative ${isUser ? '' : 'flex-1'}`}>
          <div className={`px-3.5 py-2.5 text-sm leading-relaxed ${isUser ? 'bg-[#FAF3E0] text-[#2A2A28] border border-[#D4A843]/20 rounded-2xl rounded-tr-md' : 'bg-[#E8F3EE] text-[#2A2A28] border border-[#5CA98A]/20 rounded-2xl rounded-tl-md'}`}>
            <p className="whitespace-pre-wrap break-words m-0">{message.content}</p>
          </div>
          {!isUser && onSpeak && (
            <div className="flex items-center gap-2 mt-1 px-1">
              <button onClick={() => onSpeak(message.content)} className={`flex items-center gap-1 text-[10px] transition-colors ${isSpeaking ? 'text-[#5CA98A] font-medium' : 'text-[#9E9E9B] hover:text-[#5CA98A]'}`} title="语音播放">
                {isSpeaking ? (
                  <div className="voice-wave text-[#5CA98A]" style={{ height: 10 }}><span /><span /><span /><span /><span /></div>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                )}
                {isSpeaking ? '播放中' : '播放'}
              </button>
              <span className="text-[10px] text-[#9E9E9B]">{new Date(message.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          )}
          {isUser && (
            <div className="text-right mt-1 px-1">
              <span className="text-[10px] text-[#9E9E9B]">{new Date(message.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
