import type { FC } from 'react';
import { APP_CONFIG } from '../config';

interface HeaderProps {
  currentSlide: number;
  totalSlides: number;
  viewMode: 'scroll' | 'presentation';
  onViewModeChange: (mode: 'scroll' | 'presentation') => void;
  onOpenMobileMenu: () => void;
  coreFormUrl: string;
  memberFormUrl: string;
}

export const Header: FC<HeaderProps> = ({
  currentSlide,
  totalSlides,
  viewMode,
  onViewModeChange,
  onOpenMobileMenu,
  coreFormUrl,
  memberFormUrl,
}) => {
  return (
    <header className="sticky top-0 z-30 h-12 bg-[#111317] border-b border-[#22242a] flex items-center justify-between px-3 sm:px-4 text-xs">
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenMobileMenu}
          className="p-1.5 -ml-1 text-[#787774] hover:text-white md:hidden text-base"
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <span className="font-semibold text-white tracking-tight">
          {APP_CONFIG.title}
        </span>
        <span className="font-mono text-[#787774]">
          {currentSlide}/{totalSlides}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => onViewModeChange(viewMode === 'scroll' ? 'presentation' : 'scroll')}
          className="text-[#9ca3af] hover:text-white transition hidden sm:inline"
        >
          {viewMode === 'scroll' ? 'Trình chiếu' : 'Cuộn dọc'}
        </button>

        <a
          href={APP_CONFIG.pdfDownloadUrl}
          download
          className="text-[#9ca3af] hover:text-white transition hidden md:inline"
        >
          PDF ↗
        </a>

        <div className="flex items-center gap-1.5">
          <a
            href={coreFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 text-xs font-medium text-white bg-[#1c1f26] hover:bg-[#252832] border border-[#2a2d36] rounded transition"
            title="Đơn ứng tuyển Core Member"
          >
            Core ↗
          </a>

          <a
            href={memberFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 text-xs font-medium text-white bg-[#1c1f26] hover:bg-[#252832] border border-[#2a2d36] rounded transition"
            title="Đơn ứng tuyển Thành viên"
          >
            Member ↗
          </a>
        </div>
      </div>
    </header>
  );
};
