export default function Footer() {
  return (
    <footer className="border-t border-[#E0DCCF] bg-[#EDE9DC] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9E9E9B]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-[#5CA98A] to-[#4E8E75] rounded text-white font-bold text-[8px] flex items-center justify-center">面</div>
            <span>面面俱到 · AI模拟面试平台</span>
          </div>
          <span>助力每一位大学生的面试之路</span>
        </div>
      </div>
    </footer>
  );
}
