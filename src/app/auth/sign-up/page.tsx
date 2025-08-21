import SignUp from '@/components/templates/Signup'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account',
}

export default function SignUpPage() {
  return <SignUp />
}
