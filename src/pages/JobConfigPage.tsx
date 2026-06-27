import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useInterview } from '../contexts/InterviewContext';

const INDUSTRIES = ['互联网', '金融', '快消', '咨询', '制造业', '教育', '医疗', '房地产', '汽车', '能源'];
const POSITIONS = ['技术', '产品', '运营', '销售', '职能', '设计', '市场', '数据分析', '人力资源', '财务'];

export default function JobConfigPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useInterview();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [resumeFileName, setResumeFileName] = useState(state.jobConfig.resumeFileName || '');
  const [resumeContent, setResumeContent] = useState(state.jobConfig.resumeContent || '');
  const [industry, setIndustry] = useState(state.jobConfig.industry || '');
  const [position, setPosition] = useState(state.jobConfig.position || '');
  const [notes, setNotes] = useState(state.jobConfig.notes || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, resume: '文件大小不能超过 5MB' }));
      return;
    }

    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'txt', 'docx'].includes(ext || '')) {
      setErrors((prev) => ({ ...prev, resume: '仅支持 .pdf / .txt / .docx 格式' }));
      return;
    }

    setResumeFileName(file.name);
    setErrors((prev) => ({ ...prev, resume: '' }));

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setResumeContent(text);
    };
    reader.onerror = () => {
      setErrors((prev) => ({ ...prev, resume: '文件读取失败，请重试' }));
    };
    reader.readAsText(file);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!industry) errs.industry = '请选择目标行业';
    if (!position) errs.position = '请选择岗位类型';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStart = () => {
    if (!validate()) return;

    // 保存配置到 Context
    dispatch({
      type: 'SET_JOB_CONFIG',
      payload: { industry, position, resumeContent, resumeFileName, notes },
    });
    dispatch({ type: 'SET_SCENE', payload: 'job' });
    dispatch({ type: 'RESET' });

    navigate('/interview/job');
  };

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* 顶部 */}
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-[#9E9E9B] hover:text-[#5CA98A] transition-colors mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#5CA98A] to-[#4E8E75] rounded-xl flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#2A2A28]">求职面试配置</h1>
            <p className="text-sm text-[#9E9E9B]">完善信息，让AI面试官更懂你</p>
          </div>
        </div>
      </div>

      {/* 表单 */}
      <div className="bg-white rounded-2xl border border-[#E0DCCF] shadow-sm p-5 sm:p-7 space-y-6">
        {/* 简历上传 */}
        <div>
          <label className="block text-sm font-medium text-[#2A2A28] mb-2">
            简历上传 <span className="text-[#9E9E9B] font-normal">（可选，支持 .pdf / .txt / .docx）</span>
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
              resumeFileName
                ? 'border-[#5CA98A]/50 bg-[#E8F3EE]'
                : errors.resume
                  ? 'border-[#C97064]/40 bg-[#C97064]/10'
                  : 'border-[#E0DCCF] hover:border-[#5CA98A]/40 hover:bg-[#E8F3EE]/30'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            {resumeFileName ? (
              <div className="flex items-center justify-center gap-2 text-[#4E8E75]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium">{resumeFileName}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setResumeFileName('');
                    setResumeContent('');
                  }}
                  className="text-[#5CA98A] hover:text-[#C97064] ml-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="text-[#9E9E9B]">
                <svg className="w-10 h-10 mx-auto mb-2 text-[#E0DCCF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm">点击上传简历文件</p>
                <p className="text-xs mt-1">最大 5MB</p>
              </div>
            )}
          </div>
          {errors.resume && <p className="text-[#C97064] text-xs mt-1.5">{errors.resume}</p>}
        </div>

        {/* 行业选择 */}
        <div>
          <label className="block text-sm font-medium text-[#2A2A28] mb-2">
            目标行业 <span className="text-[#C97064]">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind}
                type="button"
                onClick={() => { setIndustry(ind); setErrors((p) => ({ ...p, industry: '' })); }}
                className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                  industry === ind
                    ? 'border-[#5CA98A] bg-[#E8F3EE] text-[#4E8E75] shadow-sm'
                    : 'border-[#E0DCCF] text-[#6B6B68] hover:border-[#E0DCCF]'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
          {errors.industry && <p className="text-[#C97064] text-xs mt-1.5">{errors.industry}</p>}
        </div>

        {/* 岗位选择 */}
        <div>
          <label className="block text-sm font-medium text-[#2A2A28] mb-2">
            岗位类型 <span className="text-[#C97064]">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {POSITIONS.map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => { setPosition(pos); setErrors((p) => ({ ...p, position: '' })); }}
                className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                  position === pos
                    ? 'border-[#5CA98A] bg-[#E8F3EE] text-[#4E8E75] shadow-sm'
                    : 'border-[#E0DCCF] text-[#6B6B68] hover:border-[#E0DCCF]'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
          {errors.position && <p className="text-[#C97064] text-xs mt-1.5">{errors.position}</p>}
        </div>

        {/* 备注 */}
        <div>
          <label className="block text-sm font-medium text-[#2A2A28] mb-2">
            额外备注 <span className="text-[#9E9E9B] font-normal">（可选）</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="你可以补充想强调的经历、期望的面试方向等..."
            className="w-full border border-[#E0DCCF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5CA98A] focus:ring-1 focus:ring-[#5CA98A] resize-none transition-colors"
          />
        </div>

        {/* 开始按钮 */}
        <button
          onClick={handleStart}
          className="w-full py-3 bg-gradient-to-r from-[#5CA98A] to-[#4E8E75] hover:from-[#4E8E75] hover:to-[#4E8E75] text-white font-semibold rounded-xl text-base transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          <span className="flex items-center justify-center gap-2">
            🚀 开始 AI 模拟面试
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
