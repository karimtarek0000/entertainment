'use client'

import AuthForm from '@/components/molecules/AuthForm'
import { useLogin } from '@/hooks/Login'
import Link from 'next/link'

export default function Login() {
  const { isLoading, handleLogin } = useLogin()

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
