import { useNavigate } from 'react-router-dom';
import type { SceneType } from '../../types';

interface SceneCardProps {
  type: SceneType;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

export default function SceneCard({ type, title, subtitle, description, features, icon }: SceneCardProps) {
  const navigate = useNavigate();
  const handleClick = () => { navigate(type === 'job' ? '/job-config' : '/club-config'); };
  const isJob = type === 'job';
  const accent = isJob ? '#3D8357' : '#FBC64D';
  const accentBg = isJob ? '#E0EDE5' : '#FCF3DC';
  const accentDark = isJob ? '#2D6B45' : '#E8B23A';

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white rounded-3xl border border-[#CDD2CC] hover:border-[#3D8357]/40 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden animate-slide-up"
    >
      {/* 顶部大渐变区 */}
      <div className="relative h-40 sm:h-44 p-6 flex items-end overflow-hidden" style={{ background: `linear-gradient(135deg, ${accentBg}, ${accent}15)` }}>
        {/* 装饰圆 */}
        <div className="absolute top-6 right-6 w-24 h-24 rounded-full" style={{ border: `1px solid ${accent}25` }} />
        <div className="absolute top-12 right-12 w-14 h-14 rounded-full" style={{ border: `1px solid ${accent}15` }} />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full" style={{ background: `${accent}10` }} />

        <div className="relative z-10 flex items-center gap-4">
          {/* 大图标 */}
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ background: accent }}>
            {icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#1A2B20] group-hover:translate-x-1 transition-transform">{title}</h3>
            <p className="text-[#4A5C50] text-sm mt-0.5">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <div className="p-6 sm:p-7">
        <p className="text-sm text-[#4A5C50] mb-5 leading-relaxed">{description}</p>

        {/* 特性列表 - 更大更显眼 */}
        <div className="grid grid-cols-2 gap-2.5 mb-6">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: accentBg }}>
              <svg className="w-4 h-4 shrink-0" style={{ color: accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs font-medium" style={{ color: accentDark }}>{f}</span>
            </div>
          ))}
        </div>

        {/* 底部 */}
        <div className="pt-4 border-t border-[#CDD2CC] flex items-center justify-between">
          <span className="text-xs text-[#8A9B8F]">约 15~20 分钟</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-3 transition-all" style={{ color: accent }}>
            开始模拟
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </span>
        </div>
      </div>
    </div>
  );
}
