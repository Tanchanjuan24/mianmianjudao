import { useState } from 'react';
import { useInterview } from '../../contexts/InterviewContext';
import type { AIConfig } from '../../types';

interface AIConfigPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROVIDERS = [
  { value: 'openai', label: 'OpenAI', defaultUrl: 'https://api.openai.com/v1', defaultModel: 'gpt-4o-mini' },
  { value: 'anthropic', label: 'Anthropic Claude', defaultUrl: 'https://api.anthropic.com', defaultModel: 'claude-3-haiku-20240307' },
  { value: 'deepseek', label: 'DeepSeek', defaultUrl: 'https://api.deepseek.com', defaultModel: 'deepseek-chat' },
  { value: 'custom', label: '自定义兼容接口', defaultUrl: '', defaultModel: '' },
];

export default function AIConfigPanel({ isOpen, onClose }: AIConfigPanelProps) {
  const { state, dispatch } = useInterview();
  const [form, setForm] = useState<AIConfig>({ ...state.aiConfig });

  if (!isOpen) return null;

  const handleProviderChange = (provider: AIConfig['provider']) => {
    const p = PROVIDERS.find((x) => x.value === provider)!;
    setForm((f) => ({ ...f, provider, baseUrl: p.defaultUrl, model: p.defaultModel }));
  };

  const handleSave = () => {
    dispatch({ type: 'SET_AI_CONFIG', payload: form });
    onClose();
  };

  const handleClear = () => {
    const cleared = { ...form, apiKey: '' };
    setForm(cleared);
    dispatch({ type: 'SET_AI_CONFIG', payload: { apiKey: '' } });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-gray-800 text-lg">AI 服务配置</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 服务商选择 */}
        <label className="block text-sm font-medium text-gray-600 mb-1.5">服务商</label>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {PROVIDERS.map((p) => (
            <button
              key={p.value}
              onClick={() => handleProviderChange(p.value as AIConfig['provider'])}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                form.provider === p.value
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Base URL */}
        <label className="block text-sm font-medium text-gray-600 mb-1.5">API 地址</label>
        <input
          type="text"
          value={form.baseUrl}
          onChange={(e) => setForm((f) => ({ ...f, baseUrl: e.target.value }))}
          placeholder="https://api.openai.com/v1"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
        />

        {/* Model */}
        <label className="block text-sm font-medium text-gray-600 mb-1.5">模型</label>
        <input
          type="text"
          value={form.model}
          onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
          placeholder="gpt-4o-mini"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
        />

        {/* API Key */}
        <label className="block text-sm font-medium text-gray-600 mb-1.5">API Key</label>
        <input
          type="password"
          value={form.apiKey}
          onChange={(e) => setForm((f) => ({ ...f, apiKey: e.target.value }))}
          placeholder="sk-..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-5 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
        />

        {/* 状态提示 */}
        <div className={`text-xs mb-4 px-3 py-2 rounded-lg ${form.apiKey ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
          {form.apiKey
            ? '✅ 已配置 API Key，将使用真实 AI 进行面试'
            : '⚠️ 未配置 API Key，将使用本地 Mock 模式'}
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            清除配置
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            保存配置
          </button>
        </div>
      </div>
    </div>
  );
}
