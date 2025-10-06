import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      flowType: 'pkce',
    }
  })

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('[Auth] 登出错误:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  console.log('[Auth] 登出成功')
  return NextResponse.redirect(`${requestUrl.origin}/`, { status: 302 })
}