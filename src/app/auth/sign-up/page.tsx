'use client'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import AuthForm from '@/components/molecules/AuthForm'
import AuthVerify from '@/components/molecules/AuthVerify'
import { useSignup } from '@/hooks/SignUp'
import Link from 'next/link'

export default function SignUp() {
  const {
    pendingVerification,
    isLoading,
    isResending,
    isTimeOut,
    displayTime,
    code,
    handleSignUp,
    handleResendCode,
    handleVerifyEmail,
    setCode,
  } = useSignup()

  // Render verification form
  if (pendingVerification) {
    return (
      <AuthVerify>
        <Input
          type="text"
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="Enter 6-digit code"
          maxLength={6}
        />

        <figure className="text-center min-h-6">{displayTime}</figure>

        <Button
          onClick={handleVerifyEmail}
          disabled={!code || code.length !== 6 || !/^\d+$/.test(code)}
        >
          Verify Email
        </Button>

        <div className="flex-center flex-col space-y-2 mt-4">
          <p className="text-para-sm">Didn&apos;t receive the code?</p>
          <Button
            onClick={handleResendCode}
            disabled={isResending || !isTimeOut}
          >
            {isResending ? 'Resending...' : 'Resend Code'}
          </Button>
        </div>
      </AuthVerify>
    )
  }

  return (
    <>
      <h1 className="auth-heading">Sign up</h1>
      <AuthForm
        type="signUp"
        isLoading={isLoading}
        submit={(data: SignUpData) => handleSignUp(data)}
      />
      <div className="flex-center flex-col text-para-md">
        <div id="clerk-captcha"></div>
        <div className="flex-center space-x-2">
          <p>Already have an account?</p>
          <Link className="text-third" href="/auth">
            Login
          </Link>
        </div>
      </div>
    </>
  )
}
