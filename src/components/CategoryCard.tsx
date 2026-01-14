'use client';

import Link from 'next/link';
import { Category } from '@/lib/utils';
import * as Icons from 'lucide-react';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  // 动态获取图标组件
  const IconComponent = (Icons[
    category.icon.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('') as keyof typeof Icons
  ] || Icons.Folder) as LucideIcon;

  return (
    <Link href={`/categories/${category.id}`} className="group block cursor-pointer">
      <div className="modern-card p-6 h-full">
        {/* 图标区域 */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="relative p-3 rounded-2xl transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${category.color}15` }}
          >
            {/* 发光效果 */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
              style={{ backgroundColor: `${category.color}30` }}
            />
            <IconComponent
              className="relative w-6 h-6 transition-colors duration-300"
              style={{ color: category.color }}
            />
          </div>

          {/* 箭头指示器 */}
          <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:text-primary group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* 标题 */}
        <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
          {category.name}
        </h3>

        {/* 描述 */}
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 line-clamp-2 leading-relaxed">
          {category.description}
        </p>

        {/* 底部统计 */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center gap-2">
            <span
              className="text-2xl font-heading font-bold"
              style={{ color: category.color }}
            >
              {category.skillCount}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              个技能
            </span>
          </div>

          {/* 进度条样式的装饰 */}
          <div className="flex-1 max-w-[80px] ml-4">
            <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 group-hover:w-full"
                style={{
                  backgroundColor: category.color,
                  width: `${Math.min((category.skillCount / 20) * 100, 100)}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
