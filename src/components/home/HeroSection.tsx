export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-600 mb-6 animate-fade-in shadow-sm">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          AI驱动 · 实时反馈 · 多维复盘
        </div>

        {/* 主标题 */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 animate-slide-up tracking-tight">
          面面
          <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            俱到
          </span>
        </h1>

        {/* 副标题 */}
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-500 mb-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          大学生专属 AI 双场景模拟面试与复盘平台
        </p>

        {/* 描述 */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
          无论是求职面试还是社团竞选，面面俱到为你提供真实的AI模拟面试体验，
          通过视频回放、AI文稿优化和多维数据复盘，帮助你全面了解自己的表现并持续提升
        </p>

        {/* 统计数据 */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {[
            { value: '2', label: '模拟场景', suffix: '大' },
            { value: '6', label: '评估维度', suffix: '维' },
            { value: 'AI', label: '智能面试官', suffix: '' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-800">
                {stat.value}
                <span className="text-sm text-gray-400 ml-0.5">{stat.suffix}</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
