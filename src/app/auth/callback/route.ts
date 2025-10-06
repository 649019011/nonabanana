import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const redirectTo = requestUrl.searchParams.get('redirect_to') ?? '/'

  // 修复开发环境中的 0.0.0.0 地址问题
  const origin = requestUrl.origin.replace('://0.0.0.0:', '://localhost:')

  console.log('[Auth] OAuth 回调:', {
    hasCode: !!code,
    error,
    originalOrigin: requestUrl.origin,
    correctedOrigin: origin,
    redirectTo,
  })

  if (error) {
    console.error('[Auth] OAuth 错误:', error)
    return NextResponse.redirect(`${origin}/test-auth?error=${encodeURIComponent(error)}`)
  }

  if (code) {
    try {
      const supabase = await createClient()
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        console.error('[Auth] 回调错误:', exchangeError)
        return NextResponse.redirect(`${origin}/test-auth?error=${encodeURIComponent(exchangeError.message)}`)
      }

      console.log('[Auth] 登录成功:', {
        userId: data.user?.id,
        email: data.user?.email,
        provider: data.user?.app_metadata?.provider,
      })

      return NextResponse.redirect(`${origin}${redirectTo}`)
    } catch (error) {
      console.error('[Auth] 处理回调时发生错误:', error)
      return NextResponse.redirect(`${origin}/test-auth?error=${encodeURIComponent('Authentication failed')}`)
    }
  }

  // 如果没有 code 参数，重定向到测试页面
  return NextResponse.redirect(`${origin}/test-auth?error=missing_code`)
}