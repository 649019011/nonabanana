"use client";

import { useEffect, useState } from "react";
import { SimpleGoogleButton } from "@/components/auth/SimpleGoogleButton";
import { SimpleGitHubButton } from "@/components/auth/SimpleGitHubButton";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export default function TestGoogleAuthPage() {
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setMessage(`登录错误: ${decodeURIComponent(error)}`);
      setIsSuccess(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setMessage(`登录成功！欢迎 ${user.user_metadata?.full_name || user.email}`);
      setIsSuccess(true);
    }
  }, [isAuthenticated, user]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-8">测试 Google & GitHub 登录</h1>

        {/* 用户状态显示 */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">当前状态:</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <li>• 加载状态: {loading ? '加载中...' : '已加载'}</li>
            <li>• 认证状态: {isAuthenticated ? '已登录' : '未登录'}</li>
            {user && (
              <>
                <li>• 用户ID: {user.id}</li>
                <li>• 邮箱: {user.email}</li>
                <li>• 提供商: {user.app_metadata?.provider}</li>
                <li>• 姓名: {user.user_metadata?.full_name || '未设置'}</li>
              </>
            )}
          </div>
        </div>

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
            <p className="text-gray-600 mb-4">点击下面的按钮测试 OAuth 登录功能</p>
            <div className="space-y-3">
              <SimpleGoogleButton className="w-full" />
              <SimpleGitHubButton className="w-full" />
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">说明：</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Google 登录会跳转到 Google OAuth</li>
              <li>• GitHub 登录会跳转到 GitHub OAuth</li>
              <li>• 授权后会重定向到 /auth/callback</li>
              <li>• 成功后会返回此页面</li>
              <li>• 使用服务器端认证模式</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">配置要求：</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Supabase 项目已创建</li>
              <li>• Google OAuth 已在 Supabase 中启用</li>
              <li>• GitHub OAuth 已在 Supabase 中启用</li>
              <li>• 重定向 URL 包含当前域名</li>
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