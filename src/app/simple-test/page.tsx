"use client";

import { SimpleGoogleButton } from "@/components/auth/SimpleGoogleButton";
import { SimpleGitHubButton } from "@/components/auth/SimpleGitHubButton";
import Link from "next/link";

export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-8">简单测试页面</h1>

        <div className="space-y-4">
          <p className="text-gray-600 text-center">测试登录按钮功能：</p>

          <div className="space-y-3">
            <SimpleGoogleButton className="w-full" />
            <SimpleGitHubButton className="w-full" />
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">说明：</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 点击按钮测试 OAuth 功能</li>
              <li>• 检查浏览器网络请求</li>
              <li>• 查看控制台日志</li>
            </ul>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              返回主页
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}