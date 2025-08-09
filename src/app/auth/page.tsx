'use client'

import AuthForm from '@/components/molecules/AuthForm'
import { useSignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (data: SignUpData) => {
    if (!isLoaded) return

    try {
      setIsLoading(true)

      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/')
      }
    } catch (err: any) {
      // console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h1 className="auth-heading">Login</h1>
      <AuthForm
        type="login"
        isLoading={isLoading}
        submit={(data: SignUpData) => handleLogin(data)}
      />
      <div className="flex-center flex-col text-para-md">
        <div id="clerk-captcha"></div>
        <div className="flex-center space-x-2">
          <p>Don’t have an account?</p>
          <Link className="text-third" href="/auth/sign-up">
            Sign up
          </Link>
        </div>
      </div>
    </>
  )
}
