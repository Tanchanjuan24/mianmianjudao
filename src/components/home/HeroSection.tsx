export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#3D8357]/12 rounded-full blur-[100px] animate-float" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-[#FBC64D]/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#3D8357] to-transparent rounded-full" />
        <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm text-[#4A5C50] mb-8 animate-fade-in shadow-sm">
          <span className="w-2 h-2 bg-[#3D8357] rounded-full animate-pulse" />
          <span className="font-medium text-[#3D8357]">AI 驱动</span><span className="text-[#8A9B8F]">·</span>
          <span>语音交互</span><span className="text-[#8A9B8F]">·</span><span>多维复盘</span>
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#1A2B20] mb-5 animate-slide-up tracking-tight leading-tight">
          面面<span className="text-gradient-primary">俱到</span>
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl font-light text-[#4A5C50] mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          AI 双场景模拟面试与复盘平台
        </p>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#8A9B8F] leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
          语音驱动的 AI 面试官，实时倾听与追问；视频回放标记每一处细节；<br className="hidden sm:block" />
          六维雷达图精准定位提升方向——让每次模拟都有收获
        </p>
        <div className="flex flex-wrap justify-center gap-8 sm:gap-14 mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {[{v:'2',l:'模拟场景',s:'大'},{v:'6',l:'评估维度',s:'维'},{v:'🎙️',l:'语音交互',s:''}].map((s,i)=>(
            <div key={i} className="text-center group">
              <div className="text-3xl sm:text-4xl font-bold text-[#1A2B20] group-hover:text-[#3D8357] transition-colors">
                {s.v}<span className="text-sm text-[#8A9B8F] ml-0.5 font-normal">{s.s}</span>
              </div>
              <div className="text-xs sm:text-sm text-[#4A5C50] mt-1.5 font-medium">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#CDD2CC] to-transparent" />
      </div>
    </section>
  );
}
