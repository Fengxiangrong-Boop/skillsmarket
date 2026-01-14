'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import CategoryCard from '@/components/CategoryCard';
import SkillCard from '@/components/SkillCard';
import { getCategories, getPopularSkills, getSkills, getSkillCount, Category, Skill } from '@/app/actions';
import { ChevronDown, Loader2, Sparkles, Grid3X3, TrendingUp, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFAQ, setShowFAQ] = useState<number | null>(null);

  // 数据状态
  const [categories, setCategories] = useState<Category[]>([]);
  const [popularSkills, setPopularSkills] = useState<Skill[]>([]);
  const [searchResults, setSearchResults] = useState<Skill[]>([]);
  const [totalSkills, setTotalSkills] = useState(0);
  const [loading, setLoading] = useState(false);

  // 加载初始数据
  useEffect(() => {
    async function initData() {
      const [cats, popular, count] = await Promise.all([
        getCategories(),
        getPopularSkills(6),
        getSkillCount()
      ]);
      setCategories(cats);
      setPopularSkills(popular);
      setTotalSkills(count);
    }
    initData();
  }, []);

  // 搜索处理
  useEffect(() => {
    async function doSearch() {
      if (!searchQuery) {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await getSkills({ query: searchQuery, limit: 50 });
        setSearchResults(res.skills);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(doSearch, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const faqs = [
    {
      question: '什么是技能市场？',
      answer: 'SkillsMP (技能市场) 是一个开源平台，汇集了为AI Agent（如Claude Code、ChatGPT等）设计的各种技能扩展。我们通过自动化爬虫，实时收录来自 GitHub 的最新 50,000+ 个技能资源。',
    },
    {
      question: '技能数据来源哪里？',
      answer: '所有技能均通过自动化系统从 GitHub、NPM 和 Model Context Protocol Registry 抓取，确保您获取的是最新、最全的资源。',
    },
    {
      question: '如何安装技能？',
      answer: '大多数技能可以通过npm或GitHub直接安装。每个技能页面都包含详细的安装说明和使用文档。',
    },
    {
      question: '这些技能是免费的吗？',
      answer: '是的，绝大多数技能都是开源的。请注意查看每个项目的 License 协议。',
    },
  ];

  return (
    <main className="relative">
      {/* Hero Section */}
      <Hero onSearch={setSearchQuery} totalSkills={totalSkills} />

      {/* 主内容区域 */}
      <div className="relative bg-background-light dark:bg-background-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

          {/* 搜索结果 */}
          {searchQuery && (
            <section className="mb-20 animate-fade-in">
              <div className="flex items-center gap-3 mb-8">
                <h2 className="section-title">
                  搜索结果
                  {loading ? (
                    <Loader2 className="w-5 h-5 ml-2 animate-spin text-primary" />
                  ) : (
                    <span className="text-slate-400 font-normal text-lg ml-2">
                      ({searchResults.length})
                    </span>
                  )}
                </h2>
              </div>

              {!loading && searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((skill, index) => (
                    <div
                      key={skill.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <SkillCard skill={skill as any} />
                    </div>
                  ))}
                </div>
              ) : !loading && (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                    <HelpCircle className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-400">
                    未找到包含 "<span className="font-semibold text-primary">{searchQuery}</span>" 的技能
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    试试其他关键词？
                  </p>
                </div>
              )}
            </section>
          )}

          {/* 非搜索状态显示的内容 */}
          {!searchQuery && (
            <>
              {/* 分类浏览 */}
              <section className="mb-20">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <Grid3X3 className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="section-title">浏览分类</h2>
                  </div>
                  <Link
                    href="/categories"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors cursor-pointer"
                  >
                    <span>查看全部</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categories.slice(0, 8).map((category, index) => (
                    <div
                      key={category.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <CategoryCard category={category as any} />
                    </div>
                  ))}
                </div>
              </section>

              {/* 热门技能 */}
              <section className="mb-20">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-accent/10">
                      <TrendingUp className="w-5 h-5 text-accent" />
                    </div>
                    <h2 className="section-title">热门技能</h2>
                    <span className="px-3 py-1 text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full">
                      Top Starred
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularSkills.map((skill, index) => (
                    <div
                      key={skill.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <SkillCard skill={skill as any} />
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ 部分 */}
              <section className="mb-20">
                <div className="flex items-center gap-3 mb-8 justify-center">
                  <div className="p-2 rounded-xl bg-success/10">
                    <HelpCircle className="w-5 h-5 text-success" />
                  </div>
                  <h2 className="section-title">常见问题</h2>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className={`
                        modern-card overflow-hidden
                        ${showFAQ === index ? 'ring-2 ring-primary/20' : ''}
                      `}
                    >
                      <button
                        onClick={() => setShowFAQ(showFAQ === index ? null : index)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                      >
                        <span className="font-heading font-semibold text-slate-900 dark:text-white pr-4">
                          {faq.question}
                        </span>
                        <div className={`
                          p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 
                          transition-all duration-300
                          ${showFAQ === index ? 'bg-primary/10 rotate-180' : ''}
                        `}>
                          <ChevronDown className={`
                            w-4 h-4 transition-colors
                            ${showFAQ === index ? 'text-primary' : 'text-slate-400'}
                          `} />
                        </div>
                      </button>

                      <div className={`
                        overflow-hidden transition-all duration-300 ease-out
                        ${showFAQ === index ? 'max-h-48' : 'max-h-0'}
                      `}>
                        <div className="px-5 pb-5">
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA 区域 */}
              <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-primary-800 p-8 md:p-12 lg:p-16 text-center">
                {/* 背景装饰 */}
                <div className="absolute inset-0 bg-grid opacity-10" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span className="text-sm font-medium text-white/90">开源 & 免费</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                    开始探索 AI 技能
                  </h2>
                  <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                    浏览超过 {totalSkills.toLocaleString()} 个精选技能，为你的 AI Agent 添加强大能力
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/categories"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-dark font-semibold rounded-xl hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                    >
                      <span>浏览全部技能</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      <span>Star on GitHub</span>
                    </a>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
