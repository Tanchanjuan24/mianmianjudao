import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-[#CDD2CC] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 no-underline">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-[#3D8357] to-[#2D6B45] rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base">
              面
            </div>
            <span className="font-semibold text-[#1A2B20] text-base sm:text-lg">面面俱到</span>
          </Link>
          {!isHome && (
            <div className="flex items-center gap-3">
              <Link to="/history" className="text-sm text-[#4A5C50] hover:text-[#3D8357] transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                历史记录
              </Link>
              <Link to="/" className="text-sm text-[#4A5C50] hover:text-[#3D8357] transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                首页
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
