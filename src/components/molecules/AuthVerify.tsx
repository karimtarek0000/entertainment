import { JSX } from 'react'

export default function AuthVerify({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <>
      <h1 className="auth-heading">Verify your email</h1>
      <p className="text-center mb-6">
        We sent a verification code to your email address
      </p>

      <div className="space-y-4">{children}</div>
    </>
  )
}
