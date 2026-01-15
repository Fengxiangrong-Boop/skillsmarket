'use client';

import SearchBar from './SearchBar';
import { Sparkles, ArrowRight, Package, Users, Star } from 'lucide-react';

interface HeroProps {
  onSearch?: (query: string) => void;
  totalSkills: number;
}

export default function Hero({ onSearch, totalSkills }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-background-dark">
      {/* 简洁的网格背景 */}
      <div className="absolute inset-0 bg-grid opacity-50 dark:opacity-20" />

      {/* 主内容 */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">

          {/* 标签 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary dark:text-primary-light">
              开源 AI Agent 技能市场
            </span>
          </div>

          {/* 主标题 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            发现适合你的
            <br />
            <span className="text-primary">AI Agent 技能</span>
          </h1>

          {/* 副标题 */}
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            为 Claude Code、ChatGPT、Codex 等 AI Agent 提供丰富的技能扩展。
            浏览、搜索并安装来自开源社区的优质技能。
          </p>

          {/* 搜索框 */}
          {onSearch && (
            <div className="max-w-2xl mx-auto mb-10">
              <SearchBar
                onSearch={onSearch}
                placeholder="搜索技能、工具、MCP Server..."
              />
            </div>
          )}

          {/* 统计数据 */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
              <Package className="w-5 h-5 text-primary" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-900 dark:text-white">{totalSkills.toLocaleString()}</span> 个技能
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
              <Users className="w-5 h-5 text-success" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-900 dark:text-white">1,000+</span> 开发者
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
              <Star className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-900 dark:text-white">50K+</span> Stars
              </span>
            </div>
          </div>

          {/* 快捷入口 */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors cursor-pointer"
            >
              <span>浏览分类</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
