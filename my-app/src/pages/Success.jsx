import React from 'react';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="success-content">
      <h2>Thanh toán thành công!</h2>
      <p>Cảm ơn bạn đã mua truyện. Bạn có thể đọc truyện trong phần "Yêu thích" hoặc quay lại trang chủ.</p>
      <Link to="/" className="btn">Về trang chủ</Link>
    </div>
  );
}

