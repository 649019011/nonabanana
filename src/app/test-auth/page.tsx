"use client"

import { useAuth } from "@/contexts/AuthContext"
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons"
import { Button } from "@/components/ui/button"
import { Loader2, User, LogOut, CheckCircle, XCircle } from "lucide-react"

export default function TestAuth() {
  const { user, loading, signOut, isAuthenticated } = useAuth()

  console.log('[TestAuth] 认证状态:', {
    loading,
    isAuthenticated,
    userId: user?.id,
    email: user?.email,
    userName: user?.user_metadata?.full_name
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">认证测试页面</h1>

        {/* 认证状态卡片 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">认证状态</h2>

          <div className="space-y-4">
            {/* 加载状态 */}
            <div className="flex items-center space-x-3">
              <span className="font-medium">加载状态:</span>
              {loading ? (
                <div className="flex items-center space-x-2 text-yellow-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>加载中...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>加载完成</span>
                </div>
              )}
            </div>

            {/* 认证状态 */}
            <div className="flex items-center space-x-3">
              <span className="font-medium">认证状态:</span>
              {isAuthenticated ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>已认证</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-red-600">
                  <XCircle className="w-4 h-4" />
                  <span>未认证</span>
                </div>
              )}
            </div>

            {/* 用户信息 */}
            {user && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">用户信息:</h3>
                <div className="space-y-1 text-sm">
                  <div><strong>ID:</strong> {user.id}</div>
                  <div><strong>邮箱:</strong> {user.email}</div>
                  <div><strong>创建时间:</strong> {new Date(user.created_at).toLocaleString()}</div>
                  <div><strong>最后登录:</strong> {new Date(user.last_sign_in_at || user.created_at).toLocaleString()}</div>
                  <div><strong>认证提供者:</strong> {user.app_metadata?.provider || '未知'}</div>
                  {user.user_metadata?.full_name && (
                    <div><strong>姓名:</strong> {user.user_metadata.full_name}</div>
                  )}
                  {user.user_metadata?.avatar_url && (
                    <div className="mt-2">
                      <strong>头像:</strong>
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="用户头像"
                        className="w-12 h-12 rounded-full mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 登录/登出按钮 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">操作</h2>

          {loading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-500">检查认证状态中...</span>
            </div>
          ) : isAuthenticated ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800">用户已成功登录</span>
              </div>

              <Button
                onClick={signOut}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                退出登录
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <XCircle className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800">用户未登录，请使用下方按钮登录</span>
              </div>

              <SocialLoginButtons
                size="lg"
                className=""
              />
            </div>
          )}
        </div>

        {/* 调试信息 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">调试信息</h2>
          <div className="bg-gray-100 rounded-lg p-4 font-mono text-xs overflow-x-auto">
            <pre>{JSON.stringify({
              loading,
              isAuthenticated,
              user: user ? {
                id: user.id,
                email: user.email,
                created_at: user.created_at,
                last_sign_in_at: user.last_sign_in_at,
                provider: user.app_metadata?.provider,
                user_metadata: user.user_metadata
              } : null
            }, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}
