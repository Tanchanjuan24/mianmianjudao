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
}

export default function SceneCard({ type, title, subtitle, description, features, icon, gradient }: SceneCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(type === 'job' ? '/job-config' : '/club-config');
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
    >
      {/* 顶部渐变条 */}
      <div className={`h-1.5 w-full ${gradient}`} />

      <div className="p-5 sm:p-7 lg:p-8 flex flex-col flex-1">
        {/* 图标和标题 */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white shrink-0 ${gradient} shadow-md`}>
            {icon}
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
          </div>
        </div>

        {/* 描述 */}
        <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">{description}</p>

        {/* 特性列表 */}
        <div className="space-y-2 flex-1">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>{f}</span>
            </div>
          ))}
        </div>

        {/* 底部按钮 */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">预计15-20分钟</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
              开始模拟
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
