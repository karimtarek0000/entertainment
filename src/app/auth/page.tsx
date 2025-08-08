import AuthForm from '@/components/molecules/AuthForm'
import Link from 'next/link'

export default function Login() {
  return (
    <>
      <h1 className="auth-heading">Login</h1>
      <AuthForm type="login" />
      <div className="flex-center text-para-md space-x-2">
        <p>Don’t have an account?</p>
        <Link className="text-third" href="/auth/sign-up">
          Sign up
        </Link>
      </div>
    </>
  )
}
