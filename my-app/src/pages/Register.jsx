import React from 'react';
import { useAuth } from '../context/AuthContext';
import { isValidEmail } from '../utils/validators';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    if (!isValidEmail(email)) return alert('Email không hợp lệ!');
    if (password.length < 6) return alert('Mật khẩu phải có ít nhất 6 ký tự!');
    try {
      register(username, email, password);
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      nav('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="modal-content">
      <h2>Đăng ký</h2>
      <form id="registerForm" onSubmit={onSubmit}>
        <input name="username" placeholder="Tên đăng nhập" required />
        <input name="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Mật khẩu" required />
        <button type="submit">Đăng ký</button>
      </form>
      <p>Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
    </div>
  );
}
