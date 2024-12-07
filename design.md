# 项目设计文档

## 项目结构 
.
├── src/
│ ├── app/
│ │ ├── fonts/ # 字体文件
│ │ ├── page.tsx # 首页
│ │ ├── layout.tsx # 根布局
│ │ └── globals.css # 全局样式
│ ├── components/ # 组件目录
│ └── pages/ # 页面目录
├── public/ # 静态资源
└── [配置文件]
```

## 技术栈

- **框架**: Next.js 15.0.4
- **运行时**: React 19
- **开发语言**: TypeScript
- **样式方案**: Tailwind CSS
- **代码规范**: ESLint
- **构建工具**: PostCSS

## 关键配置

### 1. TypeScript 配置
- 严格模式开启
- 模块解析使用 bundler
- 配置了路径别名 @/* -> src/*

### 2. 样式配置
- 使用 Tailwind CSS
- 支持深色模式
- 自定义颜色变量:
  - --background
  - --foreground

### 3. 字体配置
- 使用 Geist 字体
- 支持可变字重(100-900)
- 包含 Sans 和 Mono 两种字体

### 4. 项目规范
- ESLint: next/core-web-vitals
- TypeScript 严格检查
- 文件命名采用 kebab-case
- 组件采用 PascalCase

## 开发指南

### 本地开发
```bash
npm run dev     # 开发服务器
npm run build   # 构建
npm run start   # 生产环境运行
npm run lint    # 代码检查
```

### 目录说明
- `src/app`: App Router 页面
- `src/components`: 可复用组件
- `public`: 静态资源
- `src/app/fonts`: 字体文件

### 样式开发
- 优先使用 Tailwind 类名
- 全局样式在 globals.css 中定义
- 支持深色模式适配

### 部署
- 推荐使用 Vercel 部署
- 支持自动化部署
- 环境变量通过 .env 文件配置