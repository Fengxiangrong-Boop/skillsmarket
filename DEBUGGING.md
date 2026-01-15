# 项目本地开发调试指南

本文档总结了在本地环境启动和调试项目的步骤及常见问题解决方案。

## 1. 快速启动清单

### 步骤 A: 启动 PostgreSQL (Docker)
项目依赖 PostgreSQL 存储技能和分类数据。
```bash
docker run --name skills-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=skills_marketplace \
  -p 5432:5432 -d postgres:15
```

### 步骤 B: 环境配置
确保 `.env` 文件内容如下（这是默认配置）：
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/skills_marketplace?schema=public"
```

### 步骤 C: 初始化与数据导入
```bash
npm install
npx prisma db push
npx prisma db seed
```
*注意：种子脚本已经配置为从 `src/data/*.json` 自动导入数据。*

### 步骤 D: 运行
```bash
npm run dev
```

---

## 2. 常见问题 (Troubleshooting)

### Q: `npx prisma db seed` 报错 `Unknown file extension ".ts"`
**原因**: Node.js 在 ESM 模式下对 TypeScript 的原生支持问题。
**解决**: 使用我们已经配置在 `package.json` 中的命令。它强制通过 CommonJS 模式运行：
```bash
ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```

### Q: 启动后页面显示 0 个技能
**原因**: 数据库尚未导入数据或 Docker 容器未运行。
**检查**:
1. 运行 `docker ps` 查看容器是否在运行。
2. 运行 `npx prisma studio` 查看数据库中是否有数据。

### Q: 端口冲突 (5432)
**解决**: 如果你本地已经运行了另一个数据库，可以修改 Docker 命令中的映射端口（例如 `-p 5433:5432`），并同步更新 `.env` 中的 `DATABASE_URL`。

### Q: CSS编译错误 `transition-[color,` class does not exist
**原因**: Tailwind CSS 的任意值语法中不能有空格。
**解决**: 检查 `globals.css`，确保 `transition-[...]` 中逗号后没有空格。

### Q: 页面内容空白或闪烁后消失
**原因**: 动画类（如 `stagger-fade-in`）设置了 `opacity: 0`。
**解决**: 已在最新版本中修复，确保使用最新代码并清除缓存：
```bash
rm -rf .next && npm run dev
```

---

## 3. 开发规范
- **代码规范**: 使用 `npm run lint` 进行代码检查。
- **数据库变更**: 修改 `prisma/schema.prisma` 后，需运行 `npx prisma generate` 更新客户端。
- **清除缓存**: 如遇到奇怪的编译问题，尝试 `rm -rf .next` 后重启。
