import { useState, useEffect, useCallback } from 'react';
import { APP_CONFIG } from './config';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ContinuousScrollViewer } from './components/ContinuousScrollViewer';
import { PresentationViewer } from './components/PresentationViewer';

export function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'scroll' | 'presentation'>('scroll');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const [coreFormUrl] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    const paramUrl = params.get('core');
    if (paramUrl) return decodeURIComponent(paramUrl);
    const stored = localStorage.getItem('rift_rookies_core_form');
    return stored || APP_CONFIG.coreFormUrl;
  });

  const [memberFormUrl] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    const paramUrl = params.get('member');
    if (paramUrl) return decodeURIComponent(paramUrl);
    const stored = localStorage.getItem('rift_rookies_member_form');
    return stored || APP_CONFIG.memberFormUrl;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const match = window.location.hash.match(/#slide-(\d+)/);
      if (match) {
        const slideNum = parseInt(match[1], 10);
        if (slideNum >= 1 && slideNum <= APP_CONFIG.totalSlides) {
          setCurrentSlide(slideNum);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSlideChange = useCallback((slideNum: number) => {
    setCurrentSlide(slideNum);
    window.history.replaceState(null, '', `#slide-${slideNum}`);
  }, []);

  const handleNavigateSlide = (slideNum: number) => {
    setCurrentSlide(slideNum);
    window.history.replaceState(null, '', `#slide-${slideNum}`);

    if (viewMode === 'scroll') {
      const element = document.getElementById(`slide-${slideNum}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1013] text-[#e4e4e7] flex flex-col font-sans">
      <Sidebar
        currentSlide={currentSlide}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onNavigateSlide={handleNavigateSlide}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        coreFormUrl={coreFormUrl}
        memberFormUrl={memberFormUrl}
      />

      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
        />
      )}

      <div className="flex-1 flex flex-col md:pl-72 min-h-screen">
        <Header
          currentSlide={currentSlide}
          totalSlides={APP_CONFIG.totalSlides}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          coreFormUrl={coreFormUrl}
          memberFormUrl={memberFormUrl}
        />

        <main className="flex-1 bg-[#0e1013]">
          {viewMode === 'scroll' ? (
            <ContinuousScrollViewer
              currentSlide={currentSlide}
              onSlideChange={handleSlideChange}
              coreFormUrl={coreFormUrl}
              memberFormUrl={memberFormUrl}
            />
          ) : (
            <PresentationViewer
              currentSlide={currentSlide}
              onSlideChange={handleSlideChange}
              coreFormUrl={coreFormUrl}
              memberFormUrl={memberFormUrl}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
