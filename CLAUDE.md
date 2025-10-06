# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个 Nano Banana AI 图像编辑器的克隆项目,基于 Next.js 15 构建,使用 shadcn/ui 组件库和 Tailwind CSS,集成了 SAME Runtime 进行增强功能。

## 关键技术栈

- **框架**: Next.js 15.3.2 (App Router)
- **运行时**: Bun (包管理器和运行环境)
- **UI 库**: shadcn/ui + Radix UI
- **样式**: Tailwind CSS + tailwindcss-animate
- **代码规范**: Biome (替代 ESLint/Prettier)
- **特殊依赖**: same-runtime (通过 CDN 注入)

## 开发命令

```bash
# 启动开发服务器 (使用 Turbopack,监听所有网络接口)
bun run dev

# 构建生产版本
bun run build

# 启动生产服务器
bun run start

# 类型检查 + Next.js lint
bun run lint

# 代码格式化 (使用 Biome)
bun run format
```

## 架构特点

### 1. SAME Runtime 集成
- 在 [layout.tsx](src/app/layout.tsx#L30-L33) 中通过 CDN 加载 `same-runtime`
- tsconfig.json 配置 `jsxImportSource: "same-runtime/dist"`
- 支持 same-app.com 预览域名

### 2. API 路由结构
- **生成端点**: [src/app/api/generate/route.ts](src/app/api/generate/route.ts)
  - 接受 `prompt` 和 `image` (base64) 参数
  - 调用 Gemini 2.5 Flash Image Preview 模型
  - 使用环境变量 `GEMINI_API_KEY`
  - 强制动态路由 (`force-dynamic`)

### 3. 客户端水合处理
- [ClientBody.tsx](src/app/ClientBody.tsx) 处理客户端/服务端类名不一致问题
- 在水合后重置 body className,避免扩展插件干扰

### 4. 图片配置
- 支持多个外部图片域名 (Unsplash, SAME Assets)
- 图片优化已禁用 (`unoptimized: true`)

## 代码规范

### Biome 配置要点
- **格式化**: 使用空格缩进,双引号
- **禁用规则**:
  - 无障碍性 (a11y) 规则已全部关闭
  - 未使用变量警告已关闭
  - img 元素检查已关闭
- **范围**: 仅处理 `src/**/*.ts` 和 `src/**/*.tsx`

### 路径别名
- `@/*` 映射到 `./src/*`
- 示例: `import { Button } from "@/components/ui/button"`

## 环境变量

必需的环境变量:
```
GEMINI_API_KEY=your_api_key_here
```

## 组件结构

UI 组件位于 [src/components/ui/](src/components/ui/):
- [button.tsx](src/components/ui/button.tsx)
- [card.tsx](src/components/ui/card.tsx)
- [badge.tsx](src/components/ui/badge.tsx)
- [accordion.tsx](src/components/ui/accordion.tsx)
- [dropdown-menu.tsx](src/components/ui/dropdown-menu.tsx)

所有组件基于 shadcn/ui,使用 `class-variance-authority` 和 `tailwind-merge`。

## 特殊注意事项

1. **开发服务器配置**:
   - 使用 `-H 0.0.0.0` 监听所有网络接口
   - 启用 Turbopack 加速构建

2. **TypeScript 配置**:
   - Target: ES2017
   - 严格模式启用
   - JSX 保留模式 (由 Next.js 处理)

3. **图片处理**:
   - 所有外部图片必须在 [next.config.js](next.config.js#L4-L34) 中配置域名
   - 当前支持: same-assets.com, unsplash.com

4. **API 调用**:
   - 使用代理端点 `breakout.wenwen-ai.com`
   - 所有 API 请求需要 Authorization header
