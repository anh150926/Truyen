// src/context/ThemeContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

// Tạo context
const ThemeContext = createContext();

// Custom hook để dùng ở component khác
export const useTheme = () => useContext(ThemeContext);

// Provider bao bọc toàn app
export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', mode === 'dark');
    localStorage.setItem('theme', mode);
  }, [mode]);

  const toggle = () => setMode(m => (m === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

