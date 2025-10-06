"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Github } from 'lucide-react'

interface SimpleGitHubButtonProps {
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function SimpleGitHubButton({
  className,
  variant = "outline",
  size = "default"
}: SimpleGitHubButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleGitHubLogin = async () => {
    setIsLoading(true)
    try {
      // 重定向到 GitHub OAuth 端点
      window.location.href = '/api/auth/github'
    } catch (error) {
      console.error('[Auth] GitHub 登录错误:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleGitHubLogin}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Github className="w-4 h-4 mr-2" />
          Sign in with GitHub
        </>
      )}
    </Button>
  )
}