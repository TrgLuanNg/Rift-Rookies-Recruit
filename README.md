# Rift Rookies - Web Slides & Tuyển Dụng Mùa 03 🎮

Trang web trình chiếu Booklet & Mô tả công việc (JD) tuyển dụng Season 03 của dự án phi lợi nhuận **Rift Rookies (Liên Minh Huyền Thoại)**, tích hợp đơn ứng tuyển Google Form trực tiếp trên thanh công cụ bên hông (Sidebar).

---

## 🌟 Tính Năng Nổi Bật

1. **Hiển thị Slide siêu nét & tải siêu nhanh**:
   - 19 slide định dạng 16:9 được tối ưu hóa sang WebP sắc nét (3000x1688 Retina), tổng dung lượng chỉ ~4MB (so với 44.9MB của file gốc), giúp tải trang trong nháy mắt kể cả trên mạng 3G/4G di động.
2. **2 Chế độ xem linh hoạt**:
   - **Cuộn Dọc (Continuous Scroll)**: Cuộn mượt mà như đọc booklet/landing page, tự động nhận diện trang đang đọc để làm nổi bật mục lục.
   - **Trình Chiếu (Presentation Deck)**: Chế độ chiếu từng slide tập trung (Canva / PowerPoint style), hỗ trợ phím mũi tên `←` `→`, phím cách `Space`, vuốt chạm (swipe) trên điện thoại và khay thu nhỏ (thumbnails).
3. **Sidebar Tuyển Dụng & Tích Hợp Google Form**:
   - Nút **"ỨNG TUYỂN NGAY"** nổi bật.
   - Tùy chọn **"Mở Form trên trang"**: Cho phép mở Google Form trong thanh trượt (slide-over modal) ngay cạnh slide để ứng viên vừa đọc yêu cầu JD vừa điền đơn mà không cần chuyển tab!
   - Nút nhảy nhanh vào từng Ban tuyển dụng: **Ban Đối ngoại**, **Ban Truyền thông**, **Ban Chuyên môn**, **Ban Nhân sự**, **Ban Thiết kế**.
   - Mục lục 6 phần tương tác trực tiếp.
   - Nút gọi hotline Co-founders (Phạm Quỳnh Trang & Nguyễn Phương Linh), link Fanpage Facebook và nút copy email.
   - Nút tải PDF gốc chất lượng cao (`/rift-rookies-booklet.pdf`).

---

## 🚀 Hướng Dẫn Chạy Cục Bộ (Local Development)

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Khởi động môi trường phát triển
```bash
npm run dev
```
Trình duyệt sẽ mở tại `http://localhost:3000`.

### 3. Build kiểm tra sản phẩm
```bash
npm run build
npm run preview
```

---

## ⚙️ Hướng Dẫn Cấu Hình Google Form & Thông Tin

Mở file [`src/config.ts`](file:///C:/Stuffs/Rift%20Rookies%20Helping/src/config.ts) để chỉnh sửa:
- `coreFormUrl`: Link Google Form ứng tuyển Core Member.
- `memberFormUrl`: Link Google Form ứng tuyển Thành viên thường.
- `facebookUrl`: Link Fanpage Facebook.
- `email`: Email liên hệ của dự án.
- `contacts`: Tên và số điện thoại hotline các Co-Founders.

---

## 📦 Hướng Dẫn Đẩy Lên GitHub & Host Lên Netlify

### 1. Đẩy code lên GitHub
Repository của bạn đã được kết nối sẵn:
```bash
git commit -m "feat: minimalist web slides with dual recruitment forms"
git push -u origin main
```

3. **Deploy lên Netlify**:
   - Truy cập [app.netlify.com](https://app.netlify.com/) và đăng nhập (bằng tài khoản GitHub).
   - Chọn **"Add new site"** -> **"Import an existing project"** -> Chọn **GitHub**.
   - Chọn repository `rift-rookies-web`.
   - Netlify sẽ tự động nhận diện cấu hình từ file `netlify.toml`:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Bấm **"Deploy site"**. Trong vòng 1 phút, trang web của bạn sẽ hoạt động trực tuyến với tên miền miễn phí dạng `ten-cua-ban.netlify.app` (có SSL HTTPS tự động)!

### Cách 2: Deploy trực tiếp bằng Netlify CLI (Không cần qua GitHub)
```bash
npx netlify deploy --prod
```
Làm theo hướng dẫn trên màn hình terminal để đăng nhập và hoàn tất deploy.
