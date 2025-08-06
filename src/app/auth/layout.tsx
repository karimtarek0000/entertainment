export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <nav></nav>
      {children}
    </main>
  )
}
