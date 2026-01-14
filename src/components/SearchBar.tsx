'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Command, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = '搜索技能...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 键盘快捷键 Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && isFocused) {
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFocused]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsLoading(true);
      onSearch(query.trim());
      // 模拟加载状态
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`
          relative flex items-center w-full
          bg-white dark:bg-slate-800/50
          border-2 rounded-2xl
          transition-all duration-300 ease-out
          ${isFocused
            ? 'border-primary shadow-glow'
            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          }
        `}
      >
        {/* 搜索图标 */}
        <div className="flex items-center justify-center w-14 h-14 flex-shrink-0">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          ) : (
            <Search
              className={`w-5 h-5 transition-colors duration-200 ${isFocused ? 'text-primary' : 'text-slate-400'
                }`}
            />
          )}
        </div>

        {/* 输入框 */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="
            flex-1 h-14 pr-4
            bg-transparent
            text-slate-900 dark:text-white
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            font-medium
            focus:outline-none
          "
        />

        {/* 键盘快捷键提示 */}
        <div className="hidden sm:flex items-center gap-1 mr-4 flex-shrink-0">
          <kbd className="
            inline-flex items-center gap-1 px-2 py-1
            text-xs font-mono
            bg-slate-100 dark:bg-slate-700
            text-slate-500 dark:text-slate-400
            border border-slate-200 dark:border-slate-600
            rounded-lg
          ">
            <Command className="w-3 h-3" />
            <span>K</span>
          </kbd>
        </div>

        {/* 搜索按钮 */}
        {query && (
          <button
            type="submit"
            className="
              mr-2 px-4 py-2
              bg-primary hover:bg-primary-dark
              text-white text-sm font-medium
              rounded-xl
              transition-colors duration-200
              cursor-pointer
            "
          >
            搜索
          </button>
        )}
      </div>

      {/* 搜索提示 */}
      {isFocused && !query && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 animate-fade-in">
          <span className="text-xs text-slate-500 dark:text-slate-400">热门搜索:</span>
          {['MCP Server', 'Claude', 'API', 'Database', 'AI'].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setQuery(term);
                onSearch(term);
              }}
              className="
                px-3 py-1 text-xs font-medium
                bg-slate-100 dark:bg-slate-800
                text-slate-600 dark:text-slate-400
                hover:bg-primary/10 hover:text-primary
                dark:hover:bg-primary/20 dark:hover:text-primary-light
                rounded-full
                transition-colors duration-200
                cursor-pointer
              "
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}
