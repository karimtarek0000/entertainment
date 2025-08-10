export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <p>testing from layout dashboard</p>
      {children}
    </main>
  )
}
