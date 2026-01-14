'use client';

import SearchBar from './SearchBar';
import { Terminal, Sparkles, ArrowRight, Zap, Code2, Box } from 'lucide-react';

interface HeroProps {
  onSearch?: (query: string) => void;
  totalSkills: number;
}

export default function Hero({ onSearch, totalSkills }: HeroProps) {
  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-background-dark dark:via-slate-900 dark:to-primary-900/20" />

      {/* 网格背景 */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* 渐变光晕 */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 dark:bg-accent/5 rounded-full blur-3xl" />

      {/* 浮动装饰元素 */}
      <div className="absolute top-20 right-10 animate-float hidden lg:block">
        <div className="p-3 glass-card rounded-2xl">
          <Code2 className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-32 left-10 animate-float hidden lg:block" style={{ animationDelay: '1s' }}>
        <div className="p-3 glass-card rounded-2xl">
          <Box className="w-6 h-6 text-accent" />
        </div>
      </div>
      <div className="absolute top-1/2 right-20 animate-float hidden xl:block" style={{ animationDelay: '2s' }}>
        <div className="p-3 glass-card rounded-2xl">
          <Zap className="w-6 h-6 text-success" />
        </div>
      </div>

      {/* 主内容 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* 徽章 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary dark:text-primary-light">
              AI Agent 技能扩展中心
            </span>
          </div>

          {/* 主标题 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-slate-900 dark:text-white mb-6 animate-fade-in-up">
            Agent Skills
            <br />
            <span className="gradient-text">Marketplace</span>
          </h1>

          {/* 副标题 */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-4 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            为
            <span className="font-semibold text-slate-900 dark:text-white mx-1">Claude Code</span>、
            <span className="font-semibold text-slate-900 dark:text-white mx-1">Codex</span> 和
            <span className="font-semibold text-slate-900 dark:text-white mx-1">ChatGPT</span>
            提供强大的技能扩展
          </p>

          {/* 统计数据 */}
          <div className="flex items-center justify-center gap-6 mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-success rounded-full" />
                <div className="absolute inset-0 w-2.5 h-2.5 bg-success rounded-full animate-ping" />
              </div>
              <span className="text-sm font-mono text-slate-600 dark:text-slate-400">
                <span className="font-bold text-success text-lg">{totalSkills.toLocaleString()}</span>
                <span className="ml-1">个可用技能</span>
              </span>
            </div>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <div className="text-sm font-mono text-slate-600 dark:text-slate-400">
              实时更新
            </div>
          </div>

          {/* 搜索框 */}
          {onSearch && (
            <div className="max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <SearchBar
                onSearch={onSearch}
                placeholder="搜索技能、工具、MCP Server..."
              />
            </div>
          )}

          {/* 终端提示 */}
          <div className="max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="terminal-block">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="ml-2 text-xs text-slate-500">terminal</span>
              </div>
              <div className="terminal-body">
                <div className="flex items-start gap-2">
                  <span className="text-success flex-shrink-0">$</span>
                  <div className="flex-1">
                    <span className="text-slate-300">
                      npm install <span className="text-primary-light">skills-marketplace</span>
                    </span>
                    <div className="mt-2 text-slate-500 text-xs">
                      # 快速安装 CLI 工具，一键获取任何技能
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 快捷入口 */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <a href="/categories" className="btn-primary inline-flex items-center gap-2 cursor-pointer">
              <span>浏览全部技能</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* 底部渐变 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent" />
    </div>
  );
}
