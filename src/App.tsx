import { HashRouter, Routes, Route } from 'react-router-dom';
import { InterviewProvider } from './contexts/InterviewContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import JobConfigPage from './pages/JobConfigPage';
import ClubConfigPage from './pages/ClubConfigPage';
import InterviewPage from './pages/InterviewPage';
import ReviewPage from './pages/ReviewPage';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  return (
    <HashRouter>
      <InterviewProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/job-config" element={<JobConfigPage />} />
            <Route path="/club-config" element={<ClubConfigPage />} />
            <Route path="/interview/:scene" element={<InterviewPage />} />
            <Route path="/review/:scene" element={<ReviewPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
          <Footer />
        </div>
      </InterviewProvider>
    </HashRouter>
  );
}
