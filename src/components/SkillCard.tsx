'use client';

import Link from 'next/link';
import { Skill, formatNumber, formatDate, getCategoryById } from '@/lib/utils';
import { Star, Download, Calendar, ExternalLink, ArrowUpRight } from 'lucide-react';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const category = getCategoryById(skill.category);

  return (
    <div className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <Link
            href={`/skills/${skill.id}`}
            className="block"
          >
            <h3 className="text-lg font-heading font-semibold text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors truncate">
              {skill.name}
            </h3>
          </Link>
          {category && (
            <Link
              href={`/categories/${category.id}`}
              className="inline-flex items-center mt-2 px-2.5 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer"
              style={{
                backgroundColor: `${category.color}15`,
                color: category.color,
              }}
            >
              {category.name}
            </Link>
          )}
        </div>

        {/* 外部链接图标 */}
        <Link
          href={`/skills/${skill.id}`}
          className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
        {skill.description}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5 text-sm">
          <Star className="w-4 h-4 text-amber-500" fill="currentColor" />
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {formatNumber(skill.stars)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <Download className="w-4 h-4 text-primary" />
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {formatNumber(skill.downloads)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(skill.lastUpdate)}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skill.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
          >
            #{tag}
          </span>
        ))}
        {skill.tags.length > 3 && (
          <span className="text-xs text-slate-400 dark:text-slate-500 self-center">
            +{skill.tags.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          by <span className="font-medium text-slate-700 dark:text-slate-300">{skill.author}</span>
        </span>
        <a
          href={skill.repository}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          <span>GitHub</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
