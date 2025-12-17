# API Service Web

基于 Next.js + TypeScript + Ant Design 构建的现代化 Web 应用。

## 技术栈

- **Next.js 16** - React 框架，支持 SSR 和 SSG
- **TypeScript** - 类型安全的 JavaScript
- **Ant Design** - 企业级 UI 组件库
- **Sass/SCSS** - CSS 预处理器
- **Tailwind CSS** - 实用优先的 CSS 框架

## 项目结构

```
src/
├── app/              # Next.js App Router 目录
│   ├── layout.tsx    # 根布局
│   └── page.tsx      # 首页
├── components/       # 组件目录
│   ├── common/       # 通用组件
│   ├── layout/       # 布局组件
│   └── forms/        # 表单组件
├── styles/           # 样式文件
│   ├── base/         # 基础样式
│   ├── components/   # 组件样式
│   ├── utils/        # Sass 工具（变量、mixins、函数）
│   ├── main.scss     # 主样式文件
│   └── index.scss    # 样式入口文件
├── hooks/            # 自定义 Hooks
├── utils/            # 工具函数
├── services/         # API 服务
├── types/            # TypeScript 类型定义
├── constants/        # 常量配置
└── lib/              # 第三方库配置
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 配置环境变量

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 功能特性

- ✅ Next.js App Router
- ✅ TypeScript 类型支持
- ✅ Ant Design 组件库
- ✅ Sass/SCSS 样式预处理
- ✅ 完整的目录结构
- ✅ API 服务封装
- ✅ 工具函数库
- ✅ 自定义 Hooks
- ✅ 响应式布局

## 开发指南

### 添加新组件

在 `src/components/` 目录下创建组件文件，建议按功能分类：

```typescript
// src/components/common/MyComponent.tsx
"use client";

import { ComponentProps } from "./types";

export default function MyComponent(props: ComponentProps) {
  // 组件实现
}
```

### 使用 API 服务

```typescript
import { get, post } from "@/services/api";

// GET 请求
const data = await get<User[]>("/api/users");

// POST 请求
const result = await post("/api/users", { name: "John" });
```

### 使用自定义 Hooks

```typescript
import { useLocalStorage } from "@/hooks";

function MyComponent() {
  const [value, setValue] = useLocalStorage("key", "default");
  // ...
}
```

### 使用 Sass/SCSS

项目已配置 Sass，可以直接使用 `.scss` 或 `.sass` 文件。

#### 在组件中导入样式

```typescript
// 方式 1: 导入主样式文件（已全局导入）
import "@/styles/main.scss";

// 方式 2: 导入特定组件样式
import "@/styles/components/button.scss";

// 方式 3: 组件级样式文件
import styles from "./MyComponent.module.scss";
```

#### 使用 Sass 变量和 Mixins

```scss
// MyComponent.module.scss
@import "@/styles/utils/variables";
@import "@/styles/utils/mixins";

.my-component {
  padding: $spacing-md;
  background-color: $bg-color;
  
  // 使用 mixin
  @include flex-center();
  @include respond-to(md) {
    padding: $spacing-lg;
  }
  
  // 嵌套
  &__title {
    font-size: $font-size-xl;
    color: $text-color;
  }
}
```

#### Sass 文件结构说明

- `styles/utils/_variables.scss` - 全局变量（颜色、间距、字体等）
- `styles/utils/_mixins.scss` - 可复用的 Mixins（响应式、布局等）
- `styles/utils/_functions.scss` - Sass 函数
- `styles/base/_reset.scss` - 样式重置
- `styles/components/` - 组件样式
- `styles/main.scss` - 主样式文件（已在 layout.tsx 中导入）
## 路由拦截（基础） 🔒

本项目增加了一个基于 Next.js Middleware 的基础路由拦截（见 `/middleware.ts`）。工作方式如下：

- 中间件会检查请求中是否存在 `token` Cookie（`req.cookies.get('token')`）。
- 对于未携带 `token` 的受保护页面，将会被重定向到 `/login`，并带上 `from` 查询参数用于登录后跳回。
- 中间件会放行静态资源、`/_next`、`/api`、`/login` 等公共路径。

如何测试：

1. 启动开发服务器：

```bash
npm run dev
```

2. 在浏览器打开某个受保护页面（例如 `/user/users`），如果没有 `token` Cookie，页面应被重定向到 `/login`。

3. 设置一个 `token` Cookie（例如通过浏览器控制台或后端登录接口），再次访问受保护页面应允许访问。

示例：在当前前端实现中，登录接口返回 `accessToken` 后前端会把 token 保存到 `localStorage`（用于 UI）并**同时**写入一个普通 Cookie：

```js
// 示例（客户端）：
localStorage.setItem('token', accessToken);
// 简单的 cookie 写入（非 HttpOnly，仅用于开发/演示）
document.cookie = `token=${accessToken}; path=/`;
```

生产建议：后端登录接口直接返回并设置 `Set-Cookie: token=...; HttpOnly; Path=/; Secure; SameSite=Strict`，让浏览器自动携带 HttpOnly cookie（更安全）。

> 提示：中间件路径为 `matcher: ["/((?!_next|api|login|favicon.ico).*)"]`，如果你需要更细粒度的规则，请修改 `/middleware.ts` 中的 `matcher` 或逻辑。
## 更多资源

- [Next.js 文档](https://nextjs.org/docs)
- [Ant Design 文档](https://ant.design/docs/react/introduce-cn)
- [Sass 文档](https://sass-lang.com/documentation)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
