'use client'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import AuthForm from '@/components/molecules/AuthForm'
import { useSignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignUp() {
  const { isLoaded, signUp } = useSignUp()
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

  const handleSignUp = async (data: SignUpData) => {
    if (!isLoaded || !signUp) return

    try {
      setLoading(true)

      // 1# Create user account
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      })

      // 2# Send verification email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setLoading(false)

      // 3# Show verification form
      setPendingVerification(true)
    } catch (err: any) {}
  }

  const handleVerifyEmail = async () => {
    if (!isLoaded || !signUp) return

    try {
      // 1# Verify email with code
      const result = await signUp.attemptEmailAddressVerification({ code })

      if (result.status === 'complete') {
        // Redirect to login after verification
        router.replace('/auth')
      }
    } catch (err: any) {}
  }

  // Show verification form
  if (pendingVerification) {
    return (
      <>
        <h1 className="auth-heading">Verify your email</h1>
        <p className="text-center mb-6">
          We sent a verification code to your email address
        </p>

        <div className="space-y-4">
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
        </div>
      </>
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
