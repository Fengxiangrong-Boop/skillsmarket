# Skills Marketplace - 技能市场平台

一个技能市场网站，为AI Agent（Claude Code、Codex、ChatGPT等）提供技能扩展。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **数据库**: PostgreSQL (Prisma ORM)
- **图标**: Lucide React
- **字体**: Poppins + Open Sans

## 功能特性

- ✅ 简洁专业的现代化UI设计
- ✅ 深色/浅色模式切换
- ✅ 响应式设计（移动端、平板、桌面）
- ✅ 15个技能分类
- ✅ 108个真实GitHub技能数据
- ✅ 实时搜索功能
- ✅ 分类浏览系统
- ✅ 技能详情页面
- ✅ 多种排序方式（星标、下载量、更新时间、名称）
- ✅ FAQ常见问题

## 项目结构

```
skills/
├── src/
│   ├── app/                    # Next.js页面
│   │   ├── layout.tsx          # 根布局
│   │   ├── page.tsx            # 首页
│   │   ├── categories/         # 分类页面
│   │   └── skills/             # 技能详情页
│   ├── components/             # React组件
│   │   ├── Header.tsx          # 导航栏
│   │   ├── Footer.tsx          # 页脚
│   │   ├── Hero.tsx            # Hero区域
│   │   ├── SearchBar.tsx       # 搜索组件
│   │   ├── CategoryCard.tsx    # 分类卡片
│   │   ├── SkillCard.tsx       # 技能卡片
│   │   └── ThemeToggle.tsx     # 主题切换
│   ├── data/                   # 数据文件
│   │   ├── categories.json     # 分类数据
│   │   └── skills.json         # 技能数据
│   └── lib/
│       └── utils.ts            # 工具函数
├── public/                     # 静态资源
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` (如果有) 或确保 `.env` 文件包含正确的数据库连接字符串：

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/skills_marketplace?schema=public"
```

### 3. 启动本地数据库 (Docker)

如果你本地安装了 Docker，可以快速启动 PostgreSQL：

```bash
docker run --name skills-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=skills_marketplace -p 5432:5432 -d postgres:15
```

### 4. 初始化数据库与导入数据

运行 Prisma 推送结构并导入 JSON 种子数据：

```bash
npx prisma db push
npx prisma db seed
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 主要页面

- **首页** (`/`): Hero区域、分类快速导航、热门技能、FAQ
- **分类列表** (`/categories`): 浏览所有技能分类
- **分类详情** (`/categories/[id]`): 查看特定分类下的所有技能
- **技能详情** (`/skills/[id]`): 查看技能的详细信息、安装方法、使用示例

## 数据管理

### 添加新分类

编辑 `src/data/categories.json`：

```json
{
  "id": "your-category",
  "name": "分类名称",
  "nameEn": "Category Name",
  "description": "分类描述",
  "icon": "code",
  "skillCount": 0,
  "color": "#6366f1"
}
```

### 添加新技能

编辑 `src/data/skills.json`：

```json
{
  "id": "your-skill",
  "name": "技能名称",
  "nameEn": "Skill Name",
  "description": "技能描述",
  "category": "dev-tools",
  "author": "作者名",
  "version": "1.0.0",
  "downloads": 0,
  "stars": 0,
  "lastUpdate": "2024-01-01",
  "tags": ["tag1", "tag2"],
  "repository": "https://github.com/..."
}
```

## 自定义配置

### 修改主题色

编辑 `tailwind.config.ts`：

```typescript
colors: {
  primary: {
    DEFAULT: '#6366f1',  // 修改主色调
    dark: '#4f46e5',
  },
  // ...
}
```

### 修改字体

在 `src/app/layout.tsx` 中更改字体导入。

## 开发技巧

### 搜索功能

搜索功能在 `src/lib/utils.ts` 的 `searchSkills` 函数中实现，支持按名称、描述、标签、作者搜索。

### 排序功能

排序功能支持以下方式：
- `stars`: 按星标数排序
- `downloads`: 按下载量排序
- `lastUpdate`: 按更新时间排序
- `name`: 按名称排序

## 设计特点

### 终端/CLI风格
- 使用 monospace 字体
- 命令行提示符样式 (`$`, `~/skillsmp`)
- 深色背景 + 高对比度文本
- 绿色状态指示器 (`●` online)
- 代码块样式的卡片设计

### 颜色方案
- **主色**: #6366f1 (蓝色)
- **成功/在线**: #22c55e (绿色)
- **背景（浅色）**: #f3f4f6
- **背景（深色）**: #111827

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT

