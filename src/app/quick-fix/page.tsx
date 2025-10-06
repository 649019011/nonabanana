"use client";

export default function QuickFixPage() {
  const supabaseUrl = "https://jiufkznqpiqtrcwkloka.supabase.co";

  return (
    <div className="min-h-screen bg-red-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-red-100 border-2 border-red-300 rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-red-800 mb-4">🚨 紧急修复</h1>
          <p className="text-red-700 mb-4">
            错误信息：<code>"Unsupported provider: provider is not enabled"</code>
          </p>
          <p className="text-red-600 font-semibold">
            这意味着 Google Provider 在你的 Supabase 项目中没有启用！
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">立即解决步骤：</h2>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-blue-800">步骤 1: 访问 Supabase Dashboard</h3>
              <p>打开 <a href="https://app.supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://app.supabase.com</a></p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-green-800">步骤 2: 选择项目</h3>
              <p>项目名称应该是：<code>jiufkznqpiqtrcwkloka</code></p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-semibold text-yellow-800">步骤 3: 启用 Google Provider</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>点击左侧菜单的 <strong>Authentication</strong></li>
                <li>点击 <strong>Providers</strong> 标签页</li>
                <li>找到 <strong>Google</strong> 并点击它</li>
                <li>将 <strong>Enabled</strong> 开关切换到 <strong>ON</strong></li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-purple-800">步骤 4: 配置重定向 URL</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>在 Authentication 中点击 <strong>URL Configuration</strong></li>
                <li>在 <strong>Redirect URLs</strong> 中添加：</li>
                <li><code>http://localhost:3005/auth/callback</code></li>
              </ul>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-orange-800">步骤 5: 测试登录</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>回到应用：http://localhost:3005/simple-test</li>
                <li>点击 "使用 Google 登录"</li>
                <li>应该会跳转到 Google 授权页面</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">项目信息：</h3>
          <div className="space-y-2 text-blue-800">
            <p><strong>Supabase URL:</strong> {supabaseUrl}</p>
            <p><strong>当前应用地址:</strong> http://localhost:3005</p>
            <p><strong>回调地址:</strong> http://localhost:3005/auth/callback</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">如果还没有 Google OAuth 凭据：</h3>
          <ol className="list-decimal list-inside space-y-2 text-yellow-800">
            <li>访问 <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
            <li>创建或选择项目</li>
            <li>导航到 APIs & Services > Credentials</li>
            <li>点击 Create Credentials > OAuth client ID</li>
            <li>选择 Web application</li>
            <li>添加重定向 URI: <code>{supabaseUrl}/auth/v1/callback</code></li>
            <li>复制 Client ID 和 Client Secret 到 Supabase</li>
          </ol>
        </div>

        <div className="mt-6 text-center">
          <a href="/simple-test" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded inline-block">
            返回测试页面
          </a>
        </div>
      </div>
    </div>
  );
}