import { useState, useRef, useEffect } from 'react';
import type { Message } from '../../types';

interface ChatPanelProps {
  messages: Message[];
  onSend: (content: string) => void;
  disabled: boolean;
  isListening?: boolean;
  isSpeaking?: boolean;
  interimText?: string;
  onStartListening?: () => void;
  onStopListening?: () => void;
  onExport?: () => void;
}

export default function ChatPanel({
  messages, onSend, disabled,
  isListening, isSpeaking, interimText,
  onStartListening, onStopListening, onExport
}: ChatPanelProps) {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, interimText]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-[#E0DCCF] overflow-hidden shadow-sm">
      {/* 标题栏 */}
      <div className="bg-[#E8F3EE] border-b border-[#E0DCCF] px-3 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[#5CA98A] text-xs font-semibold">实时字幕</span>
          {(isSpeaking || isListening) && (
            <div className="flex items-center gap-1">
              {isSpeaking && <span className="text-[#5CA98A] text-[9px] bg-[#5CA98A]/15 px-1.5 py-0.5 rounded">AI说话中</span>}
              {isListening && <span className="text-[#D4A843] text-[9px] bg-[#D4A843]/15 px-1.5 py-0.5 rounded">聆听中</span>}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[#9E9E9B] text-[10px]">{messages.filter(m => m.role !== 'system').length}条对话</span>
          {onExport && messages.length > 0 && (
            <button onClick={onExport} className="text-[#9E9E9B] hover:text-[#5CA98A] transition-colors p-1" title="导出对话">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </button>
          )}
        </div>
      </div>

      {/* 实时字幕区 */}
      <div className="flex-1 overflow-y-auto px-3 py-3 scrollbar-thin space-y-3 bg-[#FAF7EE]/50">
        {messages.length === 0 && !interimText ? (
          <div className="flex items-center justify-center h-full text-[#9E9E9B] text-xs">
            <div className="text-center">
              <div className="text-2xl mb-2">🎙️</div>
              <p className="font-medium text-[#6B6B68]">点击「开始面试」</p>
              <p className="text-[10px] text-[#9E9E9B] mt-1">AI面试官将语音提问，字幕实时显示在这里</p>
            </div>
          </div>
        ) : (
          <>
            {messages.filter(m => m.role !== 'system').map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-in-right`}>
                  <div className="max-w-[90%]">
                    <div className={`flex items-center gap-1 mb-0.5 ${isUser ? 'justify-end' : ''}`}>
                      <span className={`text-[9px] font-medium ${isUser ? 'text-[#D4A843]' : 'text-[#5CA98A]'}`}>
                        {isUser ? '面试者' : '面试官'}
                      </span>
                    </div>
                    <div className={`px-2.5 py-1.5 text-xs leading-relaxed rounded-lg ${
                      isUser
                        ? 'bg-[#FAF3E0] text-[#2A2A28] border border-[#D4A843]/20 rounded-tr-sm'
                        : 'bg-[#E8F3EE] text-[#2A2A28] border border-[#5CA98A]/20 rounded-tl-sm'
                    }`}>
                      <p className="m-0 whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>
                    <div className={`text-[8px] text-[#9E9E9B] mt-0.5 ${isUser ? 'text-right' : ''}`}>
                      {new Date(msg.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })}
            {/* 系统消息 */}
            {messages.filter(m => m.role === 'system').map(msg => (
              <div key={msg.id} className="flex justify-center">
                <span className="text-[10px] text-[#C97064] bg-[#C97064]/8 px-2 py-0.5 rounded-full">{msg.content}</span>
              </div>
            ))}
            {/* 实时语音识别中间文字 */}
            {interimText && (
              <div className="flex justify-end animate-fade-in">
                <div className="max-w-[90%]">
                  <span className="text-[9px] text-[#D4A843] mb-0.5 block">面试者</span>
                  <div className="px-2.5 py-1.5 text-xs rounded-lg bg-[#FAF3E0]/50 text-[#9E9E9B] border border-[#D4A843]/10 italic">
                    {interimText}
                    <span className="inline-block w-0.5 h-3 bg-[#D4A843] ml-0.5 animate-pulse align-middle" />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      {/* 输入区 */}
      <div className="bg-white border-t border-[#E0DCCF] p-2.5">
        <div className="flex items-center gap-1.5">
          {onStartListening && onStopListening && (
            <button onClick={isListening ? onStopListening : onStartListening} disabled={disabled}
              className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                isListening ? 'bg-[#C97064] text-white animate-glow' : 'bg-[#E8F3EE] text-[#5CA98A] hover:bg-[#5CA98A] hover:text-white disabled:opacity-30'
              }`} title={isListening ? '停止语音' : '语音输入'}>
              {isListening ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              )}
            </button>
          )}
          <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
            placeholder={disabled ? '面试已结束' : '输入或语音回答...'} disabled={disabled} rows={1}
            className="flex-1 resize-none bg-[#FAF7EE] border border-[#E0DCCF] rounded-lg px-2.5 py-2 text-xs text-[#2A2A28] placeholder-[#9E9E9B] focus:outline-none focus:border-[#5CA98A]/50 focus:ring-1 focus:ring-[#5CA98A]/30 disabled:opacity-30 transition-colors" />
          <button onClick={handleSend} disabled={disabled || !input.trim()}
            className="shrink-0 w-8 h-8 bg-[#5CA98A] hover:bg-[#4E8E75] disabled:bg-[#E0DCCF] disabled:opacity-50 text-white rounded-lg flex items-center justify-center transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
        {isListening && <p className="text-[9px] text-[#D4A843] mt-1 text-center font-medium">🎤 正在聆听，请说话...</p>}
      </div>
    </div>
  );
}
