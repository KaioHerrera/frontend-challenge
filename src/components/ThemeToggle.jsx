import { useEffect, useState } from 'react';
import { LightMode, DarkMode } from '@mui/icons-material';
import './ThemeToggle.css';

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('dark-mode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <button
      className='theme-toggle-button'
      onClick={() => setDarkMode((prev) => !prev)}
    >
      {darkMode ? (
        <LightMode sx={{ fontSize: 50 }} />
      ) : (
        <DarkMode sx={{ fontSize: 50 }} />
      )}
    </button>
  );
}
