# Supabase GitHub OAuth 设置指南

## 1. 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目或选择现有项目
3. 在项目设置中找到 API 配置

## 2. 配置 GitHub OAuth 应用

1. 访问 [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/applications/new)
2. 创建新的 OAuth 应用：
   - **Application name**: Nano Banana AI
   - **Homepage URL**: `http://localhost:3000` (开发环境)
   - **Authorization callback URL**: `http://localhost:3000/auth/callback` (开发环境)
3. 创建后获得 **Client ID** 和 **Client Secret**

## 3. 在 Supabase 中配置 GitHub 认证

1. 在 Supabase Dashboard 中：
   - 进入 **Authentication** > **Providers**
   - 启用 **GitHub** 提供者
   - 填入 GitHub OAuth 应用的 **Client ID** 和 **Client Secret**
   - 设置 **Redirect URL**: `http://localhost:3000/auth/callback`

## 4. 环境变量配置

复制 `.env.local.example` 到 `.env.local` 并填入以下变量：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# 其他现有配置保持不变
GEMINI_API_KEY=your_gemini_api_key
DOUBAO_API_KEY=your_doubao_api_key
```

## 5. 获取 Supabase 密钥

在 Supabase Dashboard > Settings > API 中找到：
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

## 6. 启动应用

```bash
npm run dev
```

## 7. 测试 GitHub 登录

1. 访问 `http://localhost:3000`
2. 点击 "Sign in with GitHub" 按钮
3. 授权 GitHub OAuth 应用
4. 登录成功后会显示用户信息和登出按钮

## 生产环境配置

对于生产环境，需要更新以下 URL：

- GitHub OAuth 应用中的 **Homepage URL** 和 **Authorization callback URL**
- Supabase GitHub 认证设置中的 **Redirect URL**
- 环境变量中的 Supabase URL

## 功能特性

- ✅ GitHub OAuth 登录
- ✅ 用户状态管理
- ✅ 自动会话恢复
- ✅ 登出功能
- ✅ 用户头像和用户名显示
- ✅ 响应式设计
- ✅ 错误处理和加载状态

## API 路由

- `/api/auth/github` - GitHub 登录入口
- `/auth/callback` - OAuth 回调处理
- `/api/auth/logout` - 登出处理