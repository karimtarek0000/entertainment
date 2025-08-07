import AuthForm from '@/components/molecules/AuthForm'

export default function Login() {
  return (
    <>
      <h1 className="auth-heading">Login</h1>
      <AuthForm type="login" />
    </>
  )
}
