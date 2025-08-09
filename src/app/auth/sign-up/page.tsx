'use client'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import AuthForm from '@/components/molecules/AuthForm'
import AuthVerify from '@/components/molecules/AuthVerify'
import { useAuth, useSignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignUp() {
  const { isLoaded, signUp } = useSignUp()
  const { signOut } = useAuth()
  const [isLoading, setLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const router = useRouter()

  // 1# Sign up
  const handleSignUp = async (data: SignUpData) => {
    if (!isLoaded || !signUp) return

    try {
      setLoading(true)

      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err: any) {
      // Add error handling here
    } finally {
      setLoading(false) // Moved to finally block
    }
  }

  // 2# Handle email verification
  const handleVerifyEmail = async () => {
    if (!isLoaded || !signUp) return

    try {
      const result = await signUp.attemptEmailAddressVerification({ code })

      if (result.status === 'complete') {
        await signOut()
        router.replace('/auth')
      }
    } catch (err: any) {
      // Add error handling here
    }
  }

  // 3# Handle resend verification code
  const handleResendCode = async () => {
    if (!isLoaded || !signUp) return

    try {
      setIsResending(true)
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setCode('')
    } catch (err: any) {
      // Add error handling here
    } finally {
      setIsResending(false)
    }
  }

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

        <Button
          onClick={handleVerifyEmail}
          disabled={!code || code.length !== 6 || !/^\d+$/.test(code)}
        >
          Verify Email
        </Button>

        <div className="flex-center flex-col space-y-2 mt-4">
          <p className="text-para-sm">Didn&apos;t receive the code?</p>
          <Button onClick={handleResendCode} disabled={isResending}>
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
