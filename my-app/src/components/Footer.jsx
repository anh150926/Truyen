import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="about">
          <h3>Về Trang Web Đọc Truyện</h3>
          <p>Chúng tôi cung cấp hàng ngàn truyện tranh và tiểu thuyết chất lượng cao, được cập nhật liên tục mỗi ngày. Trải nghiệm đọc truyện mượt mà, không quảng cáo làm phiền.</p>
        </div>
        <div className="contact-info">
          <h3>Liên hệ</h3>
          <p><i className="fas fa-phone"></i> Số điện thoại: <a href="tel:0123456789">0123 456 789</a></p>
          <p><i className="fas fa-envelope"></i> Email: <a href="mailto:lienhe@doctruyen.vn">lienhe@doctruyen.vn</a></p>
          <p><i className="fas fa-map-marker-alt"></i> Địa chỉ: 123 Đường Truyện, Quận Văn Học, TP. Sách</p>
        </div>
      </div>
      <div className="footer-bottom">© 2025 Trang Web Đọc Truyện. All rights reserved.</div>
    </footer>
  );
}
