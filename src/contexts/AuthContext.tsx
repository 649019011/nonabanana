"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

const supabase = createClient()

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGitHub: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 清理不兼容的Cookie
    const clearIncompatibleCookies = () => {
      const cookies = document.cookie.split(';')
      let clearedCount = 0
      cookies.forEach(cookie => {
        const [name] = cookie.trim().split('=')
        if (name && (name.includes('supabase') || name.includes('sb-'))) {
          console.log('[AuthContext] 清理Cookie:', name)
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.localhost:3002;`
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.localhost:3000;`
          clearedCount++
        }
      })
      return clearedCount
    }

    // 获取初始用户（使用 getUser 认证后端校验）- 带重试机制
    const getInitialUser = async (retryCount = 0) => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        console.log('[AuthContext] 获取初始用户(getUser):', {
          hasUser: !!user,
          userId: user?.id,
          email: user?.email,
          error,
          retryCount
        })

        // 如果有Cookie解析错误，清理Cookie并重试
        if (error && (error.message?.includes('Failed to parse cookie') || error.message?.includes('Cookie'))) {
          console.log('[AuthContext] 检测到Cookie解析错误，清理Cookie')
          const clearedCount = clearIncompatibleCookies()
          console.log(`[AuthContext] 清理了 ${clearedCount} 个Cookie`)

          // 如果重试次数少于3次，则重试
          if (retryCount < 3) {
            setTimeout(() => {
              console.log(`[AuthContext] 重试获取会话 (${retryCount + 1}/3)`)
              getInitialUser(retryCount + 1)
            }, 200 * (retryCount + 1)) // 递增延迟
            return
          } else {
            console.error('[AuthContext] 重试次数已达上限，放弃获取会话')
          }
        }

        setUser(user ?? null)
        setLoading(false)
      } catch (error) {
        console.error('[AuthContext] 获取会话失败:', error)
        // 如果是Cookie解析错误且重试次数少于3次，清理Cookie并重试
        if (error instanceof Error && (error.message?.includes('Failed to parse cookie') || error.message?.includes('Cookie')) && retryCount < 3) {
          console.log('[AuthContext] 检测到Cookie解析错误，清理Cookie并重试')
          clearIncompatibleCookies()
          setTimeout(() => {
            console.log(`[AuthContext] 重试获取会话 (${retryCount + 1}/3)`)
            getInitialUser(retryCount + 1)
          }, 200 * (retryCount + 1))
          return
        }
        setLoading(false)
      }
    }

    getInitialUser()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      // 改为二次校验获取用户，避免直接信任存储层数据
      const { data: { user } } = await supabase.auth.getUser()
      console.log('[AuthContext] 认证状态变化(getUser):', {
        event,
        hasUser: !!user,
        userId: user?.id,
        email: user?.email,
      })
      setUser(user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGitHub = async () => {
    const origin = typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:3008'

    // 修复开发环境中的 0.0.0.0 地址问题
    const correctedOrigin = origin.replace('://0.0.0.0:', '://localhost:')

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${correctedOrigin}/auth/callback`,
      },
    })

    if (error) {
      console.error('[Auth] GitHub 登录错误:', error)
      throw error
    }
  }

  const signInWithGoogle = async () => {
    const origin = typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:3008'

    // 修复开发环境中的 0.0.0.0 地址问题
    const correctedOrigin = origin.replace('://0.0.0.0:', '://localhost:')

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${correctedOrigin}/auth/callback`,
      },
    })

    if (error) {
      console.error('[Auth] Google 登录错误:', error)
      throw error
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('[Auth] 登出错误:', error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    signInWithGitHub,
    signInWithGoogle,
    signOut,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
