# GitHub 登录调试指南

## 🔍 问题排查步骤

### 1. 检查开发服务器状态

开发服务器运行在: **http://localhost:3003**

### 2. 测试环境变量配置

访问: http://localhost:3003/debug

这个端点会显示所有环境变量的配置状态。

### 3. 测试 GitHub 登录流程

1. 访问测试页面: http://localhost:3003/test-auth
2. 点击 "Sign in with GitHub" 按钮
3. 查看浏览器开发者工具的 Console 和 Network 标签
4. 检查服务器终端输出

## 🛠️ 可能的问题和解决方案

### 问题 1: 环境变量未正确配置

**症状**: 点击按钮无反应或显示缺少环境变量错误

**解决方案**:
1. 检查 `.env.local` 文件是否存在正确的配置
2. 访问 `/debug` 端点查看环境变量状态
3. 重启开发服务器

### 问题 2: Supabase 未配置 GitHub OAuth

**症状**: 重定向到 GitHub 但显示错误

**解决方案**:
1. 登录 Supabase Dashboard
2. 进入 Authentication > Providers
3. 启用 GitHub provider
4. 填入正确的 Client ID 和 Client Secret
5. 设置 Redirect URL: `http://localhost:3003/auth/callback`

### 问题 3: GitHub OAuth 应用配置错误

**症状**: GitHub 显示 redirect_uri_mismatch 错误

**解决方案**:
1. 访问 GitHub Settings > Developer settings > OAuth Apps
2. 编辑你的 OAuth 应用
3. 设置 Authorization callback URL: `http://localhost:3003/auth/callback`
4. 确保使用正确的端口 (3003)

### 问题 4: 端口不匹配

**症状**: 回调后显示错误或重定向失败

**解决方案**:
1. 确认开发服务器运行的端口
2. 更新所有配置中的端口号
3. 重启开发服务器

## 📋 调试检查清单

- [ ] 开发服务器正在运行 (http://localhost:3003)
- [ ] 环境变量已正确配置 (检查 /debug)
- [ ] Supabase 项目已启用 GitHub provider
- [ ] GitHub OAuth 应用已创建并配置
- [ ] 所有回调 URL 都使用正确的端口 (3003)
- [ ] 浏览器没有阻止重定向

## 🔧 调试工具

### 1. 服务器日志
查看运行 `npm run dev` 的终端窗口，查看详细的认证日志。

### 2. 浏览器开发者工具
- **Console**: 查看 JavaScript 错误
- **Network**: 查看 HTTP 请求和响应
- **Application**: 查看 cookies 和存储

### 3. 直接测试 API 端点
使用 curl 或 Postman 直接测试:
- `GET http://localhost:3003/api/auth/github`

## 📞 获取帮助

如果问题仍然存在，请提供以下信息:

1. 浏览器控制台的错误信息
2. 服务器终端的日志输出
3. 访问 `/debug` 端点的结果
4. 你在哪个步骤遇到了问题

## 🎯 快速测试

最简单的测试方法:

1. 访问: http://localhost:3003/test-auth
2. 点击 GitHub 登录按钮
3. 观察浏览器地址栏和服务器日志
4. 如果成功，应该会重定向到 GitHub 授权页面