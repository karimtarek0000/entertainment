import AuthForm from '@/components/molecules/AuthForm'
import Link from 'next/link'

export default function SignUp() {
  return (
    <>
      <h1 className="auth-heading">Sign up</h1>
      <AuthForm type="sign-up" />
      <div className="flex-center text-para-md space-x-2">
        <p>Already have an account?</p>
        <Link className="text-third" href="/auth">
          Login
        </Link>
      </div>
    </>
  )
}
