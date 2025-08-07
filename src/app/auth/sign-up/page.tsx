import AuthForm from '@/components/molecules/AuthForm'

export default function SignUp() {
  return (
    <>
      <h1 className="auth-heading">Sign up</h1>
      <AuthForm type="sign-up" />
    </>
  )
}
