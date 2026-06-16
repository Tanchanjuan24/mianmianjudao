import type { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`flex items-start gap-2 max-w-[85%] ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* 头像 */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-medium ${
            isUser
              ? 'bg-gradient-to-br from-indigo-400 to-indigo-600'
              : 'bg-gradient-to-br from-cyan-400 to-teal-500'
          }`}
        >
          {isUser ? '我' : 'AI'}
        </div>

        {/* 气泡 */}
        <div
          className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'bg-indigo-500 text-white rounded-tr-md'
              : 'bg-white border border-gray-200 text-gray-700 rounded-tl-md shadow-sm'
          }`}
        >
          <p className="whitespace-pre-wrap break-words m-0">{message.content}</p>
          <span className={`text-[10px] mt-1 block ${isUser ? 'text-indigo-200' : 'text-gray-400'}`}>
            {new Date(message.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
}
