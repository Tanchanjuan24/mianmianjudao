export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded flex items-center justify-center text-white font-bold text-[10px]">
              面
            </div>
            <span>面面俱到 · AI模拟面试平台</span>
          </div>
          <span>助力每一位大学生的面试之路</span>
        </div>
      </div>
    </footer>
  );
}
