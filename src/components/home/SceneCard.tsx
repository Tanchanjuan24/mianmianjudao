import { useNavigate } from 'react-router-dom';
import type { SceneType } from '../../types';

interface SceneCardProps {
  type: SceneType;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  gradient: string;
  gradientFrom: string;
}

export default function SceneCard({ type, title, subtitle, description, features, icon, gradient, gradientFrom }: SceneCardProps) {
  const navigate = useNavigate();
  const handleClick = () => { navigate(type === 'job' ? '/job-config' : '/club-config'); };
  return (
    <div onClick={handleClick} className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col animate-slide-up">
      <div className={`relative h-32 sm:h-36 ${gradient} p-5 flex items-end`}>
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full border border-white/20" />
        <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/10" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/10" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white backdrop-blur-sm">{icon}</div>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:translate-x-1 transition-transform">{title}</h3>
            <p className="text-white/70 text-sm">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {features.map((f, i) => (
            <span key={i} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${type === 'job' ? 'bg-indigo-50 text-indigo-600' : 'bg-cyan-50 text-cyan-600'}`}>{f}</span>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <span className="text-xs text-gray-300">约 15~20 分钟</span>
          <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${gradientFrom} group-hover:gap-2.5 transition-all`}>
            开始模拟
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </span>
        </div>
      </div>
    </div>
  );
}
