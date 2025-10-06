import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const redirectTo = requestUrl.searchParams.get('redirect_to') ?? '/'

  console.log('[Auth] GitHub 登录请求:', {
    origin: requestUrl.origin,
    redirectTo,
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('[Auth] 缺少 Supabase 环境变量')
    return NextResponse.redirect(`${requestUrl.origin}/test-auth?error=missing_env`)
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      flowType: 'pkce',
    }
  })

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${requestUrl.origin}/auth/callback?redirect_to=${redirectTo}`,
    },
  })

  if (error) {
    console.error('[Auth] GitHub 登录错误:', error)
    return NextResponse.redirect(`${requestUrl.origin}/test-auth?error=${encodeURIComponent(error.message)}`)
  }

  console.log('[Auth] GitHub 登录成功，重定向到:', data.url)
  return NextResponse.redirect(data.url)
}