'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'
import { Check } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/team')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: LoginInput) => {
    try {
      await signInWithEmail(data.email, data.password)
      toast.success('Signed in successfully')
      router.replace('/team')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
      } else {
        toast.error('Invalid email or password')
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/team')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="flex w-full max-w-7xl min-h-[560px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Left panel */}
        <div className="hidden w-2/5 flex-col justify-between bg-[#0f2a4a] p-10 text-white md:flex">
          <div>
            <div className="mb-18 flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-700">
                <Check className="h-6 w-6 text-white" strokeWidth={3} />
              </div>
              <div className="text-lg font-bold leading-tight">
                Enterprise Supply Chain
                <br />
                Data Portal
              </div>
            </div>
 
            <h1 className="mb-3 text-4xl font-extrabold leading-tight">Welcome back</h1>
            <p className="max-w-xs text-sm text-slate-300">
              Sign in to securely access your team workspace and continue to the team page.
            </p>
          </div>
 
          <div>
            <div className="mb-4 border-t border-white/20" />
            <div className="flex h-40 gap-6 text-xs text-slate-300">
              <span>Secure access</span>
              <span>Consistent experience</span>
            </div>
          </div>
        </div>
 
        {/* Right panel */}
        <div className="w-3/5 p-20">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-[#0f2a4a]">Sign in</h2>
            <p className="mt-1 text-sm text-slate-500">Enter your account details to continue.</p>
          </div>
 
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-[#0f2a4a]">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 aria-invalid:border-red-500"
                placeholder="name@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-red-500" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
 
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-semibold text-[#0f2a4a]">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 aria-invalid:border-red-500"
                placeholder="••••••••"
                {...register('password')}
              />
              {errors.password && (
                <p id="password-error" className="text-xs text-red-500" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>
 
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-teal-700 px-4 py-3 mt-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
 
            <p className="text-center text-xs text-slate-500">
              Successful authentication redirects to the Team page.
            </p>
          </form>
        </div>
      </div>
    </div>  
  )
}
