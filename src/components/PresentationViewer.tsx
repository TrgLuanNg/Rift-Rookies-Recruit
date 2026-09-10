import { useEffect, useState, useRef, useCallback, type FC } from 'react';
import { APP_CONFIG } from '../config';

interface PresentationViewerProps {
  currentSlide: number;
  onSlideChange: (slideNumber: number) => void;
  coreFormUrl: string;
  memberFormUrl: string;
}

export const PresentationViewer: FC<PresentationViewerProps> = ({
  currentSlide,
  onSlideChange,
  coreFormUrl,
  memberFormUrl,
}) => {
  const [showThumbnails, setShowThumbnails] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const getDepartmentForSlide = (slideNum: number) => {
    return APP_CONFIG.departments.find(
      (d) => d.slide === slideNum || (d.endSlide && slideNum >= d.slide && slideNum <= d.endSlide)
    );
  };

  const handleNext = useCallback(() => {
    if (currentSlide < APP_CONFIG.totalSlides) {
      onSlideChange(currentSlide + 1);
    }
  }, [currentSlide, onSlideChange]);

  const handlePrev = useCallback(() => {
    if (currentSlide > 1) {
      onSlideChange(currentSlide - 1);
    }
  }, [currentSlide, onSlideChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        onSlideChange(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        onSlideChange(APP_CONFIG.totalSlides);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onSlideChange]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const paddedNum = String(currentSlide).padStart(2, '0');
  const dept = getDepartmentForSlide(currentSlide);

  return (
    <div
      className="relative flex flex-col justify-between w-full h-[calc(100vh-3.5rem)] p-2 sm:p-4 md:p-6 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex items-center justify-between max-w-4xl w-full mx-auto pb-2 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-[#787774] shrink-0">
            {paddedNum}/{APP_CONFIG.totalSlides}
          </span>
          {dept && (
            <span className="text-[#a1a1aa] truncate">
              {dept.name}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5 shrink-0 ml-2">
          {currentSlide >= 10 && currentSlide <= 18 && (
            <div className="flex items-center gap-1.5">
              <a
                href={coreFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#a1a1aa] hover:text-white transition"
              >
                Core ↗
              </a>
              <span className="text-[#3f3f46]">·</span>
              <a
                href={memberFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#a1a1aa] hover:text-white transition"
              >
                Member ↗
              </a>
            </div>
          )}

          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className="text-[11px] text-[#787774] hover:text-white transition"
          >
            {showThumbnails ? 'Ẩn list' : 'DS slide'}
          </button>
        </div>
      </div>

      <div className="relative flex-1 flex items-center justify-center max-w-4xl w-full mx-auto min-h-0">
        <button
          onClick={handlePrev}
          disabled={currentSlide <= 1}
          className="absolute left-1 sm:-left-6 z-20 p-2 sm:p-3 text-xl sm:text-2xl text-[#787774] hover:text-white disabled:opacity-10 transition"
          aria-label="Slide trước"
        >
          ‹
        </button>

        <div className="relative w-full max-h-full aspect-[16/9] rounded-md overflow-hidden bg-[#0a0b0e] border border-[#22242a] flex items-center justify-center">
          <img
            key={currentSlide}
            src={`/slides/slide-${paddedNum}.webp`}
            alt={`Slide ${currentSlide}`}
            className="w-full h-full object-contain select-none"
          />

          {currentSlide === 19 && (
            <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-[#0e1013]/95 border-t border-[#22242a] flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs">
              <a
                href={APP_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a1a1aa] hover:text-white transition"
              >
                Fanpage ↗
              </a>

              <a
                href={`mailto:${APP_CONFIG.email}`}
                className="text-[#a1a1aa] hover:text-white transition hidden sm:inline"
              >
                {APP_CONFIG.email}
              </a>

              <div className="flex items-center gap-1.5">
                <a
                  href={coreFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 text-white bg-[#1c1f26] hover:bg-[#252832] border border-[#2a2d36] rounded transition font-medium text-[11px]"
                >
                  Đơn Core ↗
                </a>

                <a
                  href={memberFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 text-white bg-[#1c1f26] hover:bg-[#252832] border border-[#2a2d36] rounded transition font-medium text-[11px]"
                >
                  Đơn Member ↗
                </a>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={currentSlide >= APP_CONFIG.totalSlides}
          className="absolute right-1 sm:-right-6 z-20 p-2 sm:p-3 text-xl sm:text-2xl text-[#787774] hover:text-white disabled:opacity-10 transition"
          aria-label="Slide tiếp theo"
        >
          ›
        </button>
      </div>

      <div className="max-w-4xl w-full mx-auto pt-2 flex items-center justify-between text-xs text-[#787774]">
        <div className="text-[11px] hidden sm:inline font-mono">
          Phím ← → hoặc phím cách để chuyển
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: APP_CONFIG.totalSlides }, (_, i) => i + 1).map((idx) => (
            <button
              key={idx}
              onClick={() => onSlideChange(idx)}
              className={`h-1 rounded-sm transition-all ${
                idx === currentSlide
                  ? 'w-3.5 bg-white'
                  : 'w-1 bg-[#27272a] hover:bg-[#52525b]'
              }`}
              title={`Slide ${idx}`}
            />
          ))}
        </div>

        <div className="font-mono text-xs">
          {currentSlide}/{APP_CONFIG.totalSlides}
        </div>
      </div>

      {showThumbnails && (
        <div className="fixed inset-x-0 bottom-0 z-40 bg-[#0e1013] border-t border-[#22242a] p-3 max-h-48 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="text-[#a1a1aa]">
                Tất cả slide ({APP_CONFIG.totalSlides})
              </span>
              <button
                onClick={() => setShowThumbnails(false)}
                className="text-[#787774] hover:text-white"
              >
                Đóng ✕
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-1.5 sm:gap-2">
              {Array.from({ length: APP_CONFIG.totalSlides }, (_, i) => i + 1).map((idx) => {
                const isSelected = idx === currentSlide;
                const padded = String(idx).padStart(2, '0');
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onSlideChange(idx);
                      setShowThumbnails(false);
                    }}
                    className={`relative rounded-sm overflow-hidden border transition aspect-[16/9] ${
                      isSelected
                        ? 'border-white'
                        : 'border-[#22242a] hover:border-[#3f3f46] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={`/slides/slide-${padded}.webp`}
                      alt={`Slide ${idx}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-[#0a0b0e]/90 text-[9px] font-mono text-center text-[#a1a1aa]">
                      {idx}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
