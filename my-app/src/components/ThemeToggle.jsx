import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { mode, toggle } = useTheme();

  return (
    <button
      id="theme-toggle"
      className="theme-toggle-btn"
      title="Chuyển chế độ sáng/tối"
      onClick={toggle}
      style={{
        marginLeft: '10px',
        background: 'transparent',
        border: 'none',
        color: 'inherit',
        cursor: 'pointer',
        fontSize: '18px'
      }}
    >
      <i className={mode === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
    </button>
  );
}
