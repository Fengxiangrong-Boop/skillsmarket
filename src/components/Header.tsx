'use client';

import Link from 'next/link';
import { Menu, X, Terminal, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 监听滚动添加背景效果
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'glass-card-strong shadow-soft-lg'
          : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
              <div className="relative p-2 bg-gradient-to-br from-primary to-primary-dark rounded-xl shadow-glow">
                <Terminal className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                SkillsMP
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 -mt-1">
                ~/marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/">首页</NavLink>
            <NavLink href="/categories">分类浏览</NavLink>

            {/* 状态指示器 */}
            <div className="flex items-center space-x-2 px-4 py-2 ml-2">
              <div className="relative">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow" />
                <div className="absolute inset-0 w-2 h-2 bg-success rounded-full animate-ping" />
              </div>
              <span className="text-xs font-mono text-success">online</span>
            </div>

            {/* 主题切换 */}
            <div className="ml-2 pl-4 border-l border-slate-200 dark:border-slate-700">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="切换菜单"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              ) : (
                <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${mobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
            }`}
        >
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-1">
            <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
              首页
            </MobileNavLink>
            <MobileNavLink href="/categories" onClick={() => setMobileMenuOpen(false)}>
              分类浏览
            </MobileNavLink>

            <div className="flex items-center space-x-2 px-4 py-3">
              <div className="relative">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow" />
                <div className="absolute inset-0 w-2 h-2 bg-success rounded-full animate-ping" />
              </div>
              <span className="text-xs font-mono text-success">系统在线</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

// 桌面导航链接
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors cursor-pointer"
    >
      {children}
    </Link>
  );
}

// 移动端导航链接
function MobileNavLink({
  href,
  children,
  onClick
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors cursor-pointer"
    >
      {children}
    </Link>
  );
}
