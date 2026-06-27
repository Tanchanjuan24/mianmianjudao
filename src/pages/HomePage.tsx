import { Link } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import SceneCard from '../components/home/SceneCard';

const JobIcon = (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>);
const ClubIcon = (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);

export default function HomePage() {
  return (
    <div className="flex-1">
      <HeroSection />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2A2A28]">选择模拟场景</h2>
          <p className="text-[#6B6B68] mt-2 text-sm">根据你的需求，选择适合的面试模拟场景</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <SceneCard type="job" title="求职备战" subtitle="模拟真实求职面试" description="还原企业面试全流程，AI面试官根据你的行业与岗位智能出题，实时语音追问。" features={['岗位专属出题','AI语音追问','专业多维评估','全面复盘报告']} icon={JobIcon} />
          <SceneCard type="club" title="社团竞选" subtitle="模拟社团竞选答辩" description="针对学生会、社团等竞选场景，模拟现场答辩氛围，训练临场应变能力。" features={['竞选场景还原','语音互动答辩','感染力评估','仪态全面指导']} icon={ClubIcon} />
        </div>
        <div className="text-center mt-8">
          <Link to="/history" className="inline-flex items-center gap-2 text-sm text-[#6B6B68] hover:text-[#5CA98A] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            查看面试历史记录
          </Link>
        </div>
      </section>
      <section className="border-t border-[#E0DCCF] bg-[#EDE9DC]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2A2A28]">为什么选择面面俱到？</h2>
            <p className="text-[#6B6B68] mt-2 text-sm">三大核心能力，让你的面试准备更高效</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[{icon:'🎙️',title:'语音实时交互',desc:'AI面试官语音播报问题，你用语音回答——右侧面板同步显示实时字幕。',bg:'#E8F3EE'},{icon:'🎯',title:'智能追问引擎',desc:'AI根据你的行业、岗位和每一条回答，实时分析并生成针对性追问。',bg:'#FAF3E0'},{icon:'📊',title:'六维数据复盘',desc:'六维雷达图+面部表情分析+逐题回答分析，精准定位提升方向。',bg:'#E8F3EE'}].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white border border-[#E0DCCF]">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-[#2A2A28] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B6B68] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
