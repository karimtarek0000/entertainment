import { setUserCookie } from '@/actions/user'
import { useAuth, useSignIn } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface SignUpData {
  email: string
  password: string
}

export const useLogin = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const { userId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [pendingUserData, setPendingUserData] = useState<string | null>(null)

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
        setPendingUserData(data.email)
      }
    } catch {
      // Handle login error
      setIsLoading(false)
      toast.error('Email or password is incorrect')
    }
  }

  // Store user data when userId becomes available
  useEffect(() => {
    if (pendingUserData && userId) {
      const userData = {
        id: userId,
        email: pendingUserData,
      }

      setUserCookie(userData)
      setPendingUserData(null)
      toast.success('Successfully logged in')
    }
  }, [userId, pendingUserData])

  return {
    isLoading,
    handleLogin,
  }
}
