# Supabase Google OAuth 配置指南

## 前提条件

1. 已有 Supabase 项目
2. 已有 Google Cloud Console 项目

## 配置步骤

### 1. 在 Google Cloud Console 中设置 OAuth

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 选择你的项目
3. 导航到 "APIs & Services" > "Credentials"
4. 点击 "Create Credentials" > "OAuth client ID"
5. 选择 "Web application"
6. 添加以下重定向 URI：
   ```
   https://jiufkznqpiqtrcwkloka.supabase.co/auth/v1/callback
   ```
7. 记录 Client ID 和 Client Secret

### 2. 在 Supabase 中配置 Google Provider

1. 访问 [Supabase Dashboard](https://app.supabase.com/)
2. 选择你的项目：`jiufkznqpiqtrcwkloka`
3. 导航到 "Authentication" > "Providers"
4. 找到 "Google" 并启用它
5. 输入从 Google Cloud Console 获取的：
   - Client ID
   - Client Secret
6. 保存配置

### 3. 配置重定向 URL

在 Supabase Dashboard 的 "Authentication" > "URL Configuration" 中，确保添加：

```
http://localhost:3002/auth/callback
```

（开发环境使用 localhost:3002，生产环境使用你的域名）

## 测试登录

1. 启动开发服务器：
   ```bash
   bun run dev
   ```

2. 访问测试页面：
   ```
   http://localhost:3002/test-google-auth
   ```

3. 点击 "Sign in with Google" 按钮

4. 完成Google OAuth流程

## 功能特性

✅ **服务器端认证**：使用 Supabase SSR 包
✅ **安全流程**：PKCE 流程，支持 refresh token
✅ **用户状态管理**：React Hook 管理认证状态
✅ **UI 组件**：预构建的 Google 登录按钮
✅ **回调处理**：自动处理 OAuth 回调
✅ **错误处理**：完整的错误处理和用户反馈

## 文件结构

```
src/
├── lib/supabase/
│   ├── server.ts      # 服务器端客户端配置
│   └── client.ts      # 客户端配置
├── components/auth/
│   ├── SimpleGoogleButton.tsx
│   └── SimpleGitHubButton.tsx
├── hooks/
│   └── use-auth.ts    # 认证状态 Hook
├── app/
│   ├── api/auth/
│   │   └── google/    # Google OAuth API 路由
│   └── auth/
│       └── callback/  # OAuth 回调处理
└── middleware.ts      # 认证中间件
```

## 故障排除

### 常见错误

1. **"redirect_uri_mismatch"**
   - 检查 Google Cloud Console 中的重定向 URI
   - 确保包含 Supabase 项目的回调 URL

2. **"Invalid client"**
   - 验证 Client ID 和 Client Secret
   - 确保在正确的 Google Cloud 项目中

3. **登录成功但未显示用户信息**
   - 检查浏览器控制台错误
   - 验证 Supabase 项目配置

### 调试技巧

- 查看浏览器开发者工具的网络标签
- 检查 Supabase Dashboard 中的认证日志
- 使用测试页面 `/test-google-auth` 查看详细状态

## 安全注意事项

- Client Secret 应该保密
- 在生产环境中使用 HTTPS
- 定期轮换 Client Secret
- 监控认证日志中的可疑活动