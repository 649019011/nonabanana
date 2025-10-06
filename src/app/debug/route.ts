import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const debug = {
    timestamp: new Date().toISOString(),
    environment: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ 配置' : '✗ 缺失',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ 配置' : '✗ 缺失',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✓ 配置' : '✗ 缺失',
      DOUBAO_API_KEY: process.env.DOUBAO_API_KEY ? '✓ 配置' : '✗ 缺失',
      GEMINI_API_KEY: process.env.GEMINI_API_KEY ? '✓ 配置' : '✗ 缺失',
    },
    urls: {
      githubLogin: '/api/auth/github',
      authCallback: '/auth/callback',
      logout: '/api/auth/logout',
      testAuth: '/test-auth',
    }
  }

  return NextResponse.json(debug, { status: 200 })
}