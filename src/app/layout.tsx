import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Skills Marketplace - AI Agent 技能市场',
  description: '为 Claude Code、Codex 和 ChatGPT 提供技能扩展的开源市场平台。浏览超过 50,000+ 个精选技能。',
  keywords: ['skills', 'agent', 'claude', 'codex', 'chatgpt', 'marketplace', 'MCP', 'AI'],
  authors: [{ name: 'SkillsMP Team' }],
  openGraph: {
    title: 'Skills Marketplace - AI Agent 技能市场',
    description: '为 Claude Code、Codex 和 ChatGPT 提供技能扩展的开源市场平台',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* 预加载字体以提高性能 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body min-h-screen flex flex-col antialiased">
        {/* 固定导航栏 */}
        <Header />

        {/* 主内容区域 */}
        <div className="flex-1">
          {children}
        </div>

        {/* 页脚 */}
        <Footer />
      </body>
    </html>
  );
}
