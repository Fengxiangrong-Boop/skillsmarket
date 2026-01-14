'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 检查系统偏好或本地存储
    const isDark = localStorage.getItem('darkMode') === 'true' ||
      (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  // 避免 hydration 不匹配
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="
        relative p-2.5 rounded-xl
        bg-slate-100 dark:bg-slate-800
        hover:bg-slate-200 dark:hover:bg-slate-700
        text-slate-600 dark:text-slate-400
        hover:text-primary dark:hover:text-primary-light
        transition-all duration-300
        cursor-pointer
        group
      "
      aria-label={darkMode ? '切换到浅色模式' : '切换到深色模式'}
    >
      {/* 图标容器 */}
      <div className="relative w-5 h-5 overflow-hidden">
        {/* 太阳图标 */}
        <Sun
          className={`
            absolute inset-0 w-5 h-5
            transition-all duration-300 ease-out
            ${darkMode
              ? 'opacity-0 rotate-90 scale-0'
              : 'opacity-100 rotate-0 scale-100'
            }
          `}
        />
        {/* 月亮图标 */}
        <Moon
          className={`
            absolute inset-0 w-5 h-5
            transition-all duration-300 ease-out
            ${darkMode
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0'
            }
          `}
        />
      </div>

      {/* 悬浮提示 */}
      <span className="
        absolute -bottom-10 left-1/2 -translate-x-1/2
        px-2 py-1 text-xs font-medium
        bg-slate-900 dark:bg-slate-700 
        text-white
        rounded-lg
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200
        pointer-events-none
        whitespace-nowrap
      ">
        {darkMode ? '浅色模式' : '深色模式'}
      </span>
    </button>
  );
}
