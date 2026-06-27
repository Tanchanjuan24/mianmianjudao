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
  const accent = isJob ? '#5CA98A' : '#D4A843';
  const accentBg = isJob ? '#E8F3EE' : '#FAF3E0';

  return (
    <div onClick={handleClick}
      className="group relative bg-white rounded-2xl border border-[#E0DCCF] hover:border-[#5CA98A]/40 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col animate-slide-up">
      <div className="relative h-28 p-5 flex items-end overflow-hidden" style={{ background: accentBg }}>
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full" style={{ border: `1px solid ${accent}20` }} />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full" style={{ background: `${accent}10` }} />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm" style={{ background: accent }}>
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#2A2A28] group-hover:translate-x-1 transition-transform">{title}</h3>
            <p className="text-[#6B6B68] text-xs">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-[#6B6B68] mb-4 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {features.map((f, i) => (
            <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ background: accentBg, color: accent }}>{f}</span>
          ))}
        </div>
        <div className="mt-auto pt-3 border-t border-[#E0DCCF] flex items-center justify-between">
          <span className="text-[10px] text-[#9E9E9B]">约 15~20 分钟</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all" style={{ color: accent }}>
            开始模拟
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </span>
        </div>
      </div>
    </div>
  );
}
