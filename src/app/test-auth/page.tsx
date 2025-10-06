"use client";

import { useEffect, useState } from "react";
import { SimpleGitHubButton } from "@/components/auth/SimpleGitHubButton";
import { useSearchParams } from "next/navigation";

export default function TestAuthPage() {
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setMessage(`登录错误: ${decodeURIComponent(error)}`);
      setIsSuccess(false);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-8">测试 GitHub 登录</h1>

        {message && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              isSuccess
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">点击下面的按钮测试 GitHub OAuth 登录功能</p>
            <SimpleGitHubButton className="w-full" />
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">说明：</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 点击按钮会跳转到 GitHub OAuth</li>
              <li>• 授权后会重定向到 /auth/callback</li>
              <li>• 成功后会返回主页</li>
              <li>• 当前端口: 3003</li>
              <li>• 需要配置 Supabase 和 GitHub OAuth</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">调试信息：</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• 确保环境变量已正确配置</li>
              <li>• 检查浏览器控制台是否有错误</li>
              <li>• 查看服务器日志获取详细信息</li>
            </ul>
          </div>

          <div className="mt-4 text-center">
            <a
              href="/"
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              返回主页
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}