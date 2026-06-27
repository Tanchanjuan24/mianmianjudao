export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#5CA98A]/15 rounded-full blur-[100px] animate-float" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-[#F9FC8F]/8 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-10 left-1/2 w-[600px] h-[600px] bg-[#4E8E75]/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '4s' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#5CA98A] to-transparent rounded-full" />
        <div className="inline-flex items-center gap-2 glass-dark rounded-full px-5 py-2 text-sm text-[#9EA09B] mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-[#5CA98A] rounded-full animate-pulse" />
          <span className="font-medium text-[#5CA98A]">AI 驱动</span><span className="text-[#4E4E4B]">·</span>
          <span>语音交互</span><span className="text-[#4E4E4B]">·</span><span>多维复盘</span>
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#DADBD6] mb-5 animate-slide-up tracking-tight leading-tight">
          面面<span className="text-gradient-primary">俱到</span>
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl font-light text-[#6B6B68] mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          AI 双场景模拟面试与复盘平台
        </p>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#4E4E4B] leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
          语音驱动的 AI 面试官，实时倾听与追问；视频回放标记每一处细节；<br className="hidden sm:block" />
          六维雷达图精准定位提升方向——让每次模拟都有收获
        </p>
        <div className="flex flex-wrap justify-center gap-8 sm:gap-14 mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {[{v:'2',l:'模拟场景',s:'大'},{v:'6',l:'评估维度',s:'维'},{v:'🎙️',l:'语音交互',s:''}].map((s,i)=>(
            <div key={i} className="text-center group">
              <div className="text-3xl sm:text-4xl font-bold text-[#DADBD6] group-hover:text-[#5CA98A] transition-colors">
                {s.v}<span className="text-sm text-[#4E4E4B] ml-0.5 font-normal">{s.s}</span>
              </div>
              <div className="text-xs sm:text-sm text-[#6B6B68] mt-1.5 font-medium">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#3A3A38] to-transparent" />
      </div>
    </section>
  );
}
