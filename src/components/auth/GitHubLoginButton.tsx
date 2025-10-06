"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Github } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface GitHubLoginButtonProps {
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function GitHubLoginButton({
  className,
  variant = "outline",
  size = "default"
}: GitHubLoginButtonProps) {
  const { user, signInWithGitHub, signOut, loading } = useAuth()
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignIn = async () => {
    setIsSigningIn(true)
    try {
      await signInWithGitHub()
    } catch (error) {
      console.error('[Auth] 登录失败:', error)
    } finally {
      setIsSigningIn(false)
    }
  }

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await signOut()
    } catch (error) {
      console.error('[Auth] 登出失败:', error)
    } finally {
      setIsSigningOut(false)
    }
  }

  if (loading) {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Loading...
      </Button>
    )
  }

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <img
            src={user.user_metadata.avatar_url}
            alt={user.user_metadata.user_name || 'User'}
            className="w-6 h-6 rounded-full"
          />
          <span>{user.user_metadata.user_name || user.email}</span>
        </div>
        <Button
          variant={variant}
          size={size}
          className={className}
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          {isSigningOut ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing out...
            </>
          ) : (
            'Sign Out'
          )}
        </Button>
      </div>
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleSignIn}
      disabled={isSigningIn}
    >
      {isSigningIn ? (
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