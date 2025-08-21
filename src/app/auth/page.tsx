import Login from '@/components/templates/Login'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default function LoginPage() {
  return <Login />
}
