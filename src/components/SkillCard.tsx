'use client';

import Link from 'next/link';
import { Skill, formatNumber, formatDate, getCategoryById } from '@/lib/utils';
import { Star, Download, Calendar, ExternalLink } from 'lucide-react';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const category = getCategoryById(skill.category);

  return (
    <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-5 hover:border-primary dark:hover:border-primary transition-all hover:shadow-lg bg-white dark:bg-gray-800 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <Link
            href={`/skills/${skill.id}`}
            className="text-lg font-bold font-mono text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
          >
            {skill.name}
          </Link>
          {category && (
            <Link
              href={`/categories/${category.id}`}
              className="inline-block mt-1 text-xs font-mono px-2 py-1 rounded"
              style={{
                backgroundColor: `${category.color}15`,
                color: category.color,
              }}
            >
              {category.name}
            </Link>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 font-mono mb-4 line-clamp-2">
        {skill.description}
      </p>

      {/* Stats */}
      <div className="flex items-center space-x-4 mb-3 text-xs font-mono text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
          <span>{formatNumber(skill.stars)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Download className="w-4 h-4 text-blue-500" />
          <span>{formatNumber(skill.downloads)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4 text-green-500" />
          <span>{formatDate(skill.lastUpdate)}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {skill.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
        <span className="text-xs font-mono text-gray-500 dark:text-gray-500">
          by {skill.author}
        </span>
        <a
          href={skill.repository}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-xs font-mono text-primary hover:text-primary-dark transition-colors"
        >
          <span>GitHub</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
