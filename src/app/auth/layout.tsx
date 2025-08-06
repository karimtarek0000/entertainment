export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <nav>This is a navbar</nav>
      {children}
    </main>
  )
}
