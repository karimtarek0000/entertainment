import Dashboard from '@/components/templates/Dashboard'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Dashboard>{children}</Dashboard>
}
