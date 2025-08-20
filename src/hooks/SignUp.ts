import { addNewUser } from '@/actions/user'
import { useCounterOTP } from '@/hooks/CounterOTP'
import { useAuth, useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const useSignup = () => {
  const { displayTime, isTimeOut, startTimer, clearTimer } = useCounterOTP()
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
      toast.success('Verification email sent')
    } catch {
      setLoading(false)
    } finally {
      startTimer()
    }
  }

  // 2# Handle email verification
  const handleVerifyEmail = async () => {
    if (!isLoaded || !signUp) return

    try {
      const result = await signUp.attemptEmailAddressVerification({ code })

      if (result.status === 'complete') {
        clearTimer()
        // Use data from the result and signUp objects
        await addNewUser({
          id: result.createdUserId as string,
          email: signUp.emailAddress as string,
        })

        await signOut()
        router.replace('/auth')
        toast.success('Successfully signup and verified email 👌')
      }
    } catch {
      toast.error('Failed to verify email')
    }
  }

  // 3# Handle resend verification code
  const handleResendCode = async () => {
    if (!isLoaded || !signUp) return

    startTimer()

    try {
      setIsResending(true)
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setCode('')
      toast.success('Successfully resent verification email')
    } catch {
      toast.error('Failed to resend verification email')
    } finally {
      setIsResending(false)
    }
  }

  return {
    pendingVerification,
    isLoading,
    displayTime,
    isResending,
    isTimeOut,
    code,
    handleSignUp,
    handleResendCode,
    setCode,
    handleVerifyEmail,
  }
}
