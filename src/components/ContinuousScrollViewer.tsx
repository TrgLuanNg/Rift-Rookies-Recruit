import { useEffect, useRef, type FC } from 'react';
import { APP_CONFIG } from '../config';

interface ContinuousScrollViewerProps {
  currentSlide: number;
  onSlideChange: (slideNumber: number) => void;
  coreFormUrl: string;
  memberFormUrl: string;
}

export const ContinuousScrollViewer: FC<ContinuousScrollViewerProps> = ({
  currentSlide,
  onSlideChange,
  coreFormUrl,
  memberFormUrl,
}) => {
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const isUserScrolling = useRef(false);

  const getDepartmentForSlide = (slideNum: number) => {
    return APP_CONFIG.departments.find(
      (d) => d.slide === slideNum || (d.endSlide && slideNum >= d.slide && slideNum <= d.endSlide)
    );
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-slide-index'));
          if (index && !isUserScrolling.current) {
            onSlideChange(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    slideRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onSlideChange]);

  const slidesArray = Array.from({ length: APP_CONFIG.totalSlides }, (_, i) => i + 1);

  return (
    <div className="w-full min-h-screen py-4 sm:py-8 px-2 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <div className="space-y-4 sm:space-y-6">
        {slidesArray.map((num) => {
          const paddedNum = String(num).padStart(2, '0');
          const dept = getDepartmentForSlide(num);
          const isCurrent = currentSlide === num;

          return (
            <section
              key={num}
              id={`slide-${num}`}
              data-slide-index={num}
              ref={(el) => (slideRefs.current[num - 1] = el)}
              className={`scroll-mt-14 rounded-md overflow-hidden bg-[#111317] border transition-colors duration-150 ${
                isCurrent ? 'border-[#3f3f46]' : 'border-[#22242a]'
              }`}
            >
              <div className="flex items-center justify-between px-2.5 sm:px-3 py-1.5 bg-[#0a0b0e] border-b border-[#22242a] text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-[#787774] shrink-0">
                    {paddedNum}
                  </span>
                  {dept && (
                    <span className="text-[#a1a1aa] truncate">
                      {dept.name}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-2">
                  {num >= 10 && num <= 18 && (
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
                  <span className="text-[#52525b] font-mono text-[11px]">
                    {num}/{APP_CONFIG.totalSlides}
                  </span>
                </div>
              </div>

              <div className="relative w-full aspect-[16/9] bg-[#0a0b0e] flex items-center justify-center">
                <img
                  src={`/slides/slide-${paddedNum}.webp`}
                  alt={`Slide ${num}`}
                  loading="lazy"
                  className="w-full h-full object-contain select-none"
                />

                {num === 19 && (
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
                        Đơn Core Member ↗
                      </a>

                      <a
                        href={memberFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 text-white bg-[#1c1f26] hover:bg-[#252832] border border-[#2a2d36] rounded transition font-medium text-[11px]"
                      >
                        Đơn Thành Viên ↗
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <div className="py-6 sm:py-8 text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs text-[#787774] hover:text-white transition"
        >
          ↑ Trở về đầu trang
        </button>
      </div>
    </div>
  );
};
