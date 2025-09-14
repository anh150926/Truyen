import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    const u = e.target.username.value.trim();
    const p = e.target.password.value.trim();
    try {
      login(u, p);
      nav('/');
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="modal-content">
      <h2>Đăng nhập</h2>
      <form id="loginForm" onSubmit={onSubmit}>
        <input name="username" placeholder="Tên đăng nhập hoặc email" required />
        <input name="password" type="password" placeholder="Mật khẩu" required />
        <button type="submit">Đăng nhập</button>
      </form>
      <p>Chưa có tài khoản? <a href="/register">Đăng ký</a></p>
    </div>
  );
}
