export interface DepartmentInfo {
  id: string;
  name: string;
  shortName: string;
  slide: number;
  endSlide?: number;
  tagline: string;
  color: string;
  badgeColor: string;
}

export interface SectionInfo {
  id: string;
  number: string;
  title: string;
  slides: number[];
  iconName: string;
  departments?: DepartmentInfo[];
}

export interface AppConfig {
  title: string;
  subtitle: string;
  season: string;
  coreFormUrl: string;
  memberFormUrl: string;
  facebookUrl: string;
  email: string;
  contacts: {
    name: string;
    role: string;
    phone: string;
  }[];
  pdfDownloadUrl: string;
  totalSlides: number;
  departments: DepartmentInfo[];
  sections: SectionInfo[];
}

export const APP_CONFIG: AppConfig = {
  title: "Rift Rookies",
  subtitle: "Booklet Tuyển Dụng & Mô Tả Công Việc (JD)",
  season: "Mùa 03",
  coreFormUrl: "https://forms.gle/riftrookies-core-m03",
  memberFormUrl: "https://forms.gle/riftrookies-member-m03",
  facebookUrl: "https://www.facebook.com/riftrookies",
  email: "riftrookiesproject@gmail.com",
  pdfDownloadUrl: "/rift-rookies-booklet.pdf",
  totalSlides: 19,
  contacts: [
    {
      name: "Phạm Quỳnh Trang",
      role: "Co - Founder",
      phone: "0354489714",
    },
    {
      name: "Nguyễn Phương Linh",
      role: "Co - Founder",
      phone: "0983180508",
    },
  ],
  departments: [
    {
      id: "doi-ngoai",
      name: "Ban Đối ngoại",
      shortName: "Đối ngoại",
      slide: 12,
      tagline: "Tìm kiếm nhà tài trợ, kết nối đối tác & bảo trợ dự án",
      color: "from-amber-500/20 to-amber-900/30",
      badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    },
    {
      id: "truyen-thong",
      name: "Ban Truyền thông",
      shortName: "Truyền thông",
      slide: 13,
      endSlide: 14,
      tagline: "Viết bài, sáng tạo nội dung & xây dựng hình ảnh Fanpage",
      color: "from-blue-500/20 to-blue-900/30",
      badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/30",
    },
    {
      id: "chuyen-mon",
      name: "Ban Chuyên môn",
      shortName: "Chuyên môn",
      slide: 15,
      tagline: "Phân tích meta game, viết cẩm nang LoL (Rank tối thiểu Lục Bảo)",
      color: "from-emerald-500/20 to-emerald-900/30",
      badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    },
    {
      id: "nhan-su",
      name: "Ban Nhân sự",
      shortName: "Nhân sự",
      slide: 16,
      endSlide: 17,
      tagline: "Quản lý nhân lực, gắn kết thành viên & điều phối tiến độ",
      color: "from-purple-500/20 to-purple-900/30",
      badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    },
    {
      id: "thiet-ke",
      name: "Ban Thiết kế",
      shortName: "Thiết kế",
      slide: 18,
      tagline: "Thiết kế ấn phẩm truyền thông, visual & hình ảnh fanpage",
      color: "from-rose-500/20 to-rose-900/30",
      badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/30",
    },
  ],
  sections: [
    {
      id: "intro",
      number: "01",
      title: "Giới thiệu dự án",
      slides: [1, 2, 3, 4],
      iconName: "Compass",
    },
    {
      id: "vision",
      number: "02",
      title: "Tầm nhìn & Sứ mệnh",
      slides: [5, 6],
      iconName: "Eye",
    },
    {
      id: "milestones",
      number: "03",
      title: "Hành trình & Thành tựu",
      slides: [7, 8],
      iconName: "Award",
    },
    {
      id: "overview-jd",
      number: "04",
      title: "Yêu cầu & Quyền lợi chung",
      slides: [9, 10, 11],
      iconName: "CheckCircle2",
    },
    {
      id: "departments",
      number: "05",
      title: "Mô tả công việc (JD từng ban)",
      slides: [12, 13, 14, 15, 16, 17, 18],
      iconName: "Briefcase",
    },
    {
      id: "contact",
      number: "06",
      title: "Thông tin liên hệ",
      slides: [19],
      iconName: "PhoneCall",
    },
  ],
};
