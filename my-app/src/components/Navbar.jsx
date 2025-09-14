import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/">
          <i className="fas fa-house"></i> Trang chủ
        </Link>
        <Link to="/cart">
          <i className="fas fa-shopping-cart"></i> Giỏ hàng
        </Link>
        <Link to="/favorites">
          <i className="fas fa-heart"></i> Yêu thích
        </Link>
        <Link to="/schedule">
          <i className="fas fa-calendar"></i> Lịch ra mắt
        </Link>
        <Link to="/orders">
          <i className="fas fa-history"></i> Lịch sử mua hàng
        </Link>

        {/* Nút bật/tắt sáng tối */}
        <ThemeToggle />
      </div>

      {/* Nếu đã đăng nhập */}
      {user ? (
        <div className="user-info">
          <i className="fas fa-user"></i> <span>{user}</span>
          <button
            onClick={logout}
            style={{
              marginLeft: '10px',
              background: 'transparent',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer'
            }}
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        <div className="auth-links">
          <Link to="/login">
            <i className="fas fa-user"></i> Đăng nhập
          </Link>
          <Link to="/register">Đăng ký</Link>
        </div>
      )}
    </div>
  );
}
