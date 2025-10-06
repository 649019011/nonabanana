# 🚨 紧急：Supabase Google OAuth 配置指南

## 错误信息解析

```
{"code":400,"error_code":"validation_failed","msg":"Unsupported provider: provider is not enabled"}
```

这个错误表示 **Google provider 在你的 Supabase 项目中没有启用**。

## 🎯 立即需要执行的步骤

### 1. 访问 Supabase Dashboard

1. 打开 [https://app.supabase.com](https://app.supabase.com)
2. 选择你的项目：`jiufkznqpiqtrcwkloka`

### 2. 启用 Google Provider

1. 在左侧菜单中点击 **Authentication**
2. 点击 **Providers** 标签页
3. 找到 **Google** 并点击它
4. 切换 **Enabled** 开关到 **ON** 状态
5. 保存配置

### 3. 配置 Google OAuth（如果还没有配置）

如果你还没有配置 Google OAuth，需要：

#### A. 在 Google Cloud Console 中

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 选择你的项目（或创建新项目）
3. 导航到 **APIs & Services** > **Credentials**
4. 点击 **Create Credentials** > **OAuth client ID**
5. 选择 **Web application**
6. 添加授权的重定向 URI：
   ```
   https://jiufkznqpiqtrcwkloka.supabase.co/auth/v1/callback
   ```
7. 记录 **Client ID** 和 **Client Secret**

#### B. 在 Supabase 中

1. 回到 Supabase Dashboard 的 Google provider 配置
2. 输入从 Google 获取的：
   - **Client ID**
   - **Client Secret**
3. 点击 **Save**

### 4. 配置重定向 URL

在 Supabase Dashboard 中：

1. 导航到 **Authentication** > **URL Configuration**
2. 在 **Redirect URLs** 中添加：
   ```
   http://localhost:3005/auth/callback
   ```
3. 点击 **Save**

## 🔧 快速测试配置

配置完成后，你可以：

1. **重启开发服务器**（确保加载新配置）：
   ```bash
   # 停止当前服务器（Ctrl+C）
   # 然后重新启动
   npm run dev
   ```

2. **访问测试页面**：
   ```
   http://localhost:3005/simple-test
   ```

3. **点击 "使用 Google 登录" 按钮**

## 🚨 如果仍有问题

### 检查 Supabase 项目状态

访问你的 Supabase 项目 URL 验证项目正常运行：
```
https://jiufkznqpiqtrcwkloka.supabase.co
```

### 验证环境变量

确认 `.env.local` 文件中的配置正确：
```env
NEXT_PUBLIC_SUPABASE_URL=https://jiufkznqpiqtrcwkloka.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 查看详细错误

在浏览器开发者工具的 **Network** 标签中查看请求详情，或检查 **Console** 中的错误信息。

## 📞 如果需要帮助

如果按照上述步骤仍有问题，请提供：

1. **浏览器控制台的完整错误信息**
2. **Network 标签中的请求详情**
3. **Supabase Dashboard 中 Authentication 设置的截图**

---

## 🎯 配置完成后

一旦 Google provider 正确启用，你应该能够：

1. ✅ 点击 Google 登录按钮
2. ✅ 被重定向到 Google OAuth 页面
3. ✅ 授权应用访问
4. ✅ 被重定向回你的应用
5. ✅ 看到用户信息显示在页面上

**当前状态**: ⏳ 等待 Supabase Google Provider 配置