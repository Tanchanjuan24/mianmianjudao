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
  const accent = type === 'job' ? '#5CA98A' : '#F9FC8F';

  return (
    <div onClick={handleClick}
      className="group relative bg-[#2A2A28] rounded-2xl border border-[#3A3A38] hover:border-[#5CA98A]/40 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col animate-slide-up">
      <div className="relative h-28 p-5 flex items-end overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}22, ${accent}08)` }}>
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full border border-white/5" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full" style={{ background: `${accent}10` }} />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ background: accent }}>
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#DADBD6] group-hover:translate-x-1 transition-transform">{title}</h3>
            <p className="text-[#6B6B68] text-xs">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-[#9EA09B] mb-4 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {features.map((f, i) => (
            <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ background: `${accent}15`, color: accent }}>{f}</span>
          ))}
        </div>
        <div className="mt-auto pt-3 border-t border-[#3A3A38] flex items-center justify-between">
          <span className="text-[10px] text-[#4E4E4B]">约 15~20 分钟</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all" style={{ color: accent }}>
            开始模拟
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </span>
        </div>
      </div>
    </div>
  );
}
