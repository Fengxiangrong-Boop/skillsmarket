# Skills Marketplace - 技能市场平台

一个技能市场网站，为 AI Agent（Claude Code、Codex、ChatGPT 等）提供技能扩展。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **数据库**: PostgreSQL (Prisma ORM)
- **图标**: Lucide React
- **字体**: Poppins + Open Sans

## 功能特性

- ✅ 简洁专业的现代化 UI 设计
- ✅ 深色/浅色模式切换
- ✅ 响应式设计（移动端、平板、桌面）
- ✅ 15 个技能分类
- ✅ 108 个真实 GitHub 技能数据
- ✅ 实时搜索功能
- ✅ 分类浏览系统
- ✅ 技能详情页面
- ✅ Docker 容器化部署

---

## 🚀 快速开始

### 方式一：Docker 一键部署（推荐）

```bash
# 1. 克隆仓库
git clone https://github.com/Fengxiangrong-Boop/skills-marketplace.git
cd skills-marketplace

# 2. 复制环境变量配置
cp .env.example .env

# 3. 启动服务（数据库 + 应用）
docker-compose up -d

# 4. 初始化数据库并导入数据
docker-compose exec app npx prisma db push
docker-compose exec app npx prisma db seed

# 5. 访问应用
# http://localhost:3000
```

### 方式二：本地开发

```bash
# 1. 安装依赖
npm install

# 2. 复制环境变量
cp .env.example .env

# 3. 启动数据库（需要 Docker）
docker run --name skills-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=skills_marketplace \
  -p 5432:5432 -d postgres:15

# 4. 初始化数据库
npx prisma db push
npx prisma db seed

# 5. 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

---

## 📁 项目结构

```
skills-marketplace/
├── src/
│   ├── app/                    # Next.js 页面
│   ├── components/             # React 组件
│   ├── data/                   # JSON 数据文件
│   └── lib/                    # 工具函数
├── prisma/                     # Prisma 数据库配置
├── docker-compose.yml          # Docker 编排配置
├── Dockerfile                  # Docker 镜像构建
└── .env.example                # 环境变量模板
```

---

## ⚙️ 环境变量

复制 `.env.example` 为 `.env` 并根据需要修改：

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `DATABASE_URL` | PostgreSQL 连接字符串 | `postgresql://postgres:postgres@localhost:5432/skills_marketplace` |
| `GITHUB_TOKEN` | GitHub API Token (可选) | - |

> ⚠️ **注意**: `.env` 文件包含敏感信息，已在 `.gitignore` 中排除，不会提交到仓库。

---

## 🐳 Docker 部署

### 使用 docker-compose（推荐）

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 停止并清除数据
docker-compose down -v
```

### 单独构建镜像

```bash
# 构建镜像
docker build -t skills-marketplace .

# 运行容器
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  skills-marketplace
```

---

## 📝 数据管理

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
  "description": "技能描述",
  "category": "dev-tools",
  "author": "作者名",
  "tags": ["tag1", "tag2"],
  "repository": "https://github.com/..."
}
```

重新导入数据：
```bash
npx prisma db seed
```

---

## 🔧 开发命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint

# 数据库管理
npx prisma studio    # 打开数据库 GUI
npx prisma db push   # 同步 schema
npx prisma db seed   # 导入种子数据
```

---

## 📄 许可证

MIT

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
