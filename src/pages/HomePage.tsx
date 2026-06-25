import { Link } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import SceneCard from '../components/home/SceneCard';

const JobIcon = (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>);
const ClubIcon = (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>);

export default function HomePage() {
  return (
    <div className="flex-1">
      <HeroSection />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 relative">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">选择模拟场景</h2>
          <p className="text-gray-400 mt-2 text-sm">根据你的需求，选择适合的面试模拟场景</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          <SceneCard type="job" title="求职备战" subtitle="模拟真实求职面试" description="还原企业面试全流程，AI面试官根据你的行业与岗位智能出题，实时语音追问，帮助你查漏补缺。" features={['岗位专属出题','AI语音追问','专业多维评估','全面复盘报告']} icon={JobIcon} gradient="bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600" gradientFrom="text-indigo-600" />
          <SceneCard type="club" title="社团竞选" subtitle="模拟社团竞选答辩" description="针对学生会、社团等竞选场景，模拟现场答辩氛围，训练临场应变和沟通表达能力。" features={['竞选场景还原','语音互动答辩','感染力评估','仪态全面指导']} icon={ClubIcon} gradient="bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500" gradientFrom="text-teal-600" />
        </div>
        <div className="text-center mt-8">
          <Link to="/history" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-600 transition-colors group">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            查看面试历史记录
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
      <section className="bg-white border-t border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">为什么选择面面俱到？</h2>
            <p className="text-gray-400 mt-2 text-sm">三大核心能力，让你的面试准备更高效</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[{icon:'🎙️',title:'语音实时交互',desc:'AI面试官语音播报问题，你用语音回答——像真正面试一样自然对话，右侧面板同步显示文字记录。',color:'from-indigo-50 to-violet-50',border:'border-indigo-100'},{icon:'🎯',title:'智能追问引擎',desc:'AI根据你的行业、岗位和每一条回答，实时分析并生成针对性追问，绝不是千篇一律的题库。',color:'from-cyan-50 to-teal-50',border:'border-cyan-100'},{icon:'📊',title:'六维数据复盘',desc:'从逻辑表达、专业知识、仪态仪表等6个维度生成雷达图，配合视频标记和AI文稿优化，精准提升。',color:'from-amber-50 to-orange-50',border:'border-amber-100'}].map((item, i) => (
              <div key={i} className={`text-center p-6 rounded-2xl bg-gradient-to-b ${item.color} border ${item.border}`}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
