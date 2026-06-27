import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useInterview } from '../contexts/InterviewContext';

const ORG_TYPES = ['学生会', '团委', '社团联合会', '青年志愿者协会', '艺术团', '辩论队', '创业协会', '其他社团'];
const CLUB_POSITIONS = ['主席/社长', '副主席/副社长', '部长', '副部长', '干事/部员', '项目负责人', '外联/公关', '宣传/新媒体'];

export default function ClubConfigPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useInterview();

  const [orgType, setOrgType] = useState(state.clubConfig.organizationType || '');
  const [position, setPosition] = useState(state.clubConfig.position || '');
  const [personalStatement, setPersonalStatement] = useState(state.clubConfig.personalStatement || '');
  const [notes, setNotes] = useState(state.clubConfig.notes || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!orgType) errs.orgType = '请选择组织类型';
    if (!position) errs.position = '请选择竞选职位';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStart = () => {
    if (!validate()) return;

    dispatch({
      type: 'SET_CLUB_CONFIG',
      payload: { organizationType: orgType, position, personalStatement, notes },
    });
    dispatch({ type: 'SET_SCENE', payload: 'club' });
    dispatch({ type: 'RESET' });

    navigate('/interview/club');
  };

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* 顶部 */}
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-[#9E9E9B] hover:text-[#D4A843] transition-colors mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#D4A843] to-[#D4A843] rounded-xl flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#2A2A28]">社团竞选配置</h1>
            <p className="text-sm text-[#9E9E9B]">选择竞选目标，开启模拟答辩</p>
          </div>
        </div>
      </div>

      {/* 表单 */}
      <div className="bg-white rounded-2xl border border-[#E0DCCF] shadow-sm p-5 sm:p-7 space-y-6">
        {/* 组织类型 */}
        <div>
          <label className="block text-sm font-medium text-[#2A2A28] mb-2">
            组织类型 <span className="text-[#C97064]">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ORG_TYPES.map((org) => (
              <button
                key={org}
                type="button"
                onClick={() => { setOrgType(org); setErrors((p) => ({ ...p, orgType: '' })); }}
                className={`py-2.5 px-3 rounded-lg text-sm font-medium border transition-all ${
                  orgType === org
                    ? 'border-[#D4A843] bg-[#FAF3E0] text-[#D4A843] shadow-sm'
                    : 'border-[#E0DCCF] text-[#6B6B68] hover:border-[#E0DCCF]'
                }`}
              >
                {org}
              </button>
            ))}
          </div>
          {errors.orgType && <p className="text-[#C97064] text-xs mt-1.5">{errors.orgType}</p>}
        </div>

        {/* 竞选职位 */}
        <div>
          <label className="block text-sm font-medium text-[#2A2A28] mb-2">
            竞选职位 <span className="text-[#C97064]">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CLUB_POSITIONS.map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => { setPosition(pos); setErrors((p) => ({ ...p, position: '' })); }}
                className={`py-2.5 px-3 rounded-lg text-sm font-medium border transition-all ${
                  position === pos
                    ? 'border-[#D4A843] bg-[#FAF3E0] text-[#D4A843] shadow-sm'
                    : 'border-[#E0DCCF] text-[#6B6B68] hover:border-[#E0DCCF]'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
          {errors.position && <p className="text-[#C97064] text-xs mt-1.5">{errors.position}</p>}
        </div>

        {/* 个人陈述 */}
        <div>
          <label className="block text-sm font-medium text-[#2A2A28] mb-2">
            个人陈述 <span className="text-[#9E9E9B] font-normal">（可选）</span>
          </label>
          <textarea
            value={personalStatement}
            onChange={(e) => setPersonalStatement(e.target.value)}
            rows={4}
            placeholder="简要介绍你自己，说说你为什么想竞选这个职位..."
            className="w-full border border-[#E0DCCF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4A843] focus:ring-1 focus:ring-[#D4A843] resize-none transition-colors"
          />
        </div>

        {/* 备注 */}
        <div>
          <label className="block text-sm font-medium text-[#2A2A28] mb-2">
            其他说明 <span className="text-[#9E9E9B] font-normal">（可选）</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="任何你想补充的信息..."
            className="w-full border border-[#E0DCCF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4A843] focus:ring-1 focus:ring-[#D4A843] resize-none transition-colors"
          />
        </div>

        {/* 开始按钮 */}
        <button
          onClick={handleStart}
          className="w-full py-3 bg-gradient-to-r from-[#D4A843] to-[#D4A843] hover:from-[#D4A843] hover:to-[#D4A843] text-white font-semibold rounded-xl text-base transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          <span className="flex items-center justify-center gap-2">
            🎓 开始竞选模拟
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
