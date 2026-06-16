import { Link } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import SceneCard from '../components/home/SceneCard';

const JobIcon = (
  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ClubIcon = (
  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export default function HomePage() {
  return (
    <div className="flex-1">
      <HeroSection />

      {/* 场景选择区域 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">选择模拟场景</h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">根据你的需求，选择适合的面试模拟场景</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          <SceneCard
            type="job"
            title="求职备战"
            subtitle="模拟真实求职面试"
            description="还原企业技术岗面试全流程，从自我介绍到专业问题，AI面试官将根据你的回答智能追问，帮助你查漏补缺。"
            features={[
              '真实企业面试场景模拟',
              'AI智能追问与反馈',
              '专业能力多维评估',
              '面试表现全面复盘',
            ]}
            icon={JobIcon}
            gradient="bg-gradient-to-r from-indigo-500 to-indigo-600"
          />

          <SceneCard
            type="club"
            title="社团竞选"
            subtitle="模拟社团竞选答辩"
            description="针对学生会、社团等竞选场景设计，模拟现场答辩氛围，训练你的临场应变和沟通表达能力。"
            features={[
              '竞选答辩场景还原',
              '沟通感染力专项评估',
              '临场应变能力训练',
              '仪态仪表全面指导',
            ]}
            icon={ClubIcon}
            gradient="bg-gradient-to-r from-cyan-500 to-teal-500"
          />
        </div>

        {/* 历史记录入口 */}
        <div className="text-center mt-6">
          <Link
            to="/history"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            查看面试历史记录
          </Link>
        </div>
      </section>

      {/* 平台亮点 */}
      <section className="bg-white/60 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">为什么选择面面俱到？</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                ),
                title: 'AI 智能驱动',
                desc: '基于大语言模型的智能面试官，根据你的回答实时追问，模拟真实面试节奏。',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                ),
                title: '视频回放分析',
                desc: '录制面试全过程，支持关键时间点标记，直观回顾自己的表现细节。',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                ),
                title: '多维数据复盘',
                desc: '从逻辑表达、专业知识、仪态仪表等6个维度生成雷达图，精准定位改进方向。',
              },
            ].map((item, i) => (
              <div key={i} className="text-center p-5 sm:p-6">
                <div className="w-14 h-14 mx-auto bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 mb-4">
                  {item.icon}
                </div>
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
