import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
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
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-3 flex items-center gap-2">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-xs font-bold backdrop-blur-sm">AI</div>
        <div className="flex-1">
          <span className="font-medium text-white text-sm">AI 面试官</span>
          {isSpeaking && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="voice-wave text-white/80" style={{ height: 12 }}><span /><span /><span /><span /><span /></div>
              <span className="text-[10px] text-white/70">正在说话</span>
            </div>
          )}
          {!isSpeaking && messages.length > 0 && <p className="text-[10px] text-white/60">在线</p>}
        </div>
        <span className="text-xs text-white/50">{messages.length} 条</span>
        {onExport && messages.length > 0 && (
          <button onClick={onExport} className="text-white/70 hover:text-white transition-colors p-1" title="导出对话">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 scrollbar-thin bg-gray-50/50">
        {messages.length === 0 && !interimText ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            <div className="text-center">
              <div className="text-4xl mb-3">🎙️</div>
              <p className="font-medium text-gray-500">点击「开始面试」</p>
              <p className="text-xs text-gray-400 mt-1">AI面试官将通过语音与你对话</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)}
            {interimText && (
              <div className="flex justify-end mb-3 animate-fade-in">
                <div className="bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm px-3 py-2 rounded-2xl rounded-tr-md max-w-[85%] italic">
                  {interimText}
                  <span className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5 animate-pulse align-middle" />
                </div>
              </div>
            )}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="bg-white border-t border-gray-100 p-3">
        <div className="flex items-end gap-2">
          {onStartListening && onStopListening && (
            <button onClick={isListening ? onStopListening : onStartListening} disabled={disabled}
              className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isListening ? 'bg-red-500 text-white animate-glow shadow-lg shadow-red-500/30' : 'bg-gray-100 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-40'}`}
              title={isListening ? '停止语音输入' : '语音输入'}>
              {isListening ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              )}
            </button>
          )}
          <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
            placeholder={disabled ? '面试已结束' : '输入回答，或点击🎤语音输入...'} disabled={disabled} rows={1}
            className="flex-1 resize-none border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 disabled:bg-gray-50 disabled:text-gray-400 transition-colors" />
          <button onClick={handleSend} disabled={disabled || !input.trim()}
            className="shrink-0 w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-xl flex items-center justify-center transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
        {isListening && <p className="text-[10px] text-indigo-500 mt-1.5 text-center font-medium">🎤 正在聆听，请说话...</p>}
      </div>
    </div>
  );
}
