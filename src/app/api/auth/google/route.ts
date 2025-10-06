import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const redirectTo = requestUrl.searchParams.get('redirect_to') ?? '/'

  console.log('[Auth] Google 登录请求:', {
    origin: requestUrl.origin,
    redirectTo,
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })

  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${requestUrl.origin}/auth/callback?redirect_to=${redirectTo}`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      console.error('[Auth] Google 登录错误:', error)
      return NextResponse.redirect(`${requestUrl.origin}/test-auth?error=${encodeURIComponent(error.message)}`)
    }

    console.log('[Auth] Google 登录成功，重定向到:', data.url)
    return NextResponse.redirect(data.url)
  } catch (error) {
    console.error('[Auth] Google 登录异常:', error)
    return NextResponse.redirect(`${requestUrl.origin}/test-auth?error=${encodeURIComponent('Authentication failed')}`)
  }
}