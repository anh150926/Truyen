import React, { createContext, useContext, useEffect, useState } from 'react';
import { getJSON, setJSON } from '../services/storage';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem('loggedInUser');
    if (u) setUser(u);
  }, []);

  const login = (usernameOrEmail, password) => {
    const users = getJSON('users', []);
    const found = users.find(u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password);
    if (!found) throw new Error('Tên đăng nhập/email hoặc mật khẩu không đúng!');
    localStorage.setItem('loggedInUser', found.username);
    setUser(found.username);
    return found.username;
  };

  const register = (username, email, password) => {
    const users = getJSON('users', []);
    if (users.some(u => u.username === username)) throw new Error('Tên đăng nhập đã tồn tại!');
    if (users.some(u => u.email === email)) throw new Error('Email đã được sử dụng!');
    users.push({ username, email, password });
    setJSON('users', users);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
