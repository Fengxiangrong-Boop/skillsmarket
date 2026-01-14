'use client';

import Link from 'next/link';
import { Terminal, Github, Twitter, Heart, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-auto">
      {/* 顶部渐变线 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* 品牌区域 */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-br from-primary to-primary-dark rounded-xl shadow-glow">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                  SkillsMP
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Agent技能市场平台，为 Claude Code、Codex 和 ChatGPT 提供强大的技能扩展。
            </p>

            {/* 社交媒体 */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all cursor-pointer"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all cursor-pointer"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-sm font-heading font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              导航
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer">
                  浏览分类
                </Link>
              </li>
              <li>
                <a href="#" className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer">
                  API 文档
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* 资源 */}
          <div>
            <h3 className="text-sm font-heading font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              资源
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer">
                  开发者指南
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer">
                  提交技能
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer">
                  MCP 协议
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* 支持 */}
          <div>
            <h3 className="text-sm font-heading font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              支持
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer">
                  常见问题
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer">
                  联系我们
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer">
                  GitHub Issues
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {currentYear} SkillsMP. 保留所有权利。
            </p>
            <p className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
              用
              <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
              打造 · 开源项目
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              本项目不隶属于 Anthropic 或 OpenAI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
