import { useState, type FC } from 'react';
import { APP_CONFIG, DepartmentInfo, SectionInfo } from '../config';

interface SidebarProps {
  currentSlide: number;
  viewMode: 'scroll' | 'presentation';
  onViewModeChange: (mode: 'scroll' | 'presentation') => void;
  onNavigateSlide: (slideNumber: number) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  coreFormUrl: string;
  memberFormUrl: string;
}

export const Sidebar: FC<SidebarProps> = ({
  currentSlide,
  viewMode,
  onViewModeChange,
  onNavigateSlide,
  isMobileOpen,
  onCloseMobile,
  coreFormUrl,
  memberFormUrl,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const isSectionActive = (section: SectionInfo) => {
    return section.slides.includes(currentSlide);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(APP_CONFIG.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1500);
  };

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 w-72 max-w-[85vw] flex flex-col bg-[#111317] border-r border-[#22242a] text-sm transition-transform duration-150 ease-out ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="p-4 border-b border-[#22242a] flex items-center justify-between">
        <div>
          <div className="font-semibold text-white tracking-tight">
            {APP_CONFIG.title}
          </div>
          <div className="text-xs text-[#787774]">
            {APP_CONFIG.subtitle}
          </div>
        </div>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="p-1.5 -mr-1 text-[#787774] hover:text-white md:hidden"
            aria-label="Close menu"
          >
            ✕
          </button>
        )}
      </div>

      <div className="p-3 border-b border-[#22242a] space-y-2">
        <div className="grid grid-cols-1 gap-1.5">
          <a
            href={coreFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-white bg-[#1c1f26] hover:bg-[#252832] border border-[#2a2d36] rounded transition"
          >
            <span>Đơn Core Member</span>
            <span className="text-[#a1a1aa]">↗</span>
          </a>

          <a
            href={memberFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-white bg-[#1c1f26] hover:bg-[#252832] border border-[#2a2d36] rounded transition"
          >
            <span>Đơn Thành Viên</span>
            <span className="text-[#a1a1aa]">↗</span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-1 p-0.5 bg-[#0a0b0e] rounded border border-[#22242a]">
          <button
            onClick={() => {
              onViewModeChange('scroll');
              if (onCloseMobile) onCloseMobile();
            }}
            className={`py-1 text-xs text-center rounded transition ${
              viewMode === 'scroll'
                ? 'bg-[#1e2129] text-white font-medium'
                : 'text-[#787774] hover:text-[#a1a1aa]'
            }`}
          >
            Cuộn dọc
          </button>
          <button
            onClick={() => {
              onViewModeChange('presentation');
              if (onCloseMobile) onCloseMobile();
            }}
            className={`py-1 text-xs text-center rounded transition ${
              viewMode === 'presentation'
                ? 'bg-[#1e2129] text-white font-medium'
                : 'text-[#787774] hover:text-[#a1a1aa]'
            }`}
          >
            Trình chiếu
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-5">
        <div>
          <div className="px-2 mb-1.5 text-[11px] uppercase tracking-wider text-[#787774] font-medium">
            Ban Tuyển Dụng
          </div>
          <div className="space-y-0.5">
            {APP_CONFIG.departments.map((dept: DepartmentInfo) => {
              const isSelected =
                currentSlide === dept.slide ||
                (dept.endSlide && currentSlide <= dept.endSlide && currentSlide >= dept.slide);

              return (
                <button
                  key={dept.id}
                  onClick={() => {
                    onNavigateSlide(dept.slide);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1c1f26] text-white font-medium'
                      : 'text-[#9ca3af] hover:text-white hover:bg-[#16181e]'
                  }`}
                >
                  <span className="truncate">{dept.name}</span>
                  <span className="font-mono text-[10px] text-[#787774] shrink-0 ml-2">
                    p.{dept.slide}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="px-2 mb-1.5 text-[11px] uppercase tracking-wider text-[#787774] font-medium">
            Mục Lục
          </div>
          <div className="space-y-0.5">
            {APP_CONFIG.sections.map((section: SectionInfo) => {
              const active = isSectionActive(section);
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    onNavigateSlide(section.slides[0]);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition flex items-center justify-between ${
                    active
                      ? 'bg-[#1c1f26] text-white font-medium'
                      : 'text-[#9ca3af] hover:text-white hover:bg-[#16181e]'
                  }`}
                >
                  <span className="truncate">{section.title}</span>
                  <span className="font-mono text-[10px] text-[#787774] shrink-0 ml-2">
                    {section.number}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-2 border-t border-[#22242a] px-2 space-y-2 text-xs text-[#9ca3af]">
          <div className="text-[11px] uppercase tracking-wider text-[#787774] font-medium">
            Liên Hệ
          </div>

          <div className="space-y-1 font-mono text-[11px]">
            {APP_CONFIG.contacts.map((c, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-[#787774]">{c.name}</span>
                <a href={`tel:${c.phone}`} className="hover:text-white">
                  {c.phone}
                </a>
              </div>
            ))}
          </div>

          <div className="pt-1 flex items-center gap-3 text-[11px]">
            <a
              href={APP_CONFIG.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Facebook ↗
            </a>
            <button
              onClick={handleCopyEmail}
              className="hover:text-white"
            >
              {copiedEmail ? 'Đã sao chép' : 'Sao chép email'}
            </button>
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-[#22242a] flex items-center justify-between text-xs text-[#787774]">
        <span>Trang {currentSlide} / {APP_CONFIG.totalSlides}</span>
        <a
          href={APP_CONFIG.pdfDownloadUrl}
          download="Rift-Rookies-Booklet-JD.pdf"
          className="hover:text-white"
        >
          Tải PDF ↗
        </a>
      </div>
    </aside>
  );
};
