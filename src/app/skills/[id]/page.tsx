import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  getSkillById,
  getCategoryById,
  formatNumber,
  formatDate,
} from '@/lib/utils';
import {
  ArrowLeft,
  Star,
  Download,
  Calendar,
  Github,
  ExternalLink,
  Package,
  User,
  Tag,
} from 'lucide-react';

export default function SkillDetailPage({ params }: { params: { id: string } }) {
  const skill = getSkillById(params.id);

  if (!skill) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-mono text-gray-900 dark:text-white mb-4">
            技能未找到
          </h1>
          <Link
            href="/"
            className="text-primary hover:text-primary-dark font-mono"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const category = getCategoryById(skill.category);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-sm font-mono text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回首页</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold font-mono text-gray-900 dark:text-white mb-2">
              {skill.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-mono">
              {skill.nameEn}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={skill.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-mono"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-2xl font-bold font-mono text-gray-900 dark:text-white mb-4">
              <span className="text-success">$</span> 描述
            </h2>
            <p className="text-gray-700 dark:text-gray-300 font-mono leading-relaxed">
              {skill.description}
            </p>
          </section>

          {/* Installation */}
          <section>
            <h2 className="text-2xl font-bold font-mono text-gray-900 dark:text-white mb-4">
              <span className="text-success">$</span> 安装
            </h2>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 border-2 border-gray-700">
              <pre className="font-mono text-sm text-green-400">
                <span className="text-gray-500"># 使用 npm 安装</span>
                {'\n'}npm install {skill.id}
                {'\n\n'}
                <span className="text-gray-500"># 使用 yarn 安装</span>
                {'\n'}yarn add {skill.id}
              </pre>
            </div>
          </section>

          {/* Usage Example */}
          <section>
            <h2 className="text-2xl font-bold font-mono text-gray-900 dark:text-white mb-4">
              <span className="text-success">$</span> 使用示例
            </h2>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 border-2 border-gray-700">
              <pre className="font-mono text-sm text-green-400">
                {`import { ${skill.name} } from '${skill.id}';

// 初始化技能
const skill = new ${skill.name}();

// 使用技能
await skill.execute();`}
              </pre>
            </div>
          </section>

          {/* Tags */}
          <section>
            <h2 className="text-2xl font-bold font-mono text-gray-900 dark:text-white mb-4">
              <span className="text-success">$</span> 标签
            </h2>
            <div className="flex flex-wrap gap-2">
              {skill.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-mono text-sm"
                >
                  <Tag className="w-3 h-3" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Stats Card */}
            <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
              <h3 className="font-bold font-mono text-gray-900 dark:text-white mb-4">
                统计信息
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                    <span className="font-mono text-sm">星标</span>
                  </div>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">
                    {formatNumber(skill.stars)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Download className="w-4 h-4 text-blue-500" />
                    <span className="font-mono text-sm">下载</span>
                  </div>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">
                    {formatNumber(skill.downloads)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 text-green-500" />
                    <span className="font-mono text-sm">更新</span>
                  </div>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">
                    {formatDate(skill.lastUpdate)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <User className="w-4 h-4 text-orange-500" />
                    <span className="font-mono text-sm">作者</span>
                  </div>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">
                    {skill.author}
                  </span>
                </div>
              </div>
            </div>

            {/* Category Card */}
            {category && (
              <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
                <h3 className="font-bold font-mono text-gray-900 dark:text-white mb-4">
                  分类
                </h3>
                <Link
                  href={`/categories/${category.id}`}
                  className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  style={{ backgroundColor: `${category.color}10` }}
                >
                  <span
                    className="font-mono font-bold"
                    style={{ color: category.color }}
                  >
                    {category.name}
                  </span>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1">
                    {category.description}
                  </p>
                </Link>
              </div>
            )}

            {/* Repository Link */}
            <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
              <h3 className="font-bold font-mono text-gray-900 dark:text-white mb-4">
                资源
              </h3>
              {/* 这是注释 */}
              <a
                href={skill.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors group"
              >
                <div className="flex items-center space-x-2">
                  <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                    源代码
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
